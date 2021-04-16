export default {
	/**
	 * 格式化时间 "yyyy-MM-dd HH:mm:ss"
	 * time:Thu Apr 15 2021 14:23:24 GMT+0800   标准时间格式
	 */
	getDate(time){
		let y = time.getFullYear();
		let MM = time.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;//月补0
		let d = time.getDate();
		d = d < 10 ? ('0' + d) : d;//天补0
		let h = time.getHours();
		h = h < 10 ? ('0' + h) : h;//小时补0
		let m = time.getMinutes();
		m = m < 10 ? ('0' + m) : m;//分钟补0
		let s = time.getSeconds();
		s = s < 10 ? ('0' + s) : s;//秒补0
		return y + '-' + MM + '-' + d + ' ' + h + ':' + m+ ':' + s; //年月日时分秒
	}
}