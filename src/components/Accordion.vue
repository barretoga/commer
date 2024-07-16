<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
</script>

<template>
  <Accordion
    type="single"
    class="w-full"
    collapsible
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>
        <slot name="title" />
      </AccordionTrigger>
      <AccordionContent>
        <slot name="content" />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
