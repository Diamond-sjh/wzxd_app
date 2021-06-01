<template>
	<view class="qrcode">
		<qrcode ref="qrcode" :modal="modal" :url="url" @hideQrcode="hideQrcode"></qrcode>
	</view>
</template>

<script>
	export default {
	    name: "qrCode",
	    data() {
	      return {
			  url:'',
			  modal:false
		  }
	    },
		onLoad() {
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toQrCodeInfoIndex', (data) => {
				//this.url = 'http://www.baidu.com?bridgeName='+data.bridgeName
				this.url = 'http://47.114.76.25/?bridgeName='+data.bridgeName
			})
		},
	    mounted: function () {
			this.showQrcode()
	    },
	    methods: {
			// 展示二维码
			showQrcode() {
				let _this = this;
				this.modal = true;
				setTimeout(function() {
					_this.$refs.qrcode.couponQrCode()
				}, 500)
			},
			//传入组件的方法
			hideQrcode() {
				// this.modal = false;
			}
	    }
	  }
</script>

<style>
</style>
