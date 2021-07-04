import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
	userState: {
		isLogined: false,
		userName: 'John Keats'
	}
  },
  mutations: {
	login (state) {
		state.userState.isLogined = true
	},
	unlogin (state) {
		state.userState.isLogined = false
	},
  },
  getters: {
	userState: state => {
		return state.userState
	}
  },
  plugins: [createPersistedState()]
})
export default {
	store,
}