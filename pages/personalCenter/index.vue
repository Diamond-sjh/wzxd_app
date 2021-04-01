<template>
	<view class="user">
		<view class="userback">
			<view class="imgName">
				<img src="https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png">
				<view class="userName">木子李</view>
			</view>
		</view>
		<view class="userinfo-list">			
			<view class="userinfo-item" @click="clickItem('info')">
				<view class="iconfont icon-gerenxinxi">
					<text>个人信息</text>
					<text class="iconfont icon-113fangxiang_xiangyou icon-right"></text>
				</view>
			</view>
			<view class="userinfo-item" @click="clickItem('pwd')">
				<view class="iconfont icon-xiugaimima">
					<text>修改密码</text>
					<text class="iconfont icon-113fangxiang_xiangyou icon-right"></text>
				</view>
			</view>	
			<view class="userinfo-item" @click="clickItem('share')">
				<view class="iconfont icon-fenxiang">
					<text>分享</text>
					<text class="iconfont icon-113fangxiang_xiangyou icon-right"></text>
				</view>
			</view>	
			<view class="userinfo-item" @click="clickItem('update')">
				<view class="iconfont icon-icon_gengxin">
					<text>系统更新</text>
					<text class="iconfont icon-113fangxiang_xiangyou icon-right"></text>
				</view>
			</view>	
		</view>		
<<<<<<< HEAD
		<u-modal v-model="islogout" :content="content" :show-cancel-button="true" @confirm="toLogin"></u-modal>
=======
>>>>>>> fc4e2a2 (个人中心)
		<button class="logout-btn" type="default" @click="logout">退出登录</button>
	</view>
	
</template>

<script>
<<<<<<< HEAD
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				islogout:false,
				content:'确认退出当前登录？'
			}
		},
		methods: {
			...mapMutations(['DELET_INFO']),
			clickItem(val){
				if(val == 'info'){
					uni.navigateTo({
						url:'/pages/personalCenter/userInfo/index'
=======
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			clickItem(val){
				if(val == 'info'){
					uni.navigateTo({
						url:'/pages/personalCenter/userInfo'
>>>>>>> fc4e2a2 (个人中心)
					})
					return
				}
				if(val == 'pwd'){
					uni.navigateTo({
<<<<<<< HEAD
						url:'/pages/personalCenter/changePWD/index'
=======
						url:'/pages/personalCenter/changePWD'
>>>>>>> fc4e2a2 (个人中心)
					})
					return
				}
				if(val == 'share'){
					uni.showToast({
						title:'分享'
					})
					return
				}
				if(val == 'update'){
					uni.showToast({
						title:'更新'
					})
					return
				}
			},
			logout() {
<<<<<<< HEAD
				this.islogout = true
			},
			toLogin(){
				this.DELET_INFO()
=======
>>>>>>> fc4e2a2 (个人中心)
				uni.reLaunch({
				    url: '/pages/login/login',
				});
			}
		},
	}
</script>

<style>
	.userback {
		height: 432rpx;
		background-color: #55aaff;
		text-align: center;
		/* padding-bottom: 20px; */
<<<<<<< HEAD
		position: relative;
	}
	.userback .imgName {
		width: 300rpx;
		height: 300rpx;
		position: absolute;
		margin: auto;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
=======
>>>>>>> fc4e2a2 (个人中心)
	}

	.userback img {
		margin: auto;
		border-radius: 51px;
		margin-top: 15%;
		margin-bottom: 3%;
<<<<<<< HEAD
		width: 100px;
		height: 100px;
=======
		width: 97px;
		height: 97px;
>>>>>>> fc4e2a2 (个人中心)
	}
	.userName{
		color: #111111;
		font-size: 0.9rem;
	}
	.userinfo-list .userinfo-item {
		height: 80rpx;
		line-height: 80rpx;
		margin: 0 10px;
		border-bottom: 1px solid #bfbfbf;
	}
	.userinfo-list .userinfo-item .iconfont:before {
		margin-left: 10px;
		margin-right: 10px;
	}
	.userinfo-list .userinfo-item .iconfont.icon-right {
		float: right;
	}
	.logout-btn {
		position: absolute;
		bottom: 10px;
		width: calc(100% - 20px);
		background-color: #918e8e;
		margin: 0 10px;
	}
</style>
