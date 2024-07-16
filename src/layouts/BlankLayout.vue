<script setup lang="ts">
import Footer from '@/blocks/Footer.vue';
import Header from '@/blocks/Header.vue';
import SideMenu from '@/blocks/SideMenu.vue';
import { ref } from 'vue';
import { navigationItems } from '@/static/navigation'

const menuVisibility = ref(false);

function toggleNotifications() {
  console.log('notifications')
}

function toggleShoppingCart() {
  console.log('shopping cart')
}
</script>

<template>
  <div
    :class="{ 'overflow-hidden max-h-[70%]': menuVisibility }"
  >
    <Header
      :menu-visibility="menuVisibility"
      @toggle-notifications="toggleNotifications"
      @toggle-shopping-cart="toggleShoppingCart"
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
    </main>
    <Footer/>
  </div>
</template>
