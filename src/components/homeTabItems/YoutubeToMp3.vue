<template>
  <div class="d-flex flex-column align-end">
    <v-text-field
      density="compact"
      label="Youtube link"
      prepend-icon="mdi-text"
      bg-color="grey-lighten-4"
      class="w-100"
    />
    <v-btn rounded="6" class="mt-1 text-white" color="orange" @click="compressVideo">
      Download
    </v-btn>
  </div>
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
