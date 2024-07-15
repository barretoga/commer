<script setup lang="ts">
import {
  Card as CnCard,
  CardContent
} from '@/components/ui/card'
</script>

<template>
  <CnCard>
    <CardContent
      class="flex aspect-square items-center justify-center"
    >
      <slot />
    </CardContent>
  </CnCard>
</template>
