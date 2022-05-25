<template>
	<view class="msgDetail navbar">
		<u-navbar back-text="返回" title="任务详情" back-icon-color="white" title-color="white" :back-text-style="letVal"></u-navbar>
		<u-cell-group>
			<u-cell-item :arrow="false" title="检测日期：">{{form.testDate}}</u-cell-item>
		</u-cell-group>
		<u-cell-group title="开挖面观察">
			<u-cell-item :arrow="false" title="掌子面里程：">{{form.faceMileage}}</u-cell-item>
			<u-cell-item :arrow="false" title="岩石产状：">{{form.rockLithologyOccurrence}}</u-cell-item>
			<u-cell-item :arrow="false" title="风化程度：">{{form.boltFailureCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="坚硬程度：">{{form.rockType}}</u-cell-item>
			<u-cell-item :arrow="false" title="完整程度：">{{form.ffractWidthFeatures}}</u-cell-item>
			<u-cell-item :arrow="false" title="稳定状态：">{{form.faceSteadyState}}</u-cell-item>
			<u-cell-item :arrow="false" title="地下水状况：">{{form.groundwaterStatus}}</u-cell-item>
			<u-cell-item :arrow="false" title="岩体初始应力：">{{form.rockStressMass}}</u-cell-item>
			<u-cell-item :arrow="false" title="结构面产状与洞轴线的关系：">{{form.jfissureDevTrend}}</u-cell-item>
		</u-cell-group>
		<u-cell-group title="围岩判断">
			<u-cell-item :arrow="false" title="原设计围岩级别：">{{form.originalRockGrade}}</u-cell-item>
			<u-cell-item :arrow="false" title="现判断围岩级别：">{{form.nowRockGrade}}</u-cell-item>
		</u-cell-group>
		<!-- <u-cell-group title="已支护区段观察">
			<u-cell-item :arrow="false" title="初期支护和二次衬砌表面渗水情况："></u-cell-item>
			<u-cell-item :arrow="false">{{form.surfaceWaterCondition=="无"?formRemake.surfaceWaterCondition:form.surfaceWaterCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="初期支护和二次衬砌表面开裂情况：">{{form.secondCrackCondition=="无"?formRemake.secondCrackCondition:form.secondCrackCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="初期支护和二次衬砌混凝土起鼓、剥落情况：">{{form.sprcontactCondition=="无"?formRemake.sprcontactCondition:form.sprcontactCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="拱架变形情况：">{{form.steelarchExtrusionCondition=="无"?formRemake.steelarchExtrusionCondition:form.steelarchExtrusionCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="仰拱、调平层底鼓、开裂情况：">{{form.floorDrumPhenomenon=="无"?formRemake.floorDrumPhenomenon:form.floorDrumPhenomenon}}</u-cell-item>
		</u-cell-group>
		<u-cell-group title="洞口及浅埋段观察">
			<u-cell-item :arrow="false" title="地表开裂、滑移、沉陷情况：">{{form.surfacsubCondition=="无"?formRemake.surfacsubCondition:form.surfacsubCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="边坡仰坡开裂、滑塌、碎落情况：">{{form.swaterLeakageCondition=="无"?formRemake.swaterLeakageCondition:form.swaterLeakageCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="地表、边坡、仰坡植被、水流变化情况：">{{form.surfaceVegetationChanges=="无"?formRemake.surfaceVegetationChanges:form.surfaceVegetationChanges}}</u-cell-item>
		</u-cell-group> -->
		<view class="group">
			<view class="groupTitle">已支护区段观察</view>
			<view class="groupList">
				<view class="groupItem mb10">
					<view class="groupItemTop">
						<view class="groupItemLabel">初期支护和二次衬砌表面渗水情况：</view>
					</view>
					<view class="groupItemBottom">
							{{form.surfaceWaterCondition=="无"?formRemake.surfaceWaterCondition:form.surfaceWaterCondition}}
					</view>
				</view>
				<view class="groupItem mb10">
					<view class="groupItemTop">
						<view class="groupItemLabel">初期支护和二次衬砌表面开裂情况：</view>
					</view>
					<view class="groupItemBottom">
							{{form.secondCrackCondition=="无"?formRemake.secondCrackCondition:form.secondCrackCondition}}
					</view>
				</view>
				<view class="groupItem mb10">
					<view class="groupItemTop">
						<view class="groupItemLabel">初期支护和二次衬砌混凝土起鼓、剥落情况：</view>
					</view>
					<view class="groupItemBottom">
							{{form.sprcontactCondition=="无"?formRemake.sprcontactCondition:form.sprcontactCondition}}
					</view>
				</view>
				<view class="groupItem mb10">
					<view class="groupItemTop">
						<view class="groupItemLabel">拱架变形情况：</view>
					</view>
					<view class="groupItemBottom">
							{{form.steelarchExtrusionCondition=="无"?formRemake.steelarchExtrusionCondition:form.steelarchExtrusionCondition}}
					</view>
				</view>
				<view class="groupItem">
					<view class="groupItemTop">
						<view class="groupItemLabel">仰拱、调平层底鼓、开裂情况：</view>
					</view>
					<view class="groupItemBottom">
							{{form.floorDrumPhenomenon=="无"?formRemake.floorDrumPhenomenon:form.floorDrumPhenomenon}}
					</view>
				</view>
			</view>
		</view>
		<view class="group">
			<view class="groupTitle">洞口及浅埋段观察</view>
			<view class="groupList">
				<view class="groupItem mb10">
					<view class="groupItemTop">
						<view class="groupItemLabel">地表开裂、滑移、沉陷情况：</view>
					</view>
					<view class="groupItemBottom">
							{{form.surfacsubCondition=="无"?formRemake.surfacsubCondition:form.surfacsubCondition}}
					</view>
				</view>
				<view class="groupItem mb10">
					<view class="groupItemTop">
						<view class="groupItemLabel">边坡仰坡开裂、滑塌、碎落情况：</view>
					</view>
					<view class="groupItemBottom">
							{{form.swaterLeakageCondition=="无"?formRemake.swaterLeakageCondition:form.swaterLeakageCondition}}
					</view>
				</view>
				<view class="groupItem">
					<view class="groupItemTop">
						<view class="groupItemLabel">地表、边坡、仰坡植被、水流变化情况：</view>
					</view>
					<view class="groupItemBottom">
							{{form.surfaceVegetationChanges=="无"?formRemake.surfaceVegetationChanges:form.surfaceVegetationChanges}}
					</view>
				</view>
			</view>
		</view>
		<view class="containerCommon" v-if="isShowBtn">
			<u-button type="primary" @click="upload">上传数据</u-button>
		</view>
		<!-- 消息提示 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				letVal:{
					color:'white'
				},//导航栏左边字体颜色
				form:{},
				isShowBtn: false,//是否显示上传按钮
				currentIndex:null,
				formRemake: {
					surfaceWaterCondition:'无渗水',//初期支护和二次衬砌表面渗水情况
					secondCrackCondition:'无明显开裂',//初期支护和二次衬砌表面开裂情况
					sprcontactCondition:'无起鼓、剥落',//初期支护和二次衬砌混凝土起鼓、剥落情况
					steelarchExtrusionCondition:'无明显变形',//拱架变形情况
					floorDrumPhenomenon:'无底鼓、开裂',//仰拱、调平层底鼓、开裂情况
					surfacsubCondition:'无开裂、滑移、沉陷',//地表开裂、滑移、沉陷情况
					swaterLeakageCondition:'无开裂、滑塌、碎落',//边坡仰坡开裂、滑塌、碎落情况
					surfaceVegetationChanges:'无明显变化'//地表、边坡、仰坡植被、水流变化情况
				}
			}
	    },
		onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toMsgDetail', (data) => {
				this.isShowBtn = true
				Object.assign(this.form,data.item)
				this.currentIndex = data.index
				this.$forceUpdate()
				console.log(this.form)
				console.log(this.currentIndex)
			})
			eventChannel.on('IndexToMsgDetail', (data) => {
				this.isShowBtn = false
				Object.assign(this.form,data)
				this.$forceUpdate()
			})
		},
	    methods: {
			// 上传数据
			upload(){
				this.$httpMonitor.addInoutcaveObservationRecord(this.form).then(res => {
					if(res.code == 200){
						this.saveData()
						this.$refs.uToast.show({
							title: '信息上传成功',
							type: 'success',
							back: true,
							duration: 500
						})
					}else{
						console.log(res)
						this.$u.toast('信息上传失败')
					}
				}).catch()
			},
			// 重新保存数据到缓存
			saveData(){
				let that = this
				uni.getStorage({
				    key: 'inoutcave_key',
				    success:(res) => {
						let dataArr = res.data
						dataArr.splice(that.currentIndex,1)
						console.log(dataArr)
						if(dataArr.length == 0){
							uni.removeStorage({
							    key: 'inoutcave_key',
							    success: function (res) {
							        console.log('success');
							    }
							})
						}else{
							uni.setStorage({
								key: 'inoutcave_key',
								data: dataArr,
								success(res) {
									console.log(res);
									// that.$u.toast('缓存修改成功')
								},
								fail(err) {
									console.log(err);
									// that.$u.toast('缓存修改失败')
								}
							});
						}
						
				    }
				});
			}
	    }
	}
</script>

<style scoped lang="scss">
	page {
		background: #f1f1f1;;
	}
	.msgDetail /deep/ .u-cell-title {
		font-size: 16px;
		line-height: 30px;
		padding: 10px 10px;
		color: #909399;
	}
	.msgDetail /deep/ .u-cell_title {
		width: auto;
		font-size: 14px;
		line-height: 27px;
		padding-right: 10px;
		font-weight: 700;
	}
	.msgDetail .mb10 {
		margin-bottom: 10px;
	}
	.msgDetail .group {
		.groupTitle {
			font-size: 16px;
			line-height: 30px;
			padding: 10px 10px;
			color: #909399;
		}
		.groupList {
			.groupItem {
				border-bottom: 1px solid #e4e7ed;
				.groupItemTop {
					display: flex;
					align-items: center;
					position: relative;
					background: #ffffff;
					padding: 10px 30px 10px 10px;
					.groupItemLabel {
						width: auto;
						font-size: 14px;
						line-height: 27px;
						padding-right: 10px;
						font-weight: 700;
						color: #606266;
					}
				}
				.groupItemBottom {
					background: #ffffff;
					padding: 0px 30px 10px 20px;
					color: #909399;
				}
			}
		}
	}
</style>
