<script setup lang="ts">
import AuthCard from "~/components/auth-card.vue";
import { useAuthorization } from "~/composables/use-authorization";

const { logout } = useAuthorization();

onMounted(async () => {
  if (localStorage.getItem("accessToken")) {
    await logout();
  }
});
</script>

<template>
  <AuthCard />
</template>
