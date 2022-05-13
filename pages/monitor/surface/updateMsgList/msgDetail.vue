<template>
	<view class="msgDetail">
		<u-navbar back-text="返回" title="任务详情" back-icon-color="white" title-color="white" :back-text-style="letVal"></u-navbar>
		<u-cell-group>
			<u-cell-item :arrow="false" title="监测日期：">{{form.testDate}}</u-cell-item>
			<u-cell-item :arrow="false" title="监测参数：">{{form.parameterName}}</u-cell-item>
			<u-cell-item :arrow="false" title="断面桩号：">{{form.detectionStation}}</u-cell-item>
			<u-cell-item :arrow="false" title="测点名称：">{{form.testName}}</u-cell-item>
			<u-cell-item :arrow="false" title="基准点坐标：">{{form.viewpoint}}</u-cell-item>
			<u-cell-item :arrow="false" title="全站仪实时值：">{{form.realValue}}</u-cell-item>
			<u-cell-item :arrow="false" title="观测值：">{{form.calculatZ}}</u-cell-item>
		</u-cell-group>
		<view class="containerCommon">
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
				form:{
					testDate: "",//监测日期
					parameterName: "",//监测参数
					detectionStation: "",//断面桩号
					testName: "",//测点名称
					viewpoint: "",//基准点坐标
					realValue: "",//全站仪实时值
					calculatZ: "",//观测值
				},
				currentIndex:null
			}
	    },
		onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toMsgDetail', (data) => {
				Object.assign(this.form,data.item)
				this.currentIndex = data.index
				this.$forceUpdate()
				console.log(this.form)
				console.log(this.currentIndex)
			})
		},
	    methods: {
			// 上传数据
			upload(){
				this.$httpMonitor.addGwzmRecordSon(this.form).then(res => {
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
				    key: 'surface_key',
				    success:(res) => {
						let dataArr = res.data
						dataArr.splice(that.currentIndex,1)
						console.log(dataArr)
						if(dataArr.length == 0){
							uni.removeStorage({
							    key: 'surface_key',
							    success: function (res) {
							        console.log('success');
							    }
							})
						}else{
							uni.setStorage({
								key: 'surface_key',
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
	.msgDetail /deep/ .u-navbar {
		background: linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))!important;
	}
</style>
