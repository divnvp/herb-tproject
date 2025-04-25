<script setup lang="ts">
import { useAuthorization } from "~/composables/use-authorization";
import { useFavorites } from "~/composables/use-favorites";

const { logout } = useAuthorization();
const { getAllFavorites } = useFavorites();

onMounted(() => {
  try {
    getAllFavorites();
  } catch (e) {
    console.error(e);
  }
});
</script>

<template>
  <div>
    <button @click="logout">Logout</button>
  </div>
</template>
