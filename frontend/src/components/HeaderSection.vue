<template>
  <div>
    <Menubar :model="items">
      <template #start>FakeOrReal</template>
    </Menubar>
  </div>
</template>

<script setup>
import Menubar from 'primevue/menubar'
import { useStore } from 'vuex'

import { computed } from 'vue'

const store = useStore()

const items = computed(function items() {
  const allUsersMenu = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-file',
      to: '/',
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-file',
      to: '/about',
    },
  ]
  debugger
  return store.getters.isLoggedIn
    ? [
        ...allUsersMenu,
        {
          label: 'Settings',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Logout',
              icon: 'pi pi-fw pi-align-left',
              command: () => store.dispatch('logout'),
            },
            {
              label: 'Add News',
              icon: 'pi pi-fw pi-align-left',
              to: '/add-news'
            },
          ],
        },
      ]
    : [
        ...allUsersMenu,
        {
          label: 'Login',
          icon: 'pi pi-fw pi-pencil',
          to: '/login',
        },
      ]
})
</script>
<style></style>
