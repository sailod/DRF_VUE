import axios from 'axios'
import { createStore as _createStore } from 'vuex'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const provider = new GoogleAuthProvider({
  apiKey: 'AIzaSyCCJeE9feN0TxnrIBld9A29WqOtDjoP3Ck',
  authDomain: 'test-a9062.firebaseapp.com',
  projectId: 'test-a9062',
  storageBucket: 'test-a9062.appspot.com',
  messagingSenderId: '354221965650',
  appId: '1:354221965650:web:35e308a03a786c3220ba8b',
  measurementId: 'G-0B73JTFGVW',
})

export function createStore(router) {
  return _createStore({
    state() {
      return {
        get route() {
          return router.currentRoute.value
        },
        loading: false,
        token: localStorage.getItem('token') || '',
        user: {},
        http: axios.create({
          baseURL: process.env.VUE_APP_API_URL,
          timeout: 1000,
        }),
        httpWithAuth: axios.create({
          baseURL: process.env.VUE_APP_API_URL,
          timeout: 1000,
        }),
      }
    },
    mutations: {
      SET_TOKEN(state, token, email) {
        state.status = 'success'
        state.token = token
        state.user.email = email
        localStorage.setItem('token', token)
        state.httpWithAuth.defaults.headers.common.Authorization = `JWT ${token}`
      },
      SET_LOADING(state, status) {
        state.loading = status
      },
      LOGOUT(state) {
        state.loading = false
        state.token = ''
      },
    },
    actions: {
      loginUsingGoogle() {
        return signInWithPopup(getAuth(this.$google), provider)
          .then(async (result) => {
            // The signed-in user info.
            const user = result.user
            const token = await user.getIdToken(true)
            this.commit('SET_TOKEN', token, user.email)
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.customData.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
            console.error(
              errorCode + ' ' + errorMessage + ' ' + email + ' ' + credential
            )
          })
      },
      logingUsingPassword({ commit, getters, state }, user) {
        commit('SET_LOADING', true)
        this.dispatch('logout')
        return state.http
          .post(process.env.VUE_APP_API_URL + '/api/auth/jwt/create/', user)
          .then((resp) => {
            console.log(this)
            const token = resp.data.access
            const user = resp.config.data.username
            commit('SET_LOADING', false)
            commit('SET_TOKEN', token, user)
          })
          .catch((err) => {
            throw err
            // console.log(`Error while login: ${err}`)
            // this.dispatch('logout')
          })
      },
      logout({ commit }) {
        commit('LOGOUT')
        localStorage.removeItem('token')
      },
    },
    getters: {
      isLoggedIn: (state) => state.token,
      authStatus: (state) => state.status,
      httpWithAuthToken: (state, getters) => {
        if (getters.isLoggedIn) {
          axios.defaults.headers.common.Authorization = 'JWT ' + state.token
        } else delete axios.defaults.headers.common.Authorization
        return axios
      },
    },
    modules: {},
  })
}
