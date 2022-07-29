<template>
	<view class="navbar project">
		<u-navbar :isBack="false" back-icon-color="white" title="工程列表" title-color="white">
			<view class="navbarRight">
				<u-button type="success" size="mini" @click="logout()">注销</u-button>
			</view>
		</u-navbar>
		<view class="search">
			<u-search class="searchContent" v-model="projectName" placeholder="请输入工程名称关键字" :show-action="false" @custom="clickQuery" @search="clickQuery"></u-search>
			<view class="sea" @click="clickQuery()"><u-icon name="search" size="40"></u-icon></view>
		</view>
		<view class="cardContent">
			<scroll-view class="scroll-list msg-list-item" scroll-y="true" @scrolltolower="getScrollData">
				<u-cell-group>
					<u-cell-item 
						:title="item.label"
						:label="item.projectPosition" 
						v-for="(item,index) in projectList"
						@click="loolDetail(item)"
						>
					</u-cell-item>
				</u-cell-group>
				<view class="example-body">
					<uni-load-more :status="status" :content-text="contentText"/>
				</view>
			</scroll-view>
		</view>
		<u-modal v-model="islogout" content="确认退出当前登录？" :show-cancel-button="true" @confirm="toLogin"></u-modal>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
	    data() {
	        return {
				projectList:[],// 工程项目列表
				projectName:'',// 工程名称
				name:'monitor',// 跳转的页面标识
				status: 'nomore',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},	
				islogout:false,
			}
	    },
		onLoad(option) {
			console.log('onLoad')
			console.log(option)
			if(option.type&&option.type == "login"){
				this.getParams()
			}else{
				this.projectList = uni.getStorageSync('storage_projectList') ? uni.getStorageSync('storage_projectList') : []
			}
			
		},
	    methods: {
			...mapMutations(['DELET_INFO']),
			// 查询项目计划
			getParams(){
				this.$httpMonitor.selectProjectPlan().then(res => {
					if(res.code == 200){
						let dataArr = res.data
						uni.setStorage({
							key: 'storage_projectPlan',
							data: dataArr
						});
					}else{
						this.$u.toast(res.msg)
					}
				})
				this.$httpMonitor.getInfo().then(res=>{
					if(res.code == 200){
						uni.setStorage({
							key: 'storage_userInfo',
							data: res.user
						});
					}
				})
				// 查询试验依据/检测依据
				this.$httpMonitor.queryBasisNoPagelist().then(res => {
					if(res.code == 200){
						let basisList = []
						let judgeBasisList = []
						res.data.forEach(val => {
							if(val.basisType == '1'){
								basisList.push({
									value:`${val.specificationName}(${val.specificationNumber})`,
									label:`${val.specificationName}(${val.specificationNumber})`,
									extra: val
								})
							}else{
								judgeBasisList.push({
									value:`${val.specificationName}(${val.specificationNumber})`,
									label:`${val.specificationName}(${val.specificationNumber})`,
									extra: val
								})
							}
						})
						uni.setStorage({
							key: 'storage_basisList',
							data: basisList
						});
						uni.setStorage({
							key: 'storage_judgeBasisList',
							data: judgeBasisList
						});
					}
				})
				// 查询设备列表
				this.$httpMonitor.queryInstrumentNoPagelist().then(res => {
					if(res.code == 200){
						let instrumentList = []
						res.data.forEach(val => {
							instrumentList.push({
								value:`${val.equipmentName}(${val.equipmentNumber})`,
								label:`${val.equipmentName}(${val.equipmentNumber})`
							})
						})
						uni.setStorage({
							key: 'storage_Instrument',
							data: instrumentList
						});
					}
				})
				// 查询工程列表
				this.$httpMonitor.queryProjectList({}).then(res => {
					if(res.code == 200){
						this.projectList = []
						res.data.forEach(val => {
							this.projectList.push({
								value:val.id,
								recordNumber:val.recordNumber,
								label:val.projectName,
								projectPosition:val.projectPosition,
								extra:val
							})
						})
						uni.setStorage({
							key:'storage_projectList',
							data:this.projectList
						})
					}
				})
				// 查询全量的全站仪数据
				this.$httpMonitor.queryAllData({requestPurpose:'回归曲线'}).then(res => {
					if(res.code == 200){
						let dataArr = res.data
						uni.setStorage({
							key: 'allMonitor_key',
							data: dataArr
						});
					}else{
						this.$u.toast(res.msg)
					}
				})
			},
			// 点击搜索
			clickQuery(){
				// 查询工程列表
				this.$httpMonitor.queryProjectList({projectName:this.projectName}).then(res => {
					if(res.code == 200){
						this.projectList = []
						res.data.forEach(val => {
							this.projectList.push({
								value:val.id,
								recordNumber:val.recordNumber,
								label:val.projectName,
								projectPosition:val.projectPosition,
								extra:val
							})
						})
					}
				})
			},
			// 滚动加载
			getScrollData(){
				if(this.status == 'noMore'){
					return
				}
			},
			// 查看详情
			loolDetail(item){
				uni.setStorageSync("projectInfo", item)
				uni.switchTab({
					url: '/pages/monitor/plan/index'
				})
				return
				
				// let val = this.name
				// if(val == 'monitor'){
				// 	uni.navigateTo({
				// 	    url: `/pages/monitor/index?projectId=${item.value}&recordNumber=${item.recordNumber}`
				// 	});
				// 	return
				// }
				// if(val == 'inOutCave'){
				// 	uni.navigateTo({
				// 	    url: `/pages/monitor/inOutCave/index?projectId=${item.value}&recordNumber=${item.recordNumber}`
				// 	});
				// 	return
				// }
				// if(val == 'surface'){
				// 	uni.navigateTo({
				// 	    url: `/pages/monitor/surface/index??projectId=${item.value}&recordNumber=${item.recordNumber}`
				// 	});
				// 	return
				// }
				// if(val == 'plan'){
				// 	uni.navigateTo({
				// 	    url: '/pages/monitor/plan/index'
				// 	});
				// 	return
				// }
			},
			// 退出登录
			logout() {
				this.islogout = true
			},
			toLogin(){
				this.DELET_INFO()
				uni.reLaunch({
				    url: '/pages/login/login',
				});
			},
	    }
	}
</script>

<style lang="scss" scoped>
page {
	background-color: #f5f5f5;
}
.project {
	.search {
		display: flex;
		margin: 0 10px;
		.sea {
			padding: 0 5px;
			line-height: 90rpx;
		}
	}
	.scroll-list {
		// height: calc(100vh - var(--window-top) - var(--window-bottom) - 200rpx); // 105rpx 为 .search 的高度
		// height: calc(100vh - var(--window-top) - var(--window-bottom) - var(--status-bar-height) - 139px);
		height: calc(100vh - var(--window-bottom) - var(--window-top) - var(--status-bar-height) - 180rpx);
		width: 100%;
		.loadmore {
			padding: 30rpx;
		}
	}
}
</style>
