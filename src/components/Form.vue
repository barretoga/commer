<script setup lang="ts">
interface Props {
  modelValue: Object
}

defineProps<Props>();
</script>

<template>
  <Formkit
    v-model="modelValue"
    :actions="false"
    type="form"
  >
    <slot />
  </Formkit>
</template>
