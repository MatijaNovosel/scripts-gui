<template>
  <div class="d-flex flex-column align-start">
    <v-file-input
      label="Input file (mp4)"
      density="compact"
      prepend-icon="mdi-video"
      bg-color="grey-lighten-4"
      class="w-100"
      :disabled="appStore.loading"
      v-model="inputFile"
    />
    <v-text-field
      density="compact"
      label="Output size"
      prepend-icon="mdi-calculator"
      bg-color="grey-lighten-4"
      class="w-100"
      :disabled="appStore.loading"
      v-model="outputSize"
    >
      <template #append> MB </template>
    </v-text-field>
    <v-text-field
      density="compact"
      label="Output file name"
      prepend-icon="mdi-folder"
      bg-color="grey-lighten-4"
      class="w-100"
      hide-details
      :disabled="appStore.loading"
      v-model="outputPath"
      @click="selectOutputPath"
      readonly
    />
    <v-btn
      :loading="appStore.loading"
      :disabled="buttonShouldBeDisabled"
      rounded="6"
      class="mt-5 text-white text-capitalize align-self-end"
      color="orange"
      @click="compressVideo"
    >
      Compress
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useAppStore } from "../../store/app";

const appStore = useAppStore();
const inputFile = ref<File | null>(null);
const outputSize = ref<string | null>("10");
const outputPath = ref<string>("");

const selectOutputPath = async () => {
  const result = await appStore.ipcService.selectOutputPath();
  if (result) {
    outputPath.value = result;
  }
};

const compressVideo = async () => {
  try {
    appStore.loading = true;
    await appStore.ipcService.compressVideo(
      inputFile.value?.path || "",
      outputPath.value,
      Number(outputSize.value)
    );
  } catch {
    //
  } finally {
    appStore.loading = false;
  }
};

const buttonShouldBeDisabled = computed(() => {
  return (
    appStore.loading ||
    !inputFile.value ||
    !outputPath.value ||
    !outputSize.value ||
    isNaN(Number(outputSize.value)) ||
    Number(outputSize.value) <= 0
  );
});
</script>

<style lang="scss" scoped>
.tabs-content {
  flex-grow: 1;
}
</style>
