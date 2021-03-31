// 全局请求封装
const baseUrl = 'http://47.114.76.25:9505'
// 不需要token的请求
const httpRequest = (url, method, params) => {
	uni.showLoading({
		title: "加载中"
	});
	let httpDefaultOpts = {
		url: baseUrl + url,
		data: params,
		method: method,
		header: method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			'Content-Type': 'application/json; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
		uni.hideLoading()
	})
	return promise
};
//带Token请求
const httpTokenRequest = (url, method, params) => {
	uni.showLoading({
		title: "加载中"
	});
	let token = "";
	uni.getStorage({
		key: 'token',
		success: function(ress) {
			token = ress.data
		}
	});
	let httpDefaultOpts = {
		url: baseUrl + url,
		data: data,
		method: method,
		header: method == 'get' ? {
			'Token': token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'Token': token,
			'X-Requested-With': 'XMLHttpRequest',
			// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			"Content-Type": "application/json; charset=UTF-8"
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
		uni.hideLoading()
	})
	return promise
};
export default {
	baseUrl,
	httpRequest,
	httpTokenRequest
}