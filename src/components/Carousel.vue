<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Image from '@/components/Image.vue';
import Autoplay from 'embla-carousel-autoplay'
import { onMounted } from 'vue';

interface Props {
  items: {
    src: string
    alt?: string
    to?: string
  }[]
  autoplay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true
})
const plugin = Autoplay({
  delay: 3000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
})

onMounted(() => {
  if (!props.autoplay) {
    plugin.stop()
  }
})
</script>

<template>
  <Carousel
    class="relative w-full max-w-xs"
    :plugins="[plugin]"
    @mouseenter="plugin.stop"
    @mouseleave="[plugin.reset(), plugin.play()];"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(item, index) in items"
        :key="index"
        class="h-64"
      >
        <RouterLink
          :to="item.to"
          class="hover:cursor-pointer"
        >
          <Image
            :src="item.src"
            :alt="item.alt"
            class="w-full h-full object-cover"
          />
        </RouterLink>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
