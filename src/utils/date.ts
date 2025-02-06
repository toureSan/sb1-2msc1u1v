export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTime = (time: string): string => {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const isDateInFuture = (date: string): boolean => {
  return new Date(date) > new Date()
}