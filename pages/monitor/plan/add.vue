<template>
	<view class="navbar monitorAdd">
		<u-navbar title="监测数据录入" title-color="white" back-icon-color="white">
			<view class="slot-wrap">
				<u-button class="content" size="mini" type="success" @click="submit">保存</u-button>
			</view>
		</u-navbar>
		<view class="form containerCommon">
			<u-form :model="form" ref="uForm" label-width="250" label-align="left">
				<u-form-item prop="testItems" label="监测参数：">
					<u-input v-model="form.testItems" placeholder="请选择" type="select" @click="openSelect('testItems')" />
				</u-form-item>
				<u-form-item prop="monitorSectionNumber" label="监测断面桩号：">
					<u-input v-model="form.monitorSectionNumber" placeholder="请输入"/>
				</u-form-item>
				<u-form-item v-show="isShowInoutcave" prop="distanceEntrance" label="距洞口距离(m)：">
					<u-input v-model="form.distanceEntrance" placeholder="请输入"/>
				</u-form-item>
				<u-form-item v-show="isShowInoutcave" prop="linePosition" label="测线位置：">
					<u-input v-model="form.linePosition" placeholder="请输入"/>
				</u-form-item>
				<u-form-item prop="excavationMethod" label="开挖方法：">
					<u-input v-model="form.excavationMethod" placeholder="请选择" type="select" @click="openSelect('excavationMethod')" />
				</u-form-item>
				<u-form-item prop="pointPosition" label="测点位置：">
					<u-input v-if="isShowInoutcave" v-model="form.pointPosition" placeholder="请选择" type="select" @click="openSelect('pointPosition')" />
					<u-input v-else v-model="form.pointPosition" placeholder="请输入"/>
				</u-form-item>
				<u-form-item v-show="isShowInoutcave && isShowKeyParams" prop="sensorNo" label="传感器编号：">
					<u-input v-model="form.sensorNo" placeholder="请输入" />
				</u-form-item>
				<u-form-item v-show="isShowInoutcave && isShowKeyParams" prop="calibratFactor" :label="label">
					<u-input v-model="form.calibratFactor" :placeholder="placeholder" />
				</u-form-item>
				<u-form-item v-show="isShowInoutcave && isShowKeyParams && isShowDepth" prop="depth" label="埋深：">
					<u-input v-model="form.depth" placeholder="请输入" />
				</u-form-item>
				<u-form-item prop="equipments" label="主要仪器设备：">
					<u-input v-model="form.equipments" placeholder="请选择" type="select" @click="openSelect('equipments')" />
				</u-form-item>
				<u-form-item prop="testBasis" label="试验依据：">
					<u-input v-model="form.testBasis" placeholder="请选择" type="select" @click="openSelect('testBasis')" />
				</u-form-item>
				<u-form-item prop="burialDate" label="埋设日期：">
					<u-input v-model="form.burialDate" @click="isShowDate = true" placeholder="请选择" />
				</u-form-item>
				<u-form-item prop="wallRockGrade" label="围岩级别：">
					<u-input v-model="form.wallRockGrade" placeholder="请选择" type="select" @click="openSelect('wallRockGrade')" />
				</u-form-item>
				<u-form-item prop="wallRockGradeThreshold" label="围岩级别限值：">
					<u-input v-model="form.wallRockGradeThreshold" placeholder="请输入" />
				</u-form-item>
				<!-- <u-form-item v-show="isShowInoutcave" prop="initialMonitoringDate" label="监测初始日期：">
					<u-input v-model="form.initialMonitoringDate" placeholder="请输入" />
				</u-form-item> -->
				<u-form-item prop="remark" label="备注：">
					<u-input v-model="form.remark" placeholder="请输入" />
				</u-form-item>
			</u-form>
			<!-- 监测参数选择 -->
			<u-select v-model="isShowSelectList" :list="data" @confirm="clickConfirm"></u-select>
			<!-- 试验依据选择(多选) -->
			<multiple
			v-model="isShowSelect"
			:default-value="defaultValue"
			:list="data"
			label-key="label" 
			value-key="value"
			@confirm="clickSelectConfirm"
			></multiple>
			<!-- 日期选择器 -->
			<u-calendar v-model="isShowDate" mode="date" @change="dateChange"></u-calendar>
			<!-- 消息提示 -->
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import configData from '@/common/configData'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				form: {},
				defaultValue:[],//多选列表的默认选中数据
				isShowDate: false, //日期选择器是否显示
				isShowSelectList: false, //选择器是否显示
				isShowSelect:false,//多选器是否显示
				isShowInoutcave:true,//洞内外观察部分数据输入显示
				isShowKeyParams:true,//关键监测参数输入显示
				isShowDepth:true,//埋深显示
				paramsList:[],//测点位置列表
				data: [], //选择器展示数据
				clickType: '', //点击的输入框
				label:'标定系数(MPa/Hz2)：',//标定系数的标签
				placeholder:'请输入',//标定系数的placeholder
			}
		},
		onReady() {
			// 获取默认时间
			this.form.burialDate = this.$utils.getDate(new Date(), 'yyyy-MM-dd')
		},
		computed: {
			...mapGetters(['getBasisList','getInstrumentList']),
		},
		methods: {
			// 选择日期
			dateChange(res) {
				this.form.burialDate = res.result
			},
			// 打开列选择器
			openSelect(type) {
				this.data = []
				this.clickType = type
				switch (type){
					case 'testItems': //监测参数
						this.data.push({label:'洞内外观察',value:'洞内外观察'},...configData.parameterNameKeyList,...configData.parameterNameList)
						break;
					case 'pointPosition': //测点位置
						this.data = this.paramsList
						break;
					case 'equipments': //仪器设备
						this.data = this.getInstrumentList
						break;
					case 'testBasis': //试验依据
						this.data = this.getBasisList
						break;
					case 'wallRockGrade':
						this.data = configData.originalRockGradeList
						break;
					default:
						this.data = configData[`${type}List`]
						break;
				}
				if(type == 'testBasis' || (type == "pointPosition" && (this.form.testItems=="拱顶下沉" || this.form.testItems=="拱脚下沉" || this.form.testItems=="地表下沉" || this.form.testItems=="周边位移")) ){
					// 多选
					this.defaultValue = this.form[type]?this.form[type].split(','):[]
					this.isShowSelect = true
				}else{
					// 单选
					this.isShowSelectList = true
				}
			},
			// 点击列选择器的确认按钮
			clickConfirm(res) {
				switch (this.clickType){
					case 'testItems': //监测参数
						if(this.form.testItems == res[0].value){
							return
						}
						this.isShowInoutcave = true
						this.isShowKeyParams = true
						this.isShowDepth = true
						this.form = {}
						// this.form.pointPosition = ''//清空测点位置
						this.defaultValue = [] //清空多选器的数据列表
						this.label = '标定系数(MPa/Hz2)：'
						this.placeholder = "请输入"
						switch (res[0].value){
							case '洞内外观察':
								this.isShowInoutcave = false
								break;
							case '拱顶下沉':
								this.paramsList = configData.testName0List
								this.isShowKeyParams = false
								break;
							case '拱脚下沉':
								this.paramsList = configData.testName1List
								this.isShowKeyParams = false
								break;
							case '地表下沉':
								this.paramsList = configData.testName2List
								this.isShowKeyParams = false
								break;
							case '周边位移':
								this.paramsList = configData.testName3List
								this.isShowKeyParams = false
								break;
							case '钢支撑内力':
								this.paramsList = configData.installationPositionList
								this.isShowDepth = false
								this.placeholder = '请输入(实际系数*弹性模量)'
								break;
							case '围岩压力':
							case '两侧支护间压力':
								this.paramsList = configData.installationPosition2List
								this.isShowDepth = false
								break;
							case '支护内应力':
							case '衬砌内应力':
								this.paramsList = configData.installationPosition2List
								this.isShowDepth = false
								this.placeholder = '请输入(实际系数*弹性模量)'
								break;
							case '锚杆轴力':
								this.paramsList = configData.installationPosition2List
								this.label = '标定系数(kN/Hz2)：'
								break;
							case '围岩内部位移':
								this.paramsList = configData.installationPosition2List
								this.label = '标定系数(mm/Hz2)：'
								break;
							default:
								break;
						}
						this.form.testItems = res[0].value
						break;
					default:
						this.form[this.clickType] = res[0].value 
						break;
				}
			},
			// 点击多选的确定按钮
			clickSelectConfirm(value){
				if(this.clickType == 'pointPosition'){ //测点位置
					this.form.pointPosition = value
				}else{ // 试验依据
					this.form.testBasis = value
				}
			},
			// 点击保存按钮
			submit() {
				let that = this
				this.form.initialMonitoringDate = this.form.burialDate
				console.log(this.form)
				this.$httpMonitor.addStatistics(this.form).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: '信息上传成功',
							type: 'success',
							back: true,
							duration: 500
						})
						const eventChannel = this.getOpenerEventChannel();
						eventChannel.emit('toPlanIndex');
					} else {
						uni.getStorage({
							key: 'plan_key',
							success: (res) => {
								let dataArr = res.data
								let obj = JSON.parse(JSON.stringify(that.form))
								dataArr.push(obj)
								uni.setStorage({
									key: 'plan_key',
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
									key: 'plan_key',
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
			}
		}
	}
</script>

<style scoped>

</style>
