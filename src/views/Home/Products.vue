<script setup lang="ts">
import Image from '@/components/Image.vue';
import Rating from '@/components/Rating.vue';
import Tabs from '@/components/Tabs.vue';
import { Product } from '@/models/Product';
import { formatCurrencyToLocaleString } from '@/utils/formatValues';

interface Props {
  tabs: {
    title: string,
    value: string
  }[]
  products: Product[]
}

defineProps<Props>()
</script>

<template>
  <div class="grid">
    <div class="flex mx-auto mt-5">
      <Tabs
        :items="tabs"
      />
    </div>
    <div
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="flex flex-col p-3 w-[236px] h-[376px] mx-auto hover:cursor-pointer"
      >
        <Image
          :src="product.imageUrl"
          class="max-h-[240px] w-[215px] object-fill mx-auto"
        />

        <Rating
          :rating="product.rating"
          class="my-2"
        />

        <h1>
          {{ product.name }}
        </h1>

        <div class="flex flex-col mt-4">
          <span class="font-bold">
            {{ formatCurrencyToLocaleString(product.price.total) }}
          </span>
          <span class="text-sm">
            ou {{ product.price.installments }}x de {{ formatCurrencyToLocaleString(product.price.installmentAmount) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>