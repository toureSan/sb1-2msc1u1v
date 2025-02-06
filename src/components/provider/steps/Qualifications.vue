<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    experience: string
    certifications: string[]
    references: string[]
  }
}>()

const emit = defineEmits(['update:modelValue'])

const updateField = (field: string, value: any) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

const addCertification = () => {
  updateField('certifications', [...props.modelValue.certifications, ''])
}

const removeCertification = (index: number) => {
  const newCertifications = [...props.modelValue.certifications]
  newCertifications.splice(index, 1)
  updateField('certifications', newCertifications)
}

const updateCertification = (index: number, value: string) => {
  const newCertifications = [...props.modelValue.certifications]
  newCertifications[index] = value
  updateField('certifications', newCertifications)
}

const addReference = () => {
  updateField('references', [...props.modelValue.references, ''])
}

const removeReference = (index: number) => {
  const newReferences = [...props.modelValue.references]
  newReferences.splice(index, 1)
  updateField('references', newReferences)
}

const updateReference = (index: number, value: string) => {
  const newReferences = [...props.modelValue.references]
  newReferences[index] = value
  updateField('references', newReferences)
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-lg font-medium text-gray-900">Qualifications</h2>

    <div>
      <label class="block text-sm font-medium text-gray-700">Expérience Professionnelle</label>
      <textarea
        :value="modelValue.experience"
        @input="updateField('experience', ($event.target as HTMLTextAreaElement).value)"
        rows="4"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Décrivez votre expérience professionnelle..."
      />
    </div>

    <div>
      <div class="flex justify-between items-center mb-2">
        <label class="block text-sm font-medium text-gray-700">Certifications</label>
        <button
          type="button"
          @click="addCertification"
          class="text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Ajouter une certification
        </button>
      </div>
      <div class="space-y-2">
        <div
          v-for="(cert, index) in modelValue.certifications"
          :key="index"
          class="flex gap-2"
        >
          <input
            type="text"
            :value="cert"
            @input="updateReference(index, ($event.target as HTMLInputElement).value)"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Nom de la certification"
          >
          <button
            type="button"
            @click="removeCertification(index)"
            class="text-red-600 hover:text-red-500"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <div>
      <div class="flex justify-between items-center mb-2">
        <label class="block text-sm font-medium text-gray-700">Références</label>
        <button
          type="button"
          @click="addReference"
          class="text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Ajouter une référence
        </button>
      </div>
      <div class="space-y-2">
        <div
          v-for="(ref, index) in modelValue.references"
          :key="index"
          class="flex gap-2"
        >
          <input
            type="text"
            :value="ref"
            @input="updateReference(index, ($event.target as HTMLInputElement).value)"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Nom et coordonnées de la référence"
          >
          <button
            type="button"
            @click="removeReference(index)"
            class="text-red-600 hover:text-red-500"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>