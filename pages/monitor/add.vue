<template>
	<view class="navbar monitorAdd">
		<u-navbar title="全站仪" title-color="white" back-icon-color="white">
			<view class="slot-wrap">
				<u-button class="content" size="mini" type="success" @click="submit">保存</u-button>
			</view>
		</u-navbar>
		<view class="form containerCommon">
			<u-form :model="form" ref="uForm" label-width="220" label-align="left">
				<u-form-item :required="true" prop="testDate" label="监测日期："><u-input v-model="form.testDate" placeholder="请选择监测日期" @click="isShowDate = true" /></u-form-item>
				<u-form-item :required="true" prop="parameterName" label="监测参数："><u-input v-model="form.parameterName" placeholder="请选择监测参数" type="select" @click="openSelect('parameterName')" /></u-form-item>
				<u-form-item :required="true" prop="detectionStation" label="断面桩号："><u-input v-model="form.detectionStation" placeholder="请输入断面桩号" /></u-form-item>
				<u-form-item :required="true" prop="testName" label="测点名称："><u-input v-model="form.testName" placeholder="请选择断面名称" type="select" @click="openSelect('testName')" /></u-form-item>
				<u-form-item :required="true" label="基准点坐标：">
					<u-table>
						<u-tr>
							<u-th>X</u-th>
							<u-th>Y</u-th>
							<u-th>Z</u-th>
						</u-tr>
						<u-tr>
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
					</u-table>
					<!-- <u-input v-model="form.viewpoint" placeholder="请输入基准点坐标(xxx,xxx,xxx)" /> -->
				</u-form-item>
				<u-form-item :required="true" label="全站仪实时值：">
					<u-table>
						<u-tr>
							<u-th>X</u-th>
							<u-th>Y</u-th>
							<u-th>Z</u-th>
						</u-tr>
						<u-tr>
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
					<!-- <u-input v-model="form.realValue" placeholder="请输入测量值(xxx,xxx,xxx)" /> -->
					<!-- <u-button type="success" size="mini">自动测量</u-button> -->
				</u-form-item>
				<u-form-item label="观测值："><u-input :disabled="true" v-model="calculatZ" placeholder="自动计算" /></u-form-item>
			</u-form>
			<u-button type="success" @click="autoMeasure">自动测量</u-button>
			<!-- 监测参数选择 -->
			<u-select v-model="isShowSelectList" :list="data" @confirm="clickConfirm"></u-select>
			<!-- 日期选择器 -->
			<u-calendar v-model="isShowDate" mode="date" @change="dateChange"></u-calendar>
			<!-- 消息提示 -->
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import configData from '@/common/configData'
	export default {
	    data() {
	        return {
				form:{
					parameterName:'',//监测参数
					detectionStation:'',//监测桩号
					testName:'',//测点名称
					testDate:'',//监测日期
					viewpoint:'',//基准点（后视点）坐标
					realValue:'',//全站仪实时测量坐标
					calculatZ:'',//ΔZ的值
				},
				isShowDate:false,//日期选择器是否显示
				isShowSelectList:false,//选择器是否显示
				data:[],//选择器展示数据
				clickType:'',//点击的输入框
				// 对应监测参数的测点列表
				testNameList:[],
				rules: {
					testDate: [{required: true,message: '请选择日期',trigger: ['change','blur']}],
					parameterName: [{required: true,message: '请选择监测参数',trigger: ['change','blur']}],
					detectionStation: [{required: true,message: '请输入断面桩号',trigger: ['change','blur']}],
					testName: [{required: true,message: '请选择测点',trigger: ['change','blur']}],
					// viewpoint: [{required: true,message: '请输入基准点坐标',trigger: ['change','blur']}],
					// realValue: [{required: true,message: '请输入测量值',trigger: ['change','blur']}]
				},
				num:{
					X:0,
					Y:0,
					Z:0
				},
				num1:{
					X:0,
					Y:0,
					Z:0
				}
			}
	    },
		onReady() {
			// 获取默认时间
			this.form.testDate = this.$utils.getDate(new Date(),'yyyy-MM-dd')
			// 设置表单校验规则
			this.$refs.uForm.setRules(this.rules)
		},
		computed:{
			calculatZ(){
				let arg1 = this.num.Z
				let arg2 = this.num1.Z
				var r1,r2,m,n;
				try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
				try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
				m=Math.pow(10,Math.max(r1,r2));
				//动态控制精度长度
				n=(r1>=r2)?r1:r2;
				return ((arg1*m-arg2*m)/m).toFixed(4);
			}
		},
	    methods: {
			// 选择日期
			dateChange(res){
				console.log(res)
				this.form.testDate = res.result
			},
			// 打开列选择器
			openSelect(type){
				this.data = []
				this.clickType = type
				if(type == 'parameterName'){
					this.data = configData.parameterNameKeyList
				}
				if(type == 'testName'){
					switch (this.form.parameterName){
						case '拱顶下沉':
							this.data = configData.testName0List
							break;
						case '拱脚下沉':
							this.data = configData.testName1List
							break;
						case '地表下沉':
							this.data = configData.testName2List
							break;
						case '周边位移':
							this.data = configData.testName3List
							break;
						default:
							this.data = []
							break;
					}
				}
				this.isShowSelectList = true
			},
			// 点击列选择器的确认按钮
			clickConfirm(res){
				if(this.clickType == 'parameterName'){
					if(this.form.parameterName != res[0].value){
						this.form.parameterName = res[0].value
						this.form.testName = ''
					}
				}
				if(this.clickType == 'testName'){
					this.form.testName = res[0].value
				}
				
			},
			// 点击测量按钮
			autoMeasure(){
				this.$utils.notifyBLECharacteristicValueChange(this.receiveData)
			},
			// 接收测量数据
			receiveData(res){
				console.log(res.split(','))
				let data = (res.replace(/[\r\n]/g,"")).split(',')
				if(data.length > 3){
					this.num1.X = data[data.length - 3]
					this.num1.Y = data[data.length - 2]
					this.num1.Z = data[data.length - 1]
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
						this.$httpMonitor.add(this.form).then(res => {
							if(res.code == 200){
								this.$refs.uToast.show({
									title: '信息上传成功',
									type: 'success',
									back: true,
									duration: 500
								})
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
						})
					} else {
						this.$refs.uToast.show({
							title: '验证失败',
							type: 'error',
						})
					}
				});
			}
	    }
	}
</script>

<style scoped>

</style>
