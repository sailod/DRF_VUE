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
import { } from 'firebase/auth'
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
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import MasonryWall from '@yeger/vue-masonry-wall'
import { WagmiPlugin } from '@wagmi/vue'
import { config } from './wagmi'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

library.add(faTimes, faThumbsUp, faThumbsDown, faTrash)

const store = createStore()
const router = createRouter()
const app = createApp(App)

app.use(store)
app.use(router)

// web3 auth dependencies using wagmi
app.use(WagmiPlugin, { config, reconnectOnMount: false })
const queryClient = new QueryClient()
app.use(VueQueryPlugin, { queryClient })

app.use(ToastService)
app.use(PrimeVue)
app.use(MasonryWall)

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
app.component('Toast', Toast)


/* code from our Firebase console */
const firebaseConfig = {
// not included in pushed version
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
