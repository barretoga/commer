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
          :to="item.to"
          :class="navigationMenuTriggerStyle()"
          class="hover:cursor-pointer"
        >
          <p class="font-bold">
            {{ item.title }}
          </p>
        </NavigationMenuLink>
        <NavigationMenuLink
          v-else
          :class="navigationMenuTriggerStyle()"
        >
          <NavigationMenuTrigger
            class="font-bold"
          >
            {{ item.title }}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-3">
              <li
                v-for="subitem in item.subitems"
                :key="subitem.title"
              >
                <NavigationMenuLink as-child>
                  <RouterLink
                    :to="subitem.to"
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    {{ subitem.title }}
                  </RouterLink>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
