<template>
	<view>
		<u-tabbar :height="100" :list="tabbar" activeBgColor="#ffffff" v-model="current" :mid-button="false" @change="changeTabbar"></u-tabbar>
	</view>
</template>

<script>
	import { mapGetters,mapMutations } from 'vuex'
	export default {
		name:"my-tabbar",
		data() {
			return {
				current: 0,
				msg:{},
				tabbar : []
			};
		},
		created() {
			let userType = uni.getStorageSync('userType') ? uni.getStorageSync('userType') : 0;
			//机电定检
			if(userType == 1){
				this.tabbar = [
					{
						"pagePath": "/pages/monitor/plan/index",
						"iconPath": "/static/index/plan_icon.png",
						"selectedIconPath": "/static/index/plan_icon1.png",
						"text": "监控计划"
					},
					{
						"pagePath": "/pages/monitor/index",
						"iconPath": "/static/index/monitor_icon.png",
						"selectedIconPath": "/static/index/monitor_icon1.png",
						"text": "全站仪"
					},
					{
						"pagePath": "/pages/monitor/inOutCave/index",
						"iconPath": "/static/index/inOutCave_icon.png",
						"selectedIconPath": "/static/index/inOutCave_icon1.png",
						"text": "洞内外观察"
					},
					{
						"pagePath": "/pages/monitor/surface/index",
						"iconPath": "/static/index/surface_icon.png",
						"selectedIconPath": "/static/index/surface_icon1.png",
						"text": "振弦式读数仪"
					}
				]
			}else{
				this.tabbar = [
					{
						"pagePath": "/pages/index",
						"iconPath": "/static/zhuye0.png",
						"selectedIconPath": "/static/zhuye1.png",
						"text": "首页"
					},{
						"pagePath": "/pages/personalCenter/index",
						"iconPath": "/static/mycenter0.png",
						"selectedIconPath": "/static/mycenter1.png",
						"text": "个人中心"
					}
				]
			}
		},
		methods:{
			changeTabbar(index){
				this.current = index
			}
		}
	}
</script>

<style scoped>
.u-tabbar /deep/ .u-badge.u-badge--bg--error {
	top: -5px!important;
	right: -10px!important;
}
</style>
