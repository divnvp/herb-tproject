<script setup lang="ts">
import { useAuthorization } from "~/composables/use-authorization";
import { useFavorites } from "~/composables/use-favorites";
import type { Favorite } from "#shared/types/favorite";
import type { Pagination } from "#shared/types/pagination";
import CarouselComponent from "~/components/carousel-component.vue";

const { logout } = useAuthorization();
const { getAllFavorites } = useFavorites();
const favorites = ref<Pagination<Favorite> | null>(null);

onMounted(async () => {
  await init();
});

const init = async () => {
  favorites.value = await getAllFavorites();
};

const onLogout = async () => {
  await logout();
  navigateTo("/auth");
};
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-3">
    <CarouselComponent :items="favorites?.results" title="Продукт №" />

    <UButton class="cursor-pointer" @click="onLogout()">Выйти</UButton>
  </div>
</template>
