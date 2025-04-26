<script setup lang="ts">
const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);
// eslint-disable-next-line vue/require-prop-types
const { items, title } = defineProps(["items", "title"]);

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
  <div class="flex-1 w-full">
    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      arrows
      :items="items"
      :prev="{ onClick: onClickPrev }"
      :next="{ onClick: onClickNext }"
      class="w-full max-w-xs mx-auto"
    >
      <div>{{ item }}</div>
    </UCarousel>

    <div class="flex gap-1 justify-between pt-4 max-w-xs mx-auto">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="size-11 opacity-25 hover:opacity-100 transition-opacity"
        :class="{ 'opacity-100': activeIndex === index }"
        @click="onSelect(index)"
      >
        <div class="cursor-pointer">{{ title }} {{ item.product }}</div>
      </div>
    </div>
  </div>
</template>
