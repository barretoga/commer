<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import type { Navigation } from '@/models/Navigation';

interface Props {
  items: Navigation[]
}

defineProps<Props>()
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem
        v-for="item in items"
        :key="item.title"
      >
        <NavigationMenuLink
          v-if="!item.subitems"
          :href="item.href"
          :class="navigationMenuTriggerStyle()"
        >
          {{ item.title }}
        </NavigationMenuLink>
        <NavigationMenuLink
          v-else
          :class="navigationMenuTriggerStyle()"
        >
          <NavigationMenuTrigger>
            Produtos
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
              <li
                v-for="subitem in item.subitems"
                :key="subitem.title"
              >
                <NavigationMenuLink as-child>
                  <a
                    :href="subitem.href"
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    {{ subitem.title }}
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
