<script setup lang="ts">
import Footer from '~/blocks/Footer.vue'
import Navigation from '~/blocks/Navigation.vue';
import { menuItems } from '~/static/menu'


</script>

<template>
  <div class="grid mx-auto max-w-[1200px]">
    <div class="flex flex-row-reverse lg:flex-row justify-center lg:justify-between items-center lg:items-start mt-5">
      <Navigation
        :menuItems="menuItems"
      />
      <div>
        <!-- Profile photo goes here -->
      </div>
    </div>
    <RouterView />
    <Footer />
  </div>
</template>
