<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
</script>

<template>
  <div class="flex flex-col min-h-[100vh]">
    <RouterView />
    <Toaster />
  </div>
</template>
