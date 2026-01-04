<template>
  <div class="d-flex flex-column align-end">
    <v-file-input
      label="Input file (mp4)"
      density="compact"
      prepend-icon="mdi-video"
      bg-color="grey-lighten-4"
      class="w-100"
      v-model="inputFile"
    />
    <v-text-field
      density="compact"
      label="Output file name"
      prepend-icon="mdi-text"
      bg-color="grey-lighten-4"
      class="w-100"
      v-model="outputFileName"
    />
    <v-text-field
      density="compact"
      label="Output size"
      prepend-icon="mdi-calculator"
      bg-color="grey-lighten-4"
      class="w-100"
      v-model="outputSize"
    >
      <template #append> MB </template>
    </v-text-field>
    <v-btn rounded="6" class="mt-1 text-white" color="orange" @click="compressVideo">
      Compress
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAppStore } from "../../store/app";

const appStore = useAppStore();
const inputFile = ref<File | null>(null);
const outputFileName = ref<string>("output.mp4");
const outputSize = ref<string | null>("10");

const compressVideo = async () => {
  await appStore.ipcService.compressVideo(
    inputFile.value?.path || "",
    outputFileName.value,
    Number(outputSize.value)
  );
};
</script>

<style lang="scss" scoped>
.tabs-content {
  flex-grow: 1;
}
</style>
