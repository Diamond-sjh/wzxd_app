<template>
	<div id="qrCode" ref="qrCodeDiv"></div>
</template>

<script>
	 import QRCode from 'qrcodejs2';
	
	export default {
	    name: "qrCode",
	    data() {
	      return {
			  bridgeName:''
		  }
	    },
	    mounted: function () {
	      this.$nextTick(function () {
	        this.bindQRCode();
	      })
	    },
	    methods: {
	      bindQRCode: function () {
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toQrCodeInfoIndex', (data) => {
				this.bridgeName = data.bridgeName
			})
	        new QRCode(this.$refs.qrCodeDiv, {
	          text: 'http://www.baidu.com?bridgeName='+this.bridgeName,
			  width: 200,
	          height: 200,
	          colorDark: "#333333", //二维码颜色
	          colorLight: "#ffffff", //二维码背景色
	          correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
	        })
	      }
	    }
	  }
</script>

<style>
</style>
