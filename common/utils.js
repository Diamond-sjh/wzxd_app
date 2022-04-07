import store from '../store/index.js';
let macValue;
let bluetoothInfo = store.state.bluetooth;
let timer = null
let timer1 = null
export default {
	/**
	 * 格式化时间 "yyyy-MM-dd HH:mm:ss"
	 * time:Thu Apr 15 2021 14:23:24 GMT+0800   标准时间格式
	 */
	getDate(time,format){
		let defaultFormat = format?format:'yyyy-MM-dd HH:mm:ss'
		let y = time.getFullYear();//年份
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
		if(defaultFormat == 'yyyy-MM-dd HH:mm:ss'){
			return y + '-' + MM + '-' + d + ' ' + h + ':' + m+ ':' + s; //年月日时分秒
		}
		if(defaultFormat == 'yyyy-MM-dd'){
			return y + '-' + MM + '-' + d; //年月日
		}
		if(defaultFormat == 'HH:mm:ss'){
			return h + ':' + m+ ':' + s; //时分秒
		}
	},
	// 打开蓝牙
	openPhoneBluetooth(){
		let main, BluetoothAdapter, BAdapter;
		switch(uni.getSystemInfoSync().platform){
			case 'android':
				main  = plus.android.runtimeMainActivity();
				BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
				BAdapter = BluetoothAdapter.getDefaultAdapter();
				if(!BAdapter.isEnabled()) {  
					BAdapter.enable();  
				}
				break;
			case 'ios':
				console.log('运行在ios上')
				break;
			default:
				console.log('运行在开发者工具上')
				break;
		}
	},
	// 启用 notify 功能
	notifyBLECharacteristicValueChange(callback) {
		uni.notifyBLECharacteristicValueChange({
			deviceId:bluetoothInfo.deviceId,
			serviceId:bluetoothInfo.serviceId,
			characteristicId:bluetoothInfo.notifyUUid,
			state:true,
			success: (res) => {
				console.log("广播开启成功----" + bluetoothInfo.notifyUUid)
				this.onBLECharacteristicValueChange(callback);
			},
			fail: (err) => {
				console.error(err)
				uni.showToast({
				    title: '蓝牙连接异常',
					icon: 'error',
				    duration: 2000
				});
			}
		})
	},
	// 监听低功耗蓝牙设备的特征值变化
	onBLECharacteristicValueChange(callback) {
		console.log('onBLECharacteristicValueChange')
		uni.onBLECharacteristicValueChange((res) => {
			macValue = macValue + this.ab2str(res.value);
			console.log(macValue)
			if(timer){
				clearTimeout(timer) 
				timer = null
			}else{
				timer = setTimeout(() => {
					callback(macValue)
					clearTimeout(timer)
					timer = null
				},1000)
			}
		})
		timer1 = setTimeout(() => {
			this.write()
		},1000)
		
	},
	write() {
		console.log('write')
		clearTimeout(timer1)
		timer1 = null
		let buffer = this.str2ab('Ed')
		plus.bluetooth.writeBLECharacteristicValue({
			deviceId: bluetoothInfo.deviceId,
			serviceId: bluetoothInfo.serviceId,
			characteristicId: bluetoothInfo.writeUUid, 
			writeType: 'writeNoResponse',
			value: buffer,
			success: (res) => {
				//此时设备已接收到你写入的数据
				console.log("写入成功---" + bluetoothInfo.writeUUid)
				macValue = ''
			},
			fail: (err) => {
				console.log(err)
			}
		})
	},
	//arraybuffer 转字符串 参数为ArrayBuffer对象
	ab2str(str) {
		// ArrayBuffer转16进度字符串示例
		function ab2hex(buffer) {
			const hexArr = Array.prototype.map.call(
				new Uint8Array(buffer),
				function(bit) {
					return ('00' + bit.toString(16)).slice(-2)
				}
			)
			return hexArr.join('')
		}
		//16进制
		let systemStr = ab2hex(str)
		function hexCharCodeToStr(hexCharCodeStr) {
			var trimedStr = hexCharCodeStr.trim();
			var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
			var len = rawStr.length;
			if (len % 2 !== 0) {
				alert("Illegal Format ASCII Code!");
				return "";
			}
			var curCharCode;
			var resultStr = [];
			for (var i = 0; i < len; i = i + 2) {
				curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
				let str5 = String.fromCharCode(curCharCode)
				if (str5.startsWith('\n') == false) {
					resultStr.push(String.fromCharCode(curCharCode));
				}
			}
			return resultStr.join("");
	
		}
		return hexCharCodeToStr(systemStr)
	},
	// 字符串转为ArrayBuffer对象，参数为字符串
	str2ab(str) {
		// 创建一个固定长度的二进制缓冲区  二进制ArrayBuffer对象
	    let buffer = new ArrayBuffer(str.length*2); // 在Unicode编码方案中，一个英文字符或一个汉字字符都占用两个字节的空间
		// 操作二进制ArrayBuffer对象
		let dataView = new DataView(buffer)
		for (var i=0, strLen = str.length; i<strLen; i++) {
			// 设置占8-bit的字节数组  一个字节  16进制数据
			dataView.setUint8(i, parseInt((str.charCodeAt(i)).toString(16),16) )
			// dataView.setUint8(i, '0X' + value.substring(i * 2, i * 2 + 2)); 错误写法  ：需要16进制数字类型 不能字符串
		}
	    return buffer;
	},
}