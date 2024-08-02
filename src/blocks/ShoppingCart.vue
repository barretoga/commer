<script setup lang="ts">
import Form from '@/components/Form.vue';
import Icon from '@/components/Icon.vue';
import Image from '@/components/Image.vue';
import NumberInput from '@/components/NumberInput.vue';
import { FormField } from '@/components/ui/form';
import FormItem from '@/components/ui/form/FormItem.vue';
import { useUserStore } from '@/store/user';
import { formatCurrencyToLocaleString } from '@/utils/formatValues';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import Button from '@/components/Button.vue';

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

const formSchema = toTypedSchema(z.object({
  amount: z.number().min(1),
}))

const { setFieldValue } = useForm({
  validationSchema: formSchema,
})
</script>

<template>
  <aside
    v-if="cartVisibility"
    class="fixed top-0 right-0 px-5 z-40 w-full bg-black/50 h-full mt-[6.5rem] transition-transform translate-x-0"
  >
    <div class="h-full bg-white w-full sm:max-w-[600px] absolute right-0 p-5 overflow-y-auto">
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
          class="text-xl font-bold pl-2"
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
        class="flex relative sm:flex-row flex-col items-center sm:items-start justify-center sm:justify-between m-2 my-4 sm:pr-10"
      >
        <Image
          :src="item.imageUrl"
          class="max-h-[200px] object-contain sm:max-w-[90px] sm:max-h-[90px]"
        />
        <div
          class="flex flex-col items-start w-full sm:w-[120px] text-center sm:mt-0 mt-5"
        >
          <p
            class="font-bold truncate w-full sm:max-w-[120px]"
          >
            {{ item.name }}
          </p>
          <span
            class="text-sm sm:text-left w-full text-slate-400 mt-3"
          >
            COD: {{ item.id }}
          </span>
        </div>
        <Form>
          <FormField name="amount">
            <FormItem>
              <NumberInput
                v-model="item.amount"
                name="amount"
                class="max-w-[100px] mt-1 mb-2 sm:-mt-4"
                :min='0'
                @update:model-value="(v) => {
                  if (v) {
                    setFieldValue('amount', v)
                  }
                  else {
                    setFieldValue('amount', undefined)
                  }
                }"
              />
            </FormItem>
          </FormField>
        </Form>
        <span
          class="font-bold sm:mb-0 mb-4"
        >
          {{ formatCurrencyToLocaleString(item.price.total) }}
        </span>
        <button
          class="absolute right-0 -top-1 sm:-top-2 hover:text-slate-400 bg-slate-200 rounded-full hover:bg-slate-100 transition-all duration-150"
          type="button"
          @click="removeItem(item.id)"
        >
          <Icon
            icon="bx:x"
            width="1.5em"
          />
        </button>
      </div>
      <div class="my-4 bg-primary/90 h-16 rounded-md text-white flex items-center justify-center">
        <Icon
          icon="mdi-light:truck"
          width="1.5em"
          class="mr-2"
        />
        <p>
          Faltam
          <span>
            R$ 35,00
          </span>
          para o frete grátis!
        </p>
      </div>
      <div class="flex justify-between my-3 border-b border-slate-300 pb-2">
        <span class="text-md font-semibold">
          Subtotal:
        </span>
        <p class="text-md font-semibold">
          R$ 200,00
        </p>
      </div>
      <div class="flex justify-between mt-2 mb-4">
        <span class="text-xl font-semibold">
          Total:
        </span>
        <p class="text-xl font-semibold">
          R$ 200,00
        </p>
      </div>
      <div class="flex items-center justify-center">
        <span
          class="text-sm font-bold"
        >
          Taxas e fretes calculados no carrinho
        </span>
      </div>
      <Button
        class="w-full mt-4 mb-[10rem] sm:mb-0"
        title="Finalizar compra"
      >
        Ir para o checkout
      </Button>
    </div>
  </aside>
</template>
