<template>
	<view class="wrap navbar">
		<u-navbar back-icon-color="white" title="蓝牙列表" title-color="white"></u-navbar>
		<u-cell-group>
			<u-cell-item 
			v-for="(item,index) in bluetoothList" 
			:key="index"
			:arrow="false"
			:title="item.name">
				<u-button slot="right-icon" type="warning" @click="connetBlue(item)">{{item.connect?'断开连接':'连接'}}</u-button>
			</u-cell-item>
		</u-cell-group>
		<!-- 消息提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import bluetoothTool from '@/common/BluetoothTool.js'
	var that
	export default{
		data() {
			return {
				connectBluetooth:{},
				bluetoothList: [], // 蓝牙设备列表
				deviceId: "", // 要连接蓝牙设备id
				bluetoothName:'',// 要连接蓝牙设备name
				serviceId: "", // 连接蓝牙设备的服务id
				characteristics: [], // 连接蓝牙设备的特征值数据
				notifyUUid:'',
				writeUUid:'',
			};
		},
		onLoad(){
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toBluetooth', (val) => {
				this.connectBluetooth = Object.assign(this.connectBluetooth,val)
				this.getBluetoot()
			})
			that = this
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
				let bluetoothList = []
			    while (iterator.hasNext()) {  
			        var d = iterator.next();  
			        plus.android.importClass(d);
					bluetoothList.push({name:d.getName(),deviceId:d.getAddress(),connect:false})
			    }  
				bluetoothList.forEach((val) => {
					if(val.name == that.connectBluetooth.blueName && val.deviceId == that.connectBluetooth.deviceId){
						val.connect = true
					}
				})
				that.bluetoothList = bluetoothList
			},
			// 点击蓝牙连接
			connetBlue(item) {
				this.deviceId = item.deviceId
				this.bluetoothName = item.name
				if(this.connectBluetooth && this.connectBluetooth.deviceId){
					if(!item.connect){
						that.$refs.uToast.show({
							title: '请先断开连接',
							type: 'error',
							duration: 800
						})
					}else{
						this.stop(this.connectBluetooth.deviceId,item)
					}
				}else{
					uni.showLoading({
						title: '正在连接...'
					})
					createBLEConnection(item.deviceId)
				}
				function createBLEConnection(deviceId){
					uni.createBLEConnection({
						// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
						deviceId: deviceId, //设备id
						timeout: 3000,
						success: (res) => {
							uni.onBLEConnectionStateChange(function (res) {
							  // 该方法回调中可以用于处理连接意外断开等异常情况
							  console.log(res)
							})
							//获取蓝牙服务
							setTimeout(()=>{
								that.getBLEDeviceServices(that.deviceId,item);
							},1500)
						},
						fail: (res) => {
							console.log(res)
							uni.hideLoading()
							// 经典蓝牙流程
							bluetoothTool.connDevice(deviceId,(result)=>{
								if(result) {
									uni.setStorage({
										key: 'storage_bluetooth',
										data: {
											versions:'2.0',
											deviceId: that.deviceId,
											bluetoothName: that.bluetoothName,
											serviceId: '',
											characteristicId: '',
											notifyUUid:'',
											writeUUid:''
										},
										success: () => {
											that.backFunction()
										}
									})
									uni.hideLoading()
									item.connect = true
								}
							});
						},
					})
				}
			},
			// 获取服务列表
			getBLEDeviceServices(deviceId,itemDevive) {
				uni.getBLEDeviceServices({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: deviceId,
					success: (res) => {
						if(res.services && res.services.length > 0){
							res.services.some(item => {
								if((item.uuid.includes("FFE0") || item.uuid.includes("49535343")) && item.isPrimary){
									console.log(item.uuid)
									this.serviceId = item.uuid
									this.getBLEDeviceCharacteristics()
									itemDevive.connect = true
									uni.hideLoading()
									return true
								}
							})
						}
					},
					fail: function(res) {
						console.log(res)
						// 经典蓝牙流程
						bluetoothTool.connDevice(deviceId,(result)=>{
							if(result) {
								uni.setStorage({
									key: 'storage_bluetooth',
									data: {
										versions:'2.0',
										deviceId: that.deviceId,
										bluetoothName: that.bluetoothName,
										serviceId: '',
										characteristicId: '',
										notifyUUid:'',
										writeUUid:''
									},
									success: () => {
										that.backFunction()
									}
								})
								uni.hideLoading()
								itemDevive.connect = true
							}
						});
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
							if(this.serviceId.includes("49535343")){
								this.notifyUUid = res.characteristics[2].uuid
								this.writeUUid = res.characteristics[3].uuid
							}else{
								res.characteristics.some(item => {
									if (item.properties.write && item.properties.notify) {
										this.notifyUUid = item.uuid
										this.writeUUid = item.uuid
										return true
									}
								})
							}
							uni.setStorage({
								key: 'storage_bluetooth',
								data: {
									versions:'4.0+',
									deviceId: this.deviceId,
									bluetoothName: this.bluetoothName,
									serviceId: this.serviceId,
									characteristicId: this.characteristics,
									notifyUUid:this.notifyUUid,
									writeUUid:this.writeUUid
								},
								success: () => {
									that.backFunction()
								}
							})
						}
					},
					fail: function(res) {
						console.log(res)
					},
				})
			},
			// 蓝牙数据保存成功的回调
			backFunction(){
				let a = uni.getStorageSync('storage_bluetooth') ? uni.getStorageSync('storage_bluetooth') : null
				const eventChannel = this.getOpenerEventChannel();
				eventChannel.emit('bluetoothToIndex');
				this.$refs.uToast.show({
					title: '蓝牙连接成功',
					type: 'success',
					back: true,
					duration: 800
				})
			},
			// 断开连接
			stop(deviceId,connectDevice){
				let a = uni.getStorageSync('storage_bluetooth') ? uni.getStorageSync('storage_bluetooth') : null
				if(a.versions == '2.0'){
					bluetoothTool.disConnDevice(() => {
						const eventChannel = that.getOpenerEventChannel();
						eventChannel.emit('bluetoothToIndex','stop');
						that.$refs.uToast.show({
							title: '断开连接成功',
							type: 'success',
							duration: 800
						})
						uni.setStorage({
							key: 'storage_bluetooth',
							data: {
								versions: '',
								deviceId: '',
								bluetoothName: '',
								serviceId: '',
								characteristicId: '',
								notifyUUid:'',
								writeUUid:''
							}
						})
						connectDevice.connect = false
						that.connectBluetooth = {}
					})
				}else{
					uni.closeBLEConnection({
					  deviceId:deviceId,
					  success(res) {
						const eventChannel = that.getOpenerEventChannel();
						eventChannel.emit('bluetoothToIndex','stop');
						that.$refs.uToast.show({
							title: '断开连接成功',
							type: 'success',
							duration: 800
						})
						uni.setStorage({
							key: 'storage_bluetooth',
							data: {
								versions: '',
								deviceId: '',
								bluetoothName: '',
								serviceId: '',
								characteristicId: '',
								notifyUUid:'',
								writeUUid:''
							}
						})
						connectDevice.connect = false
						that.connectBluetooth = {}
					  }
					})
					
				}
			}
		}
	}
</script>

<style>
</style>
