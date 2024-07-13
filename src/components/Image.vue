<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  title?: string
  lazyLoad?: 'eager' | 'lazy'
  width?: number
  height?: number
}

withDefaults(defineProps<Props>(), {
  lazyLoad: 'lazy',
})
</script>

<template>
  <img
    :loading="lazyLoad"
    :alt
    :title
    :src
    class="w-full"
  >
</template>