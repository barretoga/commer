<script setup lang="ts">
import { reactive } from 'vue'
import { menuItems } from '~/static/menu'
import Footer from '~/blocks/Footer.vue'
import Navigation from '~/blocks/Navigation.vue';

const user = reactive({
  image: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  name: 'Gabriel Barreto'
})
</script>

<template>
  <div class="grid mx-auto max-w-[1200px]">
    <div class="flex flex-row justify-center md:justify-between items-center md:items-start mt-5">
      <Navigation
        :menuItems="menuItems"
      />
      <div class="flex items-center gap-x-2">
        <span>
          {{ user.name }}
        </span>
        <Avatar
          :image="user.image"
          class="w-[3rem] border-primary border-2"
        />
      </div>
    </div>
    <RouterView />
    <Footer />
  </div>
</template>
