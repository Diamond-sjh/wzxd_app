import Vue from 'vue'
import Vuex from 'vuex'
import http from '../common/api.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token:'',
		custInfo: {},
		virusList: new Map(),
		virusListLength:0,
		currentTimestamp: ''
	},
	mutations: {
		// 设置登录的token
		SET_TOKEN(state,token){
			state.token = token
		},
		// 存储客户信息
		SET_CUSTINFO(state,info){
			state.custInfo = Object.assign(state.custInfo,info)
		},
		// 没有网络的时候存储	添加病害的信息  以便后续提交请求
		SET_VIRUSINFO(state,info){
			state.virusList.set(info.timestamp,info.data) //待提交病害信息map对象
			state.virusListLength = state.virusList.size	//map对象的长度
		},
		// 正在提交的病害信息key：时间戳
		SET_TIMESTAMP(state,info){
			state.currentTimestamp = info//正在提交的病害信息时间戳
		},
		// 根据时间戳删除map对象中已经提交的病害信息
		DELET_VIRUS(state,info){
			state.virusList.delete(info)
			state.virusListLength = state.virusList.size	//map对象的长度
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
		getCustInfo:state => state.custInfo,
		// 获取病害信息列表
		getVirusList:state => state.virusList,
		// 获取病害信息列表的长度
		getVirusListLen:state => state.virusListLength,
		// 获取当前保存的病害时间戳
		getCurrentTimestamp:state => state.currentTimestamp,
		// 获取对应时间戳的病害信息
		getVirusTimestamp:(state) => (timestamp) => {
			return state.virusList.get(timestamp)
		}
	}
})

export default store
