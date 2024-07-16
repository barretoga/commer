<script setup lang="ts">
import { navigationItems } from '@/static/navigation';
import Navigation from '@/components/Navigation.vue';
import Settings from '@/blocks/Settings.vue';
import Image from '@/components/Image.vue';
import Icon from '@/components/Icon.vue';

interface Props {
  menuVisibility: boolean
}

defineProps<Props>()
const emit = defineEmits(['toggleShoppingCart', 'toggleNotifications', 'toggleMenuVisibility'])
</script>

<template>
  <div class="fixed bg-white z-[60] top-0 gap-4 items-center mx-auto w-full mr-6">
    <div class="flex w-full justify-between items-center">
      <button
        class="transition-all duration-200 hover:text-slate-400 ml-4 sm:hidden block"
        type="button"
        @click="emit('toggleMenuVisibility')"
      >
        <Icon
          v-if="!menuVisibility"
          icon="bx:align-left"
          width="1.5em"
        />
        <Icon
          v-else
          icon="bx:x"
          width="1.5em"
        />
      </button>
      <Image
        class="object-center mt-1 object-scale-down w-full max-w-[150px] h-[100px]"
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
  </div>
</template>
