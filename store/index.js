import Vue from 'vue'
import Vuex from 'vuex'
import http from '../common/api.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token:'',//用户token
		virusList: new Map(),//待上传病害信息
		virusListLength:0,//待上传病害信息长度
		currentTimestamp: '',//当前上传时间戳
		statueList: new Map(),//检测状态列表
	},
	mutations: {
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
		// 存储修改检测项目检测状态
		SET_STATUElIST(state,info){
			state.statueList.set(info.timestamp,info.data)
		},
		// 根据时间戳删除map对象中已经修改的检测状态信息
		DELET_STATUElIST(state,info){
			state.statueList.delete(info)
		},
		// 设置用户的token
		SET_TOKEN(state,info){
			state.token = info
		},
		// 退出登录，清空数据
		DELET_INFO(state,info){
			// 清除本地缓存
			state.token = ''
			// uni.removeStorage({key: 'userToken'})//客户token
			uni.removeStorage({key: 'storage_projectList'})//工程列表
			uni.removeStorage({key: 'storage_projectPlan'})//项目-桩号-参数-测点
			uni.removeStorage({key: 'storage_Instrument'})//设备列表
			uni.removeStorage({key: 'storage_basisList'})//试验依据
			uni.removeStorage({key: 'storage_judgeBasisList'})//检测依据
			uni.removeStorage({key: 'storage_bluetooth'})//蓝牙信息
			uni.removeStorage({key: 'storage_userInfo'})//用户信息
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
		// 获取病害信息列表
		getVirusList:state => state.virusList,
		// 获取病害信息列表的长度
		getVirusListLen:state => state.virusListLength,
		// 获取当前保存的病害时间戳
		getCurrentTimestamp:state => state.currentTimestamp,
		// 获取对应时间戳的病害信息
		getVirusTimestamp:(state) => (timestamp) => {
			return state.virusList.get(timestamp)
		},
		// 获取检测状态上传列表
		getStatueList:state => state.statueList,
		// 获取存储的token值
		getUserToken:state => state.userToken,
		
	}
})

export default store
