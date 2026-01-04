import { exec } from "child_process";
import { ipcMain } from "electron";
import fs from "fs";
import os from "os";
import path from "path";
import { IPCEvents } from "../utils/constants";

const execAsync = (cmd: string) =>
  new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      resolve({ stdout, stderr });
    });
  });

const q = (p: string) => `"${p.replace(/"/g, '\\"')}"`;

async function probeVideo(inputPath: string) {
  const { stdout } = await execAsync(
    `ffprobe -v error -print_format json -show_format -show_streams ${q(inputPath)}`
  );
  return JSON.parse(stdout);
}

async function compressVideo(inputPath: string, outputPath: string, sizeMB: number) {
  const data = await probeVideo(inputPath);

  const duration = parseFloat(data?.format?.duration || "0");
  if (!duration || !isFinite(duration)) {
    throw new Error("Could not determine video duration.");
  }

  const audioStream = (data?.streams || []).find((s: any) => s.codec_type === "audio");
  let audioBitrate = audioStream?.bit_rate ? parseFloat(audioStream.bit_rate) : 128000; // fallback if missing

  const minAudioBitrate = 32000;
  const maxAudioBitrate = 256000;

  const targetSizeKB = sizeMB * 1000;
  const targetTotalBitrate = (targetSizeKB * 1024 * 8) / (1.073741824 * duration);

  if (10 * audioBitrate > targetTotalBitrate) {
    audioBitrate = targetTotalBitrate / 10;
    if (audioBitrate < minAudioBitrate && minAudioBitrate < targetTotalBitrate) {
      audioBitrate = minAudioBitrate;
    } else if (audioBitrate > maxAudioBitrate) {
      audioBitrate = maxAudioBitrate;
    }
  }

  const videoBitrate = Math.max(1, Math.floor(targetTotalBitrate - audioBitrate));
  const audioBitrateInt = Math.floor(audioBitrate);

  const devnull = process.platform === "win32" ? "NUL" : "/dev/null";
  const passlogBase = path.join(os.tmpdir(), `ffmpeg2pass-${Math.random().toString(36).slice(2)}`);

  const inQ = q(inputPath);
  const outQ = q(outputPath);
  const passQ = q(passlogBase);

  await execAsync(
    `ffmpeg -y -hide_banner -loglevel error -i ${inQ} ` +
      `-c:v libx264 -b:v ${videoBitrate} -pass 1 -an -f mp4 -passlogfile ${passQ} ${devnull}`
  );

  await execAsync(
    `ffmpeg -y -hide_banner -loglevel error -i ${inQ} ` +
      `-c:v libx264 -b:v ${videoBitrate} -pass 2 -c:a aac -b:a ${audioBitrateInt} ` +
      `-movflags +faststart -passlogfile ${passQ} ${outQ}`
  );

  try {
    fs.unlinkSync(`${passlogBase}-0.log`);
  } catch {}
  try {
    fs.unlinkSync(`${passlogBase}-0.log.mbtree`);
  } catch {}

  console.log("finished");

  return {
    outputPath,
    duration,
    audioBitrate: audioBitrateInt,
    videoBitrate,
    targetTotalBitrate: Math.floor(targetTotalBitrate)
  };
}

export const registerFileListeners = () => {
  ipcMain.handle(IPCEvents.GET_FILE, (event, pathStr: string) => {
    if (fs.existsSync(pathStr)) {
      const base64 = fs.readFileSync(pathStr, { encoding: "base64" });
      return base64;
    }
    throw new Error("File does not exist!");
  });

  ipcMain.handle(
    IPCEvents.COMPRESS_VIDEO,
    async (event, inputPath: string, outputPath: string, sizeMB: number) => {
      if (!fs.existsSync(inputPath)) throw new Error("Input file does not exist!");
      if (!sizeMB || sizeMB <= 0) throw new Error("Invalid target size (MB).");

      console.log(outputPath);
      console.log(__dirname);

      await compressVideo(inputPath, outputPath, sizeMB);
    }
  );
};
