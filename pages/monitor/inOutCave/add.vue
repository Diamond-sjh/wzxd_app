<template>
	<view class="navbar inOutCaveAdd">
		<u-navbar title="洞内外观察数据" title-color="white" back-icon-color="white">
			<view class="slot-wrap">
				<u-button class="content" size="mini" type="success" @click="submit">保存</u-button>
			</view>
		</u-navbar>
		<view class="form">
			<u-form :model="form" ref="uForm" label-width="220" label-align="left">
				<view class="group">
					<view class="groupTitle">掌子面观察</view>
					<view class="groupList">
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">掌子面里程</view>
								<view class="groupItemContent">
									<u-form-item prop="rockType">
										<u-input :clearable="false" v-model="form.faceMileage" placeholder="请输入" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">岩石岩性及走向</view>
								<view class="groupItemContent">
									<u-form-item prop="rockType">
										<u-input :clearable="false" @click="openSelect('rockType')" v-model="form.rockType" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">风化程度及走向</view>
								<view class="groupItemContent">
									<u-form-item prop="rockLithologyOccurrence">
										<u-input :clearable="false" @click="openSelect('rockLithologyOccurrence')" v-model="form.rockLithologyOccurrence" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.rockLithologyOccurrence" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">节理裂隙发育程度及走向</view>
								<view class="groupItemContent">
									<u-form-item prop="jfissureDevTrend">
										<u-input :clearable="false" @click="openSelect('jfissureDevTrend')" v-model="form.jfissureDevTrend" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.jfissureDevTrend" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">断层破碎带宽度及特征</view>
								<view class="groupItemContent">
									<u-form-item prop="ffractWidthFeatures">
										<u-input :clearable="false" @click="openSelect('ffractWidthFeatures')" v-model="form.ffractWidthFeatures" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.ffractWidthFeatures" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">地下水状况</view>
								<view class="groupItemContent">
									<u-form-item prop="groundwaterStatus">
										<u-input :clearable="false" @click="openSelect('groundwaterStatus')" v-model="form.groundwaterStatus" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.groundwaterStatus" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem">
							<view class="groupItemTop">
								<view class="groupItemLabel">掌子面稳定状态</view>
								<view class="groupItemContent">
									<u-form-item prop="faceSteadyState">
										<u-input :clearable="false" @click="openSelect('faceSteadyState')" v-model="form.faceSteadyState" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.faceSteadyState" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="group">
					<view class="groupTitle">洞内观察</view>
					<view class="groupList">
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">渗漏水状况</view>
								<view class="groupItemContent">
									<u-form-item prop="leakageCondition">
										<u-checkbox-group @change="leakageConditionChange">
											<u-checkbox 
												v-model="item.checked"
												v-for="(item, index) in leakageConditionList" :key="index" 
												:name="item.value"
											>{{item.label}}</u-checkbox>
										</u-checkbox-group>
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">喷层裂缝状况</view>
								<view class="groupItemContent">
									<u-form-item prop="crackCondition">
										<u-input :clearable="false" @click="openSelect('crackCondition')" v-model="form.crackCondition" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.crackCondition" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">喷层与围岩接触状况</view>
								<view class="groupItemContent">
									<u-form-item prop="sprcontactCondition">
										<u-input :clearable="false" @click="openSelect('sprcontactCondition')" v-model="form.sprcontactCondition" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
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
								<view class="groupItemLabel">钢拱架挤压状况</view>
								<view class="groupItemContent">
									<u-form-item prop="steelarchExtrusionCondition">
										<u-input :clearable="false" @click="openSelect('steelarchExtrusionCondition')" v-model="form.steelarchExtrusionCondition" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
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
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">锚杆破坏状况</view>
								<view class="groupItemContent">
									<u-form-item prop="boltFailureCondition">
										<u-input :clearable="false" @click="openSelect('boltFailureCondition')" v-model="form.boltFailureCondition" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
							<view class="groupItemBottom">
								<view class="groupItemLabel">
									<u-icon class="icon" name="tianjia" custom-prefix="custom-icon"></u-icon>
								</view>
								<view class="groupItemContent">
									<u-form-item>
										<u-input :clearable="false" v-model="formRemake.boltFailureCondition" placeholder="添加备注" />
									</u-form-item>
								</view>
							</view>
						</view>
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">二衬表面裂缝状况</view>
								<view class="groupItemContent">
									<u-form-item prop="secondCrackCondition">
										<u-input :clearable="false" @click="openSelect('secondCrackCondition')" v-model="form.secondCrackCondition" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
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
						<view class="groupItem">
							<view class="groupItemTop">
								<view class="groupItemLabel">是否有底鼓现象</view>
								<view class="groupItemContent">
									<u-form-item prop="floorDrumPhenomenon">
										<u-input :clearable="false" @click="openSelect('floorDrumPhenomenon')" v-model="form.floorDrumPhenomenon" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
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
					<view class="groupTitle">洞外观察</view>
					<view class="groupList">
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">地表开裂、沉陷状况</view>
								<view class="groupItemContent">
									<u-form-item prop="surfacsubCondition">
										<u-input :clearable="false" @click="openSelect('surfacsubCondition')" v-model="form.surfacsubCondition" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
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
								<view class="groupItemLabel">边坡、仰坡稳定状态</view>
								<view class="groupItemContent">
									<u-form-item prop="swaterLeakageCondition">
										<u-input :clearable="false" @click="openSelect('swaterLeakageCondition')" v-model="form.swaterLeakageCondition" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
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
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">地表水渗漏状况</view>
								<view class="groupItemContent">
									<u-form-item prop="surfaceWaterCondition">
										<u-input :clearable="false" @click="openSelect('surfaceWaterCondition')" v-model="form.surfaceWaterCondition" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
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
						<view class="groupItem">
							<view class="groupItemTop">
								<view class="groupItemLabel">地表植被变化状况</view>
								<view class="groupItemContent">
									<u-form-item prop="surfaceVegetationChanges">
										<u-input :clearable="false" @click="openSelect('surfaceVegetationChanges')" v-model="form.surfaceVegetationChanges" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
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
				<view class="group">
					<view class="groupTitle">围岩判断</view>
					<view class="groupList">
						<view class="groupItem mb10">
							<view class="groupItemTop">
								<view class="groupItemLabel">原设计围岩级别</view>
								<view class="groupItemContent">
									<u-form-item prop="originalRockGrade">
										<u-input :clearable="false" @click="openSelect('originalRockGrade')" v-model="form.originalRockGrade" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
							</view>
						</view>
						<view class="groupItem mb20">
							<view class="groupItemTop">
								<view class="groupItemLabel">现判断围岩级别</view>
								<view class="groupItemContent">
									<u-form-item prop="nowRockGrade">
										<u-input :clearable="false" @click="openSelect('nowRockGrade')" v-model="form.nowRockGrade" placeholder="请选择" />
									</u-form-item>
								</view>
								<view class="groupItemIcon"><u-icon name="arrow-right"></u-icon></view>
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
				form: {},//表单数据
				formRemake: {},//备注数据
				isShowSelectList: false, //选择器是否显示
				data: [], //选择器展示数据
				leakageConditionList:[],//渗漏水情况
				clickType: '', //点击的输入框
			}
		},
		onLoad() {
			this.leakageConditionList = configData.leakageConditionList
		},
		methods: {
			// 打开列选择器
			openSelect(type) {
				this.data = []
				this.clickType = type
				this.data = configData[`${type}List`]
				this.isShowSelectList = true
			},
			// 点击列选择器的确认按钮
			clickConfirm(res) {
				if (this.clickType == 'rockType') {
					this.form[this.clickType] = `${res[0].value},${res[1].value}` 
				}else{
					this.form[this.clickType] = res[0].value 
				}
			},
			// 渗漏水情况选择
			leakageConditionChange(value){
				this.form.leakageCondition = value.join(',')
			},
			// 点击保存按钮
			submit() {
				let that = this
				// 获取默认时间
				this.form.testDate = this.$utils.getDate(new Date())
				for (let item in this.formRemake) {
					if(this.form[item]){
						this.form[item] = `${this.form[item]},${this.formRemake[item]}`
					}else{
						this.form[item] = this.formRemake[item]
					}
				}
				console.log(this.form)
				// return
				this.$httpMonitor.addInoutcaveObservationRecord(this.form).then(res => {
					if (res.code == 201) {
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
					}
				}
			}
		}
	}
</style>
