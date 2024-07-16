<script setup lang="ts">
import { Navigation } from '@/models/Navigation';
import Accordion from '@/components/Accordion.vue';

interface Props {
  menuVisibility: boolean
  menuItems: Navigation[]
}

defineProps<Props>()

const emit = defineEmits(['toggle-menu-visibility'])
</script>

<template>
  <aside
    v-if="menuVisibility"
    class="fixed top-0 left-0 px-5 z-40 w-full bg-white h-screen mt-[6rem] transition-transform sm:-translate-x-full translate-x-0"
  >
    <div class="h-full w-full bg-white">
      <ul>
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="font-semibold my-4"
        >
          <RouterLink
            v-if="!item.subitems"
            :to="item.to"
            class="hover:text-slate-400 transition-all duration-200"
          >
            {{ item.title }}
          </RouterLink>
          <Accordion
            v-else
          >
            <template #title>
              <p class="font-bold">
                {{ item.title }}
              </p>
            </template>
            <template #content>
              <ul>
                <li
                  v-for="(subitem, subindex) in item.subitems"
                  :key="subindex"
                  class="my-3"
                >
                  <RouterLink
                    :to="subitem.to"
                    class="hover:text-slate-400 transition-all duration-200"
                  >
                    {{ subitem.title }}
                  </RouterLink>
                </li>
              </ul>
            </template>
          </Accordion>
        </li>
      </ul>
    </div>
  </aside>
</template>
