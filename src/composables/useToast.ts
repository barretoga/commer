import { ref } from 'vue'
import { toast as sonnerToast } from 'vue-sonner'
import type { ToastVariants } from '@/components/ui/toast'

export interface ToastData {
  id: string
  title?: string
  description: string
  variant?: ToastVariants['variant']
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

const toasts = ref<ToastData[]>([])
let toastIdCounter = 0

export function useToast() {
  function addToast(data: Omit<ToastData, 'id'>) {
    const id = `toast-${++toastIdCounter}`
    const toast: ToastData = {
      id,
      ...data,
    }
    
    toasts.value.push(toast)
    
    const toastOptions = {
      description: data.title ? data.description : undefined,
      duration: data.duration,
      action: data.action ? {
        label: data.action.label,
        onClick: data.action.onClick,
      } : undefined,
    }

    const message = data.title || data.description

    switch (data.variant) {
      case 'success':
        sonnerToast.success(message, toastOptions)
        break
      case 'error':
      case 'destructive':
        sonnerToast.error(message, toastOptions)
        break
      case 'warning':
        sonnerToast.warning(message, toastOptions)
        break
      case 'info':
      default:
        sonnerToast.info(message, toastOptions)
        break
    }
    
    return id
  }

  function removeToast(id: string) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  function success(description: string, title?: string) {
    return addToast({
      title,
      description,
      variant: 'success',
    })
  }

  function error(description: string, title?: string) {
    return addToast({
      title,
      description,
      variant: 'error',
    })
  }

  function warning(description: string, title?: string) {
    return addToast({
      title,
      description,
      variant: 'warning',
    })
  }

  function info(description: string, title?: string) {
    return addToast({
      title,
      description,
      variant: 'info',
    })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
}
