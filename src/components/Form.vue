<script setup lang="ts">
import { useForm } from 'vee-validate'

const emit = defineEmits(['submit'])
const form = useForm()

const onSubmit = form.handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit="onSubmit">
    <slot />
  </form>
</template>
