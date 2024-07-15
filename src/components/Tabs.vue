<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { computed } from 'vue';

interface Props {
  items: {
    title: string
    value: string
  }[]
}

const props = defineProps<Props>()

const returnGridColsValue = computed(() => {
  return `grid-cols-${props.items.length}`
})
</script>

<template>
  <Tabs class="w-[400px] ">
    <TabsList 
      class="grid w-full"
      :class="returnGridColsValue"
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