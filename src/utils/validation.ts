export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
  return phoneRegex.test(phone)
}

export const validatePostalCode = (postalCode: string): boolean => {
  const postalCodeRegex = /^[0-9]{5}$/
  return postalCodeRegex.test(postalCode)
}