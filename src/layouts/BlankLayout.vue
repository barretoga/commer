<script setup lang="ts">
import Footer from '~/blocks/Footer.vue'
import Navigation from '~/blocks/Navigation.vue';
import { menuItems } from '~/static/menu'


</script>

<template>
  <div class="grid mx-auto max-w-[1200px]">
    <div class="flex justify-between mt-5">
      <div>

      </div>
      <Navigation
        :menuItems="menuItems"
      />
      <div>

      </div>
    </div>
    <RouterView />
    <Footer />
  </div>
</template>
