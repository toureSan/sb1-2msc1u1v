import { ref, computed } from 'vue'

export function useForm<T extends Record<string, any>>(initialData: T) {
  const formData = ref(initialData)
  const errors = ref<Partial<Record<keyof T, string>>>({})

  const isValid = computed(() => Object.keys(errors.value).length === 0)

  const validateField = (field: keyof T, validator: (value: any) => boolean, message: string) => {
    if (!validator(formData.value[field])) {
      errors.value[field] = message
    } else {
      delete errors.value[field]
    }
  }

  const resetForm = () => {
    formData.value = initialData
    errors.value = {}
  }

  return {
    formData,
    errors,
    isValid,
    validateField,
    resetForm
  }
}