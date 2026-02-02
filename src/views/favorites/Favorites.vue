<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';
import Image from '@/components/Image.vue';
import Rating from '@/components/Rating.vue';
import { Product } from '@/models/Product';
import { formatCurrencyToLocaleString } from '@/utils/formatValues';
import { toast } from '@/utils/toast';

const router = useRouter();

const favorites = ref<Product[]>([
  {
    id: 1,
    name: "Vestido Floral Primavera",
    description: "Vestido leve e elegante com estampa floral, perfeito para dias ensolarados.",
    price: {
      total: 189.99,
      installmentAmount: 31.67,
      installments: 6
    },
    category: "Roupas Femininas",
    brand: "Elegance",
    stock: 45,
    rating: 4.8,
    reviews: 156,
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
    details: {
      size: ["P", "M", "G", "GG"],
      color: ["Floral Rosa", "Floral Azul"],
      material: "Viscose",
      careInstructions: "Lavar à mão"
    }
  },
  {
    id: 2,
    name: "Blazer Masculino Slim",
    description: "Blazer slim fit em tecido premium, ideal para ocasiões formais.",
    price: {
      total: 349.99,
      installmentAmount: 58.33,
      installments: 6
    },
    category: "Roupas Masculinas",
    brand: "Executive",
    stock: 30,
    rating: 4.9,
    reviews: 203,
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=600&fit=crop",
    details: {
      size: ["P", "M", "G", "GG"],
      color: ["Preto", "Azul Marinho", "Cinza"],
      material: "Lã e Poliéster",
      careInstructions: "Lavar a seco"
    }
  },
  {
    id: 3,
    name: "Tênis Esportivo Premium",
    description: "Tênis de alta performance com tecnologia de amortecimento avançada.",
    price: {
      total: 299.99,
      installmentAmount: 49.99,
      installments: 6
    },
    category: "Calçados",
    brand: "SportMax",
    stock: 80,
    rating: 4.7,
    reviews: 342,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop",
    details: {
      size: ["38", "39", "40", "41", "42", "43"],
      color: ["Branco", "Preto", "Azul"],
      material: "Mesh e Sintético",
      careInstructions: "Limpar com pano úmido"
    }
  },
  {
    id: 4,
    name: "Bolsa de Couro Clássica",
    description: "Bolsa de couro legítimo com design atemporal e compartimentos práticos.",
    price: {
      total: 459.99,
      installmentAmount: 76.67,
      installments: 6
    },
    category: "Acessórios",
    brand: "LuxBags",
    stock: 25,
    rating: 4.9,
    reviews: 178,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop",
    details: {
      size: ["Único"],
      color: ["Marrom", "Preto", "Caramelo"],
      material: "Couro Legítimo",
      careInstructions: "Hidratar periodicamente"
    }
  }
]);

const selectedFilter = ref<'all' | 'clothing' | 'shoes' | 'accessories'>('all');

const filteredFavorites = computed(() => {
  if (selectedFilter.value === 'all') return favorites.value;
  
  const categoryMap: Record<'clothing' | 'shoes' | 'accessories', string[]> = {
    clothing: ['Roupas Femininas', 'Roupas Masculinas', 'Roupas Infantis'],
    shoes: ['Calçados'],
    accessories: ['Acessórios']
  };
  
  const categories = categoryMap[selectedFilter.value];
  return favorites.value.filter(product => 
    categories.includes(product.category)
  );
});

const hasFavorites = computed(() => favorites.value.length > 0);

const stats = computed(() => ({
  total: favorites.value.length,
  clothing: favorites.value.filter(p => p.category.includes('Roupas')).length,
  shoes: favorites.value.filter(p => p.category === 'Calçados').length,
  accessories: favorites.value.filter(p => p.category === 'Acessórios').length
}));

function removeFavorite(id: number) {
  const index = favorites.value.findIndex(p => p.id === id);
  if (index !== -1) {
    const product = favorites.value[index];
    favorites.value.splice(index, 1);
    toast.success(`${product.name} removido dos favoritos`, 'Removido');
  }
}

function addToCart(product: Product) {
  toast.success(`${product.name} adicionado ao carrinho!`, 'Sucesso');
}

function navigateToProduct(id: number) {
  router.push(`/product/${id}`);
}

function clearAllFavorites() {
  if (confirm('Tem certeza que deseja remover todos os favoritos?')) {
    favorites.value = [];
    toast.info('Todos os favoritos foram removidos', 'Lista limpa');
  }
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
    <section class="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto">
          <div class="flex items-center justify-center gap-3 mb-4">
            <Icon icon="mdi:heart" class="text-primary text-5xl" />
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Meus Favoritos
            </h1>
          </div>
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ hasFavorites ? `${stats.total} ${stats.total === 1 ? 'produto salvo' : 'produtos salvos'}` : 'Nenhum produto salvo ainda' }}
          </p>
        </div>
      </div>
    </section>

    <section v-if="hasFavorites" class="py-8 bg-gray-50 dark:bg-gray-800/50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex flex-wrap gap-4">
            <button
              @click="selectedFilter = 'all'"
              class="px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              :class="selectedFilter === 'all' 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              Todos ({{ stats.total }})
            </button>
            <button
              @click="selectedFilter = 'clothing'"
              class="px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              :class="selectedFilter === 'clothing' 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              Roupas ({{ stats.clothing }})
            </button>
            <button
              @click="selectedFilter = 'shoes'"
              class="px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              :class="selectedFilter === 'shoes' 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              Calçados ({{ stats.shoes }})
            </button>
            <button
              @click="selectedFilter = 'accessories'"
              class="px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              :class="selectedFilter === 'accessories' 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              Acessórios ({{ stats.accessories }})
            </button>
          </div>

          <Button
            variant="outline"
            class="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
            @click="clearAllFavorites"
          >
            <Icon icon="mdi:delete-outline" width="1.2em" class="mr-2" />
            Limpar tudo
          </Button>
        </div>
      </div>
    </section>

    <section class="py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4">
        <div v-if="!hasFavorites" class="flex flex-col items-center justify-center py-20">
          <Icon icon="mdi:heart-outline" width="8em" class="text-gray-300 dark:text-gray-600 mb-6" />
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Sua lista de favoritos está vazia
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md">
            Explore nossa coleção e adicione produtos aos favoritos clicando no ícone de coração
          </p>
          <Button
            class="bg-primary text-white hover:bg-primary/90 px-8 py-4 text-lg"
            @click="router.push('/')"
          >
            <Icon icon="mdi:shopping" width="1.5em" class="mr-2" />
            Explorar Produtos
          </Button>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredFavorites"
            :key="product.id"
            class="group relative flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/30"
          >
            <button
              class="absolute top-3 right-3 z-10 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group/btn"
              @click="removeFavorite(product.id)"
              title="Remover dos favoritos"
            >
              <Icon 
                icon="mdi:heart" 
                class="text-red-500 group-hover/btn:scale-110 transition-transform" 
                width="1.5em" 
              />
            </button>

            <div 
              class="relative aspect-[3/4] overflow-hidden cursor-pointer"
              @click="navigateToProduct(product.id)"
            >
              <Image
                :src="product.imageUrl"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              <div
                v-if="product.stock < 10"
                class="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full"
              >
                Últimas {{ product.stock }} unidades
              </div>
            </div>

            <div class="p-4 flex-1 flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold text-primary uppercase tracking-wide">
                  {{ product.brand }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {{ product.category }}
                </span>
              </div>

              <h3 
                class="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                @click="navigateToProduct(product.id)"
              >
                {{ product.name }}
              </h3>

              <div class="flex items-center gap-2 mb-3">
                <Rating :rating="product.rating" />
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  ({{ product.reviews }})
                </span>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {{ product.description }}
              </p>
              <div class="mt-auto">
                <div class="text-2xl font-bold text-primary mb-1">
                  {{ formatCurrencyToLocaleString(product.price.total) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  {{ product.price.installments }}x de {{ formatCurrencyToLocaleString(product.price.installmentAmount) }}
                </div>

                <div class="flex gap-2">
                  <Button
                    class="flex-1 bg-primary text-white hover:bg-primary/90"
                    @click="addToCart(product)"
                  >
                    <Icon icon="mdi:cart-plus" width="1.2em" class="mr-1" />
                    Adicionar
                  </Button>
                  <Button
                    variant="outline"
                    class="px-3"
                    @click="navigateToProduct(product.id)"
                    title="Ver detalhes"
                  >
                    <Icon icon="mdi:eye" width="1.2em" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          v-if="hasFavorites && filteredFavorites.length === 0" 
          class="flex flex-col items-center justify-center py-20"
        >
          <Icon icon="mdi:filter-off" width="6em" class="text-gray-300 dark:text-gray-600 mb-4" />
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Nenhum produto nesta categoria
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Tente selecionar outro filtro
          </p>
          <Button
            variant="outline"
            @click="selectedFilter = 'all'"
          >
            Ver todos os favoritos
          </Button>
        </div>
      </div>
    </section>

    <section v-if="hasFavorites" class="py-20 bg-gradient-to-br from-primary to-primary/80">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Continue Explorando
        </h2>
        <p class="text-xl text-white/90 mb-8">
          Descubra mais produtos incríveis para adicionar à sua lista
        </p>
        <Button
          class="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          @click="router.push('/')"
        >
          <Icon icon="mdi:shopping" width="1.5em" class="mr-2" />
          Ver Mais Produtos
        </Button>
      </div>
    </section>
  </div>
</template>
