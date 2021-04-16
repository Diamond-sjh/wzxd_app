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
				<view class="textContent">待检测项目</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
	    data() {
	        return {
				
			}
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
	    methods: {
			...mapMutations(['SET_CUSTINFO']),
			jump(val){
				if(val == 'addProject'){
					uni.redirectTo({
					    url: '/pages/addProject/index'
					});
					return
				}
				if(val == 'project'){
					uni.redirectTo({
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
