<template>
	<view class="home">
		<view class="title">
			我的应用
		</view>
		<view class="applicationList">
			<!-- <view class="applicationItem" @click="jump('addProject')">
				<u-image width="100px" height="100px" src="/static/addProject.png"></u-image>
				<view class="textContent">添加检测项目</view>
			</view> -->
			<view class="applicationItem" @click="jump('project')">
				<u-image width="100px" height="100px" src="/static/project.png"></u-image>
				<view class="textContent">隧道检测项目</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex'
	export default {
	    data() {
	        return {
				timer:null
			}
	    },
		computed: {
			...mapGetters(['getVirusList','getVirusListLen','getCurrentTimestamp','getVirusTimestamp','getCurrentTimestamp']),
		},
		onLoad() {
			this.$http.getCurrentUser().then(res=>{
				if(res.code == '200'){
					this.SET_CUSTINFO(res.data)
				}
			})
		},
		// 右上角按钮的点击方法
		onNavigationBarButtonTap() {
			
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
					this.SET_TIMESTAMP([...this.getVirusList.keys()][0])
					let data = this.getVirusTimestamp([...this.getVirusList.keys()][0])
					// 每半分钟发送一次
					this.timer = setInterval(()=>{
						this.$http.updateVirusInfo(data).then(res=>{
							console.log('发送成功')
							this.DELET_VIRUS(this.getCurrentTimestamp)
							clearInterval(this.timer)
							this.timer = null
						}).catch(e=>{
							console.log('发送失败')
						})
					},30000)
				}
			}
		},
	    methods: {
			...mapMutations(['SET_CUSTINFO','SET_TIMESTAMP','DELET_VIRUS']),
			jump(val){
				if(val == 'addProject'){
					uni.navigateTo({
					    url: '/pages/addProject/index'
					});
					return
				}
				if(val == 'project'){
					uni.navigateTo({
					    url: '/pages/home/index'
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
