import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {gsap, ScrollTrigger} from 'gsap/all'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import store from './storage/store.js'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$gsap = gsap
Vue.prototype.$axios = axios

gsap.registerPlugin(ScrollTrigger)

new Vue({
  router,
  render: h => h(App),
  store: store.store,
}).$mount('#app')
