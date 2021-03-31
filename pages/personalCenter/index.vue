<template>
	<button type="default" @click="logout">退出登录</button>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logout() {
				uni.reLaunch({
				    url: '/pages/login/login',
				});
			}
		},
	}
</script>

<style>
</style>
