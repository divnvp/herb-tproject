<script setup lang="ts">
import { useAuthorization } from "~/composables/use-authorization";
import { useFavorites } from "~/composables/use-favorites";
import type { Favorite } from "#shared/types/favorite";
import type { Pagination } from "#shared/types/pagination";

const { logout } = useAuthorization();
const { getAllFavorites } = useFavorites();
const favorites = ref<Pagination<Favorite> | null>(null);
const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);

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

function onClickPrev() {
  activeIndex.value--;
}
function onClickNext() {
  activeIndex.value++;
}

function onSelect(index: number) {
  activeIndex.value = index;

  carousel.value?.emblaApi?.scrollTo(index);
}
</script>

<template>
  <div>
    <UButton class="cursor-pointer" @click="onLogout()">Logout</UButton>

    <div class="flex-1 w-full">
      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        arrows
        :items="favorites?.results"
        :prev="{ onClick: onClickPrev }"
        :next="{ onClick: onClickNext }"
        class="w-full max-w-xs mx-auto"
      >
        <div>{{ item }}</div>
      </UCarousel>

      <div class="flex gap-1 justify-between pt-4 max-w-xs mx-auto">
        <div
          v-for="(item, index) in favorites?.results"
          :key="index"
          class="size-11 opacity-25 hover:opacity-100 transition-opacity"
          :class="{ 'opacity-100': activeIndex === index }"
          @click="onSelect(index)"
        >
          <div>{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
