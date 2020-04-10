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
import { faTimes, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
library.add(faTimes, faThumbsUp, faThumbsDown)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$http = axios
Vue.prototype.$api_endpoint = 'http://172.17.0.3:8000/api'

// this.$http.defaults.xsrfCookieName = 'csrftoken'
// this.$http.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.config.productionTip = false

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
