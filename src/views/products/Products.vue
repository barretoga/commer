<script setup lang="ts">
import Image from '@/components/Image.vue';
import Rating from '@/components/Rating.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';
import { Product, ShoppingCartItem } from '@/models/Product';
import { formatCurrencyToLocaleString } from '@/utils/formatValues';
import { toast } from '@/utils/toast';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

interface Props {
  products: Product[]
  tabs?: {
    title: string,
    value: string
  }[]
}

const props = defineProps<Props>();

const router = useRouter();
const userStore = useUserStore();
const favorites = ref<number[]>([]);
const hoveredProduct = ref<number | null>(null);

const mensProducts = computed(() => 
  props.products.filter(p => 
    p.category === 'Roupas' && 
    (p.name.toLowerCase().includes('masculin') || 
     p.brand.toLowerCase().includes('men') ||
     ['Camisa Social', 'Suéter de Lã', 'Bermuda de Sarja'].includes(p.name))
  )
);

const womensProducts = computed(() => 
  props.products.filter(p => 
    p.category === 'Roupas' && 
    (p.name.toLowerCase().includes('feminin') || 
     ['Vestido Floral', 'Saia Plissada', 'Blazer Feminino', 'Macacão Feminino', 'Blusa de Tricô', 'Legging Fitness'].includes(p.name))
  )
);

const kidsProducts = computed(() => 
  props.products.filter(p => 
    p.category === 'Roupas' && 
    (p.name.toLowerCase().includes('infantil') || 
     p.name.toLowerCase().includes('criança'))
  )
);

const displayKidsProducts = computed(() => 
  kidsProducts.value.length > 0 ? kidsProducts.value : props.products.slice(0, 4)
);

const shouldShowTabs = computed(() => props.tabs && props.tabs.length > 0);
const hasMensProducts = computed(() => mensProducts.value.length > 0);
const hasWomensProducts = computed(() => womensProducts.value.length > 0);
const hasKidsProducts = computed(() => displayKidsProducts.value.length > 0);
const hasProducts = computed(() => props.products.length > 0);


function navigateToProduct(productId: number) {
  router.push(`/product/${productId}`);
}

function toggleFavorite(productId: number) {
  const index = favorites.value.indexOf(productId);
  
  if (index > -1) {
    favorites.value.splice(index, 1);
    return;
  }

  favorites.value.push(productId);
}

function isFavorite(productId: number): boolean {
  return favorites.value.includes(productId);
}

function addToCart(product: Product) {
  const existingItemInCart = userStore.$state.shoppingCart.find(
    (item: ShoppingCartItem) => item.id === product.id
  );

  const isProductAlreadyInCart = !!existingItemInCart;
  
  if (isProductAlreadyInCart) {
    const hasStockAvailable = existingItemInCart.amount < product.stock;
    
    if (!hasStockAvailable) {
      toast.warning('Estoque máximo atingido', product.name);
      return;
    }
    
    existingItemInCart.amount += 1;
    toast.success(`Quantidade atualizada para ${existingItemInCart.amount}`, product.name);
    return;
  }

  const newCartItem: ShoppingCartItem = {
    ...product,
    amount: 1
  };

  userStore.$state.shoppingCart.push(newCartItem);
  toast.success('Adicionado ao carrinho!', product.name);
}

function isLowStock(stock: number): boolean {
  return stock <= 10;
}
</script>

<template>
  <Tabs v-if="shouldShowTabs" default-value="mens" class="w-full">
    <TabsList class="grid w-full grid-cols-3 mb-8">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="font-bold"
      >
        {{ tab.title }}
      </TabsTrigger>
    </TabsList>

    <TabsContent value="mens">
      <div v-if="!hasMensProducts" class="text-center py-12 text-gray-500 dark:text-gray-400">
        Nenhum produto masculino disponível no momento.
      </div>
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        <div
          v-for="product in mensProducts"
          :key="product.id"
          class="group relative flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-gray-700 hover:border-primary/20 cursor-pointer"
          @mouseenter="hoveredProduct = product.id"
          @mouseleave="hoveredProduct = null"
          @click="navigateToProduct(product.id)"
        >
          <div class="relative overflow-hidden bg-slate-50 dark:bg-gray-700">
            <Image
              :src="product.imageUrl"
              :alt="product.name"
              class="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            <div class="absolute top-3 left-3 flex flex-col gap-2">
              <span
                v-if="product.rating >= 4.5"
                class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              >
                ⭐ Destaque
              </span>
              <span
                v-if="isLowStock(product.stock)"
                class="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse"
              >
                Últimas unidades!
              </span>
            </div>

            <button
              class="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-200 hover:scale-110"
              :class="isFavorite(product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'"
              @click.stop="toggleFavorite(product.id)"
            >
              <Icon 
                :icon="isFavorite(product.id) ? 'mdi:heart' : 'mdi:heart-outline'" 
                width="1.3em" 
              />
            </button>

            <div
              class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Button
                class="w-full bg-white text-primary hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
                @click.stop="addToCart(product)"
              >
                <Icon icon="mdi:cart-plus" width="1.2em" />
                Adicionar ao carrinho
              </Button>
            </div>
          </div>

          <div class="flex flex-col p-4 flex-grow">
            <div class="flex items-start justify-between mb-2">
              <h2 class="font-semibold text-slate-800 dark:text-white text-sm line-clamp-2 flex-grow pr-2">
                {{ product.name }}
              </h2>
            </div>

            <div class="flex items-center gap-2 mb-3">
              <Rating :rating="product.rating" class="scale-90 origin-left" />
              <span class="text-xs text-slate-500 dark:text-gray-400">
                ({{ product.reviews }})
              </span>
            </div>

            <p class="text-xs text-slate-500 dark:text-gray-400 mb-3 line-clamp-2">
              {{ product.description }}
            </p>

            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="(color, index) in product.details.color.slice(0, 3)"
                :key="index"
                class="text-xs bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2 py-1 rounded"
              >
                {{ color }}
              </span>
              <span
                v-if="product.details.color.length > 3"
                class="text-xs bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2 py-1 rounded"
              >
                +{{ product.details.color.length - 3 }}
              </span>
            </div>

            <div class="mt-auto">
              <div class="flex items-baseline gap-2 mb-1">
                <span class="text-xl font-bold text-primary">
                  {{ formatCurrencyToLocaleString(product.price.total) }}
                </span>
              </div>
              <span class="text-xs text-slate-500 dark:text-gray-400">
                ou {{ product.price.installments }}x de 
                <strong class="text-slate-700 dark:text-gray-300">
                  {{ formatCurrencyToLocaleString(product.price.installmentAmount) }}
                </strong>
              </span>
            </div>

            <div class="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-gray-400">
              <Icon icon="mdi:package-variant" width="1em" />
              <span>{{ product.stock }} em estoque</span>
            </div>
          </div>

          <div
            v-if="hoveredProduct === product.id"
            class="absolute inset-0 pointer-events-none border-2 border-primary/50 rounded-lg transition-all duration-300"
          />
        </div>
      </div>
    </TabsContent>

    <TabsContent value="womans">
      <div v-if="!hasWomensProducts" class="text-center py-12 text-gray-500 dark:text-gray-400">
        Nenhum produto feminino disponível no momento.
      </div>
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        <div
          v-for="product in womensProducts"
          :key="product.id"
          class="group relative flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-gray-700 hover:border-primary/20 cursor-pointer"
          @mouseenter="hoveredProduct = product.id"
          @mouseleave="hoveredProduct = null"
          @click="navigateToProduct(product.id)"
        >
          <div class="relative overflow-hidden bg-slate-50 dark:bg-gray-700">
            <Image
              :src="product.imageUrl"
              :alt="product.name"
              class="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            <div class="absolute top-3 left-3 flex flex-col gap-2">
              <span
                v-if="product.rating >= 4.5"
                class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              >
                ⭐ Destaque
              </span>
              <span
                v-if="isLowStock(product.stock)"
                class="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse"
              >
                Últimas unidades!
              </span>
            </div>

            <button
              class="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-200 hover:scale-110"
              :class="isFavorite(product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'"
              @click.stop="toggleFavorite(product.id)"
            >
              <Icon 
                :icon="isFavorite(product.id) ? 'mdi:heart' : 'mdi:heart-outline'" 
                width="1.3em" 
              />
            </button>

            <div
              class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Button
                class="w-full bg-white text-primary hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
                @click.stop="addToCart(product)"
              >
                <Icon icon="mdi:cart-plus" width="1.2em" />
                Adicionar ao carrinho
              </Button>
            </div>
          </div>

          <div class="flex flex-col p-4 flex-grow">
            <div class="flex items-start justify-between mb-2">
              <h2 class="font-semibold text-slate-800 dark:text-white text-sm line-clamp-2 flex-grow pr-2">
                {{ product.name }}
              </h2>
            </div>

            <div class="flex items-center gap-2 mb-3">
              <Rating :rating="product.rating" class="scale-90 origin-left" />
              <span class="text-xs text-slate-500 dark:text-gray-400">
                ({{ product.reviews }})
              </span>
            </div>

            <p class="text-xs text-slate-500 dark:text-gray-400 mb-3 line-clamp-2">
              {{ product.description }}
            </p>

            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="(color, index) in product.details.color.slice(0, 3)"
                :key="index"
                class="text-xs bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2 py-1 rounded"
              >
                {{ color }}
              </span>
              <span
                v-if="product.details.color.length > 3"
                class="text-xs bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2 py-1 rounded"
              >
                +{{ product.details.color.length - 3 }}
              </span>
            </div>

            <div class="mt-auto">
              <div class="flex items-baseline gap-2 mb-1">
                <span class="text-xl font-bold text-primary">
                  {{ formatCurrencyToLocaleString(product.price.total) }}
                </span>
              </div>
              <span class="text-xs text-slate-500 dark:text-gray-400">
                ou {{ product.price.installments }}x de 
                <strong class="text-slate-700 dark:text-gray-300">
                  {{ formatCurrencyToLocaleString(product.price.installmentAmount) }}
                </strong>
              </span>
            </div>

            <div class="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-gray-400">
              <Icon icon="mdi:package-variant" width="1em" />
              <span>{{ product.stock }} em estoque</span>
            </div>
          </div>

          <div
            v-if="hoveredProduct === product.id"
            class="absolute inset-0 pointer-events-none border-2 border-primary/50 rounded-lg transition-all duration-300"
          />
        </div>
      </div>
    </TabsContent>

    <TabsContent value="kids">
      <div v-if="!hasKidsProducts" class="text-center py-12 text-gray-500 dark:text-gray-400">
        Nenhum produto infantil disponível no momento.
      </div>
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        <div
          v-for="product in displayKidsProducts"
          :key="product.id"
          class="group relative flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-gray-700 hover:border-primary/20 cursor-pointer"
          @mouseenter="hoveredProduct = product.id"
          @mouseleave="hoveredProduct = null"
          @click="navigateToProduct(product.id)"
        >
          <div class="relative overflow-hidden bg-slate-50 dark:bg-gray-700">
            <Image
              :src="product.imageUrl"
              :alt="product.name"
              class="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            <div class="absolute top-3 left-3 flex flex-col gap-2">
              <span
                v-if="product.rating >= 4.5"
                class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              >
                ⭐ Destaque
              </span>
              <span
                v-if="isLowStock(product.stock)"
                class="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse"
              >
                Últimas unidades!
              </span>
            </div>

            <button
              class="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-200 hover:scale-110"
              :class="isFavorite(product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'"
              @click.stop="toggleFavorite(product.id)"
            >
              <Icon 
                :icon="isFavorite(product.id) ? 'mdi:heart' : 'mdi:heart-outline'" 
                width="1.3em" 
              />
            </button>

            <div
              class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Button
                class="w-full bg-white text-primary hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
                @click.stop="addToCart(product)"
              >
                <Icon icon="mdi:cart-plus" width="1.2em" />
                Adicionar ao carrinho
              </Button>
            </div>
          </div>

          <div class="flex flex-col p-4 flex-grow">
            <div class="flex items-start justify-between mb-2">
              <h2 class="font-semibold text-slate-800 dark:text-white text-sm line-clamp-2 flex-grow pr-2">
                {{ product.name }}
              </h2>
            </div>

            <div class="flex items-center gap-2 mb-3">
              <Rating :rating="product.rating" class="scale-90 origin-left" />
              <span class="text-xs text-slate-500 dark:text-gray-400">
                ({{ product.reviews }})
              </span>
            </div>

            <p class="text-xs text-slate-500 dark:text-gray-400 mb-3 line-clamp-2">
              {{ product.description }}
            </p>

            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="(color, index) in product.details.color.slice(0, 3)"
                :key="index"
                class="text-xs bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2 py-1 rounded"
              >
                {{ color }}
              </span>
              <span
                v-if="product.details.color.length > 3"
                class="text-xs bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2 py-1 rounded"
              >
                +{{ product.details.color.length - 3 }}
              </span>
            </div>

            <div class="mt-auto">
              <div class="flex items-baseline gap-2 mb-1">
                <span class="text-xl font-bold text-primary">
                  {{ formatCurrencyToLocaleString(product.price.total) }}
                </span>
              </div>
              <span class="text-xs text-slate-500 dark:text-gray-400">
                ou {{ product.price.installments }}x de 
                <strong class="text-slate-700 dark:text-gray-300">
                  {{ formatCurrencyToLocaleString(product.price.installmentAmount) }}
                </strong>
              </span>
            </div>

            <div class="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-gray-400">
              <Icon icon="mdi:package-variant" width="1em" />
              <span>{{ product.stock }} em estoque</span>
            </div>
          </div>

          <div
            v-if="hoveredProduct === product.id"
            class="absolute inset-0 pointer-events-none border-2 border-primary/50 rounded-lg transition-all duration-300"
          />
        </div>
      </div>
    </TabsContent>
  </Tabs>

  <div v-else class="w-full">
    <div v-if="!hasProducts" class="text-center py-12 text-gray-500 dark:text-gray-400">
      Nenhum produto disponível no momento.
    </div>
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="group relative flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-gray-700 hover:border-primary/20 cursor-pointer"
        @mouseenter="hoveredProduct = product.id"
        @mouseleave="hoveredProduct = null"
        @click="navigateToProduct(product.id)"
      >
        <div class="relative overflow-hidden bg-slate-50 dark:bg-gray-700">
          <Image
            :src="product.imageUrl"
            :alt="product.name"
            class="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          <div class="absolute top-3 left-3 flex flex-col gap-2">
            <span
              v-if="product.rating >= 4.5"
              class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
            >
              ⭐ Destaque
            </span>
            <span
              v-if="isLowStock(product.stock)"
              class="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse"
            >
              Últimas unidades!
            </span>
          </div>

          <button
            class="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-200 hover:scale-110"
            :class="isFavorite(product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'"
            @click.stop="toggleFavorite(product.id)"
          >
            <Icon 
              :icon="isFavorite(product.id) ? 'mdi:heart' : 'mdi:heart-outline'" 
              width="1.3em" 
            />
          </button>

          <div
            class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Button
              class="w-full bg-white text-primary hover:bg-primary hover:text-white transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
              @click.stop="addToCart(product)"
            >
              <Icon icon="mdi:cart-plus" width="1.2em" />
              Adicionar ao carrinho
            </Button>
          </div>
        </div>

        <div class="flex flex-col p-4 flex-grow">
          <div class="flex items-start justify-between mb-2">
            <h2 class="font-semibold text-slate-800 dark:text-white text-sm line-clamp-2 flex-grow pr-2">
              {{ product.name }}
            </h2>
          </div>

          <div class="flex items-center gap-2 mb-3">
            <Rating :rating="product.rating" class="scale-90 origin-left" />
            <span class="text-xs text-slate-500 dark:text-gray-400">
              ({{ product.reviews }})
            </span>
          </div>

          <p class="text-xs text-slate-500 dark:text-gray-400 mb-3 line-clamp-2">
            {{ product.description }}
          </p>

          <div class="flex flex-wrap gap-1 mb-3">
            <span
              v-for="(color, index) in product.details.color.slice(0, 3)"
              :key="index"
              class="text-xs bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2 py-1 rounded"
            >
              {{ color }}
            </span>
            <span
              v-if="product.details.color.length > 3"
              class="text-xs bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 px-2 py-1 rounded"
            >
              +{{ product.details.color.length - 3 }}
            </span>
          </div>

          <div class="mt-auto">
            <div class="flex items-baseline gap-2 mb-1">
              <span class="text-xl font-bold text-primary">
                {{ formatCurrencyToLocaleString(product.price.total) }}
              </span>
            </div>
            <span class="text-xs text-slate-500 dark:text-gray-400">
              ou {{ product.price.installments }}x de 
              <strong class="text-slate-700 dark:text-gray-300">
                {{ formatCurrencyToLocaleString(product.price.installmentAmount) }}
              </strong>
            </span>
          </div>

          <div class="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-gray-400">
            <Icon icon="mdi:package-variant" width="1em" />
            <span>{{ product.stock }} em estoque</span>
          </div>
        </div>

        <div
          v-if="hoveredProduct === product.id"
          class="absolute inset-0 pointer-events-none border-2 border-primary/50 rounded-lg transition-all duration-300"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
