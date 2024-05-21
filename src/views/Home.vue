<script setup lang="ts">
import { reactive, ref } from 'vue';

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

const seasons = ref([
  'https://s3.wasabisys.com/instax/74/instax/2022/08/fotografias-de-paisagens-1661176157.jpeg',
  'https://images.memphistours.com/large/1384dab11b121931eba246f2ef0a42ec.jpg',
  'https://s2-casavogue.glbimg.com/9lsEga4y46bwBpZeTvf3woNB2k4=/0x0:2121x1414/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d72fd4bf0af74c0c89d27a5a226dbbf8/internal_photos/bs/2023/z/m/php5y6Qieb0OBeoZhDeg/01-as-paisagens-naturais-mais-lindas-do-brasil-floresta-amazonica-min.jpg'
])
</script>

<template>
  <div class="max-h-[18rem] rounded-lg w-full mx-auto overflow-hidden mb-10">
    <Carousel
      :slides="seasons"
      :slides-per-view="1"
      space-between="30"
    />
  </div>
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
  <div
    class="divider my-5"
  />
</template>
