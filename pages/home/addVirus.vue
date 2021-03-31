<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/c1.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../static/c2.png'
				}]
			}
	    },
		onLoad() {
			var that = this
			uni.getLocation({
				type: 'gcj02',
				geocode: true,
				success: function (res) {
					console.log(res);
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					that.latitude = res.latitude //当前纬度
					that.longitude = res.longitude//当前经度
				}
			})
			console.log(this.longitude,this.latitude)
		},
	    methods: {
	
	    }
	}
</script>

<style>
</style>
