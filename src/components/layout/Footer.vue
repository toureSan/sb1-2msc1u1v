<script setup lang="ts">
import ContactInfo from './footer/ContactInfo.vue'
import FooterNavigation from './footer/FooterNavigation.vue'
import SocialIcon from './footer/SocialIcon.vue'

const socialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'Twitter', href: '#' }
]
</script>

<template>
  <footer class="bg-black" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Pied de page</h2>
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <ContactInfo />
        <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <FooterNavigation />
        </div>
      </div>

      <div class="mt-16 border-t border-gray-600 pt-8 sm:mt-20 lg:mt-24">
        <div class="flex items-center justify-between">
          <p class="text-xs leading-5 text-gray-300">
            &copy; {{ new Date().getFullYear() }} WIM. Tous droits réservés.
          </p>
          <div class="flex space-x-6">
            <a
              v-for="item in socialLinks"
              :key="item.name"
              :href="item.href"
              class="text-gray-400 hover:text-white transition-colors"
            >
              <span class="sr-only">{{ item.name }}</span>
              <SocialIcon :name="item.name" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>