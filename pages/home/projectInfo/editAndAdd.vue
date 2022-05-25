<template>
	<view class="updateAndAdd navbar">
		<u-navbar back-text="返回" title="新增修改" back-icon-color="white" title-color="white" :back-text-style="letVal"></u-navbar>
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="所属路线：">
				<text>{{form.routeLine}}</text>
			</u-form-item>
			<u-form-item label="所属路段：">
				<text>{{form.roadSection}}</text>
			</u-form-item>
			<u-form-item label="所属隧道：">
				<text>{{form.tunnelName}}</text>
			</u-form-item>
			<u-form-item label="幅别：">
				<text>{{form.projectFloat==1?'左幅':form.projectFloat==2?'右幅':'———'}}</text>
			</u-form-item>
			<u-form-item label="状态：">
				<text>{{form.state==0?'正常':'异常'}}</text>
			</u-form-item>
			<u-form-item label="设施名称：">
				<text>{{form.branchName}}</text>
			</u-form-item>
			<u-form-item label="设备名称：">
				<u-input v-model="form.deviceName" placeholder="" :border="true" :disabled="form.checkContent !=''"/>
			</u-form-item>
			<u-form-item label="检查项目：">
				<u-input v-model="form.checkContent" placeholder="" :border="true" :disabled="form.checkContent == ''" />
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
					roadSection: "",//所属路段
					tunnelName: "",//所属隧道
					projectFloat:'',//幅别
					state:'',//状态
					branchName: "",//设施分项
					deviceName:"",//设备名称
					checkContent: "",//检测项目
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
					checkContent: this.form.checkContent,
					deviceCode: this.form.deviceCode,
					deviceName: this.form.deviceName,
					deviceRemark: "",
					id: this.form.id,
					projectFloat: this.form.projectFloat,
					remark: "",
					roadSection: this.form.roadSection,
					routeLine: this.form.routeLine,
					state: this.form.state,
					tunnelId: this.form.trunelId,
					tunnelName: this.form.tunnelName
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
					checkContent: this.form.checkContent,
					deviceCode: this.form.deviceCode,
					deviceName: this.form.deviceName,
					projectFloat: this.form.projectFloat,
					remark: "",
					roadSection: this.form.roadSection,
					routeLine: this.form.routeLine,
					tunnelName:this.form.tunnelName,
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
	.updateAndAdd .btns{
		display: flex;
	}
</style>
