<template>
	<view class="content">
		<uni-forms ref="form">
			<uni-forms-item label="原密码" class="formItem">
				<uni-easyinput type="password" v-model="oldPassword" placeholder="请输入原密码" />
			</uni-forms-item>
			<uni-forms-item label="新密码" class="formItem">
				<uni-easyinput type="password" v-model="newPassword" placeholder="请输入新密码" />
			</uni-forms-item>
			<uni-forms-item label="确认密码" class="formItem">
				<uni-easyinput type="password" v-model="repeatPassword" placeholder="请再次输入新密码" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="clickSure">确认修改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				repeatPassword: ''
			}
		},
		methods: {
			// 点击确认修改
			clickSure() {
				if(!this.oldPassword){
					uni.showToast({
						title:'请输入原密码',
						icon:'none'
					})
					return
				}
				if(!this.newPassword){
					uni.showToast({
						title:'请输入新密码',
						icon:'none'
					})
					return
				}
				if(!this.repeatPassword){
					uni.showToast({
						title:'请确认新密码',
						icon:'none'
					})
					return
				}
				let params = {
					oldPassword: this.oldPassword,
					newPassword: this.newPassword,
					repeatPassword: this.repeatPassword
				}
				this.$http.updatePwd(params).then((res) => {
					console.log(res)
				})
			}
		},
	}
</script>

<style scoped>
	.content {
		margin: 10px;
	}
	.formItem {
		margin: 0 10px;
	}
	.formItem /deep/ .uni-forms-item__box .uni-forms-item__inner {
		padding-bottom: 15px;
	}
</style>
