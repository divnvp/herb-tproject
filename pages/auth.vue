<script setup lang="ts">
import AuthCard from "~/components/auth-card.vue";
import { useAuthorization } from "~/composables/use-authorization";
import { getCookie } from "#shared/utils/get-cookie";

const { logout } = useAuthorization();

onMounted(async () => {
  if (getCookie("accessToken")) {
    await logout();
  }
});
</script>

<template>
  <AuthCard />
</template>
