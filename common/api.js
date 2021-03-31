import request from "./request.js"
export default {
	// 筛选待检测项目
	queryList(params) {
		return request.httpRequest("/guns-cloud-config/projectDevice/queryListPage", "GET", params)
	},
}