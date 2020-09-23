import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
	plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
	state() {
		return {
			isAuthenticated: false,
			user: {}
		}
	},
	getters: {
		getIsAuthenticated: (state) => {
			return state.isAuthenticated
		},
		getUser: (state) => {
			return state.user
		}
	},
	mutations: {
		turnOnIsAuthenticated (state) {
			state.isAuthenticated = true
		},
		turnOffIsAuthenticated (state) {
			state.isAuthenticated = false
		},
		setUser (state, user) {
			state.user = user
		},
		clearUser (state) {
			state.user = {}
		}
	},
	actions: {
		login(context, user) {
			context.commit('setUser', user)
			context.commit('turnOnIsAuthenticated')
		},
		logout(context) {
			context.commit('turnOffIsAuthenticated')
			context.commit('clearUser')
		}
	},
	modules: {
	}
})
