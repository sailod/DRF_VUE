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
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button
              @click.prevent="googleSignIn"
              type="submit"
              variant="success"
              >Google</b-button
            >

          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script src="https://accounts.google.com/gsi/client" async defer></script>
<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const provider = new GoogleAuthProvider({
  apiKey: 'AIzaSyCCJeE9feN0TxnrIBld9A29WqOtDjoP3Ck',
  authDomain: 'test-a9062.firebaseapp.com',
  projectId: 'test-a9062',
  storageBucket: 'test-a9062.appspot.com',
  messagingSenderId: '354221965650',
  appId: '1:354221965650:web:35e308a03a786c3220ba8b',
  measurementId: 'G-0B73JTFGVW'
})
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      show: true
    }
  },
  mounted() {},
  methods: {
    googleSignIn() {
      signInWithPopup(getAuth(this.$google), provider)
        .then(async (result) => {
          // The signed-in user info.
          const user = result.user
          const token = await user.getIdToken(true)
          debugger
          this.$http.defaults.headers.common.Authorization = `Bearer ${token}`
        })
        .catch((error) => {
          debugger
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.customData.email
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error)
          console.log(
            errorCode + ' ' + errorMessage + ' ' + email + ' ' + credential
          )

          // ...
        })
    },
    login: function () {
      const username = this.form.username
      const password = this.form.password
      this.$store
        .dispatch('login', { username, password })
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>
