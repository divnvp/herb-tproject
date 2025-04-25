<script setup lang="ts">
import { useAuthorization } from "~/composables/use-authorization";

const { logout } = useAuthorization();
</script>

<template>
  <div>
    <button @click="logout">Logout</button>
  </div>
</template>
