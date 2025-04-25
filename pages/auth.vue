<script setup lang="ts">
import AuthCard from "~/components/AuthCard.vue";
import { useAuthorization } from "~/composables/use-authorization";
import { getCookie } from "#shared/utils/get-cookie";

const { logout } = useAuthorization();

onMounted(async () => {
  console.log(getCookie("accessToken"));
  if (getCookie("accessToken")) {
    await logout();
  }
});
</script>

<template>
  <AuthCard />
</template>
