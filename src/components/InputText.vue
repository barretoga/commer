<script setup lang="ts">

interface Props {
  name: string
  label: string
  placeholder?: string
  validation?: string
  disabled?: boolean
}

defineProps<Props>()
</script>

<template>
  <Formkit
    :name
    :label
    :placeholder
    :validation
    :disabled
    type="text"
  />
</template>
