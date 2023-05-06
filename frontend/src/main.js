import { createApp } from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { createRouter } from './router/index'
import { createStore } from './store/index'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTimes,
  faThumbsUp,
  faThumbsDown,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons'
import { initializeApp } from 'firebase/app'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'

library.add(faTimes, faThumbsUp, faThumbsDown, faUserSecret)

const store = createStore()
const router = createRouter()
const app = createApp(App)

app.use(store)
app.use(router)
// Install BootstrapVue
app.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
app.use(IconsPlugin)
app.use(PrimeVue)
app.component('font-awesome-icon', FontAwesomeIcon)

// this.$http.defaults.xsrfCookieName = 'csrftoken'
// this.$http.defaults.xsrfHeaderName = 'X-CSRFToken'

/* code from our Firebase console */
const firebaseConfig = {
  apiKey: 'AIzaSyCCJeE9feN0TxnrIBld9A29WqOtDjoP3Ck',
  authDomain: 'test-a9062.firebaseapp.com',
  projectId: 'test-a9062',
  storageBucket: 'test-a9062.appspot.com',
  messagingSenderId: '354221965650',
  appId: '1:354221965650:web:35e308a03a786c3220ba8b',
  measurementId: 'G-0B73JTFGVW',
}

// Initialize Firebase

app.config.globalProperties.$google = initializeApp(firebaseConfig)

// Login Guard
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

app.mount('#app')
