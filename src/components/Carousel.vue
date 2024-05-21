<script setup lang="ts">
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';;

interface Props {
  slidesPerView: number
  spaceBetween: string
  slides: string[]
  autoPlay?: {
    delay: number
    disableOnInteraction: boolean
  } | undefined
}

withDefaults(defineProps<Props>(), {
  autoPlay: undefined
})

const emit = defineEmits(['slideChange', 'onSwiper'])
const modules = [Autoplay, Navigation]

function onSwiper() {
  emit('onSwiper')
}

function onSlideChange() {
  emit('slideChange')
}
</script>

<template>
  <swiper
    :slides-per-view
    :space-between
    :auto-play
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
