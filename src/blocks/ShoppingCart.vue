<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import Image from '@/components/Image.vue';
import NumberInput from '@/components/NumberInput.vue';
import { useUserStore } from '@/store/user';
import { formatCurrencyToLocaleString } from '@/utils/formatValues';
import { computed } from 'vue';

interface Props {
  cartVisibility: boolean
}

defineProps<Props>()

const emit = defineEmits(['toggle-shopping-cart'])
const userStore = useUserStore()

function removeItem(id: number) {
  console.log(`remover item ${id}`)
}

const cartItems = computed(() => {
  return userStore.$state.shoppingCart
})
</script>

<template>
  <aside
    v-if="cartVisibility"
    class="fixed top-0 right-0 px-5 z-40 w-full bg-black/50 h-screen mt-[6.5rem] transition-transform translate-x-0"
  >
    <div class="h-full w-1/3 bg-white max-w-[600px] absolute right-0 p-5 overflow-y-auto">
      <button
        class="flex items-center border-b border-slate-800/10 w-full pb-2 hover:text-slate-500 transition-all duration-150 mb-9"
        type="button"
        @click="emit('toggle-shopping-cart')"
      >
        <Icon
          icon="bx:chevron-left"
          width="1.5em"
        />
        Continue comprando
      </button>
      <div class="flex items-center justify-between">
        <h1
          class="text-xl font-bold"
        >
          Carrinho
        </h1>
        <span
          class="text-slate-400 text-sm"
        >
          {{ cartItems?.length ?? '0' }} items
        </span>
      </div>
      <div
        v-for="(item, index) in cartItems"
        :key="index"
        class="flex items-start justify-between m-2 my-4"
      >
        <Image
          :src="item.imageUrl"
          class="max-w-[90px] max-h-[90px]"
        />
        <div
          class="flex flex-col items-start w-[120px]"
        >
          <p
            class="font-bold truncate max-w-[120px]"
          >
            {{ item.name }}
          </p>
          <span
            class="text-sm text-slate-400 mt-3"
          >
            {{ item.id }}
          </span>
        </div>
        <NumberInput
          v-model="item.amount"
          class="max-w-[100px] -mt-4"
        />
        <span
          class="font-bold"
        >
          {{ formatCurrencyToLocaleString(item.price.total) }}
        </span>
        <button
          type="button"
          @click="removeItem(item.id)"
        >
          <Icon
            icon="bx:x"
            width="1.5em"
          />
        </button>
      </div>
      <div
        class="h-[200px]"
      />
    </div>
  </aside>
</template>
