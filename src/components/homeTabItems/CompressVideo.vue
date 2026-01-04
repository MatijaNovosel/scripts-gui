<template>
  <v-file-input
    label="Input file (mp4)"
    density="compact"
    prepend-icon="mdi-video"
    bg-color="grey-lighten-4"
    class="w-100"
  />
  <v-text-field
    density="compact"
    label="Output file name"
    prepend-icon="mdi-text"
    bg-color="grey-lighten-4"
    class="w-100"
  />
  <v-text-field
    density="compact"
    label="Output size"
    prepend-icon="mdi-calculator"
    bg-color="grey-lighten-4"
    class="w-100"
  >
    <template #append> MB </template>
  </v-text-field>
  <v-btn rounded="6" class="mt-5 text-white" color="orange" @click="compressVideo">
    Compress
  </v-btn>
</template>

<script lang="ts" setup>
import { useAppStore } from "../../store/app";

const appStore = useAppStore();

const compressVideo = async () => {
  await appStore.ipcService.compressVideo("input.mp4", "output.mp4", 10);
};
</script>

<style lang="scss" scoped>
.tabs-content {
  flex-grow: 1;
}
</style>
