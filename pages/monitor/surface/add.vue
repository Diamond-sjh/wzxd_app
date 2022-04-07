<template>
	<view class="navbar monitorAdd">
		<u-navbar title="监测数据录入" title-color="white" back-icon-color="white">
			<view class="slot-wrap">
				<u-button class="content" size="mini" type="success" @click="submit">保存</u-button>
			</view>
		</u-navbar>
		<view class="form containerCommon">
			<u-form :model="form" ref="uForm" label-width="220" label-align="left">
				<u-form-item :required="true" prop="testDate" label="监测日期：">
					<u-input v-model="form.testDate" placeholder="请选择监测日期" @click="isShowDate = true" />
				</u-form-item>
				<u-form-item :required="true" prop="parameterName" label="监测参数：">
					<u-input v-model="form.parameterName" placeholder="请选择监测参数" type="select" @click="openSelect('parameterName')" />
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
				<!-- <u-form-item :required="true" prop="testName" label="创建人：">
					<u-input v-model="form.testName" placeholder="请输入断面名称" />
				</u-form-item>
				<u-form-item :required="true" prop="testName" label="创建时间：">
					<u-input v-model="form.testName" placeholder="请输入断面名称" />
				</u-form-item> -->
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
					parameterName: '', //监测参数
					installationPosition: '', //测点编号（安装位置）
					componentNumber: '', //元件编号
					measurementFrequency: '', //量测频率
				},
				installationPositionRemark:'',//埋深尺寸
				isShowDate: false, //日期选择器是否显示
				isShowSelectList: false, //选择器是否显示
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
						message: '请选择监测参数',
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

			},
			// 点击保存按钮
			submit() {
				let that = this
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if(this.installationPositionRemark){
							this.form.installationPosition = `${this.form.installationPosition}埋深${this.installationPositionRemark}m`
						}
						console.log(this.form)
						// return
						this.$httpMonitor.addGwzmRecordSon(this.form).then(res => {
							if (res.code == 201) {
								this.$refs.uToast.show({
									title: '信息上传成功',
									type: 'success',
									back: true,
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
