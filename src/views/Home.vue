<script setup lang="ts">
import Carousel from '@/components/Carousel.vue';
import { highlights, products, tabs } from '@/static/home';
import Products from '@/views/Home/Products.vue';

</script>

<template>
  <div class="mx-auto">
    <div class="flex justify-center w-full">
      <Carousel
        :items="highlights"
        class="w-full md:min-w-[500px] lg:min-w-[800px] xl:min-w-[1000px]"
      />
    </div>
    <div
      class="w-full md:min-w-[500px] lg:min-w-[800px] xl:max-w-[1000px]"
    >
      <Products
        :tabs="tabs"
        :products="products"
      />
    </div>
  </div>
</template>
