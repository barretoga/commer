<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Props {
  src: string
  alt: string
  fallback: string
}

withDefaults(defineProps<Props>(), {
  fallback: 'Avatar'
})
</script>

<template>
  <Avatar>
    <AvatarImage
      :src
      :alt
    />
    <AvatarFallback>
      {{ fallback }}
    </AvatarFallback>
  </Avatar>
</template>
