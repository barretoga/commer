<script setup lang="ts">
interface Props {
  image: string
  class: string
}

defineProps<Props>()
</script>

<template>
  <div class="avatar">
    <div
      :class
      class="w-24 rounded-xl"
    >
      <Image
        :src="image"
      />
    </div>
  </div>
</template>
