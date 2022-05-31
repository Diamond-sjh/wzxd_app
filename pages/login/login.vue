<template>
	<view class="content" :style="[{backgroundImage: bgWx},{height: (screenHeight +'px !important;')}]">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../static/wzxdlogo.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form">
			<u-subsection :list="list" :current="current" @change="subsection"></u-subsection>
			<!--账号-->
			<view class="inputView borderDown">
				<image class="nameImage" src="../../static/name.png"></image>
				<label class="loginLab">账号</label>
				<u-input class="inputText" v-model="username" placeholder="请输入账号" :clearable="false" type="text" />
			</view>
			<!--密码-->
			<view class="inputView borderDown">
				<image class="keyImage" src="../../static/key.png"></image>
				<label class="loginLab">密码</label>
				<u-input class="inputText" v-model="password" placeholder="请输入密码" :password-icon="false" :clearable="false" type="password" />
			</view>
			<view class="inputView" v-show="current == 1">
				<image class="keyImage" src="../../static/key.png"></image>
				<u-input class="inputText" v-model="captcha" placeholder="请输入验证码" :password-icon="false" :clearable="false" type="text" />
				<image @click="getCaptchaImage()" class="captcha" :src="captchaUrl?'data:image/jpg;base64,'+captchaUrl:'../../static/imgError.png'"></image>
			</view>
			<view class="loginBtn" v-show="current == 0" @click="loginBtn">
				<text class="btnValue">登录</text>
			</view>
			<view class="loginBtn" v-show="current == 1" @click="loginBtn2">
				<text class="btnValue">登录</text>
			</view>
			<view class="forgotBtn">
				<text>找回密码</text>
			</view>
		</view>
	</view>
</template>

<script>
	import JSEncrypt from '../../static/js/jsencrypt.js'
	import { pathToBase64, base64ToPath } from '../../static/js/image-tools.js'
	import { mapMutations,mapActions } from 'vuex'
	export default {
		data() {
			return {
				list:[{
					name:'机电定检'
				},
				{
					name:'监控量测'
				}],
				current:0,//登录环境的tab
				username:'caiwenbin',//账号
				password:'123456',//密码
				// 机电定检登录传参
				params:{
					account:'',
					password:'',
				},
				captcha:'',//验证码
				captchaUrl:'',//验证码图片地址
				// 隧道监控量测登录传参
				params2:{
					uuid:'',//隧道监控测量登录验证码的uuid
					username:'',
					password:'',
					code:''
				},
				screenHeight:'',
				bgWx:'url(../../static/shouye.png)'
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		methods: {
			...mapMutations(['SET_TOKEN']),
			...mapActions(['setUserToken']),
			// 切换登录系统
			subsection(index){
				this.current = index
				if(index == 1){
					this.getCaptchaImage()
				}
			},
			// 获取验证码
			getCaptchaImage(){
				this.$httpMonitor.captchaImage({}).then(res => {
					if(res.code == 200){
						let a = uni.base64ToArrayBuffer(res.img)
						this.captchaUrl = res.img.replace(/[\r\n]/g, "")
						this.params2.uuid = res.uuid
					}else{
						uni.showToast({
							title: '验证码获取失败',
							icon: 'error'
						});
					}
				})
			},
			// 点击登录按钮(登录机电定检模块)
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
					if(res.code == '200'){
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
			// 登录成功的回调
			backFunction(){
				uni.setStorageSync('userType',0)
				uni.switchTab({
					url: '/pages/index'
				})
			},
			// 点击登录按钮(登录隧道监控测量模块)
			loginBtn2(){
				if (this.username.length <= 0 || this.password.length <= 0) {
					uni.showToast({
						title: '账号或密码不能为空',
						icon: 'none'
					});
					return;
				} else {
					var encrypt = new JSEncrypt()
					let publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKoR8mX0rGKLqzcWmOzbfj64K8ZIgOdHnzkXSOVOZbFu/TJhZ7rFAN+eaGkl3C4buccQd/EjEsj9ir7ijT7h96MCAwEAAQ=='
					encrypt.setPublicKey(publicKey)	//	 publicKey为公钥
					this.params2.username = this.username
					// this.params2.password = encrypt.encrypt(this.password)
					this.params2.password = this.password
					this.params2.code = this.captcha
					this.$httpMonitor.login(this.params2).then((res)=>{
						if(res.code == '200'){
							this.$store.commit('SET_TOKEN', res.token);
							this.backFunction2()
						}else{
							uni.showToast({
							    icon: 'error',
							    title: res.msg,
								duration:1000
							});
							this.captcha = ''
							this.params.code = ''
							setTimeout(()=>{
								this.getCaptchaImage()
							},1100)
						}
					}).catch(e=>{
						uni.showToast({
						    icon: 'none',
						    title: e.errMsg,
						});
					})
				}
			},
			// 登录成功的回调
			backFunction2(){
				uni.setStorageSync('userType',1)
				uni.reLaunch({
					url: '/pages/monitor/transitionPage?type=login'
				})
			},
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
	}
	.content {
		background: #377EB4;
		width: 100%;
		min-height: 100%;
		/* background: url('~@/static/shouye.png'); */
		background-position: 65% 100%;
		background-repeat: no-repeat;
		background-size:cover
	}
	.avatorWrapper{
		height: 35vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.avator{
		/* width: 400upx; */
		/* height: 400upx; */
		width: 300upx;
		overflow: hidden;
	}
	.avator .img{
		width: 100%
	}
	.form{
		padding: 0 100upx;
		margin-top: 65px;
	}
	.inputView {
		background-color: rgba(255, 255, 255, 0.8);
		line-height: 40px;
		border-width: 1px;
		border: 2dp;
		border-radius: 20px;
		margin: 10px 0px;
		display: flex;
		justify-content: left;
		align-items: center;
		padding: 0 15px;
	}
	.inputView .captcha{
		width: 110px;
		height: 40px;
	}
	
	.inputView.borderDown {
		border-bottom: 1px solid #CCCCCC;
	}
	/*输入框*/
	.nameImage,
	.keyImage {
		width: 18px;
		height: 18px;
		margin-right: 5px;
	}
	
	.loginLab {
	
	}
	
	.inputText {
		margin-left: 20px;
		text-align: left;
	}
	.loginBtn{
		width: 100%;
		height: 80upx;
		background: #77B307;
		border-radius: 50upx;
		margin-top: 30px;
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
