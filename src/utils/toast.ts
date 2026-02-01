import { toast as sonnerToast } from 'vue-sonner';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
  title?: string;
}

/**
 * Utilitário para disparar notificações toast usando Sonner
 */
export const toast = {
  /**
   * Dispara uma notificação de sucesso
   */
  success(message: string, title?: string) {
    sonnerToast.success(title || message, {
      description: title ? message : undefined,
    });
  },

  /**
   * Dispara uma notificação de erro
   */
  error(message: string, title?: string) {
    sonnerToast.error(title || message, {
      description: title ? message : undefined,
    });
  },

  /**
   * Dispara uma notificação de aviso
   */
  warning(message: string, title?: string) {
    sonnerToast.warning(title || message, {
      description: title ? message : undefined,
    });
  },

  /**
   * Dispara uma notificação informativa
   */
  info(message: string, title?: string) {
    sonnerToast.info(title || message, {
      description: title ? message : undefined,
    });
  },

  /**
   * Dispara uma notificação customizada
   */
  show(options: ToastOptions) {
    const { type = 'info', title, message, duration } = options;
    
    const toastOptions = {
      description: title ? message : undefined,
      duration,
    };

    switch (type) {
      case 'success':
        sonnerToast.success(title || message, toastOptions);
        break;
      case 'error':
        sonnerToast.error(title || message, toastOptions);
        break;
      case 'warning':
        sonnerToast.warning(title || message, toastOptions);
        break;
      case 'info':
      default:
        sonnerToast.info(title || message, toastOptions);
        break;
    }
  }
};
