import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

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
export default {
	store,
}