<template>
	<view class="navbar home">
		<u-navbar :is-back="false" title="首页" title-color="white" back-icon-color="white">
			<view class="slot-wrap">
				<text @click="logout()" style="color: #ffffff;">注销</text>
			</view>
		</u-navbar>
		<view class="title">
			我的应用
		</view>
		<view class="applicationList">
			<view class="applicationItem" @click="jump('plan')">
				<u-image width="100px" height="100px" src="/static/index/plan.png"></u-image>
				<view class="textContent">监控计划</view>
			</view>
			<view class="applicationItem" @click="jump('monitor')">
				<u-image width="100px" height="100px" src="/static/index/monitor.png"></u-image>
				<view class="textContent">全站仪</view>
			</view>
			<view class="applicationItem" @click="jump('surface')">
				<u-image width="100px" height="100px" src="/static/index/surface.png"></u-image>
				<view class="textContent">振弦式读数仪</view>
			</view>
			<view class="applicationItem" @click="jump('inOutCave')">
				<u-image width="100px" height="100px" src="/static/index/inOutCave.png"></u-image>
				<view class="textContent">洞内外观察</view>
			</view>
		</view>
		<u-modal v-model="islogout" content="确认退出当前登录？" :show-cancel-button="true" @confirm="toLogin"></u-modal>
		
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
	    data() {
	        return {
				islogout:false
			}
	    },
		onLoad() {
			this.getParams()
		},
		// 右上角按钮的点击方法
		onNavigationBarButtonTap() {
		},
	    methods: {
			...mapMutations(['DELET_INFO']),
			// 查询规范依据
			getParams(){
				this.$httpMonitor.selectProjectPlan().then(res => {
					if(res.code == 200){
						let dataArr = res.data
						uni.setStorage({
							key: 'storage_projectPlan',
							data: dataArr,
							success(res) {
								console.log('监测参数本地保存成功');
							},
							fail(err) {
								console.log('监测参数本地保存成功');
							}
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
						let projectList = []
						res.data.forEach(val => {
							projectList.push({
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
				this.$httpMonitor.queryAllData().then(res => {
					console.log(res)
					if(res.code == 200){
						let dataArr = res.data
						uni.setStorage({
							key: 'allMonitor_key',
							data: dataArr,
							success(res) {
								console.log('全站仪数据本地保存成功');
							},
							fail(err) {
								console.log('全站仪数据本地保存成功');
							}
						});
					}else{
						this.$u.toast(res.msg)
					}
				})
			},
			jump(val){
				if(val == 'monitor'){
					uni.navigateTo({
					    url: `/pages/monitor/transitionPage?name=${val}`
					});
					return
				}
				if(val == 'inOutCave'){
					uni.navigateTo({
					    url: `/pages/monitor/transitionPage?name=${val}`
					});
					return
				}
				if(val == 'surface'){
					uni.navigateTo({
					    url: `/pages/monitor/transitionPage?name=${val}`
					});
					return
				}
				if(val == 'plan'){
					uni.navigateTo({
					    url: '/pages/monitor/plan/index'
					});
					return
				}
			},
			// 退出登录
			logout() {
				console.log(12)
				this.islogout = true
			},
			toLogin(){
				this.DELET_INFO()
				uni.reLaunch({
				    url: '/pages/login/login',
				});
			}
	    }
	}
</script>

<style scoped>
.home {
		padding: 10px;
	}
	.home .title{
		margin: 10px 0 20px;
		padding-left: 10px;
		font-size: 22px;
		font-weight: 700;
		border-left: 3px solid #cccccc;
	}
	.home .applicationList{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.home .applicationList .applicationItem{
		width: 110px;
		margin: 0 3px;
	}
	.home .applicationList .u-image{
		margin: 0 5px;
	}
	.home .applicationList .applicationItem .textContent{
		text-align: center;
		width: 100%;
		font-size: 18px;
	}
</style>
