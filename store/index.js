import Vue from 'vue'
import Vuex from 'vuex'
import http from '../common/api.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token:'',
		custInfo: {}
	},
	mutations: {
		// 设置登录的token
		SET_TOKEN(state,token){
			console.log(token)
			state.token = token
		},
		// 存储客户信息
		SET_CUSTINFO(state,info){
			state.custInfo = Object.assign(state.custInfo,info)
		},
		// 退出登录，清空数据
		DELET_INFO(state,info){
			state.token = ''
			state.custInfo = {}
		}
	},
	actions: {
		/**
		 * 获取用户登录的token
		 * data: Object上送参数
		 * 			clientId
		 * 			code
		 */
		setUserToken({commit,state},{data,callback}){
			http.getToken(data).then((res)=>{
				if(res && res.indexOf('?token=') != -1){
					let token = res.split('?token=')[1]
					commit('SET_TOKEN',token)
					if(callback){callback()}
				}
			})
		}
	},
	getters: {
		// 获取存储的token值
		getUserToken:state => state.token,
		// 获取客户信息的值
		getCustInfo:state => state.custInfo
	}
})

export default store
