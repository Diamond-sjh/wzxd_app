<template>

	<!-- 基本信息————导入检测数据页面 -->
	<view class="data-wrap">
		<!-- navbar -->
		<navbar-component :title="navTitle" :isUser="false" :pageUrl="pageUrl" type="redirectTo"></navbar-component>
		<view class="main-content">
			<view class="title-wrap">
				<view class="left"> </view>
				<view class="name">
					蓝牙设备列表
				</view>
				<view class="right"></view>
			</view>
			<view class="item-wrap" v-for="(item,index) in bluetoothList" :key="index">
				<view class="left text-hidden">
					{{ item.name || item.localName || item.deviceId}}
				</view>
				<view class="right" @click="tapQuery(item)">
					连接
				</view>
			</view>
			<view class="alert-title" v-if="bluetoothList.length===0">
				暂无设备，请扫描设备
			</view>
		</view>
		<view class="btn-wrap">
			<view class="btn btn-ng" @click="scanBluetooth">
				设备扫描
			</view>
			<view class="btn btn-confirm" @click="importData">
				导入
			</view>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import sendRequest from '../../utils/sendRequest.js';
	import {
		mapGetters
	} from "vuex";
	import base from '../../utils/base.js'
	export default {
		data() {
			return {
				navTitle: "检测数据导入", // navbar名称
				pageUrl: "/pages/baseInfo/importDataType", // navbar跳转地址
				bluetoothList: [], // 蓝牙设备列表
				adapterState: { // 蓝牙初始化的状态
					discovering: false,
					available: false
				},
				equipment: [], // 选择要连接的设备
				deviceId: "", // 要连接蓝牙设备id
				connected: false, // 蓝牙设备连接状态
				commandCode: "READ", // 测尘仪须输入的命令
				serverList: [], // 连接蓝牙设备的服务数据
				serviceId: "", // 连接蓝牙设备的服务id
				characteristics: [], // 连接蓝牙设备的特征值数据
				characteristicId: "", // 连接蓝牙设备的特征值id
				macAddress: "", // 读取NOTIFY返回mac地址
				macValue: "", // 读取NOTIFY返回数据
				readCodeMsg: "", // 读取返回数据
				readCode: "", // 读取设备返回的信息码
				returnMessage: "", // 发送回调数据

				valueChangeData: {},
			};
		},
		computed: {
			...mapGetters(["getterDetailId", "getterDangerFactor", "getterDeviceType", "getterCheckPointId", "getterSn"]),
		},
		// 监听页面加载
		onLoad(option) {
			this.openBluetoothAdapter();
		},
		onShow() {},
		// 监听页面卸载
		onUnload() {
			uni.closeBluetoothAdapter({
				success: res => {
					console.log('断开蓝牙模块成功');
					this.equipment = [];
					this.serverList = [];
					this.characteristics = [];
					this.connected = false;
					this.macValue = ";"
					this.valueChangeData = {};
					this.adapterState = [];
					// toast('断开蓝牙模块');
				}
			});
		},
		methods: {
			// 扫描蓝牙设备
			scanBluetooth() {
				this.bluetoothList = [];
				this.openBluetoothAdapter();

			},
			// 初始化蓝牙模块
			openBluetoothAdapter() {
				uni.openBluetoothAdapter({
					success: e => {
						console.log('初始化蓝牙成功:' + e.errMsg);
						console.log(JSON.stringify(e));
						this.getBluetoothAdapterState();
					},
					fail: e => {
						console.log(e)
						console.log('初始化蓝牙失败，错误码：' + (e.errCode || e.errMsg));
						if (e.errCode !== 0) {
							initTypes(e.errCode, e.errMsg);
						}
					}
				});
			},
			// 获取本机蓝牙适配器状态
			getBluetoothAdapterState() {
				console.log('--->');
				uni.getBluetoothAdapterState({
					success: res => {
						console.log(JSON.stringify(res));
						this.adapterState = res;
						this.startBluetoothDevicesDiscovery();
					},
					fail: e => {
						console.log('获取本机蓝牙适配器状态失败，错误码：' + e.errCode);
						if (e.errCode !== 0) {
							initTypes(e.errCode);
						}
					}
				});
			},
			// 开始搜索蓝牙设备
			startBluetoothDevicesDiscovery() {
				uni.startBluetoothDevicesDiscovery({
					success: e => {
						console.log('开始搜索蓝牙设备:' + e.errMsg);
						this.searchLoad = true;
						this.onBluetoothDeviceFound();
					},
					fail: e => {
						console.log('搜索蓝牙设备失败，错误码：' + e.errCode);
						if (e.errCode !== 0) {
							initTypes(e.errCode);
						}
					}
				});
			},
			// 停止搜索蓝牙设备
			stopBluetoothDevicesDiscovery(types) {
				uni.stopBluetoothDevicesDiscovery({
					success: e => {
						console.log('停止搜索蓝牙设备:' + e.errMsg);
					},
					fail: e => {
						console.log('停止搜索蓝牙设备失败，错误码：' + e.errCode);
						if (e.errCode !== 0) {
							initTypes(e.errCode);
						}
					}
				});
			},
			// 发现外围设备
			onBluetoothDeviceFound() {
				uni.onBluetoothDeviceFound(devices => {
					console.log('开始监听寻找到新设备的事件');
					// this.$set(this.disabled, 3, false);
					this.getBluetoothDevices();
				});
			},
			// 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
			getBluetoothDevices() {
				this.bluetoothList = [];
				uni.getBluetoothDevices({
					success: res => {
						this.newDeviceLoad = false;
						console.log('获取蓝牙设备成功:' + res.errMsg);
						console.log(res)
						res.devices.forEach(item => {
							if (item.name != "") {
								this.bluetoothList.push(item);
							}
						});
					},
					fail: e => {
						console.log('获取蓝牙设备错误，错误码：' + e.errCode);
						if (e.errCode !== 0) {
							initTypes(e.errCode);
						}
					}
				});
			},
			// 选择连接设备
			tapQuery(item) {
				if (this.connected) {
					this.$refs.uToast.show({
						title: '已经连接蓝牙设备',
						type: 'warning',
					});
					return;
				}
				if (this.equipment.length > 0) {
					this.equipment[0] = item;
				} else {
					this.equipment.push(item);
				}
				this.createBLEConnection();
			},
			// 设置传输数据范围
			setBLEMTU() {
				console.log(">>>>>>>>");
				uni.setBLEMTU({
					deviceId: this.deviceId,
					mtu: 511,
					success: (res) => {
						console.log(res)
					},
					fail: (error) => {
						console.log(error)
					}
				});
			},
			// 连接低功耗蓝牙
			createBLEConnection() {
				this.deviceId = this.equipment[0].deviceId;
				uni.showToast({
					title: '连接蓝牙...',
					icon: 'loading',
					duration: 99999
				});
				uni.createBLEConnection({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: this.deviceId,
					success: res => {
						console.log(res);
						console.log('连接蓝牙成功:' + res.errMsg);
						// 连接设备后断开搜索 并且不能搜索设备
						this.stopBluetoothDevicesDiscovery(true);
						uni.hideToast();
						uni.showToast({
							title: '连接成功',
							icon: 'success',
							duration: 2000
						});
						this.connected = true;
						// this.setBLEMTU();
						this.getBLEDeviceServices(this.deviceId);
					},
					fail: e => {
						console.log('连接低功耗蓝牙失败，错误码：' + e.errCode);
						if (e.errCode !== 0) {
							initTypes(e.errCode);
						}
						uni.hideToast();
					}
				});
			},
			//获取蓝牙设备所有服务(service)。
			getBLEDeviceServices(deviceId) {
				console.log(deviceId)
				setTimeout(() => {
					uni.getBLEDeviceServices({
						// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
						deviceId: deviceId,
						success: (res) => {
							console.log('device services:', res)
							this.serverList = res.services
							res.services.forEach((item) => {
								if (item.uuid.indexOf("0003CDD0") != -1) {
									this.serviceId = item.uuid;
									console.log('serverId:', this.serviceId)
									this.getBLEDeviceCharacteristics(this.deviceId)
								}
							})
						}
					})
				}, 1000)
			},
			// 获取蓝牙特征值
			getBLEDeviceCharacteristics(deviceId) {
				console.log("进入特征");
				setTimeout(() => {
					uni.getBLEDeviceCharacteristics({
						// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
						deviceId: deviceId,
						// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
						serviceId: this.serviceId,
						success: (res) => {
							console.log(res)
							this.characteristics = res.characteristics
							res.characteristics.forEach((item) => {
								if (item.uuid.indexOf("0003CDD2") != -1) {
									this.characteristicId = item.uuid;
									console.log('characteristicId:', this.characteristicId)
								}
								if (item.uuid.indexOf("0003CDD1") != -1) {
									this.notifyBLECharacteristicValueChange(item.uuid);
								}
							})
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}, 2000)
			},
			// 启用 notify 功能
			notifyBLECharacteristicValueChange(characteristicId) {
				uni.notifyBLECharacteristicValueChange({
					state: true, // 启用 notify 功能
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: this.deviceId,
					// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					serviceId: this.serviceId,
					// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
					characteristicId: characteristicId,
					success: (res) => {
						console.log('notifyBLECharacteristicValueChange success', res.errMsg)
						// this.onBLECharacteristicValueChange(this.deviceId);
						this.onBLECharacteristicValueChange(this.deviceId);
					},
					fail: (res) => {
						console.log('notifyBLECharacteristicValueChange fail', res.errMsg)
					}
				})
			},
			// 字符串转arraybuffer
			ab2hex(buffer) {
				const hexArr = Array.prototype.map.call(
					new Uint8Array(buffer),
					function(bit) {
						return ('00' + bit.toString(16)).slice(-2)
					}
				)
				return hexArr.join('')
			},
			ab2str(buf) {
				return String.fromCharCode.apply(null, new Uint16Array(buf));
			},
			//arraybuffer 转字符串
			bufferString: function(str) {
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
				// console.log(hexCharCodeToStr(systemStr),99)
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
				// console.log(hexCharCodeToStr(systemStr),888)
				return hexCharCodeToStr(systemStr)
			},
			// 监听低功耗蓝牙设备的特征值变化
			onBLECharacteristicValueChange(deviceId) {
				uni.onBLECharacteristicValueChange((res) => {
					this.macAddress = res.deviceId;
					this.macValue = this.macValue + this.bufferString(res.value);
				})

			},
			// 读取设备二进制数据
			readBLECharacteristicValue() {
				console.log('进入读取');
				// setTimeout(()=>{
				uni.readBLECharacteristicValue({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: this.deviceId,
					// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					serviceId: this.serviceId,
					// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
					characteristicId: this.characteristicId,
					success: (res) => {
						console.log('readBLECharacteristicValue:', res)
						this.readCode = res.errCode;
						this.readCodeMsg = res.errMsg;
						// this.notifyBLECharacteristicValueChange(this.deviceId);
					},
					fail: (res) => {
						console.log('readBLECharacteristicValue:', res)
						this.readCode = res.errCode;
						this.readCodeMsg = res.errMsg;
						// this.onBLECharacteristicValueChange(this.deviceId);
					}
				})
				// },200)
			},
			// 发送二进制数据
			writeBLECharacteristicValue() {
				// let buffer = new ArrayBuffer(this.commandCode);
				// const dataView = new DataView(buffer)
				// dataView.setUint8(0, 0)
				const sgInt = this.string2buffer(this.commandCode);

				uni.writeBLECharacteristicValue({
					// 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
					deviceId: this.deviceId,
					// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					serviceId: this.serviceId,
					// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
					characteristicId: this.characteristicId,
					// 这里的value是ArrayBuffer类型
					value: sgInt,
					success: (res) => {
						this.returnMessage = res.errMsg;
						console.log('writeBLECharacteristicValue success', res)
						console.log(this.characteristicId);
						// 放在发送命令成功后执行传输范围修改，连接成功后修改，部分机型无效
						this.setBLEMTU();
						// 切换为读取特征值
						// this.characteristics.forEach((item)=>{
						//     if(item.uuid.indexOf("0003CDD1")!=-1){
						//         this.characteristicId = item.uuid;
						//         console.log('characteristicId:', this.characteristicId)
						//         // this.notifyBLECharacteristicValueChange(deviceId)
						//     }
						// })

					},
					fail: (res) => {
						this.returnMessage = res.errMsg;
						console.log('writeBLECharacteristicValue fail', res)
					}
				})
			},
			// 字符串转arraybuffer
			string2buffer(str) {
				// 首先将字符串转为16进制
				let val = ""
				for (let i = 0; i < str.length; i++) {
					if (val === '') {
						val = str.charCodeAt(i).toString(16)
					} else {
						val += ',' + str.charCodeAt(i).toString(16)
					}
				}
				// console.log(val)
				// 将16进制转化为ArrayBuffer
				return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function(h) {
					return parseInt(h, 16)
				})).buffer
			},
			// 导入数据
			importData() {
				if (this.connected) {
					uni.showLoading({
						title: '拼命导入中！'
					});
					setTimeout(() => {
						this.writeBLECharacteristicValue();
						this.connected = false;
					}, 1000);
					setTimeout(() => {
						uni.hideLoading();
						// 保存蓝牙数据
						console.log(this.macValue);
						let dataListPM = [];
						let queryList = [];
						dataListPM = this.macValue.split(";");
						console.log(dataListPM);
						// 对蓝牙传输的数据进行整形
						dataListPM.forEach(item => {
							if (item != "") {
								let subArr = item.split(":");
								console.log(subArr);
								let dustType = subArr[0] === "PM10" ? 1 : 2;
								let subArrString = subArr[3].split(" ");
								console.log(subArrString)
								let testStartTime = "20" + subArr[1] + ":" + subArr[2] + ":" +
									subArrString[0];
								let realTimeData = parseFloat(subArrString[1]);
								queryList.push({
									dustType: dustType,
									testStartTime: testStartTime,
									aeq: realTimeData,
									checkpointDetailId: this.getterDetailId,
									checkpointId: this.getterCheckPointId,
									dangerFactor: this.getterDangerFactor,
									sn: this.getterSn,
								});

							}
						});
						console.log(queryList);
						sendRequest.post('/datadustinput', queryList).then(res => {
							if (res.returnCode === "0000000") {
								this.$refs.uToast.show({
									title: '导入成功',
									type: 'success',
								})
								this.$tools.redirectTo('/pages/baseInfo/importDataOver');
							}
						});
					}, 10000);
				} else {
					this.$refs.uToast.show({
						title: '请先连接蓝牙设备',
						type: 'warning',
					});
				}
			}
		}
	}
	// 判断初始化蓝牙状态
	function initTypes(code, errMsg) {
		switch (code) {
			case 10000:
				toast('未初始化蓝牙适配器');
				break;
			case 10001:
				toast('未检测到蓝牙，请打开蓝牙重试！');
				break;
			case 10002:
				toast('没有找到指定设备');
				break;
			case 10003:
				toast('连接失败');
				break;
			case 10004:
				toast('没有找到指定服务');
				break;
			case 10005:
				toast('没有找到指定特征值');
				break;
			case 10006:
				toast('当前连接已断开');
				break;
			case 10007:
				toast('当前特征值不支持此操作');
				break;
			case 10008:
				toast('其余所有系统上报的异常');
				break;
			case 10009:
				toast('Android 系统特有，系统版本低于 4.3 不支持 BLE');
				break;
			default:
				toast(errMsg);
		}
	}
	// 弹出框封装
	function toast(content, showCancel = false) {
		uni.showModal({
			title: '提示',
			content,
			showCancel
		});
	}
</script>

<style>
</style>
