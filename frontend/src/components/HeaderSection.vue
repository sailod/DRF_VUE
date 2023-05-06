<template>
  <div class="mb-4">
    <Menubar :model="items" >
      <template #start>FakeOrReal</template>
    </Menubar>
  </div>
</template>

<script setup>
import Menubar from 'primevue/menubar'
import { useStore } from 'vuex'

import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const items = computed(() => {
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
              command: () => {
                store
                  .dispatch('logout')
                  .then(() => router.replace({ path: '/' }))
              },
            },
            {
              label: 'Add News',
              icon: 'pi pi-fw pi-align-left',
              to: '/add-news',
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
<style>
.p-menubar .p-menubar-root-list {
  margin-left: auto;
}
</style>
