<template>
  <UApp>
    <LayoutSlot>
      <NuxtPage />
    </LayoutSlot>
  </UApp>
</template>

<script setup>
import { useAuthorization } from "~/composables/use-authorization.js";

const { initAuth } = useAuthorization();
onMounted(() => initAuth());
</script>
