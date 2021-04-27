import request from "./request.js" 
export default {
	// 登录
	login(params) {
		return request.httpRequest("/api/auth/accessCode", "POST", params)
	},
	getToken(params) {
		return request.httpRequest("/api/sso/login", "GET", params)
	},
	// -----------------------------个人中心------------------------------------
	// 获取个人信息
	getCurrentUser(params) {
		return request.httpTokenRequest("/guns-cloud-system/entUser/getCurrentUser", "GET")
	},
	// 修改个人信息
	saveCurrentUser(params){
		return request.httpTokenRequest("/guns-cloud-system/entUser/saveCurrentUser", "POST",params)
	},
	// 修改密码
	updatePwd(params) {
		return request.httpTokenRequest("/guns-cloud-system/entUser/updatePassword", "POST", params)
	},
	
	// --------------------------------------设施分项----------------------------------
	// 查询隧道列表
	queryChunnelList(params) {
		return request.httpTokenRequest("/guns-cloud-config/chunnelInfo/queryList", "POST", params)
	},
	
	// 根据隧道id查询设施分项
	queryCheckRecordsList(params) {
		return request.httpTokenRequest("/guns-cloud-config/gunscheckRecords/queryList", "POST", params)
	},
	// 修改设施分项
	updataDisease(params){
		return request.httpTokenRequest("/guns-cloud-config/projectDevice/update", "POST",params)
	},
	// 添加设施分项
	addProjectDevice(params){
		return request.httpTokenRequest("/guns-cloud-config/projectDevice/addAndUpdate", "POST", params)
	},
	// 删除设施分项
	delProjectDevice(params){
		return request.httpTokenRequest("/guns-cloud-config/projectDevice/delete", "POST", params)
	},
	queryProjectInfo(params){
		return request.httpTokenRequest("/guns-cloud-config/projectInfo/queryList", "POST", params)
	},
	updateProjectInfo(params){
		return request.httpTokenRequest("/guns-cloud-config/projectInfo/update", "POST", params)
	},
	// --------------------------------------设施分项----------------------------------
	
	// ------------------------------病害信息----------------------------------
	// 查询病害信息
	queryList(params) {
		return request.httpRequest("/guns-cloud-config/gunscheckRecords/queryList", "POST", params)
	},
	// 添加修改病害信息
	updateVirusInfo(params) {
		return request.httpRequest("/guns-cloud-config/gunscheckRecords/update", "POST", params)
	},
	// 根据设备名称编号查询病害列表
	diseaseList(params) {
		return request.httpRequest("/guns-cloud-config/gunsdiseaseParams/queryList", "POST", params)
	},
	// 查看病害详情
	VirusDetailInfo(params) {
		return request.httpRequest("/guns-cloud-config/gunscheckRecords/queryDetail", "POST", params)
	},
	// --------------------------------病害信息--------------------------------
}