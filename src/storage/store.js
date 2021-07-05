import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
	userState: {
		isLogined: false,
		id: '',
		name: '',
		type: '',
		affiliation: '',
	}
  },
  mutations: {
	login (state, userInfo) {
		state.userState.isLogined = true
		state.userState.name = userInfo.name
		state.userState.id = userInfo.id
		state.userState.type = userInfo.type
		state.userState.affiliation = userInfo.affiliation 
	},
	reset (state) {
		state.userState.isLogined = false
		state.userState.name = ''
		state.userState.id = ''
		state.userState.type = ''
		state.userState.affiliation = ''
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