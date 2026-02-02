<script setup lang="ts">
import { ref } from 'vue';
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';
import { toast } from '@/utils/toast';

const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);

const contactMethods = [
  {
    icon: 'mdi:email-outline',
    title: 'Email',
    value: 'contato@commer.com.br',
    description: 'Resposta em até 24 horas',
    link: 'mailto:contato@commer.com.br'
  },
  {
    icon: 'mdi:phone-outline',
    title: 'Telefone',
    value: '(11) 3000-0000',
    description: 'Seg-Sex: 9h às 18h',
    link: 'tel:+551130000000'
  },
  {
    icon: 'mdi:whatsapp',
    title: 'WhatsApp',
    value: '(11) 99999-9999',
    description: 'Atendimento rápido',
    link: 'https://wa.me/5511999999999'
  },
  {
    icon: 'mdi:map-marker-outline',
    title: 'Endereço',
    value: 'Av. Paulista, 1000',
    description: 'São Paulo - SP',
    link: 'https://maps.google.com'
  }
];

const faqs = [
  {
    question: 'Qual o prazo de entrega?',
    answer: 'O prazo de entrega varia de acordo com sua localização. Para a região Sudeste, o prazo médio é de 3 a 5 dias úteis. Para outras regiões, pode variar de 5 a 10 dias úteis.'
  },
  {
    question: 'Como faço para trocar ou devolver um produto?',
    answer: 'Você tem até 7 dias após o recebimento para solicitar troca ou devolução. Entre em contato conosco e enviaremos as instruções detalhadas.'
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos cartões de crédito (Visa, Mastercard, Elo, American Express), PIX, boleto bancário e parcelamento em até 12x sem juros.'
  },
  {
    question: 'Como acompanho meu pedido?',
    answer: 'Após a confirmação do pagamento, você receberá um código de rastreamento por email para acompanhar sua entrega em tempo real.'
  },
  {
    question: 'Vocês têm loja física?',
    answer: 'Atualmente operamos apenas online, mas temos um showroom em São Paulo para atendimento agendado. Entre em contato para agendar sua visita.'
  }
];

const subjects = [
  'Dúvida sobre produto',
  'Acompanhamento de pedido',
  'Trocas e devoluções',
  'Sugestões',
  'Reclamações',
  'Parcerias',
  'Outros'
];

async function handleSubmit() {
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    toast.warning('Preencha todos os campos obrigatórios', 'Formulário incompleto');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    toast.warning('Por favor, insira um email válido', 'Email inválido');
    return;
  }

  isSubmitting.value = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'Sucesso');
    
    formData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  } catch (error) {
    toast.error('Erro ao enviar mensagem. Tente novamente.', 'Erro');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
    <section class="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Entre em Contato
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Estamos aqui para ajudar! Envie sua mensagem e nossa equipe responderá o mais breve possível.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            v-for="(method, index) in contactMethods"
            :key="index"
            :href="method.link"
            target="_blank"
            class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div class="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
              <Icon :icon="method.icon" class="text-primary text-2xl" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {{ method.title }}
            </h3>
            <div class="text-primary font-semibold mb-1">
              {{ method.value }}
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ method.description }}
            </p>
          </a>
        </div>
      </div>
    </section>

    <section class="py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Envie sua Mensagem
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-8">
              Preencha o formulário abaixo e retornaremos em até 24 horas.
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Nome completo *
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label for="phone" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Telefone
                </label>
                <input
                  id="phone"
                  v-model="formData.phone"
                  type="tel"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label for="subject" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Assunto
                </label>
                <select
                  id="subject"
                  v-model="formData.subject"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Selecione um assunto</option>
                  <option v-for="subject in subjects" :key="subject" :value="subject">
                    {{ subject }}
                  </option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  required
                  rows="6"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Como podemos ajudar?"
                />
              </div>

              <Button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-primary text-white hover:bg-primary/90 px-6 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon
                  v-if="isSubmitting"
                  icon="mdi:loading"
                  class="animate-spin"
                  width="1.5em"
                />
                <Icon
                  v-else
                  icon="mdi:send"
                  width="1.5em"
                />
                {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
              </Button>

              <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
                * Campos obrigatórios
              </p>
            </form>
          </div>

          <div class="space-y-8 min-w-0">
            <div class="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0977!2d-46.6562!3d-23.5613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                style="border:0;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-full"
                allowfullscreen
              />
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Icon icon="mdi:clock-outline" class="text-primary" width="1.5em" />
                Horário de Atendimento
              </h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Segunda - Sexta</span>
                  <span class="font-semibold text-gray-900 dark:text-white">9h às 18h</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Sábado</span>
                  <span class="font-semibold text-gray-900 dark:text-white">9h às 13h</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Domingo</span>
                  <span class="font-semibold text-gray-900 dark:text-white">Fechado</span>
                </div>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Siga-nos nas Redes Sociais
              </h3>
              <div class="flex gap-4">
                <a
                  href="#"
                  class="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-primary"
                >
                  <Icon icon="mdi:instagram" width="1.5em" />
                </a>
                <a
                  href="#"
                  class="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-primary"
                >
                  <Icon icon="mdi:facebook" width="1.5em" />
                </a>
                <a
                  href="#"
                  class="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-primary"
                >
                  <Icon icon="mdi:twitter" width="1.5em" />
                </a>
                <a
                  href="#"
                  class="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-primary"
                >
                  <Icon icon="mdi:linkedin" width="1.5em" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Perguntas Frequentes
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            Encontre respostas rápidas para as dúvidas mais comuns
          </p>
        </div>

        <div class="space-y-4">
          <details
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
          >
            <summary class="px-6 py-4 cursor-pointer font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between">
              <span>{{ faq.question }}</span>
              <Icon icon="mdi:chevron-down" class="text-primary group-open:rotate-180 transition-transform" width="1.5em" />
            </summary>
            <div class="px-6 py-4 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
              {{ faq.answer }}
            </div>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.dark textarea::-webkit-scrollbar-thumb {
  background: #4a5568;
}

.dark textarea::-webkit-scrollbar-thumb:hover {
  background: #718096;
}
</style>
