<template>
	<view>
		<u-navbar back-text="返回" :title="bridgeName" :background="{backgroundColor: '#F2F2F2'}"></u-navbar>
		<web-view :src="pdfUrl"></web-view>
	</view>
</template>

<script>
	var wv; //计划创建的webview
	export default {
		data() {
			return {
				pdfUrl: '',
				bridgeName: ''
			}
		},
		onLoad() {
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('showPDF', (url, name) => {
				// console.log(url, name)
				this.bridgeName = name
				let a = "http://61.153.27.86:9000" + url
				this.pdfUrl = '/hybrid/html/web/viewer.html?file=' + encodeURIComponent(a)
			})
		},

		onReady() {
			// #ifdef APP-PLUS
			
			let currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
			setTimeout(function() {
				wv = currentWebview.children()[0]
				wv.setStyle({
					top: uni.getSystemInfoSync().statusBarHeight+44,
					scalable: true
					})
			}, 1000); //如果是页面初始化调用时，需要延时一下
			// #endif
		}

	}
</script>

<style>
</style>
