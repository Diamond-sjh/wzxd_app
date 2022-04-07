<template>
	<view class="wrap meetingRecord">
		<view v-for="(item,index) in bluetoothList" :key="index" class="sb-list pd-f-r-40 flex-nowrap align-items-center ft-28 m-t-24">
			<view style="padding: 10px;border: 1px solid #007AFF; display: flex;">
				<view style="width: 60%;">
					<text style="color:pink">{{item.name}}</text> 
					<text>{{item.deviceId}}</text> 
				</view>
				<view style="flex: 1; display: flex;">
					<button style="flex :1" :disabled="isDisstate" @click="connetBlue(item)">连接</button>
					<button style="flex :1" :disabled="!isDisstate" @click="stop">断开连接</button>
				</view>
			</view>
			<view class="" v-show="item.deviceId == deviceId">
				<view style="padding: 10px;" v-for="(item,index) in serverList" :key="index">
					服务---{{item.uuid}}
					<view style="padding: 10px;" v-for="(value,index) in characteristics" v-show="item.uuid == serviceId">
						特征值------{{value.uuid}}
						<view style="display: flex;">
							<button style="flex:1; padding: 0 20px" type="default" v-if="value.properties.read" @click="read(value.uuid)">读取数据</button>
							<button style="flex:1; padding: 0 20px" type="default" v-if="value.properties.write" @click="write(value.uuid)">写入数据</button>
							<button style="flex:1; padding: 0 20px" type="default" v-if="value.properties.notify" @click="notifyBLECharacteristicValueChange(value.uuid)">监听数据</button>
						</view>
					</view>
				</view>
			</view>
		 </view>
		 <u-modal v-model="show" :title-style="{color: 'red'}" @confirm="writesss()">
			<view class="slot-content">
				<u-input v-model="sendVal" type="text" />
			</view>
		</u-modal>
	</view>
</template>

<script>
	var that
	export default{
		
		data() {
			return {
				isDisstate:false,
				show:false,
				sendVal:'',
				bluetoothList: [], // 蓝牙设备列表
				deviceId: "", // 要连接蓝牙设备id
				serverList: [], // 连接蓝牙设备的服务数据
				serviceId: "", // 连接蓝牙设备的服务id
				characteristics: [], // 连接蓝牙设备的特征值数据
				characteristicId: "", // 连接蓝牙设备的特征值id
				notifyUUid:'',
				writeUUid:'',
				macAddress: "", // 读取NOTIFY返回mac地址
				macValue: "", // 读取NOTIFY返回数据
			};
		},
		onLoad(){
			that = this
			this.getBluetoot()
		},
		methods:{
			// 蓝牙初始化
			getBluetoot(){
				plus.bluetooth.openBluetoothAdapter({
					success:(e) => {
						console.log('初始化成功');
						this.bluetooth_list()
					},
					fail:(e) => {
						console.log('open failed: '+JSON.stringify(e));
					}
				});
			},
			// 获取已配对蓝牙列表
			bluetooth_list() {  
			    var main = plus.android.runtimeMainActivity();  
			    var BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");  
			    var BAdapter = BluetoothAdapter.getDefaultAdapter();  
			    var Context = plus.android.importClass("android.content.Context");  
			    var lists = BAdapter.getBondedDevices();  
			    plus.android.importClass(lists);  
			    var len = lists.size();  
			    var iterator = lists.iterator();  
			    plus.android.importClass(iterator);  
			    while (iterator.hasNext()) {  
			        var d = iterator.next();  
			        plus.android.importClass(d); 
					that.bluetoothList.push({name:d.getName(),deviceId:d.getAddress()})
			    }  
			},
			// 点击蓝牙连接
			connetBlue(item) {
				this.deviceId = item.deviceId
				uni.createBLEConnection({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: this.deviceId, //设备id
					success: (res) => {
						uni.showToast({
							title: '连接成功',
							icon: 'fails',
							duration: 800
						}),
						this.isDisstate = true
						//获取蓝牙服务
						setTimeout(()=>{
							this.getBLEDeviceServices(this.deviceId);
						},1500)
					},
					fail: (res) => {
						console.log(res)
					},
				})
			},
			// 获取服务列表
			getBLEDeviceServices(deviceId) {
				uni.getBLEDeviceServices({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: deviceId,
					success: (res) => {
						if(res.services && res.services.length > 0){
							this.serverList = res.services
							this.serviceId = res.services[3].uuid
							this.getBLEDeviceCharacteristics() //6.0
						}
						
					},
					fail: function(res) {
						console.log(res)
					},
				})
			},
			// 获取特征值
			getBLEDeviceCharacteristics() {
				uni.getBLEDeviceCharacteristics({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: this.deviceId,
					// 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
					serviceId: this.serviceId,
					success: (res) => {
						console.log(res)
						if(res.characteristics && res.characteristics.length > 0){
							this.characteristics = res.characteristics
							this.notifyUUid = res.characteristics[2].uuid
							this.writeUUid = res.characteristics[3].uuid
							// this.notifyBLECharacteristicValueChange()
						}
						
					},
					fail: function(res) {
						console.log(res)
					},
				})
			},
			// 启用 notify 功能
			notifyBLECharacteristicValueChange(characteristicId) {
				uni.notifyBLECharacteristicValueChange({
					deviceId:this.deviceId,
					serviceId:this.serviceId,
					characteristicId:characteristicId,
					state:true,
					success: (res) => {
						console.log("广播开启成功----" + characteristicId)
						this.onBLECharacteristicValueChange();
					},
					fail: (err) => {
						console.error(err)
					}
				})
			},
			// 监听低功耗蓝牙设备的特征值变化
			onBLECharacteristicValueChange(deviceId) {
				uni.onBLECharacteristicValueChange((res) => {
					// this.macAddress = res.deviceId;
					this.macValue = this.macValue + this.ab2str(res.value);
					console.log(this.macValue)
				})
			
			},
			
			//点击发送数据
			write(characteristicId){
				this.show = true
				this.characteristicId = characteristicId
			},
			
			
			writesss(characteristicId) {
				let buffer = this.str2ab(this.sendVal)
				
				// let str = this.strToHexCharCode(this.sendVal)
				// const buffer = new ArrayBuffer(4)
				// const dataView = new DataView(buffer)
				// dataView.setUint8(0, 69)
				// dataView.setUint8(0, 0X45)   69 == parseInt('45',16)
				
				// dataView.setUint8(1, 100)
				// dataView.setUint8(1, 0X64)   100 == parseInt('64',16)


				// uni.writeBLECharacteristicValue({
				plus.bluetooth.writeBLECharacteristicValue({
					deviceId: this.deviceId,
					serviceId: this.serviceId,
					characteristicId: this.characteristicId, 
					writeType: 'writeNoResponse',
					value: buffer,
					success: (res) => {
						//此时设备已接收到你写入的数据
						console.log("写入成功---" + this.characteristicId)
						this.macValue = ''
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			read(characteristicId){
				uni.readBLECharacteristicValue({
				  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				  deviceId:this.deviceId,
				  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
				  serviceId: this.serviceId,
				  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
				  characteristicId:characteristicId,
				  success(res) {
				    console.log('readBLECharacteristicValue:----' + characteristicId)
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


			
			// 断开连接
			stop(){
				uni.closeBLEConnection({
				  deviceId:this.deviceId,
				  success(res) {
					that.isDisstate = false
				    console.log('断开成功' + res)
				  }
				})
			}
		}
	}
</script>

<style>
</style>
