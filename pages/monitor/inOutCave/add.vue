<template>
	<view class="navbar inOutCaveAdd">
		<u-navbar title="洞内外观察" title-color="white" back-icon-color="white">
			<view class="slot-wrap">
				<u-button class="content" size="mini" type="success" @click="submit">保存</u-button>
			</view>
		</u-navbar>
		<view class="form">
			<u-form :model="form" ref="uForm" label-width="220" label-align="left">
				<view class="group">
					<view class="groupTitle">开挖面观察</view>
					<view class="groupList">
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">掌子面里程</view>
								<view class="groupItemContent">
									<u-form-item prop="faceMileage">
										<u-input :disabled="true" :clearable="false"  @click="openSelect('faceMileage')" v-model="form.faceMileage" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								
								<view class="groupItemLabel">岩石产状</view>
								<view class="groupItemContent">
									<u-form-item prop="rockLithologyOccurrence">
										<u-input :clearable="false" v-model="form.rockLithologyOccurrence" placeholder="请输入" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">风化程度</view>
								<view class="groupItemContent">
									<u-form-item prop="boltFailureCondition">
										<u-input :disabled="true" :clearable="false" @click="openSelect('boltFailureCondition')" v-model="form.boltFailureCondition" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
							<!-- <view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.boltFailureCondition" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view> -->
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">坚硬程度</view>
								<view class="groupItemContent">
									<u-form-item prop="rockType">
										<u-input :disabled="true" :clearable="false" @click="openSelect('rockType')" v-model="form.rockType" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">完整程度</view>
								<view class="groupItemContent">
									<u-form-item prop="ffractWidthFeatures">
										<u-input :disabled="true" :clearable="false" @click="openSelect('ffractWidthFeatures')" v-model="form.ffractWidthFeatures" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">稳定状态</view>
								<view class="groupItemContent">
									<u-form-item prop="faceSteadyState">
										<u-input :disabled="true" :clearable="false" @click="openSelect('faceSteadyState')" v-model="form.faceSteadyState" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">地下水状况</view>
								<view class="groupItemContent">
									<u-form-item prop="groundwaterStatus">
										<u-input :disabled="true" :clearable="false" @click="openSelect('groundwaterStatus')" v-model="form.groundwaterStatus" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">岩体初始应力</view>
								<view class="groupItemContent">
									<u-form-item prop="crackCondition">
										<u-input :disabled="true" :clearable="false" @click="openSelect('crackCondition')" v-model="form.crackCondition" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
						</view>
						<view class="groupItem">
							<view class="groupItemTop">
								<view class="groupItemLabel">结构面产状与洞轴线的关系</view>
								<view class="groupItemContent">
									<u-form-item prop="jfissureDevTrend">
										<u-input :disabled="true" :clearable="false" @click="openSelect('jfissureDevTrend')" v-model="form.jfissureDevTrend" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
						</view>
					</view>
				</view>
				<view class="group">
					<view class="groupTitle">围岩判断</view>
					<view class="groupList">
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">原设计围岩级别</view>
								<view class="groupItemContent">
									<u-form-item prop="originalRockGrade">
										<u-input :disabled="true" :clearable="false" @click="openSelect('originalRockGrade')" v-model="form.originalRockGrade" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
						</view>
						<view class="groupItem">
							<view class="groupItemTop">
								<view class="groupItemLabel">现判断围岩级别</view>
								<view class="groupItemContent">
									<u-form-item prop="nowRockGrade">
										<u-input :disabled="true" :clearable="false" @click="openSelect('nowRockGrade')" v-model="form.nowRockGrade" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
						</view>
					</view>
				</view>
				<view class="group">
					<view class="groupTitle">已支护区段观察</view>
					<view class="groupList">
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">初期支护和二次衬砌表面渗水情况</view>
								<view class="groupItemContent">
									<u-form-item prop="surfaceWaterCondition">
										<u-input :disabled="true" :clearable="false" placeholder="" />
									</u-form-item>
								</view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.surfaceWaterCondition" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">初期支护和二次衬砌表面开裂情况</view>
								<view class="groupItemContent">
									<u-form-item prop="secondCrackCondition">
										<u-input :disabled="true" :clearable="false" placeholder="" />
									</u-form-item>
								</view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.secondCrackCondition" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">初期支护和二次衬砌混凝土起鼓、剥落情况</view>
								<view class="groupItemContent">
									<u-form-item prop="sprcontactCondition">
										<u-input :disabled="true" :clearable="false" placeholder="" />
									</u-form-item>
								</view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.sprcontactCondition" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">拱架变形情况</view>
								<view class="groupItemContent">
									<u-form-item prop="steelarchExtrusionCondition">
										<u-input :disabled="true" :clearable="false" placeholder="" />
									</u-form-item>
								</view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.steelarchExtrusionCondition" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem">
							<view class="groupItemTop">
								<view class="groupItemLabel">仰拱、调平层底鼓、开裂情况</view>
								<view class="groupItemContent">
									<u-form-item prop="floorDrumPhenomenon">
										<u-input :disabled="true" :clearable="false" placeholder="" />
									</u-form-item>
								</view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.floorDrumPhenomenon" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="group">
					<view class="groupTitle">洞口及浅埋段观察</view>
					<view class="groupList">
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">地表开裂、滑移、沉陷情况</view>
								<view class="groupItemContent">
									<u-form-item prop="surfacsubCondition">
										<u-input :disabled="true" :clearable="false" placeholder="" />
									</u-form-item>
								</view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.surfacsubCondition" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">边坡仰坡开裂、滑塌、碎落情况</view>
								<view class="groupItemContent">
									<u-form-item prop="swaterLeakageCondition">
										<u-input :disabled="true" :clearable="false" placeholder="" />
									</u-form-item>
								</view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.swaterLeakageCondition" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem">
							<view class="groupItemTop">
								<view class="groupItemLabel">地表、边坡、仰坡植被、水流变化情况</view>
								<view class="groupItemContent">
									<u-form-item prop="surfaceVegetationChanges">
										<u-input :disabled="true" :clearable="false" placeholder="" />
									</u-form-item>
								</view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.surfaceVegetationChanges" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-form>
			<!-- 监测参数选择 -->
			<u-select v-model="isShowSelectList" :mode="clickType == 'rockType'?'mutil-column-auto':'single-column'" :list="data" @confirm="clickConfirm"></u-select>
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
					faceMileage:'',//掌子面里程
					rockLithologyOccurrence:'',//岩石产状
					rockType:'较软岩',//岩性和产状
					boltFailureCondition:'中风化',//风化程度
					ffractWidthFeatures:'较破碎',//完整程度
					faceSteadyState:'随时间松弛、掉块',//稳定状态
					groundwaterStatus:'潮湿',//地下水状态
					crackCondition:'低',//岩体初始应力
					jfissureDevTrend:'其他组合',//结构面产状与洞轴线的关系
					originalRockGrade:'',//原设计围岩级别
					nowRockGrade:'',//现判断围岩级别
					surfaceWaterCondition:'无',//初期支护和二次衬砌表面渗水情况
					secondCrackCondition:'无',//初期支护和二次衬砌表面开裂情况
					sprcontactCondition:'无',//初期支护和二次衬砌混凝土起鼓、剥落情况
					steelarchExtrusionCondition:'无',//拱架变形情况
					floorDrumPhenomenon:'无',//仰拱、调平层底鼓、开裂情况
					surfacsubCondition:'无',//地表开裂、滑移、沉陷情况
					swaterLeakageCondition:'无',//边坡仰坡开裂、滑塌、碎落情况
					surfaceVegetationChanges:'无'//地表、边坡、仰坡植被、水流变化情况
				},//表单数据
				formRemake: {
					surfaceWaterCondition:'无渗水',//初期支护和二次衬砌表面渗水情况
					secondCrackCondition:'无明显开裂',//初期支护和二次衬砌表面开裂情况
					sprcontactCondition:'无起鼓、剥落',//初期支护和二次衬砌混凝土起鼓、剥落情况
					steelarchExtrusionCondition:'无明显变形',//拱架变形情况
					floorDrumPhenomenon:'无底鼓、开裂',//仰拱、调平层底鼓、开裂情况
					surfacsubCondition:'无开裂、滑移、沉陷',//地表开裂、滑移、沉陷情况
					swaterLeakageCondition:'无开裂、滑塌、碎落',//边坡仰坡开裂、滑塌、碎落情况
					surfaceVegetationChanges:'无明显变化'//地表、边坡、仰坡植被、水流变化情况
				},//备注数据
				formRemakeCopy: {
					surfaceWaterCondition:'无渗水',//初期支护和二次衬砌表面渗水情况
					secondCrackCondition:'无明显开裂',//初期支护和二次衬砌表面开裂情况
					sprcontactCondition:'无起鼓、剥落',//初期支护和二次衬砌混凝土起鼓、剥落情况
					steelarchExtrusionCondition:'无明显变形',//拱架变形情况
					floorDrumPhenomenon:'无底鼓、开裂',//仰拱、调平层底鼓、开裂情况
					surfacsubCondition:'无开裂、滑移、沉陷',//地表开裂、滑移、沉陷情况
					swaterLeakageCondition:'无开裂、滑塌、碎落',//边坡仰坡开裂、滑塌、碎落情况
					surfaceVegetationChanges:'无明显变化'//地表、边坡、仰坡植被、水流变化情况
				},//备注数据备份
				isShowSelectList: false, //选择器是否显示
				data: [], //选择器展示数据
				clickType: '', //点击的输入框
				faceMileageList:[],//掌子面里程列表
			}
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toAddPage', (data) => {
				this.form.projectId = data.projectId
				this.form.recordNumber = data.recordNumber
				let value = uni.getStorageSync('storage_projectPlan');
				let monitorList = []
				if(value.length > 0){
					value.some(item => {
						if(item.projectId == data.projectId){
							monitorList = JSON.parse(item.projectPlan).monitor
							return true
						}
					})
					if(monitorList.length > 0){
						monitorList.forEach(item2 => {
							this.faceMileageList.push({value:item2.monitorName,label:item2.monitorName})
						})
					}
				}
			})
		},
		watch:{
			formRemake:{
				handler(newVal,oldVal){
					console.log("单个属性监听", newVal, oldVal);
					for (let item in newVal) {
						if(newVal[item] == this.formRemakeCopy[item]){
							this.form[item] = '无'
						}else{
							this.form[item] = newVal[item]
						}
					}
				},
				deep:true,
				immediate: true
			},
		},
		methods: {
			// 打开列选择器
			openSelect(type) {
				this.data = []
				this.clickType = type
				if(type == 'faceMileage'){
					this.data = this.faceMileageList
				}else{
					this.data = configData[`${type}List`]
				}
				this.isShowSelectList = true
			},
			// 点击列选择器的确认按钮
			clickConfirm(res) {
				this.form[this.clickType] = res[0].value 
			},
			// 点击保存按钮
			submit() {
				console.log(this.form)
				// return
				let that = this
				// 获取默认时间
				// this.form.testDate = this.$utils.getDate(new Date())
				this.form.testDate = this.$utils.getDate(new Date())
				this.$httpMonitor.addInoutcaveObservationRecord(this.form).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: '信息上传成功',
							type: 'success',
							back: true,
							duration: 500
						})
						const eventChannel = this.getOpenerEventChannel();
						eventChannel.emit('toInOutCaveIndex');
					} else {
						uni.getStorage({
							key: 'inoutcave_key',
							success: (res) => {
								let dataArr = res.data
								let obj = JSON.parse(JSON.stringify(that.form))
								dataArr.push(obj)
								uni.setStorage({
									key: 'inoutcave_key',
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
									key: 'inoutcave_key',
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

<style scoped lang="scss">
	page {
		background: #f1f1f1;
	}
	.mb10 {
		margin-bottom: 10px;
	}
	.mb20 {
		margin-bottom: 20px;
	}
	.inOutCaveAdd .title {
		font-size: 16px;
		line-height: 30px;
		padding: 0 10px;
	}
	.inOutCaveAdd .form .u-form-item {
		padding: 5px 0;
	}
	.inOutCaveAdd .form .group {
		.groupTitle {
			font-size: 16px;
			line-height: 30px;
			padding: 10px 10px;
			color: #909399;
		}
		.groupList {
			.groupItem {
				.groupItemTop {
					display: flex;
					align-items: center;
					position: relative;
					background: #ffffff;
					padding: 0 30px 0 10px;
					.groupItemLabel {
						width: auto;
						font-size: 14px;
						line-height: 27px;
						padding-right: 10px;
						font-weight: 700;
					}
					.groupItemContent {
						flex: 1;
						.u-input{
							text-align: right!important
						}
						/deep/ .u-form-item--right__content__slot  {
							flex-wrap: wrap;
						}
					}
					.groupItemIcon {
						position: absolute;
						right: 10px;
					}
				}
				.groupItemBottom {
					display: flex;
					align-items: center;
					background: #ffffff;
					padding: 0 20px 0 10px;
					.groupItemLabel {
						width: auto;
						font-size: 20px;
						line-height: 27px;
						padding-right: 10px;
						color: #19bb65;
					}
					.groupItemContent {
						flex: 1;
						.input-placeholder {
							color: #5f5f5f!important
						}
						/deep/ .uni-input-input {
							color: #3b9488;
						}
					}
				}
			}
		}
	}
</style>
