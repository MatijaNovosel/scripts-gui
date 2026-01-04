<template>
  <v-layout>
    <alerts />
    <v-main class="main">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import Alerts from "../components/notifications/Alerts.vue";
</script>

<style scoped lang="scss">
.main {
  overflow: auto;
}
</style>
