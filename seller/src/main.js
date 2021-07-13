import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

axios.defaults.baseURL = "http://8.140.12.78:85/api"

Vue.use(VueAxios,axios)
Vue.use(ElementUI)
Vue.use(qs)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

