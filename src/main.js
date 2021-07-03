import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {gsap, ScrollTrigger} from 'gsap/all'
Vue.config.productionTip = false
Vue.prototype.$gsap = gsap

gsap.registerPlugin(ScrollTrigger)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
