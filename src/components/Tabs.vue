<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Props {
  items: {
    title: string
    value: string
  }[]
}

const props = defineProps<Props>()
</script>

<template>
  <Tabs
    v-if="props.items.length"
    class="w-full"
  >
    <TabsList 
      class="grid w-full sm:grid-cols-3 h-full"
    >
      <TabsTrigger
        v-for="item in items"
        :key="item.title"
        :value="item.value"
      >
        <p class="font-bold">
          {{ item.title }}
        </p>
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>