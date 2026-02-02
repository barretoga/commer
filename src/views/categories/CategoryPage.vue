<script setup lang="ts">
import { ref, computed } from 'vue';
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';
import Products from '@/views/products/Products.vue';
import { products } from '@/static/home';
import type { Product } from '@/models/Product';

interface Props {
  categoryTitle: string;
  categoryDescription: string;
  categoryImage: string;
  categoryFilter?: string;
}

const props = defineProps<Props>();

const selectedSizes = ref<string[]>([]);
const selectedColors = ref<string[]>([]);
const priceRange = ref<[number, number]>([0, 1000]);
const sortBy = ref('relevance');
const showFilters = ref(false);

const availableSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG', '36', '38', '40', '42', '44', '46'];
const availableColors = ['Preto', 'Branco', 'Azul', 'Vermelho', 'Verde', 'Amarelo', 'Rosa', 'Cinza', 'Bege'];

const sortOptions = [
  { label: 'Mais Relevantes', value: 'relevance' },
  { label: 'Menor Preço', value: 'price-asc' },
  { label: 'Maior Preço', value: 'price-desc' },
  { label: 'Mais Vendidos', value: 'bestsellers' },
  { label: 'Novidades', value: 'newest' },
  { label: 'Melhor Avaliação', value: 'rating' }
];

const filteredProducts = computed(() => {
  let filtered: Product[] = Array.from(products);

  if (selectedSizes.value.length > 0) {
    filtered = filtered.filter((product: Product) => 
      product.details.size.some((size: string) => selectedSizes.value.includes(size))
    );
  }

  if (selectedColors.value.length > 0) {
    filtered = filtered.filter((product: Product) =>
      product.details.color.some((color: string) => selectedColors.value.includes(color))
    );
  }

  filtered = filtered.filter((product: Product) =>
    product.price.total >= priceRange.value[0] && product.price.total <= priceRange.value[1]
  );

  switch (sortBy.value) {
    case 'price-asc':
      filtered.sort((a: Product, b: Product) => a.price.total - b.price.total);
      break;
    case 'price-desc':
      filtered.sort((a: Product, b: Product) => b.price.total - a.price.total);
      break;
    case 'rating':
      filtered.sort((a: Product, b: Product) => b.rating - a.rating);
      break;
    case 'bestsellers':
      filtered.sort((a: Product, b: Product) => b.reviews - a.reviews);
      break;
  }

  return filtered;
});

function toggleSize(size: string) {
  const index = selectedSizes.value.indexOf(size);
  if (index > -1) {
    selectedSizes.value.splice(index, 1);
  } else {
    selectedSizes.value.push(size);
  }
}

function toggleColor(color: string) {
  const index = selectedColors.value.indexOf(color);
  if (index > -1) {
    selectedColors.value.splice(index, 1);
  } else {
    selectedColors.value.push(color);
  }
}

function clearFilters() {
  selectedSizes.value = [];
  selectedColors.value = [];
  priceRange.value = [0, 1000];
  sortBy.value = 'relevance';
}

const hasActiveFilters = computed(() => {
  return selectedSizes.value.length > 0 || 
         selectedColors.value.length > 0 || 
         priceRange.value[0] > 0 || 
         priceRange.value[1] < 1000;
});
</script>

<template>
  <div class="w-full">
    <section class="relative w-full h-[300px] md:h-[400px] mb-8">
      <img
        :src="categoryImage"
        :alt="categoryTitle"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
          {{ categoryTitle }}
        </h1>
        <p class="text-lg md:text-xl drop-shadow-lg">
          {{ categoryDescription }}
        </p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 mb-6">
      <nav class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <RouterLink to="/" class="hover:text-gray-900 dark:hover:text-white transition-colors">
          Início
        </RouterLink>
        <Icon icon="mdi:chevron-right" width="1em" />
        <RouterLink to="/products" class="hover:text-gray-900 dark:hover:text-white transition-colors">
          Produtos
        </RouterLink>
        <Icon icon="mdi:chevron-right" width="1em" />
        <span class="text-gray-900 dark:text-white font-medium">{{ categoryTitle }}</span>
      </nav>
    </div>

    <div class="max-w-7xl mx-auto px-4 mb-16">
      <div class="flex flex-col lg:flex-row gap-8">
        <aside class="lg:w-64 flex-shrink-0">
          <Button
            @click="showFilters = !showFilters"
            class="lg:hidden w-full mb-4 flex items-center justify-between"
          >
            <span class="flex items-center gap-2">
              <Icon icon="mdi:filter-variant" width="1.2em" />
              Filtros
            </span>
            <Icon 
              :icon="showFilters ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
              width="1.2em" 
            />
          </Button>

          <div 
            :class="['lg:block', showFilters ? 'block' : 'hidden']"
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                Filtros
              </h2>
              <button
                v-if="hasActiveFilters"
                @click="clearFilters"
                class="text-sm text-primary hover:underline"
              >
                Limpar
              </button>
            </div>

            <div class="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Icon icon="mdi:ruler" width="1.2em" />
                Tamanho
              </h3>
              <div class="grid grid-cols-4 gap-2">
                <button
                  v-for="size in availableSizes"
                  :key="size"
                  @click="toggleSize(size)"
                  :class="[
                    'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    selectedSizes.includes(size)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <div class="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Icon icon="mdi:palette" width="1.2em" />
                Cor
              </h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in availableColors"
                  :key="color"
                  @click="toggleColor(color)"
                  :class="[
                    'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    selectedColors.includes(color)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  ]"
                >
                  {{ color }}
                </button>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Icon icon="mdi:currency-usd" width="1.2em" />
                Faixa de Preço
              </h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <input
                    v-model.number="priceRange[0]"
                    type="number"
                    min="0"
                    :max="priceRange[1]"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Mín"
                  />
                  <span class="text-gray-500">-</span>
                  <input
                    v-model.number="priceRange[1]"
                    type="number"
                    :min="priceRange[0]"
                    max="1000"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Máx"
                  />
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  R$ {{ priceRange[0] }} - R$ {{ priceRange[1] }}
                </p>
              </div>
            </div>

            <div v-if="hasActiveFilters" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p class="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Filtros Ativos:
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="size in selectedSizes"
                  :key="`size-${size}`"
                  class="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {{ size }}
                  <button @click="toggleSize(size)" class="hover:text-primary/70">
                    <Icon icon="mdi:close" width="0.8em" />
                  </button>
                </span>
                <span
                  v-for="color in selectedColors"
                  :key="`color-${color}`"
                  class="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {{ color }}
                  <button @click="toggleColor(color)" class="hover:text-primary/70">
                    <Icon icon="mdi:close" width="0.8em" />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </aside>

        <div class="flex-1">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <p class="text-gray-600 dark:text-gray-400">
              <span class="font-semibold text-gray-900 dark:text-white">{{ filteredProducts.length }}</span>
              {{ filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados' }}
            </p>

            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600 dark:text-gray-400">Ordenar por:</label>
              <select
                v-model="sortBy"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option
                  v-for="option in sortOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>

          <div v-if="filteredProducts.length > 0">
            <Products
              :products="filteredProducts"
            />
          </div>

          <div v-else class="flex flex-col items-center justify-center py-20">
            <Icon icon="mdi:package-variant-closed" width="5em" class="text-gray-300 mb-4" />
            <h3 class="text-xl font-semibold text-gray-600 mb-2">
              Nenhum produto encontrado
            </h3>
            <p class="text-gray-400 text-center mb-6">
              Tente ajustar os filtros para encontrar o que você procura
            </p>
            <Button @click="clearFilters">
              Limpar Filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
