import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

// import axios from 'axios'
// axios.defaults.baseURL='http://8.140.12.78:85'
// Vue.prototype.$http=axios;


//import VueRouter from 'vue-router'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

