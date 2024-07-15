<script setup lang="ts">
import Icon from '@/components/Icon.vue';

const emit = defineEmits(['toggleShoppingCart', 'toggleNotifications'])
</script>

<template>
  <div class="flex items-center gap-10 mr-4">
    <button
      type="button"
      @click="emit('toggleNotifications')"
    >
      <Icon
        class="hover:text-slate-400 transition-all duration-300"
        width="1.5em"
        icon="bx:bell"
      />
    </button>
    <RouterLink
      to="/favorites"
    >
      <Icon
        class="hover:cursor-pointer hover:text-slate-400 transition-all duration-300"
        width="1.5em"
        icon="bx:heart"
      />
    </RouterLink>
    <button
      type="button"
      @click="emit('toggleShoppingCart')"
    >
      <Icon
        class="hover:text-slate-400 transition-all duration-300"
        width="1.5em"
        icon="bx:shopping-bag"
      />
    </button>
  </div>
</template>
