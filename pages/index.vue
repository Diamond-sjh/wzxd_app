<template>
	<view class="home">
		<view class="title">
			我的应用
		</view>
		<view class="applicationList" v-if="current == 0">
			<view class="applicationItem" @click="jump('project')">
				<u-image width="100px" height="100px" src="/static/project.png"></u-image>
				<view class="textContent">隧道检测</view>
			</view>
			<view class="applicationItem" @click="jump('bridge')">
				<u-image width="100px" height="100px" src="/static/project.png"></u-image>
				<view class="textContent">桥梁监测</view>
			</view>
		<!-- 	<view class="applicationItem" @click="jump('text')">
				<u-image width="100px" height="100px" src="/static/project.png"></u-image>
				<view class="textContent">桥梁监测</view>
			</view> -->
		</view>
		<view class="applicationList" v-else>
			<view class="applicationItem" @click="jump('monitor')">
				<u-image width="100px" height="100px" src="/static/project.png"></u-image>
				<view class="textContent">全站仪数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex'
	export default {
	    data() {
	        return {
				timer:null,
				isConnected:true,
				updateStatusTimestamp:'',
				current:'0'
			}
	    },
		computed: {
			...mapGetters(['getVirusList','getVirusListLen','getVirusTimestamp','getCurrentTimestamp','getStatueList']),
		},
		onLoad(option) {
			console.log(option)
			if(option && option.current){
				this.current = option.current
			}
			if(this.current == 0){
				uni.onNetworkStatusChange(res => {
					this.isConnected = res.isConnected
					if(res.isConnected && this.timer != null){
						clearInterval(this.timer)
						this.timer = null
						this.sendMsg()
					}
					if(res.isConnected && this.getStatueList.size > 0){
						this.updateStatus()
					}
				})
				this.$http.getCurrentUser().then(res=>{
					if(res.code == '200'){
						this.SET_CUSTINFO(res.data)
					}
				})
			}
		},
		watch:{
			getVirusListLen(curVal,oldVal){
				console.log(curVal)
				if(curVal == 0){
					uni.showModal({
						title: '提示',  
						content: '病害信息已全部上传成功！',  
						showCancel: false
					})
					return
				}
				if(curVal != 0 && this.timer == null){
					if(this.isConnected){
						this.sendMsg()
					}else{
						console.log('无网络')
						this.timer = setInterval(()=>{
							if(this.isConnected){
								clearInterval(this.timer)
								this.timer = null
								this.sendMsg()
							}else{
								console.log('无网络')
							}
						},30000)
					}
				}
			}
		},
	    methods: {
			...mapMutations(['SET_CUSTINFO','SET_TIMESTAMP','DELET_VIRUS','DELET_STATUElIST']),
			sendMsg(){
				this.SET_TIMESTAMP([...this.getVirusList.keys()][0])
				let data = this.getVirusTimestamp([...this.getVirusList.keys()][0])
				uni.uploadFile({
					url: 'http://47.114.76.25:9505/guns-cloud-config/gunscheckRecords/updateAndUpload',//你上传接口
					filePath:data.filePath?data.filePath:'',//上传的文件
					name:data.filePath?"file":"noFile", //后台接收文件的标识
					formData:data.formData, 
					success: (res) => {
						console.log('发送成功')
						this.DELET_VIRUS(this.getCurrentTimestamp)
						clearInterval(this.timer)
						this.timer = null
					},
					fail: (err) => {
						console.log('发送失败')
						if(this.isConnected){
							this.sendMsg()
						}else{
							this.timer = setInterval(()=>{
								if(this.isConnected){
									clearInterval(this.timer)
									this.timer = null
									this.sendMsg()
								}
							},30000)
						}
						
					}
				})
			},
			updateStatus(){
				this.updateStatusTimestamp = [...this.getStatueList.keys()][0]
				let data = [...this.getStatueList.values()][0]
				this.$http.updateChecked(data).then(res => {
					if(res.code == 200){
						this.DELET_STATUElIST(this.updateStatusTimestamp)
						if(this.isConnected && this.getStatueList.size > 0){
							this.updateStatus()
						}else{
							console.log('全部上传')
						}
					}
				}).catch(e => {
					if(this.isConnected){
						this.updateStatus()
					}else{
						console.log('无网络')
					}
				})
			},
			jump(val){
				if(val == 'bridge'){
					uni.navigateTo({
					    url: '/pages/bridge/index'
					});
					return
				}
				if(val == 'project'){
					uni.navigateTo({
					    url: '/pages/home/index'
					});
				}
				if(val == 'text'){
					uni.navigateTo({
					    url: '/pages/text/index'
					});
				}
				if(val == 'monitor'){
					uni.navigateTo({
					    url: '/pages/monitor/index'
					});
				}
			}
	    }
	}
</script>

<style scoped>
	.home {
		padding: 10px;
	}
	.home .title{
		margin: 10px 0 20px;
		padding-left: 10px;
		font-size: 22px;
		font-weight: 700;
		border-left: 3px solid #cccccc;
	}
	.home .applicationList{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.home .applicationList .applicationItem{
		width: 110px;
		margin: 0 3px;
	}
	.home .applicationList .u-image{
		margin: 0 5px;
	}
	.home .applicationList .applicationItem .textContent{
		text-align: center;
		width: 100%;
		font-size: 18px;
	}
</style>
