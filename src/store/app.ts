import { defineStore } from "pinia";
import { ref } from "vue";
import { IpcService } from "../api/services/ipcService";

export const useAppStore = defineStore("app", () => {
  const loading = ref(false);

  const ipcService = new IpcService();

  return {
    loading,
    ipcService
  };
});
