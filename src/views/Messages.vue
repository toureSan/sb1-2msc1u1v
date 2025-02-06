<script setup lang="ts">
import { ref } from 'vue'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isRead: boolean
}

const messages = ref<Message[]>([
  {
    id: '1',
    sender: 'John Doe',
    content: 'Hello, I need to reschedule my appointment.',
    timestamp: '2024-02-20T10:30:00',
    isRead: false
  },
  {
    id: '2',
    sender: 'Jane Smith',
    content: 'Thank you for the excellent service!',
    timestamp: '2024-02-20T09:15:00',
    isRead: true
  }
])
</script>

<template>
  <div class="p-6">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900">Messages</h2>
      <p class="mt-1 text-sm text-gray-500">Communicate with your clients</p>
    </div>

    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul class="divide-y divide-gray-200">
        <li 
          v-for="message in messages" 
          :key="message.id" 
          class="p-4 hover:bg-gray-50 cursor-pointer"
          :class="{ 'bg-blue-50': !message.isRead }"
        >
          <div class="flex justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">{{ message.sender }}</p>
              <p class="text-sm text-gray-600">{{ message.content }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-500">
                {{ new Date(message.timestamp).toLocaleTimeString() }}
              </p>
              <div 
                v-if="!message.isRead" 
                class="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                New
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>