<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBookingsStore } from '@/stores/bookings'
import { useNotification } from '@/composables/useNotification'
import type { Service } from '@/types/service'
import BookingSteps from './BookingSteps.vue'
import BookingNavigation from './navigation/BookingNavigation.vue'
import {
  ServiceDetails,
  DateTimeSelection,
  LocationDetails,
  BookingConfirmation
} from './steps'

// Rest of the component remains the same...
</script>