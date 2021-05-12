import store from '../store/index.js'
// 全局请求封装
const baseUrl = 'http://47.114.76.25:9505'
// 不需要token的请求
const httpRequest = (url, method, params) => {
	uni.showLoading({
		title: "加载中"
	});
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + url,
			data: params,
			method: method,
			header: method == 'GET' ? {
				'X-Requested-With': 'XMLHttpRequest',
				"Accept": "application/json",
				"Content-Type": "application/json; charset=UTF-8"
			} : {
				'X-Requested-With': 'XMLHttpRequest',
				// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				'Content-Type': 'application/json; charset=UTF-8'
			},
			dataType: 'json',
			success(res){
				resolve(res.data)
			},
			fail(err) {
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		})
	})
};
//带Token请求
const httpTokenRequest = (url, method, params) => {
	uni.showLoading({
		title: "加载中"
	});
	let token = store.state.token?store.state.token:''
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + url,
			data: params,
			method: method,
			header: method == 'GET' ? {
				'Authorization': token,
				'X-Requested-With': 'XMLHttpRequest',
				"Accept": "application/json",
				"Content-Type": "application/json; charset=UTF-8"
			} : {
				'Authorization': token,
				'X-Requested-With': 'XMLHttpRequest',
				// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				"Content-Type": "application/json; charset=UTF-8"
			},
			dataType: 'json',
			success(res){
				resolve(res.data)
			},
			fail(err) {
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		})
	})
};
//带带文件上传的请求
const httpUploadRequest = (url, method, params) => {
	uni.showLoading({
		title: "加载中"
	});
	let token = store.state.token?store.state.token:''
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + url,
			data: params,
			method: method,
			header:{
				'Authorization': token,
				'X-Requested-With': 'XMLHttpRequest',
				"Accept": "*/*",
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
			},
			dataType:'JSON',
			success(res){
				resolve(res.data)
			},
			fail(err) {
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		})
	})
};
export default {
	baseUrl,
	httpRequest,
	httpTokenRequest,
	httpUploadRequest
}