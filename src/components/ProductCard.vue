<script setup lang="ts">
import { reactive } from 'vue';
import { clothSizes } from '~/static/product-info';
import { formatCurrencyToLocaleString } from '~/utils/formatValues';

interface Props {
  product: {
    name: string
    description: string
    prices: number[]
    amount: number
    images: string[],
    options?: {
      availableColors?: string[],
      availableSizes?: string[],
    }
  }
}

const props = defineProps<Props>()
const emit = defineEmits(['handleBuy', 'addToCart'])

const choosedOptions = reactive({
  colorIndex: 0,
  size: '',
})

function handleColor(color: number) {
  choosedOptions.colorIndex = color;
}

function handleSize(size: string) {
  if (!props.product.options?.availableSizes?.includes(size)) {
    return
  }
  choosedOptions.size = size;
}
</script>

<template>
  <div class="card w-[20rem] glass">
    <figure>
      <Image
        :src="choosedOptions.colorIndex
          ?
          product.images[choosedOptions.colorIndex]
          :
          product.images[0]
        "
        :alt="product.name"
        class="object-fill h-[16rem] w-full"
      />
    </figure>
    <div class="absolute right-2 inset-y-[14rem]">
      <Badge>
        {{ product.amount }} unidades disponíveis
      </Badge>
    </div>
    <div class="card-body">
      <h2 class="card-title capitalize text-2xl">
        {{ product.name }}
      </h2>
      {{ product.description }}
      <div
        v-if="product.options?.availableColors"
      >
        <span
          class="font-bold"
        >
          Cores
        </span>
        <div
          class="flex gap-x-2 my-3"
        >
          <button
            v-for="(color, index) in product.options.availableColors"
            :key="index"
            :style="{
              'background-color': color
            }"
            :class="choosedOptions.colorIndex === index ? 'border-[0.2rem]' : ''"
            type="button"
            class="w-10 h-10 border rounded-full transition-all duration-100"
            @click="handleColor(index)"
          />
        </div>
      </div>
      <div
        v-if="product.options?.availableSizes"
        class="font-bold"
      >
        Tamanhos
        <div
          class="flex gap-x-1 my-3"
        >
          <button
            v-for="(size, index) in clothSizes"
            :key="index"
            :class="choosedOptions.size === size ? 'bg-primary text-white border-[0.2rem]' : ''"
            class="bg-neutral w-10 h-10 border rounded-full relative transition-all duration-100"
            type="button"
            @click="handleSize(size)"
          >
            {{ size }}
            <div
              v-if="!product.options.availableSizes.includes(size)"
              class="bg-red-500 h-[2.45rem] w-[0.2rem] absolute rotate-45 top-0 left-[18px]"
            />
            <div
              v-if="!product.options.availableSizes.includes(size)"
              class="bg-red-500 h-[2.45rem] w-[0.2rem] absolute -rotate-45 top-0 left-[18px]"
            />
          </button>
        </div>
      </div>
      <div class="flex justify-between my-3 font-bold text-xl">
        Valor
        <span class="transition duration-100">
            {{ formatCurrencyToLocaleString(product.prices[choosedOptions.colorIndex]) }}
        </span>
      </div>
      <div class="card-actions justify-start items-center mt-2">
        <Button
          @on-click="emit('handleBuy')"
        >
          <Icon
            icon="bx:money"
          />
          Comprar agora
        </Button>
        <Button
          class="btn-neutral"
          @on-click="emit('addToCart')"
        >
          <Icon
            icon="bx:cart-add"
          />
        </Button>
      </div>
    </div>
  </div>
</template>
