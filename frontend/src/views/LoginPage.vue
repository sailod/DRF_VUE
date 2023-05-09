<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form
          @submit.prevent="
            () => {
              store
                .dispatch('logingUsingPassword', form)
                .then(() => {
                  this.$router.replace({ path: '/' })
                })
                .catch((err) => (errorMessage = `User login failed: ${err}`))
            }
          "
        >
          <div class="form-group">
            <label for="username">Username:</label>
            <InputText
              id="username"
              v-model="form.username"
              type="input"
              class="form-control"
              placeholder="Enter Username"
            ></InputText>
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <Password
              id="password"
              v-model="form.password"
              inputClass="form-control w-100"
              feedback="false"
              :toggleMask="true"
              :required="true"
            />
          </div>

          <div class="form-group text-center">
            <button type="submit" class="btn btn-primary mr-2">Login</button>
            <button type="reset" class="btn btn-danger">Reset</button>
          </div>

          <div class="form-group text-center">
            <Button
              @click.prevent="
                () => {
                  store
                    .dispatch('loginUsingGoogle', form)
                    .then(() => {
                      this.$router.replace({ path: '/' })
                    })
                    .catch(
                      (err) => (errorMessage = `User login failed: ${err}`)
                    )
                }
              "
              label="Google"
              class="p-button-success"
            ></Button>
          </div>
        </form>
      </div>
    </div>

    <div class="row" v-if="errorMessage" align-h="center" align-v="center">
      <Message severity="error" :closable="false">{{ errorMessage }}</Message>
    </div>
  </div>
</template>


<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import Message from 'primevue/message'

const form = ref({ username: '', password: '' })

const errorMessage = ref('')

const store = useStore()
</script>
