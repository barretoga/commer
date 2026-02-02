<script setup lang="ts">
import Footer from '@/blocks/Footer.vue';
import Header from '@/blocks/Header.vue';
import SideMenu from '@/blocks/SideMenu.vue';
import ShoppingCart from '@/blocks/ShoppingCart.vue'
import Notifications from '@/blocks/Notifications.vue'
import { ref } from 'vue';
import { navigationItems } from '@/static/navigation'

const menuVisibility = ref(false);
const cartVisibility = ref(false);
const notificationsVisibility = ref(false);
const notificationsRef = ref<InstanceType<typeof Notifications> | null>(null);

function handleCartVisibility() {
  if (menuVisibility.value) {
    menuVisibility.value = !menuVisibility.value
  }

  if (notificationsVisibility.value) {
    notificationsVisibility.value = !notificationsVisibility.value
  }

  cartVisibility.value = !cartVisibility.value
}

function handleMenuVisibility() {
  if (cartVisibility.value) {
    cartVisibility.value = !cartVisibility.value
  }

  if (notificationsVisibility.value) {
    notificationsVisibility.value = !notificationsVisibility.value
  }

  menuVisibility.value = !menuVisibility.value
}

function handleNotificationsVisibility() {
  if (menuVisibility.value) {
    menuVisibility.value = !menuVisibility.value
  }

  if (cartVisibility.value) {
    cartVisibility.value = !cartVisibility.value
  }

  notificationsVisibility.value = !notificationsVisibility.value
}
</script>

<template>
  <div
    :class="{ 'overflow-hidden': menuVisibility || cartVisibility || notificationsVisibility }"
  >
    <Header
      :menu-visibility
      :cart-visibility
      :unread-notifications="notificationsRef?.unreadCount"
      @toggle-shopping-cart="handleCartVisibility"
      @toggle-notifications="handleNotificationsVisibility"
      @toggle-menu-visibility="handleMenuVisibility"
    />
    <main
      class="block w-full h-full mt-[7rem] no-scrollbar relative"
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
      <Notifications
        ref="notificationsRef"
        :notificationsVisibility
        @toggle-notifications="handleNotificationsVisibility"
      />
    </main>
    <Footer/>
  </div>
</template>
