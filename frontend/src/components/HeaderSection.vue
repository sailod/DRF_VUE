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

import { useConnectors, useDisconnect } from '@wagmi/vue'
import { useAccount } from '@wagmi/vue';

const store = useStore()
const router = useRouter()

const { disconnectAsync, reset, disconnect, data, failureReason, failureCount } = useDisconnect();
const connectors = useConnectors()
const metaMaskNewConnector = connectors.value.find((connector) => connector.id === "metaMaskSDK");
const { address, connector, isConnected, isDisconnected, connection, status } = useAccount();

const handleWeb3Logout = async () => {
  console.log(isConnected.value)
  console.log(isDisconnected.value)
  if (isConnected.value) {
    try {
      await disconnectAsync({connector: metaMaskNewConnector});
      
      console.log('address after disconnecting: '+address.value)
      console.log('Disconnected successfully, status: '+status.value);
      
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  } else {
    console.log('Not connected, no need to disconnect');
  }
};

const logoutAll = async () => {
  await handleWeb3Logout()
  store.dispatch('logout').then(() => {
    router.replace({ path: '/' });
    // Add any additional logic after logout if needed
    console.log("Logout successful, redirected to home.");
  }).catch((error) => {
    // Handle any errors from the logout process
    console.error("Logout failed:", error);
  });
};

const items = computed(() => {
  const allUsersMenu = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      to: '/',
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-question',
      to: '/about',
    },
  ]
  return store.getters.isLoggedIn
    ? [
        ...allUsersMenu,
        {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
          items: [
            {
              label: 'Logout',
              icon: 'pi pi-fw pi-align-left',
              command: logoutAll,
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

.p-submenu-list{
  z-index: 10 !important;
}
</style>
