<script setup lang="ts">
interface Props {
  type?: 'submit' | 'button' | 'reset'
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  classType: 'primary'
})

const emit = defineEmits(['onClick'])
</script>

<template>
  <button
    class="btn btn-primary"
    :type
    @click="emit('onClick')"
  >
    <slot />
  </button>
</template>
