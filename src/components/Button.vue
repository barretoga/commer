<script setup lang="ts">
import { Button } from '@/components/ui/button'

interface Props {
  title?: string
  type?: 'submit' | 'button' | 'reset'
}

withDefaults(defineProps<Props>(),{
  type: 'submit'
})

const emit = defineEmits(['onClick'])
</script>

<template>
  <Button
    :type
    :title
    @click="emit('onClick')"
  >
    <slot />
  </Button>
</template>
