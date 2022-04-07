import request from "./request.js" 
// const url = 'http://47.114.76.25:9530/prod-api'
const url = 'http://localhost:9530/dev-api'
export default {
	// 登录接口
	login(params){
		return request.httpRequest("/login", "POST", params,url)
	},
	// 获取验证码
	captchaImage(params){
		return request.httpRequest("/captchaImage", "GET", params,url)
	},
	// 查询工程项目
	queryProjectList(params){
		return request.httpTokenRequest("/project/project/noPagelist", "GET", params,url)
	},
	// 查询全站仪录入数据
	query(params){
		return request.httpTokenRequest("/project/station/list", "GET", params,url)
	},
	// 新增全站仪数据
	add(params){
		return request.httpTokenRequest("/project/station", "POST", params,url)
	},
	// 查询钢架内力及外力、围岩压力、支护、衬砌内应力、锚杆轴力检测记录数据
	queryGwzmRecordSon(params){
		return request.httpTokenRequest("/project/GwzmRecordSon/list", "GET", params,url)
	},
	// 新增围岩数据
	addGwzmRecordSon(params){
		return request.httpTokenRequest("/project/GwzmRecordSon", "POST", params,url)
	},
	// 查询 洞内外观察 检测记录数据
	queryInoutcaveObservationRecord(params){
		return request.httpTokenRequest("/project/InoutcaveObservationRecord/list", "GET", params,url)
	},
	// 新增洞内外观察数据
	addInoutcaveObservationRecord(params){
		return request.httpTokenRequest("/project/InoutcaveObservationRecord", "POST", params,url)
	},
	// 查询 规范依据列表
	queryBasisNoPagelist(params){
		return request.httpTokenRequest("/project/basis/noPagelist", "GET", params,url)
	},
	// 查询 检测设备列表
	queryInstrumentNoPagelist(params){
		return request.httpTokenRequest("/project/instrument/noPagelist", "GET", params,url)
	},
	// 查询 监控计划 数据
	queryStatistics(params){
		return request.httpTokenRequest("/project/statistics/list", "GET", params,url)
	},
	// 新增 监控计划 数据
	addStatistics(params){
		return request.httpTokenRequest("/project/statistics", "POST", params,url)
	}
}