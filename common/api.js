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
	
	
	// ---------------------------待检测项目----------------------------------
	// 筛选待检测项目
	queryList(params) {
		return request.httpRequest("/guns-cloud-config/gunscheckRecords/queryLists", "POST", params)
	},
	// 根据设备名称编号查询病害列表
	diseaseList(params) {
		return request.httpRequest("/guns-cloud-config/gunsdiseaseParams/queryList", "POST", params)
	},
	// 添加病害信息
	addDisease(params){
		return request.httpTokenRequest("/guns-cloud-config/gunscheckRecords/update", "POST", params)
	},
	// 修改病害信息
	updataDisease(params){
		return request.httpTokenRequest("/guns-cloud-config/projectDevice/update", "POST",params)
	},
	// 修改/新增的 新增 按钮 调用接口1
	queryListProjectInfo(params){
		return request.httpTokenRequest("/guns-cloud-config/projectInfo/queryList", "POST", params)
	},
	// 修改/新增的 新增 按钮 调用接口2
	addProjectDevice(params){
		return request.httpTokenRequest("/guns-cloud-config/projectDevice/add", "POST", params)
	},
	// 修改/新增的 新增 按钮 调用接口3
	updateProjectInfo(params){
		return request.httpTokenRequest("/guns-cloud-config/projectInfo/update", "POST", params)
	},
	// --------------------------------添加待检测项目--------------------------------
	// 查询隧道列表
	queryChunnelList(params) {
		return request.httpTokenRequest("/guns-cloud-config/chunnelInfo/queryList", "POST", params)
	}
}