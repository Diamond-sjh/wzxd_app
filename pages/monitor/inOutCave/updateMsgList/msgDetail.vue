<template>
	<view class="msgDetail">
		<u-navbar back-text="返回" title="任务详情" back-icon-color="white" title-color="white" :back-text-style="letVal"></u-navbar>
		<u-cell-group title="掌子面观察">
			<u-cell-item :arrow="false" title="掌子面里程：">{{form.faceMileage}}</u-cell-item>
			<u-cell-item :arrow="false" title="岩石岩性及走向：">{{form.rockType}}</u-cell-item>
			<u-cell-item :arrow="false" title="风化程度及走向：">{{form.rockLithologyOccurrence}}</u-cell-item>
			<u-cell-item :arrow="false" title="节理裂隙发育程度及走向：">{{form.jfissureDevTrend}}</u-cell-item>
			<u-cell-item :arrow="false" title="断层破碎带宽度及特征：">{{form.ffractWidthFeatures}}</u-cell-item>
			<u-cell-item :arrow="false" title="地下水状况：">{{form.groundwaterStatus}}</u-cell-item>
			<u-cell-item :arrow="false" title="掌子面稳定状态：">{{form.faceSteadyState}}</u-cell-item>
		</u-cell-group>
		<u-cell-group title="洞内观察">
			<u-cell-item :arrow="false" title="渗漏水状况：">{{form.leakageCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="喷层裂缝状况：">{{form.crackCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="喷层与围岩接触状况：">{{form.sprcontactCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="钢拱架挤压状况：">{{form.steelarchExtrusionCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="锚杆破坏状况：">{{form.boltFailureCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="二衬表面裂缝状况：">{{form.secondCrackCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="是否有底鼓现象：">{{form.floorDrumPhenomenon}}</u-cell-item>
		</u-cell-group>
		<u-cell-group title="洞外观察">
			<u-cell-item :arrow="false" title="地表开裂、沉陷状况：">{{form.surfacsubCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="边坡、仰坡稳定状态：">{{form.swaterLeakageCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="地表水渗漏状况：">{{form.surfaceWaterCondition}}</u-cell-item>
			<u-cell-item :arrow="false" title="地表植被变化状况：">{{form.surfaceVegetationChanges}}</u-cell-item>
		</u-cell-group>
		<u-cell-group title="围岩判断">	
			<u-cell-item :arrow="false" title="原设计围岩级别：">{{form.originalRockGrade}}</u-cell-item>
			<u-cell-item :arrow="false" title="现判断围岩级别：">{{form.nowRockGrade}}</u-cell-item>
		</u-cell-group>
		<view class="containerCommon" v-if="isShowBtn">
			<u-button type="success" @click="upload">上传数据</u-button>
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
				currentIndex:null
			}
	    },
		onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toMsgDetail', (data) => {
				this.isShowBtn = true
				Object.assign(this.form,data.item)
				this.currentIndex = data.index
				console.log(this.form)
				console.log(this.currentIndex)
			})
			eventChannel.on('IndexToMsgDetail', (data) => {
				this.isShowBtn = false
				Object.assign(this.form,data)
				console.log(this.form)
				console.log(this.currentIndex)
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

<style scoped>
	page {
		background: #f1f1f1;;
	}
	.msgDetail /deep/ .u-navbar {
		background: linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))!important;
	}
</style>
