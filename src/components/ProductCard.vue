<script setup lang="ts">
import { formatCurrencyToLocaleString } from '~/utils/formatValues';

interface Props {
  product: {
    name: string
    description: string
    price: number
    amount: number
    image: string
    options?: {
      colors?: string[],
      sizes?: string[],
    }
  }
}

defineProps<Props>()

const emit = defineEmits(['handleBuy', 'addToCart'])
</script>

<template>
  <div class="card w-[27rem] glass">
    <figure>
      <img
        :src="product.image"
        :alt="product.name"
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
        v-if="product.options?.colors"
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
            v-for="(color, index) in product.options.colors"
            type="button"
            :key="index"
            :class="`bg-[${color}] w-10 h-10 border rounded-full`"
          />
        </div>
      </div>
      <div
        v-if="product.options?.sizes"
        class="font-bold"
      >
        Tamanhos
        <div
          class="flex gap-x-2 my-3"
        >
          <button
            v-for="(size, index) in product.options.sizes"
            type="button"
            :key="index"
            :class="`bg-neutral w-10 h-10 border rounded-full`"
          >
            {{ size }}
          </button>
        </div>
      </div>
      <div class="flex justify-between my-3 font-bold text-xl">
        Valor
        <span>
            {{ formatCurrencyToLocaleString(product.price) }}
        </span>
      </div>
      
      <div class="card-actions justify-start items-center mt-2">
        <Button
          class-type="secondary"
          @on-click="emit('addToCart')"
        >
          <Icon
            icon="bx:cart-add"
          />
          Adicionar ao carrinho
        </Button>
        <Button
          @on-click="emit('handleBuy')"
        >
          <Icon
            icon="bx:money"
          />
          Comprar agora
        </Button>
      </div>
    </div>
  </div>
</template>
