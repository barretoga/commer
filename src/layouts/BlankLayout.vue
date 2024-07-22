<script setup lang="ts">
import Footer from '@/blocks/Footer.vue';
import Header from '@/blocks/Header.vue';
import SideMenu from '@/blocks/SideMenu.vue';
import ShoppingCart from '@/blocks/ShoppingCart.vue'
import { ref } from 'vue';
import { navigationItems } from '@/static/navigation'

const menuVisibility = ref(false);
const cartVisibility = ref(false);

function toggleNotifications() {
  console.log('notifications')
}
</script>

<template>
  <div
    :class="{ 'overflow-hidden max-h-[70%]': menuVisibility }"
  >
    <Header
      :menu-visibility="menuVisibility"
      @toggle-notifications="toggleNotifications"
      @toggle-shopping-cart="cartVisibility = !cartVisibility"
      @toggle-menu-visibility="menuVisibility = !menuVisibility"
    />
    <main
      class="flex mx-auto xl:container h-full mt-[7rem]"
    >
      <SideMenu
        :menu-visibility
        :menu-items="navigationItems"
      />
      <RouterView />
      <ShoppingCart
        :cartVisibility
        @toggle-shopping-cart="cartVisibility = !cartVisibility"
      />
    </main>
    <Footer/>
  </div>
</template>
