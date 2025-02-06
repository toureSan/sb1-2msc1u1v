<script setup lang="ts">
import { ref } from 'vue'

const settings = ref({
  notifications: true,
  emailUpdates: true,
  availability: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  }
})
</script>

<template>
  <div class="p-6">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900">Settings</h2>
      <p class="mt-1 text-sm text-gray-500">Manage your account preferences</p>
    </div>

    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
            <div class="mt-4 space-y-4">
              <div class="flex items-center">
                <input
                  id="notifications"
                  v-model="settings.notifications"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="notifications" class="ml-3 text-sm text-gray-700">
                  Enable push notifications
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="emailUpdates"
                  v-model="settings.emailUpdates"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="emailUpdates" class="ml-3 text-sm text-gray-700">
                  Receive email updates
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">Availability</h3>
            <div class="mt-4 space-y-4">
              <div v-for="(value, day) in settings.availability" :key="day" class="flex items-center">
                <input
                  :id="day"
                  v-model="settings.availability[day]"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label :for="day" class="ml-3 text-sm text-gray-700 capitalize">
                  {{ day }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>