<template>
	<view class="homeContainer">
		<u-navbar back-text="返回" title="病害信息" back-icon-color="white" title-color="white" :back-text-style="letVal"></u-navbar>
		<uni-forms ref="form">
			<uni-forms-item label="设施分项:">
				<picker @change="branchNameChange" :value="branchNameIndex" :range="branchNameList">
					<view class="uni-input">{{branchNameList[branchNameIndex]}}</view>
				</picker>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</uni-forms-item>
			<uni-forms-item label="设备名称:">
				<picker @change="deviceNameChange" :value="deviceNameIndex" :range="deviceNameList">
					<view class="uni-input">{{deviceNameList[deviceNameIndex]}}</view>
				</picker>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</uni-forms-item>
			<uni-forms-item label="检测项目:">
				<picker @change="checkContentChange" :value="checkContentIndex" :range="checkContentList">
					<view class="uni-input">{{checkContentList[checkContentIndex]}}</view>
				</picker>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</uni-forms-item>
		</uni-forms>
		<!-- <button type="default" @click="search('click')">查询</button> -->
		<u-card padding="10" v-for="item in dataList" :key=item.id>
			<view class="cardHearder" slot="head">
				<view class="tunnel">{{chunnelName}}</view>
			</view>
			<view class="cardBody" slot="body">
				<view>设施分项: {{item.branchName}}</view>
				<view>设备名称: {{item.facilitiesName}}</view>
				<view>检测项目: {{item.checkItem?item.checkItem:'———'}}</view>
				<view>是否故障: {{item.isfault==1?'故障':'正常'}}</view>
			</view>
			<view class="footBtns" slot="foot">
				<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('editAndAdd',item)">添加/修改</button>
				<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('detail',item)">详情</button>
			</view>
		</u-card>

		<view class="example-body">
			<uni-load-more :status="status" :content-text="contentText"  @clickLoadMore="clickLoadMore"/>
		</view>
		<u-back-top :scroll-top="scrollTop" top="2000"></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				letVal:{
					color:'white'
				},//导航栏左边字体颜色
				chunnelName:'',//隧道名称
				tunnelId:'',//隧道ID
				// 筛选条件的值
				chunnel: '',
				branchName: '',
				facilitiesName: '',
				checkItem:'',
				// 对应筛选条件的下拉列表
				branchNameList:['请选择'],//设施分项
				deviceNameList:['请选择'],//设备名称
				checkContentList:['请选择'],//检测项目
				// 选中的下拉列表的索引
				branchNameIndex:0,
				deviceNameIndex:0,
				checkContentIndex:0,
				// 查询返回的数据列表
				dataList:[],//页面展示的列表
				dataListCopy:[],//查询所有的数据列表--备份
				branchNameDataListCopy:[],//筛选设施分项之后的列表--备份
				deviceNameDataListCopy:[],//筛选设备名称之后的列表--备份
				checkContentDataListCopy:[],//筛选检测项目之后的列表--备份
				// 数据状态 more--查看更多  noMore--没有更多   loading--加载中
				status: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				pageNo:1,
				scrollTop:0
			}
		},
		// 进入页面加载
		onLoad(){
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toViruseInfoIndex', (val) => {
				this.tunnelId = val.id
				this.chunnelName = val.chunnelName
				this.status = 'loading'
				this.getData()
			})
		},
		onNavigationBarButtonTap(e) {
			this.getData()
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 300
			})
		},
		//上拉加载
		onReachBottom(){
			if (this.status == 'noMore'){
				return;
			}
			this.pageNo++;
			let num = this.pageNo*10
			console.log(num)
			if(this.checkContentIndex != 0){
				this.dataList = this.checkContentDataListCopy.slice(0,num)
				if(this.dataList.length >= this.checkContentDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				return
			}
			if(this.deviceNameIndex != 0){
				this.dataList = this.deviceNameDataListCopy.slice(0,num)
				if(this.dataList.length >= this.deviceNameDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				return
			}
			if(this.branchNameIndex != 0){
				this.dataList = this.branchNameDataListCopy.slice(0,num)
				if(this.dataList.length >= this.branchNameDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				return
			}
			this.dataList = this.dataListCopy.slice(0,num)
			if(this.dataList.length >= this.dataListCopy.length){
				this.status = 'noMore'
			}else{
				this.status = 'more'
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
			this.status = 'loading'
			this.getData()
		},
		// 页面滚动
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// 获取全部的待检数据
			getData(){
				this.pageNo = 1
				let params = {
					testYear:new Date().getFullYear(),
					tunnelId:this.tunnelId
				}
				this.$http.queryList(params).then((res)=>{
					if(res.code == '200'){
						// 还原数据--开始
						this.dataList = [];
						this.dataListCopy = []
						this.branchNameDataListCopy = []
						this.deviceNameDataListCopy = []
						this.branchNameIndex = 0
						this.deviceNameIndex = 0
						this.checkContentIndex = 0
						this.branchNameList = ['请选择']
						this.deviceNameList = ['请选择']
						this.checkContentList = ['请选择']
						// 还原数据--结束
						// 默认展示10条数据
						this.dataList = res.data.slice(0,10) //需要展示的数据
						this.dataListCopy = res.data //备份的查询总数据
						if(this.dataList.length >= this.dataListCopy.length){
							this.status = 'noMore'
						}else{
							this.status = 'more'
						}
						
						// 所属路线  列表开始------------
						let branchNameList = new Set()
						this.dataListCopy.forEach((val)=>{
							branchNameList.add(val.branchName)
						})
						this.roadSectionList = ['请选择']
						this.branchNameList.push(...Array.from(branchNameList))
						// 所属路线  列表结束--------------------
					}
				})
			},
			// 设施分项改变
			branchNameChange(e){
				if(e.detail.value == this.branchNameIndex){
					return
				}
				this.pageNo = 1
				this.deviceNameDataListCopy = []
				this.deviceNameIndex = 0
				this.checkContentIndex = 0
				this.deviceNameList = ['请选择']
				this.checkContentList = ['请选择']
				this.branchNameIndex = e.detail.value	//选中选项的索引值
				this.branchName = this.branchNameList[this.branchNameIndex]	//选中的选项
				let data
				if(this.branchNameIndex != '0'){
					data = this.dataListCopy.filter((val)=>{
						return val.branchName == this.branchName
					})
				}else{
					data = this.dataListCopy
				}
				console.log(data)
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.branchNameDataListCopy = data
				if(this.dataList.length >= this.branchNameDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				
				// 设备名称  列表开始---------
				let deviceNameList = new Set()
				this.branchNameDataListCopy.forEach((val)=>{
					if(val.branchName == this.branchName){
						if(val.facilitiesName.replace(/[0-9]/ig,"")!="kV电力变压器" ){
							deviceNameList.add(val.facilitiesName.replace(/[0-9]/ig,""))
						}else{
							deviceNameList.add(val.facilitiesName.slice(0,9))
						}
					}
				})
				this.deviceNameList = ['请选择']
				this.deviceNameList.push(...Array.from(deviceNameList))
				// 设备名称  列表结束---------
				
				data = []
			},
			// 设备名称改变
			deviceNameChange(e){
				if(e.detail.value == this.deviceNameIndex){
					return
				}
				this.pageNo = 1
				this.checkContentIndex = 0
				this.checkContentList = ['请选择']
				this.deviceNameIndex = e.detail.value	//选中选项的索引值
				this.facilitiesName = this.deviceNameList[this.deviceNameIndex]	//选中的选项
				let data
				if(this.deviceNameIndex != '0'){
					data = this.branchNameDataListCopy.filter((val)=>{
						if(val.facilitiesName.replace(/[0-9]/ig,"")!="kV电力变压器" ){
							return val.facilitiesName.replace(/[0-9]/ig,"") == this.facilitiesName
						}else{
							return val.facilitiesName.slice(0,9) == this.facilitiesName
						}
					})
				}else{
					data = this.branchNameDataListCopy
				}
				console.log(data)
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.deviceNameDataListCopy = data
				if(this.dataList.length >= this.deviceNameDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				
				// 检测项目  列表开始---------
				let checkContentList = new Set()
				this.deviceNameDataListCopy.forEach((val)=>{
					if(val.facilitiesName.replace(/[0-9]/ig,"") == this.facilitiesName){
						checkContentList.add(val.checkItem.replace(/[0-9]/ig,""))
					}
				})
				this.checkContentList = ['请选择']
				this.checkContentList.push(...Array.from(checkContentList))
				// 检测项目  列表结束---------
				
				data = []
			},
			// 检测项目改变
			checkContentChange(e){
				if(e.detail.value == this.checkContentIndex){
					return
				}
				this.pageNo = 1
				this.checkContentIndex = e.detail.value	//选中选项的索引值
				this.checkItem = this.checkContentList[this.checkContentIndex]	//选中的选项
				let data
				if(this.checkContentIndex != '0'){
					data = this.deviceNameDataListCopy.filter((val)=>{
						return val.checkItem.replace(/[0-9]/ig,"") == this.checkItem
					})
				}else{
					data = this.deviceNameDataListCopy
				}
				console.log(data)
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.checkContentDataListCopy = data
				if(this.dataList.length >= this.checkContentDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				data = []
			},
			// 跳转 添加病毒   修改/新增 页面  删除方法
			jumpToPage(val,item){
				let that = this
				if(val == 'editAndAdd'){
					uni.navigateTo({
						url:'/pages/home/viruseInfo/addVirus',
						events: {
							updateCurrentInfo: function(data){
								console.log(data)
								Object.assign(item,data)
							}
						},
						success: function(res) {
						    // 通过eventChannel向被打开页面传送数据
						    res.eventChannel.emit('toAddVirus', item)
						},
						fail:function(res){
							console.log(res)
						}
					})
					return
				} 
				if(val == 'detail'){
					uni.navigateTo({
						url:'/pages/home/viruseInfo/virusDetail',
						success: function(res) {
						    // 通过eventChannel向被打开页面传送数据
						    res.eventChannel.emit('toVirusDetail', item.id)
						},
						fail:function(res){
							console.log(res)
						}
					})
					return
				}
			},
			clickLoadMore(){
				console.log('加载')
			}
		}
	}
</script>

<style scoped>
	.homeContainer {
		padding: 20px;
		font-size: 14px;
		line-height: 36px;
	}
	.homeContainer /deep/ .u-navbar {
		background: linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))!important;
	}
	.homeContainer .uni-forms-item /deep/ .uni-forms-item__inner {
		padding-bottom: 0;
	}
	.homeContainer .uni-forms-item {
		border-bottom: 1px solid #cccccc;
	}
	.homeContainer .uni-forms-item uni-picker{
		height: 100%;
	}
	.homeContainer .iconfont{
		position: absolute;
		right: 0;
		top: 0;
	}
	.homeContainer /deep/ .uni-forms-item__content {
		padding-right: 15px;
	}
	.homeContainer /deep/ .uni-forms-item__content .uni-input {
		line-height: 36px;
		float: right;
	}
	.homeContainer .cardHearder {
		font-size: 16px;
		font-weight: 800;
	}
	.homeContainer .footBtns {
		display: flex;
	    flex-direction: row;
	    flex-wrap: nowrap;
	    justify-content: space-around;
	}
</style>
