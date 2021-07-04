import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
	userState: {
		isLogined: false,
		name: 'John Keats',
		type: '0',
		affiliation: 'Oxford',
	}
  },
  mutations: {
	login (state, userInfo) {
		state.userState.isLogined = true
		state.userState.name = userInfo.name
		state.userState.type = userInfo.type
		state.userState.affiliation = userInfo.affiliation 
	},
	reset (state) {
		state.userState.isLogined = false
		state.userState.name = 'John Keats'
		state.userState.type = '0'
		state.userState.affiliation = 'Oxford'
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