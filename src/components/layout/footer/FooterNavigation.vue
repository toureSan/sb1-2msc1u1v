<script setup lang="ts">
const navigation = {
  services: [
    { name: 'Aide à domicile', href: '#' },
    { name: 'Ménage', href: '#' },
    { name: 'Bricolage', href: '#' },
    { name: 'Jardinage', href: '#' },
    { name: 'Garde d\'enfants', href: '#' }
  ],
  entreprise: [
    { name: 'À propos', href: '/about' }
  ]
}
</script>

<template>
  <div class="md:grid md:grid-cols-2 md:gap-8">
    <div>
      <h3 class="text-sm font-semibold leading-6 text-white">Services</h3>
      <ul role="list" class="mt-6 space-y-4">
        <li v-for="item in navigation.services" :key="item.name">
          <a :href="item.href" class="text-sm leading-6 text-gray-300 hover:text-white">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    <div class="mt-10 md:mt-0">
      <h3 class="text-sm font-semibold leading-6 text-white">Entreprise</h3>
      <ul role="list" class="mt-6 space-y-4">
        <li v-for="item in navigation.entreprise" :key="item.name">
          <router-link
            v-if="item.href.startsWith('/')"
            :to="item.href"
            class="text-sm leading-6 text-gray-300 hover:text-white"
          >
            {{ item.name }}
          </router-link>
          <a
            v-else
            :href="item.href"
            class="text-sm leading-6 text-gray-300 hover:text-white"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>