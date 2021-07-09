import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'
axios.defaults.baseURL = "http://8.140.12.78:85/api"
Vue.config.productionTip = false
Vue.use(VueAxios,axios)
Vue.use(ElementUI)
Vue.use(qs)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
