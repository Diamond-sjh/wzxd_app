<template>
	<view class="updateAndAdd">
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
				<u-input v-model="form.deviceName" placeholder="" :border="true" />
			</u-form-item>
			<u-form-item label="检查项目：">
				<u-input v-model="form.checkContent" placeholder="" :border="true" />
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
				form:{
					routeLine: "",//所属路线
					roadSection: "",//所属路段
					tunnelName: "",//所属隧道
					projectFloat:'',//幅别
					state:'',//状态
					branchName: "",//设施分项
					deviceName:"",//设备名称
					checkContent: ""//检测项目
				}
			}
	    },
		onLoad() {
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('homeIndexToUpdateAndAdd', (data) => {
				Object.assign(this.form,data)
			})
		},
	    methods: {
			// 点击修改按钮
			clickUpdate(){
				this.$http.updataDisease(this.form).then(res=>{
					console.log(res)
					const eventChannel = this.getOpenerEventChannel()
					if(res.code == 200){
						// 触发父级页面定义的方法
						eventChannel.emit('formUpdateAndAdd', {val:'update',data:this.form});
						this.$refs.uToast.show({
							title: '修改成功',
							type: 'success',
							back: true
						})
					}else{
						this.$refs.uToast.show({
							title: '修改失败',
							type: 'error'
						})
					}
				})
			},
			// 点击新增按钮
			async clickAdd(){	
				const eventChannel = this.getOpenerEventChannel()
				let params = {
					tunnelName:this.form.tunnelName,
					branchName:this.form.branchName,
					deviceName:this.form.deviceName.replace(/[0-9]/ig,""),
					deviceCode:this.form.deviceCode,
					checkCode:this.form.checkCode,
				}
				await this.$http.queryListProjectInfo(params).then(res=>{
					let updateParams = res.data[0]
					updateParams.deviceCount++
					this.$http.updateProjectInfo(updateParams).then(response=>{
						console.log(response)
					})
				})
				let addParams = JSON.parse(JSON.stringify(this.form))
				// Object.assign(addParams,this.form)
				addParams.id = ''
				addParams.state = '0'
				await this.$http.addProjectDevice(addParams).then(res=>{
					if(res.code == '200'){
						console.log(res)
						// 触发父级页面定义的方法
						eventChannel.emit('formUpdateAndAdd', {val:'add',data:this.form});
						this.$refs.uToast.show({
							title: '新增成功',
							type: 'success',
							back: true
						})
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
