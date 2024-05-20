<script setup lang="ts">
import { useImage } from '@vueuse/core'

interface Props {
  src: string
  alt?: string
  width?: number
  height?: number
  lazyLoad?: 'eager' | 'lazy'
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  lazyLoad: 'lazy',
})

const { isLoading } = useImage({
  src: props.src ?? '',
})
</script>

<template>
  <span v-if="isLoading">
    Loading
  </span>
  <img
    v-else
    v-bind="$attrs"
    :alt
    :title
    :src
    :loading="lazyLoad"
    :height
    :width
    class="h-auto w-full"
  >
</template>
