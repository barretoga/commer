<script setup lang="ts">
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  slidesPerView: number
  spaceBetween: string
  slides: string[]
}

defineProps<Props>()

const modules = [Autoplay, Navigation]

function onSwiper(swiper: any) {
  console.log(swiper)
}

function onSlideChange() {
  console.log('slide change')
}
</script>

<template>
  <swiper
    :slides-per-view
    :space-between
    :autoplay="{
      delay: 3500,
      disableOnInteraction: false,
    }"
    :modules
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide
      v-for="(slide, index) in slides"
      :key="index"
    >
      <Image
        :src="slide"
        class="w-full h-full"
      />
    </swiper-slide>
  </swiper>
</template>
