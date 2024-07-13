<script setup lang="ts">
import Header from '@/blocks/Header.vue';

function toggleNotifications() {
  console.log('notifications')
}

function toggleShoppingCart() {
  console.log('shopping cart')
}
</script>

<template>
  <div>
    <Header
      @toggle-notifications="toggleNotifications"
      @toggle-shopping-cart="toggleShoppingCart"
    />
    <main class="mx-auto xl:container h-full">
      <RouterView />
    </main>
  </div>
</template>
