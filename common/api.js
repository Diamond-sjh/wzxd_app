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
		return request.httpTokenRequest("/guns-cloud-config/projectDevice/queryList", "GET", params)
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
	// 删除上传图片
	deletVirusImg(params) {
		return request.httpTokenRequest("/guns-cloud-config/gunscheckRecords/removeImg", "POST", params)
	},
	// 添加修改病害信息（暂未使用）
	updateVirusInfo(params) {
		return request.httpTokenRequest("/guns-cloud-config/gunscheckRecords/update", "POST", params)
	},
	// 保存并上传图片（暂未使用）
	updateAndUpload(params) {
		return request.httpUploadRequest("/guns-cloud-config/gunscheckRecords/updateAndUpload", "POST", params)
	},
	// 修改检测状态
	updateChecked(params) {
		return request.httpTokenRequest("/guns-cloud-config/gunscheckRecords/updateChecked", "POST", params)
	},
	// 根据查询病害列表
	diseaseList(params) {
		return request.httpRequest("/guns-cloud-config/gunsdiseaseParams/queryList", "POST", params)
	},
	// 查看病害详情
	VirusDetailInfo(params) {
		return request.httpRequest("/guns-cloud-config/gunscheckRecords/queryDetail", "POST", params)
	},
	// ------------------------------病害信息----------------------------------
	// -------------------------------桥梁信息----------------------------
	// 获取所有桥梁信息
	getBridgeName(params) {
		return request.httpRequest("/bridgeDatabase/getBridgeName", "GET", params,'http://47.98.199.60:8001')
	},
	// 获取指定桥梁信息
	getBridgeInfoForName(params) {
		return request.httpRequest("/bridgeDatabase/queryListPage", "GET", params,'http://47.98.199.60:8001')
	},
	// 获取菜单列表
	getAppLeftMenuList(params) {
		return request.httpRequest("/menu/getAppLeftMenuList", "GET", params,'http://47.98.199.60:8001')
	},
	// 获取当前监测项目对应的截面列表
	getBridgeMonitorSections(params) {
		return request.httpRequest("/bridgeMonitorSection/getBridgeMonitorSections", "GET", params,'http://47.98.199.60:8001')
	},
	// 获取当前截面对应的测点
	queryListSections(params) {
		return request.httpRequest("/bridgeMonitorInfo/queryList", "POST", params,'http://47.98.199.60:8001')
	},
	// 环境温湿度
	humitureInfo(params) {
		return request.httpRequest("/stbEnvTempHum/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 风速风向
	windLoad(params) {
		return request.httpRequest("/StbWindSpeedDirect/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 地震监测
	earthquake(params) {
		return request.httpRequest("/earthquake/getHourData", "POST", params,'http://47.98.199.60:8004')
	},
	// 钢箱梁监测
	stbBoxgirderTempHum(params) {
		return request.httpRequest("/stbBoxgirderTempHum/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 索力检测
	CableForce(params) {
		return request.httpRequest("/stbCableForce/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 结构应变 ---
	structuralStrain(params) {
		return request.httpRequest("/StbSectionStrain/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 主梁伸缩缝
	expansionJoint(params) {
		return request.httpRequest("/StbExpansionJoint/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 裂缝宽度 ---
	StbCrack(params) {
		return request.httpRequest("/StbCrack/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 结构温度 ---
	structuralTemperature(params) {
		return request.httpRequest("/StbSectionTemp/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 主梁挠度
	girder(params) {
		return request.httpRequest("/StbGirderDeflection/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 结构振动 ---
	structuralVibration(params) {
		return request.httpRequest("/StbAcceleration/getHourData", "POST", params,'http://47.98.199.60:8004')
	},
	// 主梁位移
	girderOffset(params) {
		return request.httpRequest("/StbGirderDisplacement/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 空间变位
	StbGnss(params) {
		return request.httpRequest("/StbGnss/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 空间变位（倾斜）
	StbSpaceLean(params) {
		return request.httpRequest("/StbSpaceLean/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 车速
	StbVehicleSpeed(params) {
		return request.httpRequest("/StbVehicleSpeed/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 轴数
	stbAxleQuantity(params) {
		return request.httpRequest("/stbAxleQuantity/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// 总重
	StbTotalWeight(params) {
		return request.httpRequest("/StbTotalWeight/selectHour", "POST", params,'http://47.98.199.60:8004')
	},
	// -------------------------------桥梁信息----------------------------
	
	
}