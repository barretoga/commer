<script setup lang="ts">
import { reactive } from 'vue';

const product = reactive({
  name: "t-shirt",
  description: "basic t-shirt",
  prices: [
    34,
    38
  ],
  amount: 45,
  images: [
    'https://classicprep.com/cdn/shop/products/classic-preppy-Kellan-Short-Sleeve-Pocket-T-Shirt-Solid-Bright-White-Shirts-and-Tops-Bright-White-12-18M_2048x.jpg?v=1674716573',
    'https://media.amway.my/sys-master/images/he6/h65/8799006949406/XS_290228_2.jpg_amway-WF_Product_588Wx588H',
  ],
  options: {
    availableColors: ['#ffffff', '#346beb' ],
    availableSizes: ['M', 'P', 'G']
  }
})
</script>

<template>
  <div class="flex items-center">
    <Icon
      icon="fxemoji:fire"
    />
    <h1
      class="text-2xl mx-2"
    >
      Em alta
    </h1>
  </div>
  <div
    class="divider mb-10"
  />
  <div class="grid lg:grid-cols-3 gap-3 mx-5 lg:mx-2">
    <ProductCard
      :product="product"
    />
  </div>
</template>
