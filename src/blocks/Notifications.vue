<script setup lang="ts">
import { ref, computed } from 'vue';
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';

interface Props {
  notificationsVisibility: boolean;
}

defineProps<Props>();

const emit = defineEmits(['toggle-notifications']);

interface Notification {
  id: number;
  type: 'order' | 'promotion' | 'info' | 'shipping';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

const notifications = ref<Notification[]>([
  {
    id: 1,
    type: 'shipping',
    title: 'Pedido enviado!',
    message: 'Seu pedido #12345 foi enviado e está a caminho.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    read: false,
    actionUrl: '/orders/12345',
    actionLabel: 'Rastrear pedido'
  },
  {
    id: 2,
    type: 'promotion',
    title: '🎉 Promoção especial!',
    message: '50% OFF em toda linha feminina. Aproveite!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
    read: false,
    actionUrl: '/products/clothing/woman',
    actionLabel: 'Ver produtos'
  },
  {
    id: 3,
    type: 'order',
    title: 'Pedido confirmado',
    message: 'Seu pedido #12344 foi confirmado e está sendo preparado.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5h ago
    read: true,
    actionUrl: '/orders/12344',
    actionLabel: 'Ver detalhes'
  },
  {
    id: 4,
    type: 'info',
    title: 'Novidades chegando!',
    message: 'Nova coleção de verão disponível em breve.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true
  }
]);

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length;
});

const hasNotifications = computed(() => {
  return notifications.value.length > 0;
});

function markAsRead(id: number) {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
}

function markAllAsRead() {
  notifications.value.forEach(n => n.read = true);
}

function removeNotification(id: number) {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications.value.splice(index, 1);
  }
}

function clearAll() {
  notifications.value = [];
}

function getNotificationIcon(type: string) {
  const icons = {
    order: 'mdi:package-variant',
    promotion: 'mdi:tag',
    info: 'mdi:information',
    shipping: 'mdi:truck-delivery'
  };
  return icons[type as keyof typeof icons] || 'mdi:bell';
}

function getNotificationColor(type: string) {
  const colors = {
    order: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
    promotion: 'text-green-600 bg-green-50 dark:bg-green-900/20',
    info: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
    shipping: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
  };
  return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-50';
}

function formatTimestamp(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `${minutes}min atrás`;
  if (hours < 24) return `${hours}h atrás`;
  if (days === 1) return 'Ontem';
  if (days < 7) return `${days} dias atrás`;
  
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

defineExpose({ unreadCount });
</script>

<template>
  <aside
    v-if="notificationsVisibility"
    class="fixed top-0 right-0 z-40 w-full bg-black/50 h-screen transition-transform translate-x-0"
    @click.self="emit('toggle-notifications')"
  >
    <div
      class="h-screen bg-white dark:bg-gray-900 w-full sm:max-w-[450px] absolute right-0 flex flex-col"
    >
      <div class="flex-shrink-0 p-5 border-b border-gray-200 dark:border-gray-700">
        <button
          class="flex items-center w-full pb-2 hover:text-gray-500 dark:hover:text-gray-400 transition-all duration-150 mb-4"
          type="button"
          @click="emit('toggle-notifications')"
        >
          <Icon icon="bx:chevron-left" width="1.5em" />
          Voltar
        </button>

        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">Notificações</h1>
          <span
            v-if="unreadCount > 0"
            class="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full"
          >
            {{ unreadCount }} nova{{ unreadCount > 1 ? 's' : '' }}
          </span>
        </div>

        <div v-if="hasNotifications" class="flex gap-2 mt-4">
          <Button
            v-if="unreadCount > 0"
            variant="outline"
            size="sm"
            class="text-xs"
            @click="markAllAsRead"
          >
            <Icon icon="mdi:check-all" width="1.2em" class="mr-1" />
            Marcar todas como lidas
          </Button>
          <Button
            variant="outline"
            size="sm"
            class="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            @click="clearAll"
          >
            <Icon icon="mdi:delete-outline" width="1.2em" class="mr-1" />
            Limpar tudo
          </Button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div v-if="!hasNotifications" class="flex flex-col items-center justify-center py-20 px-4">
          <Icon icon="mdi:bell-outline" width="5em" class="text-gray-300 dark:text-gray-600 mb-4" />
          <h2 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Nenhuma notificação
          </h2>
          <p class="text-gray-400 dark:text-gray-500 text-center">
            Você está em dia! Não há notificações no momento.
          </p>
        </div>

        <div v-else class="divide-y divide-gray-100 dark:divide-gray-800">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors relative group"
            :class="{ 'bg-primary/5 dark:bg-primary/10': !notification.read }"
          >
            <div
              v-if="!notification.read"
              class="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"
            />

            <div class="flex gap-3 ml-2">
              <div
                class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                :class="getNotificationColor(notification.type)"
              >
                <Icon :icon="getNotificationIcon(notification.type)" width="1.3em" />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2 mb-1">
                  <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
                    {{ notification.title }}
                  </h3>
                  <button
                    class="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    type="button"
                    title="Remover notificação"
                    @click="removeNotification(notification.id)"
                  >
                    <Icon icon="mdi:close" width="1.2em" class="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {{ notification.message }}
                </p>

                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs text-gray-400 dark:text-gray-500">
                    {{ formatTimestamp(notification.timestamp) }}
                  </span>

                  <div class="flex gap-2">
                    <button
                      v-if="!notification.read"
                      class="text-xs text-primary hover:text-primary/80 font-medium"
                      type="button"
                      @click="markAsRead(notification.id)"
                    >
                      Marcar como lida
                    </button>
                    <RouterLink
                      v-if="notification.actionUrl"
                      :to="notification.actionUrl"
                      class="text-xs text-primary hover:text-primary/80 font-medium"
                      @click="emit('toggle-notifications')"
                    >
                      {{ notification.actionLabel }}
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
