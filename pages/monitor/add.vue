<template>
	<view class="navbar monitorAdd">
		<u-navbar title="全站仪" title-color="white" back-icon-color="white">
			<view class="slot-wrap">
				<u-button class="content" size="mini" type="success" @click="submit">保存</u-button>
			</view>
		</u-navbar>
		<view class="form containerCommon">
			<u-form :model="form" ref="uForm" label-width="220" label-align="left">
				<!-- <u-form-item :required="true" prop="detectionStation" label="断面桩号："><u-input v-model="form.detectionStation" placeholder="请输入断面桩号" type="select" @click="openSelect('detectionStation')" /></u-form-item> -->
				<u-form-item :required="true" prop="detectionStation" label="断面桩号：" >
				      <u-input v-model="form.detectionStation" type="input" placeholder="请选择断面桩号" @confirm="searchDetectionStation" @blur="searchDetectionStation"/>
				      <view slot="right">
				        <u-icon size="40" name="search" color="#2979ff" @click="searchDetectionStation"/>
				      </view>
				      <!-- <u-select v-model="showSelect" :list="showList" @confirm="selectClick"/> -->
				</u-form-item>
				<u-form-item :required="true" prop="testDate" label="监测日期："><u-input type="select" v-model="form.testDate" placeholder="请选择监测日期" @click="dateShow = true" /></u-form-item>
				<u-form-item :required="true" prop="parameterName" label="监测参数："><u-input v-model="form.parameterName" placeholder="请选择监测参数" type="select" @click="openSelect('parameterName')" /></u-form-item>
				<u-form-item :required="true" prop="testName" label="测点名称："><u-input v-model="form.testName" placeholder="请选择断面名称" type="select" @click="openSelect('testName')" /></u-form-item>
				<u-form-item :required="true">
					<u-table>
						<u-tr>
							<u-th>点名</u-th>
							<u-th>测量</u-th>
							<u-th>X</u-th>
							<u-th>Y</u-th>
							<u-th>Z</u-th>
						</u-tr>
						<u-tr>
							<u-td>
								<u-input v-model="num.name" :disabled="true" height="50" input-align="center"/>
							</u-td>
							<u-td>
								<u-button size="mini" type="success" @click="autoMeasure('num')">测量</u-button>
							</u-td>
							<u-td>
								<u-input v-model="num.X" type="number" placeholder="" height="50" input-align="center" :clearable="false" />
							</u-td>
							<u-td>
								<u-input v-model="num.Y" type="number" placeholder="" height="50" input-align="center" :clearable="false" />
							</u-td>
							<u-td>
								<u-input v-model="num.Z" type="number" placeholder="" height="50" input-align="center" :clearable="false" />
							</u-td>
						</u-tr>
						<u-tr>
							<u-td>
								<u-input v-model="num1.name" :disabled="true" height="50" input-align="center"/>
							</u-td>
							<u-td>
								<u-button size="mini" type="success" @click="autoMeasure('num1')">测量</u-button>
							</u-td>
							<u-td>
								<u-input v-model="num1.X" type="number" placeholder="" height="50" input-align="center" :clearable="false" />
							</u-td>
							<u-td>
								<u-input v-model="num1.Y" type="number" placeholder="" height="50" input-align="center" :clearable="false" />
							</u-td>
							<u-td>
								<u-input v-model="num1.Z" type="number" placeholder="" height="50" input-align="center" :clearable="false" />
							</u-td>
						</u-tr>
					</u-table>
				</u-form-item>
				<!-- <u-form-item label="观测值："><u-input :disabled="true" v-model="calculatZ" placeholder="自动计算" /></u-form-item> -->
			</u-form>
			<view class="collapse-item">
				<hr>
				<u-row gutter="16">
					<u-col span="12">
						<view class="apply-text"><span>观测值：</span>{{calculatZ?calculatZ+'mm':defaultItemData.calculatZ?defaultItemData.calculatZ +'mm':''}}</view>
					</u-col>
					<u-col span="12">
						<view class="apply-text"><span>本次变形：</span>{{lastTime?lastTime+'mm':'0mm'}}</view>
					</u-col>
					<u-col span="12">
						<view class="apply-text"><span>累计变形：</span>{{firstTime?firstTime+'mm':'0mm'}}</view>
					</u-col>
				</u-row>
			</view>
			<!-- 监测参数选择 -->
			<u-select v-model="isShowSelectList" :list="data" @confirm="clickConfirm"></u-select>
			<!-- 日期选择器 -->
			<u-calendar v-model="isShowDate" mode="date" @change="dateChange"></u-calendar>
			<!-- 消息提示 -->
			<u-toast ref="uToast" />
			<!-- 日期选择 -->
			<u-popup v-model="dateShow" mode="center" width="450rpx" height="300px">
				<view class="radio">
					<u-radio-group @change="changeDate" v-model="dateListValue">
						<u-radio 
							v-for="(item, index) in dateList" :key="index" 
							:name="item"
						>
							{{item}}
						</u-radio>
					</u-radio-group>
				</view>
				
			</u-popup>
		</view>
	</view>
</template>

<script>
	import configData from '@/common/configData'
	import bluetoothTool from '@/common/BluetoothTool.js'
	export default {
	    data() {
	        return {
				form:{
					projectId:null,//项目id
					recordNumber:'',//记录编号
					parameterName:'',//监测参数
					detectionStation:'',//监测桩号
					testName:'',//测点名称
					testDate:'',//监测日期
					viewpoint:'',//基准点（后视点）坐标
					realValue:'',//全站仪实时测量坐标
					calculatZ:'',//ΔZ的值
				},
				// 数据处理
				monitorList:[],//全站仪数据--全量数据
				detectionStationList:[],//全量数据 根据桩号分类
				testDateDataList:[],//当前桩号的数据 根据日期分类
				testDateAllData:[],//当前日期所有数据
				defaultItemData:{},//展示数据
				paramsList:[],//桩号参数测点集合
				testItemParams:[],//当前桩号下的监测参数
				pointPositionParams:[],//当前监测参数下的测点集合
				isShowDate:false,//日期选择器是否显示
				isShowSelectList:false,//选择器是否显示
				data:[],//选择器展示数据
				clickType:'',//点击的输入框
				dateShow:false,//监测日期选择框是否展示
				dateList:['新增'],//监测日期选项列表
				dateListValue:'新增',//监测日期默认值
				rules: {
					testDate: [{required: true,message: '请选择日期',trigger: ['change','blur']}],
					parameterName: [{required: true,message: '请选择监测参数',trigger: ['change','blur']}],
					detectionStation: [{required: true,message: '请输入断面桩号',trigger: ['change','blur']}],
					testName: [{required: true,message: '请选择测点',trigger: ['change','blur']}],
				},
				num:{
					name:'后视点',
					X:0,
					Y:0,
					Z:0
				},
				num1:{
					name:'测量点',
					X:0,
					Y:0,
					Z:0
				},
				clickParam:'num1',
				lastTime:'',
				firstTime:'',
				receiveDataArr:[]
			}
	    },
		onReady() {
			// 获取默认时间
			// this.form.testDate = this.$utils.getDate(new Date(),'yyyy-MM-dd')
			// 设置表单校验规则
			this.$refs.uForm.setRules(this.rules)
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toAddPage', (data) => {
				this.form.projectId = data.projectId
				this.form.recordNumber = data.recordNumber
				this.monitorList = data.dataList
				// 将全量的数据根据桩号分类
				this.detectionStationList = this.tranListToTreeData(this.monitorList,'detectionStation')
				let value = uni.getStorageSync('storage_projectPlan');
				if(value.length > 0){
					value.some(item => {
						if(item.projectId == data.projectId){
							this.paramsList = JSON.parse(item.projectPlan).monitor
							return true
						}
					})
				}
				if(data.longPressItem){
					// 默认需要展示的数据
					this.defaultItemData = Object.assign({},data.longPressItem)
					// 根据桩号筛选监测参数和测点名称
					this.getParameterNameAndTestName(this.defaultItemData.detectionStation,this.defaultItemData.parameterName)
					// 根据桩号筛选需要展示的数据
					this.detectionStationChange(this.defaultItemData.detectionStation,'first')
				}else{
					this.form.testDate = this.$utils.getDate(new Date(),'yyyy-MM-dd')
				}
			})
		},
		computed:{
			calculatZ(){
				let arg1 = this.num.X
				let arg2 = this.num.Y
				let arg3 = this.num.Z
				let arg4 = this.num1.X
				let arg5 = this.num1.Y
				let arg6 = this.num1.Z
				var r1,r2,r3,r4,r5,r6,a,b,c,m,n;
				try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
				try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
				try{r3=arg3.toString().split(".")[1].length}catch(e){r3=0}
				try{r4=arg4.toString().split(".")[1].length}catch(e){r4=0}
				try{r5=arg5.toString().split(".")[1].length}catch(e){r5=0}
				try{r6=arg6.toString().split(".")[1].length}catch(e){r6=0}
				if(this.form.parameterName == '周边位移'){
					m=Math.pow(10,Math.max(r1,r2,r3,r4,r5,r6));
					a = ((arg4*m-arg1*m)/m)
					b = ((arg5*m-arg2*m)/m)
					c = ((arg6*m-arg3*m)/m)
					return Math.sqrt(a*a+b*b+c*c).toFixed(1)
				}else{
					m=Math.pow(10,Math.max(r3,r6));
					//动态控制精度长度
					n=(r3>=r6)?r3:r6;
					return ((arg6*m-arg3*m)/m).toFixed(1);
				}
				
			}
		},
		mounted() {
			//#ifdef APP-PLUS
			// 蓝牙
			bluetoothTool.init({
				readDataCallback: (dataByteArr) => {
					if(this.receiveDataArr.length >= 200) {
						this.receiveDataArr = [];
					}
					this.receiveDataArr.push.apply(this.receiveDataArr, dataByteArr);
					let str = ''
					let arr = []
					let X,Y,Z
					str = this.receiveDataArr.join('')
					str = str.split(':')[1]
					arr = (str.replace(/[\r\n]/g,"")).split(',')
					if(arr[0] == 0){
						X = Math.sin(arr[2])*Math.cos(arr[1])*arr[3]
						Y = Math.sin(arr[2])*Math.sin(arr[1])*arr[3]
						Z = Math.cos(arr[2])*arr[3]
						if(this.clickParam == 'num1'){
							this.num1.X = this.accMul(X,1000).toFixed(3) 
							this.num1.Y = this.accMul(Y,1000).toFixed(3)
							this.num1.Z = this.accMul(Z,1000).toFixed(3)
						}else{
							this.num.X = this.accMul(X,1000).toFixed(3)
							this.num.Y = this.accMul(Y,1000).toFixed(3)
							this.num.Z = this.accMul(Z,1000).toFixed(3)
						}
						this.computeTrans()
					}
				}
			});
			//#endif
		},
	    methods: {
			// 选择日期
			dateChange(res){
				this.form.testDate = res.result
			},
			// 日期选择改变
			changeDate(value){
				this.clearData()//清除展示数据
				this.dateListValue = value
				if(value == '新增'){
					this.form.testDate = this.$utils.getDate(new Date(),'yyyy-MM-dd')
				}else{
					this.form.testDate = value
					this.testDateDataList.some(item => {
						// 根据日期找到对应的数据列表
						if(item.testDate == value){
							this.testDateAllData = item.data
							// 找到对应测点的数据
							this.testDateAllData.some(item2 => {
								if(this.form.testName && item2.testName == this.form.testName){
									this.defaultItemData = Object.assign({},item2)
									this.assignment(this.defaultItemData)
									return true
								}
							})
							return true
						}
					})
				}
				this.dateShow = false
			},
			// 模糊搜索 断面桩号
			searchDetectionStation(){
				if(this.isShowSelectList){
					return
				}
				this.clickType = 'detectionStation'
				//首先判断输入框是否为空
				if(this.form.detectionStation == ''){
					//this.data是下拉框显示的内容，如果为空就展示全部数据
					this.paramsList.forEach(item => {
						let obj = {
							value:item.monitorName,
							label:item.monitorName,
							extra:item.testItem
						}
						this.data.push(obj)
					})
				//否则执行下面内容
				}else{
					//先清空展示的数据
					this.data = []
					//1.前端匹配
					this.paramsList.forEach((item)=>{
						if(item.monitorName.indexOf(this.form.detectionStation) != -1){
							let obj = {
								value:item.monitorName,
								label:item.monitorName,
								extra:item.testItem
							}
							this.data.push(obj)
						}
					})
				} 
				this.isShowSelectList = true
			},
			// 打开列选择器
			openSelect(type){
				this.data = []
				this.clickType = type
				if(type == 'detectionStation'){
					this.paramsList.forEach(item => {
						let obj = {
							value:item.monitorName,
							label:item.monitorName,
							extra:item.testItem
						}
						this.data.push(obj)
					})
				}
				if(type == 'parameterName'){
					this.testItemParams.forEach(item => {
						if(item.name == '拱顶下沉' || item.name == '拱脚下沉' || item.name == '地表下沉' || item.name == '周边位移'){
							let obj = {
								value:item.name,
								label:item.name,
								extra:item.pointPosition && item.pointPosition[0]?item.pointPosition[0].split(','):[]
							}
							this.data.push(obj)
						}
					})
				}
				if(type == 'testName'){
					this.pointPositionParams.forEach(item => {
						let obj = {
							value:item,
							label:item,
						}
						this.data.push(obj)
					})
				}
				this.isShowSelectList = true
			},
			// 点击列选择器的确认按钮
			clickConfirm(res){
				console.log(res)
				if(this.clickType == 'detectionStation'){
					if(this.form.detectionStation != res[0].value){
						this.clearData()
						this.form.detectionStation = res[0].value
						this.testItemParams = res[0].extra
						this.form.parameterName = ''
						this.form.testName = ''
						this.detectionStationChange(res[0].value)
					}
				}
				if(this.clickType == 'parameterName'){
					if(this.form.parameterName != res[0].value){
						this.clearData()
						this.form.parameterName = res[0].value
						this.pointPositionParams = res[0].extra
						console.log(this.pointPositionParams)
						this.form.testName = this.pointPositionParams[0]?this.pointPositionParams[0]:''
						if(this.dateListValue == '新增'){
							return
						}
						this.testDateAllData.some(item => {
							if(item.testName == this.form.testName){
								this.defaultItemData = Object.assign({},item)
								this.assignment(this.defaultItemData)
								return true
							}
						})
					}
				}
				if(this.clickType == 'testName'){
					if(this.form.testName != res[0].value){
						this.clearData()
						this.form.testName = res[0].value
						if(this.dateListValue == '新增'){
							return
						}
						this.testDateAllData.some(item => {
							if(item.testName == res[0].value){
								this.defaultItemData = Object.assign({},item)
								this.assignment(this.defaultItemData)
								return true
							}
						})
					}
				}
			},
			// 获取监测参数和测点名称
			getParameterNameAndTestName(monitorName,parameterName){
				this.paramsList.some(monitorItem => {
					if(monitorItem.monitorName == monitorName){
						this.testItemParams = []
						monitorItem.testItem.forEach(item => {
							if(item.name == '拱顶下沉' || item.name == '拱脚下沉' || item.name == '地表下沉' || item.name == '周边位移'){
								this.testItemParams.push(item)
							}
							if(item.name == parameterName){
								this.pointPositionParams = item.pointPosition[0].split(',')
							}
						})
						if(!this.form.testName){this.form.testName = this.pointPositionParams[0]?this.pointPositionParams[0]:''}
					}
					return 
				})
			},
			// 点击测量按钮
			autoMeasure(param){
				this.clickParam = param
				let a = uni.getStorageSync('storage_bluetooth') ? uni.getStorageSync('storage_bluetooth') : null
				if(a.versions == '2.0'){
					this.receiveDataArr = [];
					bluetoothTool.sendData('0A255231512C31373031373A320D0A')
					return
				}
				this.$utils.notifyBLECharacteristicValueChange(this.receiveData)
			},
			// 接收测量数据
			receiveData(res){
				console.log(res.split(','))
				let data = (res.replace(/[\r\n]/g,"")).split(',')
				if(data.length > 3){
					if(this.clickParam == 'num1'){
						this.num1.X = this.accMul(data[data.length - 3],1000) 
						this.num1.Y = this.accMul(data[data.length - 2],1000)
						this.num1.Z = this.accMul(data[data.length - 1],1000)
					}else{
						this.num.X = this.accMul(data[data.length - 3],1000)
						this.num.Y = this.accMul(data[data.length - 2],1000)
						this.num.Z = this.accMul(data[data.length - 1],1000)
					}
					this.computeTrans()
				}
			},
			// 数据处理转换
			accMul(arg1,arg2){
			    var m=0,s1=arg1.toString(),s2=arg2.toString();
			    try{m+=s1.split(".")[1].length}catch(e){}
			    try{m+=s2.split(".")[1].length}catch(e){}
			    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
			},
			// 获取最后一条数据计算变形值
			computeTrans(){
				if(this.detectionStationList.length > 0){
					this.detectionStationList.some(item => {
						if(item.detectionStation == this.form.detectionStation){
							let currentIndex = -1
							let arr = item.data.filter((item2,index) => {
								return item2.parameterName == this.form.parameterName && item2.testName == this.form.testName
							})
							currentIndex = arr.findIndex(item3 => item3.testDate == this.form.testDate)
							if(arr.length > 0 && currentIndex < arr.length-1){
								let arg1 = this.calculatZ//本次观测值
								let arg2 = arr[currentIndex + 1].calculatZ//上一条数据
								let arg3 = arr[arr.length - 1].calculatZ//第一条数据
								var r1,r2,m,n;
								try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
								try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
								m=Math.pow(10,Math.max(r1,r2));
								//动态控制精度长度
								n=(r1>=r2)?r1:r2;
								this.lastTime = ((arg2*m-arg1*m)/m).toFixed(1);
								this.firstTime = ((arg3*m-arg1*m)/m).toFixed(1)
							}else{
								this.lastTime = 0
								this.firstTime = 0
							}
						}
					})
				}
			},
			// 点击保存按钮
			submit(){
				let that = this
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.form.viewpoint = `${this.num.X},${this.num.Y},${this.num.Z}`
						this.form.realValue = `${this.num1.X},${this.num1.Y},${this.num1.Z}`
						this.form.calculatZ = this.calculatZ
						this.form.firstTimeChange = this.firstTime
						this.form.lastTimeChange = this.lastTime
						this.$httpMonitor.add(this.form).then(res => {
							if(res.code == 200){
								this.$refs.uToast.show({
									title: '信息上传成功',
									type: 'success',
									back: false,
									duration: 500
								})
								uni.getStorage({
									key: 'allMonitor_key',
									success: (res) => {
										let dataArr = res.data
										let obj = JSON.parse(JSON.stringify(that.form))
										dataArr.unshift(obj)
										uni.setStorage({
										    key: 'allMonitor_key',
										    data: dataArr,
										    success(res) {
										        console.log(res);
										    },
											fail(err) {
												console.log(err);
											}
										});
									},
									fail: (err) => {
										let obj = JSON.parse(JSON.stringify(that.form))
										let dataArr = [obj]
										uni.setStorage({
										    key: 'allMonitor_key',
										    data: dataArr,
										    success(res) {
										        console.log(res);
										    },
											fail(err) {
												console.log(err);
											}
										});
									}
								});
								const eventChannel = this.getOpenerEventChannel();
								eventChannel.emit('toMonitorIndex');
							}else{
								uni.getStorage({
								    key: 'monitor_key',
								    success:(res) => {
										let dataArr = res.data
										let obj = JSON.parse(JSON.stringify(that.form))
										dataArr.push(obj)
										uni.setStorage({
										    key: 'monitor_key',
										    data: dataArr,
										    success(res) {
										        console.log(res);
												that.$u.toast('上传失败，信息本地保存成功')
										    },
											fail(err) {
												console.log(err);
												that.$u.toast('上传失败，信息本地保存失败')
											}
										});
								    },
									fail:(err) => {
										let obj = JSON.parse(JSON.stringify(that.form))
										let dataArr = [obj]
										uni.setStorage({
										    key: 'monitor_key',
										    data: dataArr,
										    success(res) {
										        console.log(res);
												that.$u.toast('上传失败，信息本地保存成功')
										    },
											fail(err) {
												console.log(err);
												that.$u.toast('上传失败，信息本地保存失败')
											}
										});
									}
								});
							}
						}).catch(err => {
							uni.getStorage({
							    key: 'monitor_key',
							    success:(res) => {
									let dataArr = res.data
									let obj = JSON.parse(JSON.stringify(that.form))
									dataArr.push(obj)
									uni.setStorage({
									    key: 'monitor_key',
									    data: dataArr,
									    success(res) {
									        console.log(res);
											that.$u.toast('上传失败，信息本地保存成功')
									    },
										fail(err) {
											console.log(err);
											that.$u.toast('上传失败，信息本地保存失败')
										}
									});
							    },
								fail:(err) => {
									let obj = JSON.parse(JSON.stringify(that.form))
									let dataArr = [obj]
									uni.setStorage({
									    key: 'monitor_key',
									    data: dataArr,
									    success(res) {
									        console.log(res);
											that.$u.toast('上传失败，信息本地保存成功')
									    },
										fail(err) {
											console.log(err);
											that.$u.toast('上传失败，信息本地保存失败')
										}
									});
								}
							});
						})
					} else {
						this.$refs.uToast.show({
							title: '验证失败',
							type: 'error',
						})
					}
				});
			},
			// 数据处理
			tranListToTreeData(list,str) {
				// 1. 定义两个中间变量
				let treeList = [],  // 最终要产出的树状数据的数组
					map = {}      // 存储映射关系
				// 2. 建立一个映射关系，并给每个元素补充children属性.
				// 映射关系: 目的是让我们能通过id快速找到对应的元素
				list.forEach(item => {
					if(item[str] && !map[item[str]]){
						let obj = {
							data:[item]
						}
						obj[str] = item[str];
						treeList.push(obj)
						map[item[str]] = item;
					}else{
						treeList.some(val => {
							if(val[str] == item[str]){
								val.data.push(item)
								return
							}
						})
					}
				})
				// 4. 返回出去
				return treeList
			},
			// 根据桩号分类数据
			detectionStationChange(detectionStation,param){
				this.testDateDataList = []
				this.dateList = ['新增']
				// 筛选对应桩号的全量数据---并根据日期分类
				this.detectionStationList.some(item => {
					if(item.detectionStation == detectionStation){
						this.testDateDataList = this.tranListToTreeData(item.data,'testDate')
					}
				})
				if(this.testDateDataList.length == 0){
					this.testDateAllData = []
					this.defaultItemData = {}
					this.form.parameterName = this.testItemParams[0]?this.testItemParams[0].name:''
					this.dateListValue = '新增'
					this.getParameterNameAndTestName(this.form.detectionStation,this.testItemParams[0].name)
					return
				}
				// 获取当前监测日期的所有测点数据
				if(param == 'first'){
					this.testDateDataList.forEach(item => {
						// 监测日期列表
						this.dateList.push(item.testDate)
						if(this.defaultItemData.testDate && item.testDate == this.defaultItemData.testDate){
							this.testDateAllData = item.data
						}
					})
				}else{
					this.testDateAllData = this.testDateDataList[0].data
					this.testDateDataList.forEach(item => {
						// 监测日期列表
						this.dateList.push(item.testDate)
					})
					this.defaultItemData = Object.assign({},this.testDateAllData[0])
				}
				this.getParameterNameAndTestName(this.defaultItemData.detectionStation,this.defaultItemData.parameterName)
				this.assignment(this.defaultItemData)
			},
			// 参数赋值展示
			assignment(item){
				this.num.X = item.viewpoint.split(',')[0]
				this.num.Y = item.viewpoint.split(',')[1]
				this.num.Z = item.viewpoint.split(',')[2]
				this.num1.X = item.realValue.split(',')[0]
				this.num1.Y = item.realValue.split(',')[1]
				this.num1.Z = item.realValue.split(',')[2]
				this.form.testName = item.testName
				this.form.testDate = item.testDate
				this.dateListValue = item.testDate
				this.form.detectionStation = item.detectionStation
				this.form.parameterName = item.parameterName
				this.computeTrans()
			},
			// 清除数据
			clearData(){
				this.defaultItemData = {}
				this.lastTime = ''
				this.firstTime = ''
				this.num1.X = 0
				this.num1.Y = 0
				this.num1.Z = 0
			}
		}
	}
</script>

<style scoped lang="scss">
.uni-table-th,
.uni-table-td{
	padding: 6px 5px;
}
.form .collapse-item {
	margin-top: 70px;
}
.form .collapse-item .apply-text{
	font-size: 32rpx;
	color: #000000;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	span{
		display: inline-block;
		width: 90px;
		text-align-last: justify;
		text-align: justify;
		padding-right: 5px;
	}
}
.radio {
	padding: 5px;
	.u-radio-group .u-radio {
		flex:0 0 100%!important;
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		border-bottom: 1px solid #f1f1f1;
		padding: 5px 10px;
	}
}

</style>
