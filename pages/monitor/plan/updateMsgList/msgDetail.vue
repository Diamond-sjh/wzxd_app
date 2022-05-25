<template>
	<view class="msgDetail navbar">
		<u-navbar back-text="返回" title="任务详情" back-icon-color="white" title-color="white" :back-text-style="letVal"></u-navbar>
		<u-cell-group>
			<u-cell-item :arrow="false" title="监测断面桩号：">{{form.monitorSectionNumber}}</u-cell-item>
			<!-- <u-cell-item :arrow="false" v-show="isShowInoutcave" title="距洞口距离：">{{form.distanceEntrance}}</u-cell-item>
			<u-cell-item :arrow="false" v-show="isShowInoutcave" title="测线位置：">{{form.linePosition}}</u-cell-item> -->
			<u-cell-item :arrow="false" title="开挖方法：">{{form.excavationMethod}}</u-cell-item>
			<u-cell-item :arrow="false" title="监测参数：">{{form.testItems}}</u-cell-item>
			<u-cell-item :arrow="false" title="测点位置：">{{form.pointPosition}}</u-cell-item>
			<u-cell-item :arrow="false" v-show="isShowInoutcave && isShowKeyParams" title="传感器编号：">{{form.sensorNo}}</u-cell-item>
			<u-cell-item :arrow="false" v-show="isShowInoutcave && isShowKeyParams" title="标定系数：">{{form.calibratFactor}}</u-cell-item>
			<u-cell-item :arrow="false" v-show="isShowInoutcave && isShowKeyParams && isShowDepth" title="埋深：">{{form.depth}}</u-cell-item>
			<u-cell-item :arrow="false" title="主要仪器设备：">{{form.equipments}}</u-cell-item>
			<!-- <u-cell-item :arrow="false" title="试验依据：">{{form.testBasis}}</u-cell-item> -->
			<u-cell-item :arrow="false" title="埋设日期：">{{form.burialDate}}</u-cell-item>
			<u-cell-item :arrow="false" title="围岩级别：">{{form.wallRockGrade}}</u-cell-item>
			<u-cell-item :arrow="false" title="围岩级别限值：">{{form.wallRockGradeThreshold}}</u-cell-item>
			<u-cell-item :arrow="false" title="监测初始日期：">{{form.initialMonitoringDate}}</u-cell-item>
			<u-cell-item :arrow="false" title="备注：">{{form.remark}}</u-cell-item>
		</u-cell-group>
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
				isShowInoutcave: true,
				isShowKeyParams: true,
				isShowDepth: true
			}
	    },
		onLoad() {
			this.isShowInoutcave = true
			this.isShowKeyParams = true
			this.isShowDepth = true
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
				console.log(this.form)
			})
			switch (this.form.testItems){
				case '洞内外观察':
					this.isShowInoutcave = false
					break;
				case '拱顶下沉':
				case '拱脚下沉':
				case '地表下沉':
				case '周边位移':
					this.isShowKeyParams = false
					break;
				case '钢支撑内力':
				case '围岩压力':
				case '两侧支护间压力':
				case '支护内应力':
				case '衬砌内应力':
					this.isShowDepth = false
					break;
				default:
					break;
			}
		},
	    methods: {
			// 上传数据
			upload(){
				this.$httpMonitor.addStatistics(this.form).then(res => {
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
				    key: 'plan_key',
				    success:(res) => {
						let dataArr = res.data
						dataArr.splice(that.currentIndex,1)
						console.log(dataArr)
						if(dataArr.length == 0){
							uni.removeStorage({
							    key: 'plan_key',
							    success: function (res) {
							        console.log('success');
							    }
							})
						}else{
							uni.setStorage({
								key: 'plan_key',
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
</style>
