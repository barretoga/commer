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

function handleCartVisibility() {
  if (menuVisibility.value) {
    menuVisibility.value = !menuVisibility.value
  }

  cartVisibility.value = !cartVisibility.value
}

function handleMenuVisibility() {
  if (cartVisibility.value) {
    cartVisibility.value = !cartVisibility.value
  }

  menuVisibility.value = !menuVisibility.value
}
</script>

<template>
  <div
    :class="{ 'overflow-hidden': menuVisibility || cartVisibility }"
  >
    <Header
      :menu-visibility
      :cart-visibility
      @toggle-notifications="toggleNotifications"
      @toggle-shopping-cart="handleCartVisibility"
      @toggle-menu-visibility="handleMenuVisibility"
    />
    <main
      class="flex mx-auto xl:container h-full mt-[7rem] no-scrollbar"
    >
      <SideMenu
        :menu-visibility
        :menu-items="navigationItems"
      />
      <RouterView />
      <ShoppingCart
        :cartVisibility
        @toggle-shopping-cart="handleCartVisibility"
      />
    </main>
    <Footer/>
  </div>
</template>
