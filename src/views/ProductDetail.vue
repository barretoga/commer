<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Image from '@/components/Image.vue';
import Rating from '@/components/Rating.vue';
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';
import { Product, ShoppingCartItem } from '@/models/Product';
import { formatCurrencyToLocaleString } from '@/utils/formatValues';
import { toast } from '@/utils/toast';
import { useUserStore } from '@/store/user';
import { products } from '@/static/home';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const product = ref<Product | null>(null);
const selectedSize = ref<string>('');
const selectedColor = ref<string>('');
const selectedImage = ref<string>('');
const quantity = ref<number>(1);
const activeTab = ref<'description' | 'details' | 'reviews'>('description');
const isFavorite = ref<boolean>(false);

const imageGallery = computed(() => {
  if (!product.value) return [];
  return [
    product.value.imageUrl,
    product.value.imageUrl,
    product.value.imageUrl,
    product.value.imageUrl,
  ];
});

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return products
    .filter(p => p.category === product.value?.category && p.id !== product.value?.id)
    .slice(0, 4);
});

const reviews = [
  {
    id: 1,
    author: 'Maria Silva',
    rating: 5,
    date: '15/01/2026',
    comment: 'Produto excelente! A qualidade superou minhas expectativas. O tecido é muito confortável e o caimento é perfeito.',
    verified: true
  },
  {
    id: 2,
    author: 'João Santos',
    rating: 4,
    date: '10/01/2026',
    comment: 'Muito bom! Apenas achei que poderia ter mais opções de cores.',
    verified: true
  },
  {
    id: 3,
    author: 'Ana Costa',
    rating: 5,
    date: '05/01/2026',
    comment: 'Adorei! Já é a segunda vez que compro. Recomendo muito!',
    verified: true
  }
];

onMounted(() => {
  const productId = parseInt(route.params.id as string);
  const foundProduct = products.find(p => p.id === productId);
  
  if (!foundProduct) {
    router.push('/');
    return;
  }
  
  product.value = foundProduct;
  selectedImage.value = foundProduct.imageUrl;
  
  if (foundProduct.details.size.length > 0) {
    selectedSize.value = foundProduct.details.size[0];
  }
  if (foundProduct.details.color.length > 0) {
    selectedColor.value = foundProduct.details.color[0];
  }
});

function selectImage(image: string) {
  selectedImage.value = image;
}

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
  toast.success(
    isFavorite.value ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!',
    product.value?.name || ''
  );
}

function incrementQuantity() {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++;
    return;
  }

  toast.warning('Estoque máximo atingido', product.value?.name || '');
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function addToCart() {
  if (!product.value) return;
  
  if (!selectedSize.value) {
    toast.error('Selecione um tamanho', 'Atenção');
    return;
  }
  
  if (!selectedColor.value) {
    toast.error('Selecione uma cor', 'Atenção');
    return;
  }
  
  const existingItemInCart = userStore.$state.shoppingCart.find(
    (item: ShoppingCartItem) => item.id === product.value!.id
  );
  
  if (existingItemInCart) {
    const newAmount = existingItemInCart.amount + quantity.value;
    
    if (newAmount > product.value.stock) {
      toast.warning('Estoque insuficiente', product.value.name);
      return;
    }
    
    existingItemInCart.amount = newAmount;
    toast.success(`Quantidade atualizada para ${newAmount}`, product.value.name);
  } else {
    const newCartItem: ShoppingCartItem = {
      ...product.value,
      amount: quantity.value
    };
    
    userStore.$state.shoppingCart.push(newCartItem);
    toast.success(`${quantity.value} ${quantity.value > 1 ? 'itens adicionados' : 'item adicionado'} ao carrinho!`, product.value.name);
  }
  
  // Reset quantity
  quantity.value = 1;
}

function buyNow() {
  addToCart();
  // Aqui você pode redirecionar para o checkout
  toast.info('Redirecionando para o checkout...', '');
}

function navigateToProduct(productId: number) {
  router.push(`/product/${productId}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const averageRating = computed(() => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return parseFloat((sum / reviews.length).toFixed(1));
});

const ratingDistribution = computed(() => {
  const distribution = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    distribution[review.rating - 1]++;
  });
  return distribution.reverse();
});
</script>

<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 py-8">
    <nav class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
      <RouterLink to="/" class="hover:text-primary transition-colors">Home</RouterLink>
      <Icon icon="mdi:chevron-right" width="1em" />
      <RouterLink to="/" class="hover:text-primary transition-colors">{{ product.category }}</RouterLink>
      <Icon icon="mdi:chevron-right" width="1em" />
      <span class="text-gray-900 dark:text-white font-medium">{{ product.name }}</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div class="space-y-4">
        <div class="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl">
          <Image
            :src="selectedImage"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          
          <div class="absolute top-4 left-4 flex flex-col gap-2">
            <span
              v-if="product.rating >= 4.5"
              class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
            >
              ⭐ Destaque
            </span>
            <span
              v-if="product.stock <= 10"
              class="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse"
            >
              Últimas unidades!
            </span>
          </div>

          <button
            class="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-200 hover:scale-110"
            :class="isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
            @click="toggleFavorite"
          >
            <Icon 
              :icon="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" 
              width="1.5em" 
            />
          </button>
        </div>

        <div class="grid grid-cols-4 gap-3">
          <button
            v-for="(image, index) in imageGallery"
            :key="index"
            @click="selectImage(image)"
            class="aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105"
            :class="selectedImage === image ? 'border-primary shadow-lg' : 'border-gray-200 dark:border-gray-700'"
          >
            <Image
              :src="image"
              :alt="`${product.name} - ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <p class="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            {{ product.brand }}
          </p>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {{ product.name }}
          </h1>
          
          <div class="flex items-center gap-3 mb-4">
            <Rating :rating="product.rating" class="scale-110" />
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ product.rating }} ({{ product.reviews }} avaliações)
            </span>
          </div>
        </div>

        <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
          <div class="flex items-baseline gap-3 mb-2">
            <span class="text-4xl font-bold text-primary">
              {{ formatCurrencyToLocaleString(product.price.total) }}
            </span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            ou {{ product.price.installments }}x de 
            <strong class="text-gray-900 dark:text-white">
              {{ formatCurrencyToLocaleString(product.price.installmentAmount) }}
            </strong>
            sem juros
          </p>
        </div>

        <div>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Tamanho: <span class="text-primary">{{ selectedSize }}</span>
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in product.details.size"
              :key="size"
              @click="selectedSize = size"
              class="px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 hover:scale-105"
              :class="selectedSize === size 
                ? 'border-primary bg-primary text-white shadow-lg' 
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary'"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Cor: <span class="text-primary">{{ selectedColor }}</span>
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="color in product.details.color"
              :key="color"
              @click="selectedColor = color"
              class="px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 hover:scale-105"
              :class="selectedColor === color 
                ? 'border-primary bg-primary text-white shadow-lg' 
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary'"
            >
              {{ color }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Quantidade
          </label>
          <div class="flex items-center gap-4">
            <div class="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                @click="decrementQuantity"
                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                :disabled="quantity <= 1"
              >
                <Icon icon="mdi:minus" width="1.2em" />
              </button>
              <span class="px-6 py-2 font-semibold text-gray-900 dark:text-white">
                {{ quantity }}
              </span>
              <button
                @click="incrementQuantity"
                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                :disabled="quantity >= product.stock"
              >
                <Icon icon="mdi:plus" width="1.2em" />
              </button>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ product.stock }} disponíveis
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            @click="addToCart"
            class="flex-1 bg-primary text-white hover:bg-primary/90 py-4 text-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Icon icon="mdi:cart-plus" width="1.5em" />
            Adicionar ao Carrinho
          </Button>
          <Button
            @click="buyNow"
            class="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 py-4 text-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Icon icon="mdi:lightning-bolt" width="1.5em" />
            Comprar Agora
          </Button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 text-sm">
            <Icon icon="mdi:truck-fast" width="1.5em" class="text-primary" />
            <span class="text-gray-700 dark:text-gray-300">Frete grátis acima de R$ 199</span>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <Icon icon="mdi:swap-horizontal" width="1.5em" class="text-primary" />
            <span class="text-gray-700 dark:text-gray-300">Primeira troca grátis</span>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <Icon icon="mdi:shield-check" width="1.5em" class="text-primary" />
            <span class="text-gray-700 dark:text-gray-300">Compra 100% segura</span>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <Icon icon="mdi:package-variant" width="1.5em" class="text-primary" />
            <span class="text-gray-700 dark:text-gray-300">Entrega em até 7 dias</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-16">
      <div class="border-b border-gray-200 dark:border-gray-700 mb-8">
        <div class="flex gap-8">
          <button
            @click="activeTab = 'description'"
            class="pb-4 px-2 font-semibold transition-all duration-200 border-b-2"
            :class="activeTab === 'description' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
          >
            Descrição
          </button>
          <button
            @click="activeTab = 'details'"
            class="pb-4 px-2 font-semibold transition-all duration-200 border-b-2"
            :class="activeTab === 'details' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
          >
            Detalhes
          </button>
          <button
            @click="activeTab = 'reviews'"
            class="pb-4 px-2 font-semibold transition-all duration-200 border-b-2"
            :class="activeTab === 'reviews' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
          >
            Avaliações ({{ reviews.length }})
          </button>
        </div>
      </div>

      <div class="prose prose-lg dark:prose-invert max-w-none">
        <div v-if="activeTab === 'description'" class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ product.description }}
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Este produto foi cuidadosamente selecionado para oferecer o máximo de conforto e estilo. 
            Perfeito para diversas ocasiões, combina qualidade premium com design moderno.
          </p>
        </div>

        <div v-if="activeTab === 'details'" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Especificações</h3>
              <dl class="space-y-2">
                <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <dt class="text-gray-600 dark:text-gray-400">Material:</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ product.details.material }}</dd>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <dt class="text-gray-600 dark:text-gray-400">Marca:</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ product.brand }}</dd>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <dt class="text-gray-600 dark:text-gray-400">Categoria:</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ product.category }}</dd>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <dt class="text-gray-600 dark:text-gray-400">Tamanhos:</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ product.details.size.join(', ') }}</dd>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <dt class="text-gray-600 dark:text-gray-400">Cores:</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ product.details.color.join(', ') }}</dd>
                </div>
              </dl>
            </div>
            <div v-if="product.details.careInstructions">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Cuidados</h3>
              <p class="text-gray-700 dark:text-gray-300">{{ product.details.careInstructions }}</p>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'reviews'" class="space-y-8">
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="text-center">
                <div class="text-5xl font-bold text-primary mb-2">{{ averageRating }}</div>
                <Rating :rating="averageRating" class="justify-center mb-2" />
                <p class="text-sm text-gray-600 dark:text-gray-400">Baseado em {{ reviews.length }} avaliações</p>
              </div>
              <div class="space-y-2">
                <div v-for="(count, index) in ratingDistribution" :key="index" class="flex items-center gap-3">
                  <span class="text-sm text-gray-600 dark:text-gray-400 w-12">{{ 5 - Number(index) }} ⭐</span>
                  <div class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      class="bg-primary h-2 rounded-full transition-all duration-500"
                      :style="{ width: `${(count / reviews.length) * 100}%` }"
                    />
                  </div>
                  <span class="text-sm text-gray-600 dark:text-gray-400 w-8">{{ count }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div class="flex items-start justify-between mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <h4 class="font-semibold text-gray-900 dark:text-white">{{ review.author }}</h4>
                    <span v-if="review.verified" class="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                      <Icon icon="mdi:check-circle" width="1em" />
                      Compra verificada
                    </span>
                  </div>
                  <Rating :rating="review.rating" class="scale-90 origin-left" />
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ review.date }}</span>
              </div>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="relatedProducts.length > 0">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Produtos Relacionados
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.id"
          @click="navigateToProduct(relatedProduct.id)"
          class="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary/20"
        >
          <div class="relative overflow-hidden bg-gray-50 dark:bg-gray-700">
            <Image
              :src="relatedProduct.imageUrl"
              :alt="relatedProduct.name"
              class="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-800 dark:text-white text-sm line-clamp-2 mb-2">
              {{ relatedProduct.name }}
            </h3>
            <div class="flex items-center gap-2 mb-2">
              <Rating :rating="relatedProduct.rating" class="scale-75 origin-left" />
              <span class="text-xs text-gray-500 dark:text-gray-400">
                ({{ relatedProduct.reviews }})
              </span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-lg font-bold text-primary">
                {{ formatCurrencyToLocaleString(relatedProduct.price.total) }}
              </span>
            </div>
          </div>
        </div>
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

.prose {
  max-width: 100%;
}
</style>
