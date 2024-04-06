<script setup lang="ts">
import { reactive } from 'vue';

const product = reactive({
  name: "tênis",
  description: "tênis de corrida",
  price: 15,
  amount: 45,
  image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  options: {
    colors: ['#eb4034', '#346beb' ],
    sizes: ['M', 'P', 'G']
  }
})
</script>

<template>
  <div class="grid lg:grid-cols-3 gap-3 mx-5 lg:mx-2">
    <ProductCard
      :product="product"
    />
  </div>
</template>
