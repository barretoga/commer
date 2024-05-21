<script setup lang="ts">
import { MenuItem } from '~/models/Menu';

interface Props {
  menuItems: MenuItem[]
}

defineProps<Props>()
</script>

<template>
  <ul class="menu lg:menu-horizontal lg:m-0 m-5 bg-base-200 rounded-box lg:mb-20">
    <li
      v-for="item in menuItems"
      :key="item.path"
    >
      <a
        v-if="!item?.children"
        :href="item.path"
      >
        <Icon
          v-if="item.icon"
          :icon=item.icon
        />
        {{ item.name }}
      </a>
      <details
        v-else
      >
        <summary>
          <Icon
            v-if="item.icon"
            :icon=item.icon
          />
          {{ item.name }}
        </summary>
          <ul>
            <li
              v-for="childrenItem in item.children"
            >
              <a
                :href="childrenItem.path"
              >
                {{ childrenItem.name }}
              </a>
            </li>
          </ul>
      </details>
    </li>
  </ul>
</template>
