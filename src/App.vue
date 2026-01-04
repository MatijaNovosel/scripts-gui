<template>
  <v-app>
    <confirmation-dialog-provider>
      <router-view />
    </confirmation-dialog-provider>
  </v-app>
</template>

<script setup lang="ts">
import ConfirmationDialogProvider from "./components/confirmationDialog/ConfirmationDialogProvider.vue";
</script>
