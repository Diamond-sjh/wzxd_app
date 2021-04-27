<template>
	<view class="updateAndAdd">
		<u-navbar back-text="返回" title="新增修改" back-icon-color="white" title-color="white" :back-text-style="letVal"></u-navbar>
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="所属路线：">
				<text>{{form.routeLine}}</text>
			</u-form-item>
			<u-form-item label="所属路段：">
				<text>{{form.routeSection}}</text>
			</u-form-item>
			<u-form-item label="所属隧道：">
				<text>{{form.chunnel}}</text>
			</u-form-item>
			<u-form-item label="幅别：">
				<text>{{form.directionType==1?'左幅':form.directionType==2?'右幅':'———'}}</text>
			</u-form-item>
			<u-form-item label="状态：">
				<text>{{form.isfault==0?'正常':'异常'}}</text>
			</u-form-item>
			<u-form-item label="设施名称：">
				<text>{{form.branchName}}</text>
			</u-form-item>
			<u-form-item label="设备名称：">
				<u-input v-model="form.facilitiesName" placeholder="" :border="true" />
			</u-form-item>
			<u-form-item label="检查项目：">
				<u-input v-model="form.checkItem" placeholder="" :border="true" />
			</u-form-item>
		</u-form>
		<view class="btns">
			<u-button type="warning" size="medium" style="margin-right:10px" @click="clickUpdate">修改</u-button>
			<u-button type="primary" size="medium" style="margin-left:10px" @click="clickAdd">新增</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
	
<script>
	export default {
	    data() {
	        return {
				// 头部导航栏
				letVal:{
					color:'white'
				},//导航栏左边字体颜色
				form:{
					routeLine: "",//所属路线
					routeSection: "",//所属路段
					chunnel: "",//所属隧道
					directionType:'',//幅别
					isfault:'',//状态
					branchName: "",//设施分项
					facilitiesName:"",//设备名称
					checkItem: "",//检测项目
					checkCode: "",
					deviceCode: "",
					deviceRemark: "",
				}
			}
	    },
		onLoad() {
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toEditAndAdd', (data) => {
				console.log(data)
				Object.assign(this.form,data)
				console.log(this.form)
			})
		},
	    methods: {
			// 点击修改按钮
			clickUpdate(){
				let params = {
					branchName: this.form.branchName,
					checkCode: this.form.checkCode,
					checkContent: this.form.checkItem,
					deviceCode: this.form.deviceCode,
					deviceName: this.form.facilitiesName,
					deviceRemark: "",
					id: this.form.pdId,
					projectFloat: this.form.directionType,
					remark: "",
					roadSection: this.form.routeSection,
					routeLine: this.form.routeLine,
					state: this.form.isfault,
					tunnelId: this.form.trunelId,
					tunnelName: this.form.chunnel
				}
				this.$http.updataDisease(params).then(res=>{
					console.log(res)
					const eventChannel = this.getOpenerEventChannel()
					if(res.code == 200){
						// 触发父级页面定义的方法
						eventChannel.emit('formEditAndAdd', {val:'update',data:this.form});
						uni.navigateBack({
						    delta: 1
						});
					}else{
						this.$refs.uToast.show({
							title: '修改失败',
							type: 'error'
						})
					}
				})
			},
			// 点击新增按钮
			clickAdd(){	
				const eventChannel = this.getOpenerEventChannel()
				let params = {
					branchName:this.form.branchName,
					checkCode: this.form.checkCode,
					checkContent: this.form.checkItem,
					deviceCode: this.form.deviceCode,
					deviceName: this.form.facilitiesName,
					projectFloat: this.form.directionType,
					remark: "",
					roadSection: this.form.routeSection,
					routeLine: this.form.routeLine,
					tunnelName:this.form.chunnel,
					tunnelId: this.form.tunnelId,
				}
				let addParams = JSON.parse(JSON.stringify(params))
				addParams.state = '0'
				this.$http.addProjectDevice(addParams).then(res=>{
					if(res.code == '200'){
						// 触发父级页面定义的方法
						eventChannel.emit('formEditAndAdd', {val:'add'});
						uni.navigateBack({
						    delta: 1
						});
					}else{
						this.$refs.uToast.show({
							title: '新增失败',
							type: 'error'
						})
					}
				})
			}
	    }
	}
</script>

<style>
	.updateAndAdd {
		padding: 10px;
	}
	.updateAndAdd /deep/ .u-navbar {
		background: linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))!important;;
	}
	.updateAndAdd .btns{
		display: flex;
	}
</style>
