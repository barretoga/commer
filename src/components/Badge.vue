<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  classType?: 'primary' | 'secondary' | 'neutral' | 'accent' | 'ghost'
}

const props = withDefaults(defineProps<Props>(), {
  classType: 'primary'
})

const returnBadgeClass = computed(() => {
  return `badge-${props.classType}`
})
</script>

<template>
  <div
    class="badge"
    :classType="returnBadgeClass"
  >
    <slot />
  </div>
</template>