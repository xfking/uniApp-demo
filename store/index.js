import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		hasLogin:false,
		userInfo:{}
	},
    mutations: {
		isLogin(state,user){
			state.hasLogin = true
			state.userInfo = user
			uni.setStorage({
				key: 'userInfo',
				data: user,
			});
		},
		logout(state,user){
			state.hasLogin = false
			state.userInfo = {}
			uni.removeStorage({
				key: 'userInfo',
			})
		}
	},
    actions: {
		
	}
})
export default store