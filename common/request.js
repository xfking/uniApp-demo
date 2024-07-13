import store from "../store/index"
module.exports = (vm) => {
	uni.$u.http.setConfig((config) => {
		config.baseURL = 'http://cqrcsm.cn/tapi';
		return config
	})
	uni.$u.http.interceptors.request.use((config) => {
		config.header['Content-Type'] = 'application/x-www-form-urlencoded'
		if (config.url.indexOf("/app/") != -1) {
			let user = store.state.userInfo
			config.header['Authorization'] = user.token
			config.data.userId = user.userId
		}
		return config
	}, config => {
		return Promise.reject(config)
	})
	uni.$u.http.interceptors.response.use((response) => {
		const data = response.data
		if (data.code == "26" || data.code == "25") {
			store.commit("logout")
			uni.$u.route({
				url: 'pages/local/login'
			})
		}
		return data === undefined ? {} : data
	}, (response) => {
		return Promise.reject(response)
	})
}
