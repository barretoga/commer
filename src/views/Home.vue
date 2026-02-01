<script setup lang="ts">
import Carousel from '@/components/Carousel.vue';
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';
import { highlights, products, tabs } from '@/static/home';
import Products from '@/views/Home/Products.vue';

const categories = [
  {
    title: 'Masculino',
    description: 'Estilo e conforto',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/products/clothing/man',
    color: 'from-blue-500/80 to-blue-700/80'
  },
  {
    title: 'Feminino',
    description: 'Elegância e sofisticação',
    image: 'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/products/clothing/woman',
    color: 'from-pink-500/80 to-pink-700/80'
  },
  {
    title: 'Infantil',
    description: 'Diversão e praticidade',
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/products/clothing/kids',
    color: 'from-purple-500/80 to-purple-700/80'
  },
  {
    title: 'Acessórios',
    description: 'Complete seu look',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: '/products/accessories',
    color: 'from-amber-500/80 to-amber-700/80'
  }
];

const benefits = [
  {
    icon: 'mdi:truck-fast',
    title: 'Frete Grátis',
    description: 'Em compras acima de R$ 199',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    icon: 'mdi:shield-check',
    title: 'Compra Segura',
    description: 'Proteção em todo o processo',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    icon: 'mdi:swap-horizontal',
    title: 'Troca Fácil',
    description: 'Primeira troca grátis',
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    icon: 'mdi:credit-card-outline',
    title: 'Parcele em até 10x',
    description: 'Sem juros no cartão',
    color: 'text-orange-600 dark:text-orange-400'
  }
];

const collections = [
  {
    title: 'Nova Coleção',
    subtitle: 'Verão 2026',
    description: 'Descubra as últimas tendências da estação',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cta: 'Explorar Coleção',
    link: '/collections/summer-2026'
  },
  {
    title: 'Outlet',
    subtitle: 'Até 70% OFF',
    description: 'Peças selecionadas com descontos imperdíveis',
    image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cta: 'Ver Ofertas',
    link: '/outlet'
  }
];
</script>

<template>
  <div class="w-full">
    <section class="relative w-full mb-12">
      <div class="w-full max-w-[1400px] mx-auto">
        <Carousel
          :items="highlights"
          class="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-none md:rounded-2xl overflow-hidden shadow-2xl"
        />
      </div>
      
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="text-center text-white px-4 animate-fade-in">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl">
            Moda que Transforma
          </h1>
          <p class="text-lg md:text-xl lg:text-2xl mb-8 drop-shadow-lg">
            Descubra seu estilo único
          </p>
          <Button class="pointer-events-auto bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300">
            Explorar Agora
          </Button>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 mb-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div :class="benefit.color" class="flex-shrink-0">
              <Icon :icon="benefit.icon" width="2.5em" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
                {{ benefit.title }}
              </h3>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                {{ benefit.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 mb-16">
      <div class="text-center mb-10">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Compre por Categoria
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg">
          Encontre o que você procura
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <RouterLink
          v-for="(category, index) in categories"
          :key="index"
          :to="category.link"
          class="group relative h-[300px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
        >
          <img
            :src="category.image"
            :alt="category.title"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div :class="`absolute inset-0 bg-gradient-to-t ${category.color} group-hover:opacity-90 transition-opacity duration-300`" />
          <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <h3 class="text-2xl font-bold mb-2 transform group-hover:scale-110 transition-transform duration-300">
              {{ category.title }}
            </h3>
            <p class="text-sm opacity-90 mb-4">
              {{ category.description }}
            </p>
            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="text-sm font-semibold">Explorar</span>
              <Icon icon="mdi:arrow-right" width="1.2em" />
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 mb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(collection, index) in collections"
          :key="index"
          class="group relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
        >
          <img
            :src="collection.image"
            :alt="collection.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div class="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <span class="text-sm font-semibold uppercase tracking-wider mb-2 text-yellow-400">
              {{ collection.subtitle }}
            </span>
            <h3 class="text-3xl md:text-4xl font-bold mb-3">
              {{ collection.title }}
            </h3>
            <p class="text-gray-200 mb-6 max-w-md">
              {{ collection.description }}
            </p>
            <RouterLink
              :to="collection.link"
              class="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 w-fit"
            >
              {{ collection.cta }}
              <Icon icon="mdi:arrow-right" width="1.2em" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 mb-16">
      <div class="text-center mb-10">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Produtos em Destaque
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg">
          Selecionados especialmente para você
        </p>
      </div>
      
      <Products
        :tabs="tabs"
        :products="products"
      />
    </section>

    <section class="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 py-16 mb-16">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <Icon icon="mdi:email-outline" width="3em" class="text-white mx-auto mb-6" />
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Fique por Dentro das Novidades
        </h2>
        <p class="text-gray-300 text-lg mb-8">
          Receba em primeira mão lançamentos, ofertas exclusivas e dicas de estilo
        </p>
        <form class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Digite seu melhor e-mail"
            required
            class="flex-1 px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
          />
          <Button class="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 font-semibold whitespace-nowrap transform hover:scale-105 transition-all duration-300">
            Inscrever-se
          </Button>
        </form>
        <p class="text-gray-400 text-sm mt-4">
          Ao se inscrever, você concorda com nossa Política de Privacidade
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 mb-12">
      <div class="flex flex-wrap items-center justify-center gap-8 opacity-60">
        <div class="flex items-center gap-2">
          <Icon icon="mdi:shield-check" width="1.5em" class="text-green-600" />
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Site Seguro</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="mdi:lock" width="1.5em" class="text-blue-600" />
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Pagamento Protegido</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="mdi:star" width="1.5em" class="text-yellow-600" />
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Avaliação 4.8/5</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="mdi:account-group" width="1.5em" class="text-purple-600" />
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">+50mil Clientes</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>
