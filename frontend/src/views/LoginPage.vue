<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm mb-5"> <!-- Added margin-bottom to the card for footer spacing -->
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Login</h3>
            <form @submit.prevent="() => {
              store
                .dispatch('logingUsingPassword', form)
                .then(() => {
                  this.$router.replace({ path: '/' })
                })
                .catch((err) => (errorMessage = `User login failed: ${err}`))
            }">
              <div class="form-group mb-3 d-flex align-items-center">
                <label for="username" class="form-label mr-2">Username:</label> <!-- Added class for label -->
                <InputText id="username" v-model="form.username" type="input" class="form-control"
                  placeholder="Enter Username" style="flex: 1;"></InputText>
              </div>

              <div class="form-group mb-3 d-flex align-items-center">
                <label for="password" class="form-label mr-2">Password:</label> <!-- Added class for label -->
                <Password id="password" v-model="form.password" inputClass="form-control" feedback="false"
                  :toggleMask="true" :required="true" style="flex: 1;" />
              </div>

              <div class="form-group text-center mb-3">
                <button type="submit" class="btn btn-primary mr-2">Login</button>
                <button type="reset" class="btn btn-secondary">Reset</button>
              </div>

              <div class="form-group text-center mb-3">
                <Button @click.prevent="() => {
                  store
                    .dispatch('loginUsingGoogle', form)
                    .then(() => {
                      this.$router.replace({ path: '/' })
                    })
                    .catch(
                      (err) => (errorMessage = `User login failed: ${err}`)
                    )
                }" label="Login with Google" class="p-button-success"></Button>
              </div>
            </form>
            <div class="text-center mt-4">
              <button class="btn" style="background-color: #F6851B; color: white; font-weight: bold;" @click="handleWeb3Login({ metaMaskNewConnector, chainId })">
                Login with MetaMask
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-5" v-if="errorMessage">
      <div class="col-md-6">
        <Message severity="error" :closable="false">{{ errorMessage }}</Message>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, nextTick, watch, toRaw } from 'vue'
import { useRouter } from 'vue-router'

import Message from 'primevue/message'
import { useConnect, useChainId, useAccount, useSignMessage } from '@wagmi/vue';
import { useConnectors } from '@wagmi/vue'
// import { config } from "../wagmi";

// const { connectors, connectAsync } = useConnect();
const {  connectAsync } = useConnect();
const { address, connector, isConnected, isDisconnected, connection, status } = useAccount();

const router = useRouter();

const connectors = useConnectors()

console.log(connectors.value)

const form = ref({ username: '', password: '' })

const errorMessage = ref('')
  
const store = useStore()
const http = store.state.http

const chainId = useChainId();
const { signMessageAsync } = useSignMessage()

const metaMaskNewConnector = connectors.value.find((connector) => connector.id === "metaMaskSDK");

// those are debug statements
// watch(() => isConnected.value, (newValue, oldValue) => {
//   console.log('isConnected changed from', oldValue, 'to', newValue)
// })



async function handleWeb3Login({ metaMaskNewConnector, chainId }) {
  await connectAsync({ connector: metaMaskNewConnector, chainId })

  // Get the message from the backend
  http
    .get(`/api/get-auth-message/`)
    .then(async (response) => {
      const { message, id } = response.data;
      console.log(message)

      // Sign the message
      const signature = await signMessageAsync({ message })
      console.log(signature)
      
      // Send the signed message to the backend
      http.post('/api/web3-auth/',{ address: address.value, signature, message_id: id }).then((response)=>{
        console.log(response.data)
        store.dispatch('setTokenOnWeb3Auth', { address: address.value, token: response.data.access });
        console.log("finished Login!!")
        router.replace({ path: '/' })
      })
    })
    .catch((error) => {
      console.error('Login error:', error);
    })

}
</script>
