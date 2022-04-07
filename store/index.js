import Vue from 'vue'
import Vuex from 'vuex'
import http from '../common/api.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token:'',//用户token
		custInfo: {},//客户信息
		virusList: new Map(),//待上传病害信息
		virusListLength:0,//待上传病害信息长度
		currentTimestamp: '',//当前上传时间戳
		statueList: new Map(),//检测状态列表
		bluetooth:{},//连接的蓝牙设备信息
		basisList:[],// 规范依据
		instrumentList:[]// 设备列表
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
		// 存储修改检测项目检测状态
		SET_STATUElIST(state,info){
			state.statueList.set(info.timestamp,info.data)
		},
		// 根据时间戳删除map对象中已经修改的检测状态信息
		DELET_STATUElIST(state,info){
			state.statueList.delete(info)
		},
		// 退出登录，清空数据
		DELET_INFO(state,info){
			state.token = ''
			state.custInfo = {}
			state.basisList = []
			state.instrumentList = []
		},
		// 设置蓝牙连接数据
		SET_BLUETOOTH(state,info){
			state.bluetooth = Object.assign(state.bluetooth,info)
		},
		// 设置规范依据
		SET_BASIS(state,info){
			state.basisList = info
		},
		// 设置设备列表
		SET_INSTRUMENT(state,info){
			state.instrumentList = info
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
		},
		// 设置蓝牙信息
		setBluetoothInfo({commit,state},{data,callback}){
			commit('SET_BLUETOOTH',data)
			if(callback){callback()}
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
		},
		// 获取检测状态上传列表
		getStatueList:state => state.statueList,
		// 获取蓝牙设备信息
		getBluetoothInfo: state => state.bluetooth,
		// 获取规范依据
		getBasisList: state => state.basisList,
		// 获取设备列表
		getInstrumentList: state => state.instrumentList
	}
})

export default store
