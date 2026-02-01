<script setup lang="ts">
import Form from "@/components/Form.vue";
import Icon from "@/components/Icon.vue";
import Image from "@/components/Image.vue";
import NumberInput from "@/components/NumberInput.vue";
import { FormField } from "@/components/ui/form";
import FormItem from "@/components/ui/form/FormItem.vue";
import { useUserStore } from "@/store/user";
import { formatCurrencyToLocaleString } from "@/utils/formatValues";
import { computed } from "vue";
import Button from "@/components/Button.vue";
import type { ShoppingCartItem } from "@/models/Product";

interface Props {
  cartVisibility: boolean;
}

defineProps<Props>();

const emit = defineEmits(["toggle-shopping-cart"]);
const userStore = useUserStore();

const FREE_SHIPPING_THRESHOLD = 200;

function removeItem(id: number) {
  const index = userStore.$state.shoppingCart.findIndex((item: ShoppingCartItem) => item.id === id);
  if (index !== -1) {
    userStore.$state.shoppingCart.splice(index, 1);
  }
}

function updateItemAmount(id: number, newAmount: number) {
  const item = userStore.$state.shoppingCart.find((item: ShoppingCartItem) => item.id === id);

  if (!item) return;

  if (newAmount <= 0) {
    removeItem(id);
  }

  if (newAmount <= item.stock) {
    item.amount = newAmount;
  }
}

const cartItems = computed(() => {
  return userStore.$state.shoppingCart;
});

const subtotal = computed(() => {
  return cartItems.value.reduce((acc: number, item: ShoppingCartItem) => {
    return acc + (item.price.total * item.amount);
  }, 0);
});

const total = computed(() => {
  return subtotal.value;
});

const amountForFreeShipping = computed(() => {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal.value;
  return remaining > 0 ? remaining : 0;
});

const hasFreeShipping = computed(() => {
  return subtotal.value >= FREE_SHIPPING_THRESHOLD;
});

const isCartEmpty = computed(() => {
  return cartItems.value.length === 0;
});
</script>

<template>
  <aside
    v-if="cartVisibility"
    class="fixed top-0 right-0 z-40 w-full bg-black/50 h-screen transition-transform translate-x-0"
    @click.self="emit('toggle-shopping-cart')"
  >
    <div
      class="h-screen bg-white w-full sm:max-w-[600px] absolute right-0 flex flex-col"
    >
      <div class="flex-shrink-0 p-5 border-b border-slate-200">
        <button
          class="flex items-center w-full pb-2 hover:text-slate-500 transition-all duration-150 mb-4"
          type="button"
          @click="emit('toggle-shopping-cart')"
        >
          <Icon icon="bx:chevron-left" width="1.5em" />
          Continue comprando
        </button>

        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold">Carrinho</h1>
          <span class="text-slate-400 text-sm">
            {{ cartItems?.length ?? 0 }} {{ cartItems?.length === 1 ? 'item' : 'itens' }}
          </span>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto px-5">
        <div v-if="isCartEmpty" class="flex flex-col items-center justify-center py-20">
          <Icon icon="mdi:cart-outline" width="5em" class="text-slate-300 mb-4" />
          <h2 class="text-xl font-semibold text-slate-600 mb-2">Seu carrinho está vazio</h2>
          <p class="text-slate-400 text-center mb-6">
            Adicione produtos ao seu carrinho para continuar comprando
          </p>
          <Button @click="emit('toggle-shopping-cart')">
            Explorar produtos
          </Button>
        </div>

        <div v-else class="py-4">
          <div
            v-for="(item, index) in cartItems"
            :key="index"
            class="flex relative sm:flex-row flex-col items-center sm:items-start justify-center sm:justify-between my-4 sm:pr-10 border-b border-slate-100 pb-4"
          >
            <Image
              :src="item.imageUrl"
              :alt="item.name"
              class="max-h-[200px] object-contain sm:max-w-[90px] sm:max-h-[90px] rounded-md"
            />

            <div
              class="flex flex-col items-start w-full sm:w-[150px] text-center sm:mt-0 mt-5"
            >
              <p class="font-bold truncate w-full sm:max-w-[150px] text-left">
                {{ item.name }}
              </p>
              <span class="text-xs sm:text-left w-full text-slate-400 mt-1">
                COD: {{ item.id }}
              </span>
              
              <div class="flex flex-col gap-1 mt-2 text-xs text-slate-600">
                <span v-if="item.details.size.length > 0">
                  Tamanho: <strong>{{ item.details.size[0] }}</strong>
                </span>
                <span v-if="item.details.color.length > 0">
                  Cor: <strong>{{ item.details.color[0] }}</strong>
                </span>
              </div>

              <span class="text-xs text-slate-400 mt-2">
                {{ item.stock }} em estoque
              </span>
            </div>
            <Form>
              <FormField name="amount">
                <FormItem>
                  <NumberInput
                    :model-value="item.amount"
                    name="amount"
                    class="max-w-[100px] mt-1 mb-2 sm:-mt-4"
                    :min="1"
                    :max="item.stock"
                    @update:model-value="(v: number) => {
                      if (v) {
                        updateItemAmount(item.id, v);
                      }
                    }"
                  />
                </FormItem>
              </FormField>
            </Form>

            <div class="flex flex-col items-end sm:mb-0 mb-4">
              <span class="font-bold text-lg">
                {{ formatCurrencyToLocaleString(item.price.total * item.amount) }}
              </span>
              <span class="text-xs text-slate-400">
                {{ item.amount }}x {{ formatCurrencyToLocaleString(item.price.total) }}
              </span>
            </div>

            <button
              class="absolute right-0 -top-1 sm:-top-2 hover:text-red-500 bg-slate-200 rounded-full hover:bg-red-50 transition-all duration-150 p-1"
              type="button"
              title="Remover item"
              @click="removeItem(item.id)"
            >
              <Icon icon="bx:x" width="1.5em" />
            </button>
          </div>

          <div
            v-if="!hasFreeShipping"
            class="my-6 bg-gradient-to-r from-primary/90 to-primary h-16 rounded-md text-white flex items-center justify-center px-4 shadow-md"
          >
            <Icon icon="mdi-light:truck" width="1.5em" class="mr-2 flex-shrink-0" />
            <p class="text-sm sm:text-base">
              Faltam
              <span class="font-bold">{{ formatCurrencyToLocaleString(amountForFreeShipping) }}</span>
              para o frete grátis!
            </p>
          </div>

          <div
            v-else
            class="my-6 bg-gradient-to-r from-green-500 to-green-600 h-16 rounded-md text-white flex items-center justify-center px-4 shadow-md"
          >
            <Icon icon="mdi:check-circle" width="1.5em" class="mr-2 flex-shrink-0" />
            <p class="text-sm sm:text-base font-semibold">
              Parabéns! Você ganhou frete grátis!
            </p>
          </div>
        </div>
      </div>

      <div v-if="!isCartEmpty" class="flex-shrink-0 border-t border-slate-200 bg-white p-5 shadow-lg">
        <div class="flex justify-between my-2 text-slate-600">
          <span class="text-md font-medium">Subtotal:</span>
          <p class="text-md font-semibold">{{ formatCurrencyToLocaleString(subtotal) }}</p>
        </div>

        <div class="flex justify-between my-2 text-slate-600">
          <span class="text-md font-medium">Frete:</span>
          <p class="text-md font-semibold">
            {{ hasFreeShipping ? 'Grátis' : 'A calcular' }}
          </p>
        </div>

        <div class="flex justify-between mt-3 mb-3 border-t border-slate-200 pt-3">
          <span class="text-xl font-bold">Total:</span>
          <p class="text-xl font-bold text-primary">{{ formatCurrencyToLocaleString(total) }}</p>
        </div>

        <div class="flex items-center justify-center mb-3">
          <span class="text-xs text-slate-500 text-center">
            Taxas e fretes serão calculados no checkout
          </span>
        </div>

        <Button 
          class="w-full bg-primary hover:bg-primary/90 transition-all duration-200" 
          title="Finalizar compra"
        >
          <Icon icon="mdi:lock" width="1.2em" class="mr-2" />
          Ir para o checkout
        </Button>

        <div class="grid grid-cols-3 gap-3 mt-4">
          <div class="flex items-center justify-center gap-1 text-xs text-slate-600">
            <Icon icon="mdi:shield-check" width="1.2em" class="text-green-600" />
            <span>Seguro</span>
          </div>
          <div class="flex items-center justify-center gap-1 text-xs text-slate-600">
            <Icon icon="mdi:truck-fast" width="1.2em" class="text-blue-600" />
            <span>Rápido</span>
          </div>
          <div class="flex items-center justify-center gap-1 text-xs text-slate-600">
            <Icon icon="mdi:swap-horizontal" width="1.2em" class="text-orange-600" />
            <span>Troca grátis</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
