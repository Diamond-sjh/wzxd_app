<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<!-- <image class="img" src="../../static/wzxdlogo.png" mode="widthFix"></image> -->
			</view>
		</view>
		<view class="form">
			<view class="inputWrapper">
				<input class="input" type="text" v-model="username" placeholder="请输入用户名"/>
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" v-model="password" placeholder="请输入密码"/>
			</view>
			<view class="loginBtn">
				<text class="btnValue" @click="loginBtn">登录</text>
			</view>
			<view class="forgotBtn">
				<text>找回密码</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	import JSEncrypt from '../../static/js/jsencrypt.js'
	export default {
		data() {
			return {
				username:'admin',
				password:'111111',
				params:{
					account:'',
					password:''
				},
			}
		},
		onLoad() {

		},
		methods: {
			...mapActions(['setUserToken']),
			loginBtn(){
				if(!this.username){
					uni.showToast({
						title:'请输入用户名',
						icon:'none'
					})
					return
				}
				if(!this.password){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
					return
				}
				var encrypt = new JSEncrypt()
				let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDt30AcO8CSAfzSa5L8ikVrfehH6aFw9KyL85NzOAduOfnPcbiAGLjLWEKOkOhkYrlSAfU5s+pa3OQTsgpfCkVVm56dEQh8sajIR4uyGbhv0/CdvPTZS5o3sP6Yi9TemWZ443+QNjajN6MSCTmTY86ZoR9jmTcJtV4kNTQWDov6qQIDAQAB'
				encrypt.setPublicKey(publicKey)	//	 publicKey为公钥
				this.params.password = encrypt.encrypt(this.password)
				this.params.account = this.username
				this.$http.login(this.params).then((res)=>{
					// uni.hideLoading()
					if(res.code == '200'){
						console.log(res)
						this.setUserToken({
							data:{
								clientId:'20005',
								code:res.data.code
								},
							callback:this.backFunction
						})
					}else{
						uni.showToast({
						    icon: 'none',
						    title: res.message,
						});
					}
				}).catch(e=>{
					console.log(e)
					uni.showToast({
					    icon: 'none',
					    title: e.errMsg,
					});
				})
			},
			backFunction(){
				uni.reLaunch({
				    url: '/pages/index',
				})
			}
		}
	}
</script>

<style>
	.content {
		background: #377EB4;
		width: 100vw;
		height: 100vh;
		background: url('~@/static/shouye.png');
		background-position: 65% 100%;
		background-repeat: no-repeat;
	}
	.avatorWrapper{
		height: 30vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.avator{
		width: 200upx;
		height: 200upx;
		overflow: hidden;
	}
	.avator .img{
		width: 100%
	}
	.form{
		padding: 0 100upx;
		margin-top: 80px;
	}
	.inputWrapper{
		width: 100%;
		height: 80upx;
		background: white;
		border-radius: 20px;
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 25px;
	}
	.inputWrapper .input{
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 15px;
	}
	.loginBtn{
		width: 100%;
		height: 80upx;
		background: #77B307;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.loginBtn .btnValue{
		color: white;
	}
	.forgotBtn{
		text-align: center;
		color: #EAF6F9;
		font-size: 15px;
		margin-top: 20px;
	}
</style>
