<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  type?: 'submit' | 'button' | 'reset'
  classType?: 'primary' | 'secondary' | 'neutral' | 'accent' | 'ghost' | 'link'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  classType: 'primary'
})

const emit = defineEmits(['onClick'])

const returnBtnClass = computed(() => {
  return `btn-${props.classType}`
})
</script>

<template>
  <button
    class="btn"
    :class="returnBtnClass"
    :type
    @click="emit('onClick')"
  >
    <slot />
  </button>
</template>
