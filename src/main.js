import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {gsap, ScrollTrigger} from 'gsap/all'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.prototype.$gsap = gsap
Vue.prototype.$axios = axios

gsap.registerPlugin(ScrollTrigger)


// storage
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
	reset (state) {
		state.count = 0
	}
  },
  getters: {
	count: state => {
		return 'The count is:'+state.count
	}
  },
  plugins: [createPersistedState()]
})


new Vue({
  router,
  render: h => h(App),
  store: store,
}).$mount('#app')
