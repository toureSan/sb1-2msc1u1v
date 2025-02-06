import { ref } from 'vue'

interface Notification {
  id: number
  type: 'success' | 'error' | 'info'
  message: string
}

export function useNotification() {
  const notifications = ref<Notification[]>([])
  let nextId = 0

  const addNotification = (type: Notification['type'], message: string, timeout = 3000) => {
    const id = nextId++
    notifications.value.push({ id, type, message })

    setTimeout(() => {
      removeNotification(id)
    }, timeout)
  }

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return {
    notifications,
    addNotification,
    removeNotification
  }
}