import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router/index'
import store from './store/index'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTimes,
  faThumbsUp,
  faThumbsDown
} from '@fortawesome/free-solid-svg-icons'
import { initializeApp } from 'firebase/app'

library.add(faTimes, faThumbsUp, faThumbsDown)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$http = axios
Vue.prototype.$api_endpoint = 'http://localhost:8181/api'

export const apiEndpoint = 'http://localhost:8181/api'

// this.$http.defaults.xsrfCookieName = 'csrftoken'
// this.$http.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.config.productionTip = false

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = 'JWT ' + token
}

Vue.mixin({
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  }
})

/* code from our Firebase console */
var firebaseConfig = {
  apiKey: 'AIzaSyCCJeE9feN0TxnrIBld9A29WqOtDjoP3Ck',
  authDomain: 'test-a9062.firebaseapp.com',
  projectId: 'test-a9062',
  storageBucket: 'test-a9062.appspot.com',
  messagingSenderId: '354221965650',
  appId: '1:354221965650:web:35e308a03a786c3220ba8b',
  measurementId: 'G-0B73JTFGVW'
}

// Initialize Firebase

Vue.prototype.$google = initializeApp(firebaseConfig)

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
