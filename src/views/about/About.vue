<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';

const stats = [
  { value: '10+', label: 'Anos de Experiência' },
  { value: '50k+', label: 'Clientes Satisfeitos' },
  { value: '100k+', label: 'Produtos Vendidos' },
  { value: '4.9', label: 'Avaliação Média' }
];

const values = [
  {
    icon: 'mdi:heart-outline',
    title: 'Paixão pela Moda',
    description: 'Acreditamos que a moda é uma forma de expressão pessoal e trabalhamos para oferecer peças que reflitam a personalidade única de cada cliente.'
  },
  {
    icon: 'mdi:leaf',
    title: 'Sustentabilidade',
    description: 'Comprometidos com práticas sustentáveis, desde a seleção de fornecedores até embalagens eco-friendly, cuidando do planeta para as futuras gerações.'
  },
  {
    icon: 'mdi:diamond-stone',
    title: 'Qualidade Premium',
    description: 'Selecionamos cuidadosamente cada produto, garantindo materiais de alta qualidade e acabamento impecável em todas as peças.'
  },
  {
    icon: 'mdi:account-heart',
    title: 'Atendimento Excepcional',
    description: 'Nossa equipe está sempre pronta para oferecer uma experiência de compra personalizada e suporte dedicado em cada etapa da jornada.'
  }
];

const team = [
  {
    name: 'Ana Silva',
    role: 'CEO & Fundadora',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    bio: 'Visionária por trás da marca, com 15 anos de experiência no mercado de moda.'
  },
  {
    name: 'Carlos Santos',
    role: 'Diretor Criativo',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    bio: 'Responsável pela curadoria de produtos e tendências que definem nosso estilo.'
  },
  {
    name: 'Marina Costa',
    role: 'Gerente de Sustentabilidade',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    bio: 'Lidera nossas iniciativas eco-friendly e parcerias com fornecedores sustentáveis.'
  },
  {
    name: 'Roberto Lima',
    role: 'Diretor de Experiência do Cliente',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Garante que cada cliente tenha uma experiência memorável e personalizada.'
  }
];

const milestones = [
  { year: '2014', title: 'Fundação', description: 'Nascimento da marca com uma pequena loja física' },
  { year: '2016', title: 'Expansão Digital', description: 'Lançamento da plataforma e-commerce' },
  { year: '2018', title: 'Certificação Sustentável', description: 'Primeira certificação de sustentabilidade' },
  { year: '2020', title: 'Crescimento Nacional', description: 'Expansão para todo o território nacional' },
  { year: '2022', title: 'Prêmio de Excelência', description: 'Reconhecimento como melhor e-commerce de moda' },
  { year: '2024', title: 'Inovação Contínua', description: 'Implementação de IA para experiência personalizada' }
];
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
    <section class="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Moda que Transforma Vidas
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Há mais de uma década, conectamos pessoas com seu estilo único através de moda consciente e de qualidade excepcional.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <Button class="bg-primary text-white hover:bg-primary/90 px-8 py-3">
              Nossa Coleção
            </Button>
            <Button class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary px-8 py-3">
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="text-center"
          >
            <div class="text-4xl md:text-5xl font-bold text-primary mb-2">
              {{ stat.value }}
            </div>
            <div class="text-gray-600 dark:text-gray-400 font-medium">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Nossa História
            </h2>
            <div class="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                Tudo começou em 2014, quando nossa fundadora Ana Silva percebeu uma lacuna no mercado: faltavam opções de moda que combinassem estilo, qualidade e consciência ambiental.
              </p>
              <p>
                Com uma visão clara e determinação inabalável, nasceu nossa marca. O que era uma pequena loja física se transformou em uma das principais plataformas de e-commerce de moda do país.
              </p>
              <p>
                Hoje, atendemos milhares de clientes em todo o Brasil, mantendo nosso compromisso original: oferecer moda que não apenas veste bem, mas que também faz bem para o mundo.
              </p>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop"
                alt="Nossa loja"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 dark:bg-primary/20 rounded-2xl -z-10" />
            <div class="absolute -top-6 -right-6 w-48 h-48 bg-primary/10 dark:bg-primary/20 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nossos Valores
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Princípios que guiam cada decisão e ação em nossa jornada
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(value, index) in values"
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-6">
              <Icon :icon="value.icon" class="text-primary text-3xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ value.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nossa Jornada
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Marcos importantes que moldaram quem somos hoje
          </p>
        </div>

        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 hidden md:block" />
          
          <div class="space-y-12">
            <div
              v-for="(milestone, index) in milestones"
              :key="index"
              class="relative"
            >
              <div
                class="flex flex-col md:flex-row items-center gap-8"
                :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
              >
                <div class="flex-1 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div class="text-2xl font-bold text-primary mb-2">
                    {{ milestone.year }}
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {{ milestone.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ milestone.description }}
                  </p>
                </div>

                <div class="hidden md:block w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10" />

                <div class="flex-1 hidden md:block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Conheça Nossa Equipe
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            As pessoas apaixonadas que tornam tudo possível
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(member, index) in team"
            :key="index"
            class="group"
          >
            <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div class="aspect-square overflow-hidden">
                <img
                  :src="member.image"
                  :alt="member.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {{ member.name }}
                </h3>
                <div class="text-primary font-semibold mb-3">
                  {{ member.role }}
                </div>
                <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {{ member.bio }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">
          Faça Parte da Nossa História
        </h2>
        <p class="text-xl text-white/90 mb-8 leading-relaxed">
          Junte-se a milhares de clientes satisfeitos que já descobriram seu estilo único conosco.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <Button class="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
            <Icon icon="mdi:shopping" class="mr-2" width="1.5em" />
            Explorar Produtos
          </Button>
          <Button class="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
            <Icon icon="mdi:email-outline" class="mr-2" width="1.5em" />
            Assinar Newsletter
          </Button>
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
  animation: fade-in 0.8s ease-out;
}
</style>
