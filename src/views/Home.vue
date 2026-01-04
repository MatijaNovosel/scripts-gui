<template>
  <div class="pb-5 h-100 d-flex flex-column">
    <v-tabs v-model="tab" :disabled="appStore.loading" color="orange" bg-color="grey-lighten-5">
      <v-tab :value="Tabs.CompressVideo" rounded="0" class="text-capitalize">
        Compress video
      </v-tab>
      <v-tab :value="Tabs.YoutubeToMp3" rounded="0" class="text-capitalize"> Youtube to mp3 </v-tab>
    </v-tabs>
    <v-divider />
    <v-tabs-window v-model="tab" class="tabs-content pa-5">
      <v-tabs-window-item :value="Tabs.CompressVideo">
        <CompressVideo />
      </v-tabs-window-item>
      <v-tabs-window-item :value="Tabs.YoutubeToMp3">
        <YoutubeToMp3 />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CompressVideo from "../components/homeTabItems/CompressVideo.vue";
import YoutubeToMp3 from "../components/homeTabItems/YoutubeToMp3.vue";
import { useAppStore } from "../store/app";

enum Tabs {
  CompressVideo = "compressVideo",
  YoutubeToMp3 = "youtubeToMp3"
}

const tab = ref(Tabs.CompressVideo);
const appStore = useAppStore();
</script>

<style lang="scss" scoped>
.tabs-content {
  flex-grow: 1;
}
</style>
