<script setup lang="ts">
import { ref } from 'vue';
import Icon from '@/components/Icon.vue';
import Image from '@/components/Image.vue';

const email = ref('');

const footerSections = [
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre Nós', href: '#' },
      { label: 'Nossa História', href: '#' },
      { label: 'Trabalhe Conosco', href: '#' },
      { label: 'Sustentabilidade', href: '#' },
    ]
  },
  {
    title: 'Atendimento',
    links: [
      { label: 'Central de Ajuda', href: '#' },
      { label: 'Trocas e Devoluções', href: '#' },
      { label: 'Entregas', href: '#' },
      { label: 'Formas de Pagamento', href: '#' },
    ]
  },
  {
    title: 'Políticas',
    links: [
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Termos de Uso', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'Segurança', href: '#' },
    ]
  }
];

const socialLinks = [
  { icon: 'mdi:instagram', href: 'https://instagram.com', label: 'Instagram' },
  { icon: 'mdi:facebook', href: 'https://facebook.com', label: 'Facebook' },
  { icon: 'mdi:twitter', href: 'https://twitter.com', label: 'Twitter' },
  { icon: 'mdi:pinterest', href: 'https://pinterest.com', label: 'Pinterest' },
  { icon: 'mdi:youtube', href: 'https://youtube.com', label: 'YouTube' },
];

const paymentMethods = [
  { icon: 'logos:visa', label: 'Visa' },
  { icon: 'logos:mastercard', label: 'Mastercard' },
  { icon: 'logos:amex', label: 'American Express' },
  { icon: 'simple-icons:pix', label: 'Pix' },
  { icon: 'mdi:barcode', label: 'Boleto' },
];

function handleNewsletterSubmit() {
  if (email.value) {
    console.log('Newsletter subscription:', email.value);
    email.value = '';
  }
}
</script>

<template>
  <footer class="bg-gradient-to-b mt-5 from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
        
        <div class="lg:col-span-2">
          <a href="/" class="inline-block mb-6 group">
            <Image
              class="object-center object-scale-down w-full max-w-[180px] h-[80px] transition-transform duration-300 group-hover:scale-105"
              src="/logo-white.png"
              alt="Commer Logo"
            />
          </a>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-sm">
            Moda e estilo que transformam. Descubra as últimas tendências em roupas e acessórios com qualidade premium e design exclusivo.
          </p>
          
          <div class="mb-6">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Newsletter
            </h3>
            <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Receba novidades e ofertas exclusivas
            </p>
            <form @submit.prevent="handleNewsletterSubmit" class="flex gap-2">
              <input
                v-model="email"
                type="email"
                placeholder="Seu e-mail"
                required
                class="flex-1 px-4 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent outline-none transition-all duration-200"
              />
              <button
                type="submit"
                class="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Icon icon="mdi:send" width="1.2em" />
              </button>
            </form>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Redes Sociais
            </h3>
            <div class="flex gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                :aria-label="social.label"
              >
                <Icon :icon="social.icon" width="1.3em" />
              </a>
            </div>
          </div>
        </div>

        <div
          v-for="section in footerSections"
          :key="section.title"
          class="lg:col-span-1"
        >
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            {{ section.title }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in section.links" :key="link.label">
              <a
                :href="link.href"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 inline-flex items-center group"
              >
                <span class="relative">
                  {{ link.label }}
                  <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h4 class="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
              Formas de Pagamento
            </h4>
            <div class="flex flex-wrap gap-3">
              <div
                v-for="payment in paymentMethods"
                :key="payment.label"
                class="w-12 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:shadow-md"
                :title="payment.label"
              >
                <Icon :icon="payment.icon" width="1.8em" />
              </div>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <Icon icon="mdi:shield-check" class="text-green-600 dark:text-green-400" width="1.5em" />
              <span class="text-xs font-medium text-green-700 dark:text-green-300">
                Compra Segura
              </span>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Icon icon="mdi:truck-fast" class="text-blue-600 dark:text-blue-400" width="1.5em" />
              <span class="text-xs font-medium text-blue-700 dark:text-blue-300">
                Frete Grátis*
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
          <p class="text-xs text-gray-600 dark:text-gray-400">
            © {{ new Date().getFullYear() }}
            <a
              href="https://github.com/barretoga/commer"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              Commer™
            </a>
            . Todos os direitos reservados.
          </p>
          <div class="flex items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <a href="#" class="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              CNPJ: 00.000.000/0001-00
            </a>
            <span class="hidden sm:inline">•</span>
            <a
              href="https://github.com/barretoga/commer"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <Icon icon="mdi:github" width="1em" />
              Open Source
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

footer {
  animation: slideIn 0.5s ease-out;
}
</style>
