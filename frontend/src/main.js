import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createRouter } from './router/index'
import { createStore } from './store/index'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTimes,
  faThumbsUp,
  faThumbsDown,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { initializeApp } from 'firebase/app'
import {  } from 'firebase/auth'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import ProgressBar from 'primevue/progressbar'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Message from 'primevue/message'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import Skeleton from 'primevue/skeleton'

library.add(faTimes, faThumbsUp, faThumbsDown, faTrash)

const store = createStore()
const router = createRouter()
const app = createApp(App)

app.use(store)
app.use(router)

app.use(PrimeVue)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('Button', Button)
app.component('Paginator', Paginator)
app.component('ProgressBar', ProgressBar)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Message', Message)
app.component('Dropdown', Dropdown)
app.component('FileUpload', FileUpload)
app.component('Skeleton', Skeleton)

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
