<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { navigationItems } from '@/static/navigation';
import Settings from '@/blocks/Settings.vue';
import Image from '@/components/Image.vue';

const emit = defineEmits(['toggleShoppingCart', 'toggleNotifications'])
</script>

<template>
  <div class="flex justify-between gap-4 items-center mx-auto w-full pr-6">
    <Image
      class="my-auto object-center mt-1 object-scale-down w-[170px] h-[100px]"
      src="/logo-white.png"
    />
    <Navigation
      :items="navigationItems"
      class="md:block hidden"
    />
    <Settings
      @toggle-notifications="emit('toggleNotifications')"
      @toggle-shopping-cart="emit('toggleShoppingCart')"
    />
  </div>
</template>
