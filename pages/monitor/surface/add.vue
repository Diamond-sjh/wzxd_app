<template>
	<view class="navbar monitorAdd">
		<u-navbar title="振弦式读数仪" title-color="white" back-icon-color="white">
			<view class="slot-wrap">
				<u-button class="content" size="mini" type="success" @click="submit">保存</u-button>
			</view>
		</u-navbar>
		<view class="form containerCommon">
			<u-form :model="form" ref="uForm" label-width="220" label-align="left">
				<u-form-item :required="true" prop="testDate" label="检测日期：">
					<u-input v-model="form.testDate" placeholder="请选择检测日期" @click="isShowDate = true" />
				</u-form-item>
				<u-form-item :required="true" prop="parameterName" label="检测参数：">
					<u-input v-model="form.parameterName" placeholder="请选择检测参数" type="select" @click="openSelect('parameterName')" />
				</u-form-item>
				<!-- <u-form-item :required="true" prop="detectionStation" label="检测桩号：">
					<u-input v-model="form.detectionStation" placeholder="请输入检测桩号" />
				</u-form-item> -->
				<u-form-item :required="true" prop="detectionStation" label="检测桩号：" >
				      <u-input v-model="form.detectionStation" type="input" placeholder="请选择检测桩号" @confirm="searchDetectionStation" @blur="searchDetectionStation"/>
				      <view slot="right">
				        <u-icon size="40" name="search" color="#2979ff" @click="searchDetectionStation"/>
				      </view>
				</u-form-item>
				<u-form-item :required="true" prop="installationPosition" label="测点编号：">
					<u-input v-model="form.installationPosition" placeholder="请选择测点编号" type="select" @click="openSelect('installationPosition')" />
				</u-form-item>
				<u-form-item label="埋深(单位:m)：" v-if="form.parameterName == '锚杆轴力' || form.parameterName == '围岩内部位移'">
					<u-input v-model="installationPositionRemark" placeholder="请输入埋深尺寸" />
				</u-form-item>
				<u-form-item :required="true" prop="componentNumber" label="元件编号：">
					<u-input v-model="form.componentNumber" placeholder="请输入元件编号" />
				</u-form-item>
				<u-form-item :required="true" prop="measurementFrequency" label="量测频率：">
					<u-input v-model="form.measurementFrequency" placeholder="请输入量测频率" />
				</u-form-item>
			</u-form>
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
				form: {
					testDate: '', //监测日期
					detectionStation: '',//检测桩号
					parameterName: '', //监测参数
					installationPosition: '', //测点编号（安装位置）
					componentNumber: '', //元件编号
					measurementFrequency: '', //量测频率
					creator:'',
					projectId: null,
					recordNumber: ''
				},
				installationPositionRemark:'',//埋深尺寸
				isShowDate: false, //日期选择器是否显示
				isShowSelectList: false, //选择器是否显示
				paramsList:[],//桩号参数测点集合
				data: [], //选择器展示数据
				clickType: '', //点击的输入框
				rules: {
					testDate: [{
						required: true,
						message: '请选择日期',
						trigger: ['change', 'blur']
					}],
					parameterName: [{
						required: true,
						message: '请选择检测参数',
						trigger: ['change', 'blur']
					}],
					detectionStation: [{
						required: true,
						message: '请选择检测桩号',
						trigger: ['change', 'blur']
					}],
					installationPosition: [{
						required: true,
						message: '请选择测点编号',
						trigger: ['change', 'blur']
					}],
					componentNumber: [{
						required: true,
						message: '请输入元件编号',
						trigger: ['change', 'blur']
					}],
					measurementFrequency: [{
						required: true,
						message: '请输入量测频率',
						trigger: ['change', 'blur']
					}],
				}
			}
		},
		onReady() {
			// 获取默认时间
			this.form.testDate = this.$utils.getDate(new Date(), 'yyyy-MM-dd')
			// 设置表单校验规则
			this.$refs.uForm.setRules(this.rules)
			this.form.creator = uni.getStorageSync('storage_userInfo') ? uni.getStorageSync('storage_userInfo').userId : null
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toAddPage', (data) => {
				this.form.projectId = data.projectId
				this.form.recordNumber = data.recordNumber
				uni.getStorage({
					key: 'storage_projectPlan',
					success: (res) => {
						res.data.some(item => {
							if(item.projectId == data.projectId){
								this.paramsList = JSON.parse(item.projectPlan).monitor
								return true
							}
						})
						console.log(this.paramsList)
					},
					fail: (err) => {
					}
				});
			})
		},
		methods: {
			// 选择日期
			dateChange(res) {
				console.log(res)
				this.form.testDate = res.result
			},
			// 打开列选择器
			openSelect(type) {
				this.data = []
				this.clickType = type
				if (type == 'parameterName') {
					this.data = configData.parameterNameList
				}
				if (type == 'installationPosition') {
					if(!this.form.parameterName){
						this.data = []
					}else if(this.form.parameterName == '钢支撑内力'){
						this.data = configData.installationPositionList
					}else{
						this.data = configData.installationPosition2List
					}
				}
				this.isShowSelectList = true
			},
			// 点击列选择器的确认按钮
			clickConfirm(res) {
				if (this.clickType == 'parameterName') {
					if (this.form.parameterName != res[0].value) {
						this.form.parameterName = res[0].value
						this.form.installationPosition = ''
					}
				}
				if (this.clickType == 'installationPosition') {
					this.form.installationPosition = res[0].value
				}
				if (this.clickType == 'detectionStation') {
					this.form.detectionStation = res[0].value
				}
				
			},
			// 模糊搜索 断面桩号
			searchDetectionStation(){
				if(this.isShowSelectList){
					return
				}
				this.clickType = 'detectionStation'
				//首先判断输入框是否为空
				if(this.form.detectionStation == ''){
					//先清空展示的数据
					this.data = []
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
				console.log(this.data)
				this.isShowSelectList = true
			},
			// 点击保存按钮
			submit() {
				let that = this
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// if(this.installationPositionRemark){
						// 	this.form.installationPosition = `${this.form.installationPosition}埋深${this.installationPositionRemark}m`
						// }
						let formParam = Object.assign({},this.form)
						if(this.installationPositionRemark){
							formParam.installationPosition = `${formParam.installationPosition}埋深${this.installationPositionRemark}m`
						}
						this.$httpMonitor.addGwzmRecordSon(formParam).then(res => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '信息上传成功',
									type: 'success',
									back: false,
									duration: 500
								})
								const eventChannel = this.getOpenerEventChannel();
								eventChannel.emit('toSurfaceIndex');
							} else {
								uni.getStorage({
									key: 'surface_key',
									success: (res) => {
										let dataArr = res.data
										let obj = JSON.parse(JSON.stringify(that.form))
										dataArr.push(obj)
										uni.setStorage({
											key: 'surface_key',
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
									fail: (err) => {
										let obj = JSON.parse(JSON.stringify(that.form))
										let dataArr = [obj]
										uni.setStorage({
											key: 'surface_key',
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
								key: 'surface_key',
								success: (res) => {
									let dataArr = res.data
									let obj = JSON.parse(JSON.stringify(that.form))
									dataArr.push(obj)
									uni.setStorage({
										key: 'surface_key',
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
								fail: (err) => {
									let obj = JSON.parse(JSON.stringify(that.form))
									let dataArr = [obj]
									uni.setStorage({
										key: 'surface_key',
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
			}
		}
	}
</script>

<style scoped>

</style>
