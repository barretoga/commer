<script setup lang="ts">
import Icon from '@/components/Icon.vue';

interface Props {
  cartVisibility: boolean
}

defineProps<Props>()

const emit = defineEmits(['toggleShoppingCart', 'toggleNotifications'])
</script>

<template>
  <div class="flex items-center gap-10 mr-4">
    <button
      type="button"
      class="sm:block hidden"
      @click="emit('toggleNotifications')"
    >
      <Icon
        class="hover:text-slate-400 transition-all duration-300"
        width="1.5em"
        icon="bx:bell"
      />
    </button>
    <RouterLink
      class="sm:block hidden"
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
        v-if="!cartVisibility"
        class="hover:text-slate-400 transition-all duration-300"
        width="1.5em"
        icon="bx:shopping-bag"
      />
      <Icon
          v-else
          class="hover:text-slate-400 transition-all duration-300"
          icon="bx:x"
          width="1.5em"
        />
    </button>
  </div>
</template>
