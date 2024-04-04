<script setup lang="ts">
import {Icon as IconIconify} from '@iconify/vue'

interface Props {
  icon: string
  size?: string
}

withDefaults(defineProps<Props>(), {
  size: '1.5em'
})
</script>

<template>
  <IconIconify
    :icon
    :width="size"
  />
</template>
