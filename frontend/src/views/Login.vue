<template>
  <div>
    <b-container>
      <b-row align-h="center" align-v="center">
        <b-col lg="4" col-centered>
          <b-form @submit.prevent="login" @reset="onReset" v-if="show">
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

            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
              <b-form-input
                id="input-2"
                type="password"
                v-model="form.password"
                required
                placeholder="Enter Password"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Login</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    login: function () {
      const username = this.form.username
      const password = this.form.password
      this.$store.dispatch('login', { username, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>
