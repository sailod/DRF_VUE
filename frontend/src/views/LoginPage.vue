<template>
  <div>
    <b-container>
      <b-row align-h="center" align-v="center">
        <b-col lg="4" col-centered>
          <b-form
            @submit.prevent="
              () => {
                store
                  .dispatch('logingUsingPassword', form)
                  .then(() => {
                    debugger
                    this.$router.replace({ path: '/' })
                  })
                  .catch((err) => (errorMessage = `User login failed: ${err}`))
              }
            "
            @reset="onReset"
            v-if="true"
          >
            <b-form-group
              id="input-group-1"
              label="Username:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.username"
                type="text"
                required
                placeholder="Enter Username"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Password:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                type="password"
                v-model="form.password"
                required
                placeholder="Enter Password"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Login</b-button>
            <b-button @click="onReset" type="reset" variant="danger"
              >Reset</b-button
            >
            <b-button
              @click.prevent="
                () => {
                  store
                    .dispatch('loginUsingGoogle', form)
                    .then(() => {
                      debugger
                      this.$router.replace({ path: '/' })
                    })
                    .catch(
                      (err) => (errorMessage = `User login failed: ${err}`)
                    )
                }
              "
              type="submit"
              variant="success"
              >Google</b-button
            >
          </b-form>
        </b-col>
      </b-row>
      <b-row v-if="errorMessage" align-h="center" align-v="center">
        <Message severity="error" :closable="false">{{ errorMessage }}</Message>
      </b-row>
    </b-container>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import Message from 'primevue/message'

const form = ref({ username: '', password: '' })

const errorMessage = ref('')

const store = useStore()

const onReset = (evt) => {
  evt.preventDefault()
  // Reset our form values
  form.value = { username: '', password: '' }
}
</script>
