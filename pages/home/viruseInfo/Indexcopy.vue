<template>
	<view class="homeContainer">
		<u-navbar back-text="返回" title="病害信息" back-icon-color="white" title-color="white" :back-text-style="letVal"></u-navbar>
		<uni-forms ref="form">
			<uni-forms-item label="所属路线:">
				<picker @change="routeLineChange" :value="routeLineIndex" :range="routeLineList">
					<view class="uni-input">{{routeLineList[routeLineIndex]?routeLineList[routeLineIndex]:'请选择'}}</view>
				</picker>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</uni-forms-item>
			<uni-forms-item label="所属路段:">
				<picker @change="roadSectionChange" :value="roadSectionIndex" :range="roadSectionList">
					<view class="uni-input">{{roadSectionList[roadSectionIndex]}}</view>
				</picker>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</uni-forms-item>
			<uni-forms-item label="所属隧道:">
				<picker @change="tunnelNameChange" :value="tunnelNameIndex" :range="tunnelNameList">
					<view class="uni-input">{{tunnelNameList[tunnelNameIndex]}}</view>
				</picker>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</uni-forms-item>
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
		<u-card padding="20" v-for="item in dataList" :key=item.id>
			<view class="cardHearder" slot="head">
				<view class="tunnel">{{chunnelName}}</view>
			</view>
			<view class="cardBody" slot="body">
				<view>设施分项: {{item.branchName}}</view>
				<view class="second">设备名称: {{item.facilitiesName}}</view>
				<view>检测项目: {{item.checkItem?item.checkItem:'———'}}</view>
				<view>是否故障: {{item.isfault==1?'故障':'正常'}}</view>
			</view>
			<view class="footBtns" slot="foot">
				<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('editAndAdd',item)">添加/修改</button>
				<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('delet',item)">删除</button>
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
				chunnelName:'隧道',//隧道名称
				tunnelId:'',//隧道ID
				// 筛选条件的值
				routeLine: '',
				routeSection: '',
				chunnel: '',
				branchName: '',
				facilitiesName: '',
				checkItem:'',
				// 对应筛选条件的下拉列表
				routeLineList:['请选择'],//所属路线
				roadSectionList:['请选择'],//所属路段
				tunnelNameList:['请选择'],//所属隧道
				branchNameList:['请选择'],//设施分项
				deviceNameList:['请选择'],//设备名称
				checkContentList:['请选择'],//检测项目
				// 选中的下拉列表的索引
				routeLineIndex:0,
				roadSectionIndex:0,
				tunnelNameIndex:0,
				branchNameIndex:0,
				deviceNameIndex:0,
				checkContentIndex:0,
				// 查询返回的数据列表
				dataList:[],//页面展示的列表
				dataListCopy:[],//查询所有的数据列表--备份
				routeLineDataListCopy:[],//筛选路线之后展示的列表--备份
				roadSectionDataListCopy:[],//筛选路段之后展示的列表--备份
				tunnelNameDataListCopy:[],//筛选隧道之后展示的列表--备份
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
			if(this.tunnelNameIndex != 0){
				this.dataList = this.tunnelNameDataListCopy.slice(0,num)
				if(this.dataList.length >= this.tunnelNameDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				return
			}
			if(this.roadSectionIndex != 0){
				this.dataList = this.roadSectionDataListCopy.slice(0,num)
				if(this.dataList.length >= this.roadSectionDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				return
			}
			if(this.routeLineIndex != 0){
				this.dataList = this.routeLineDataListCopy.slice(0,num)
				if(this.dataList.length >= this.routeLineDataListCopy.length){
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
						this.routeLineDataListCopy = []
						this.roadSectionDataListCopy = []
						this.tunnelNameDataListCopy = []
						this.branchNameDataListCopy = []
						this.deviceNameDataListCopy = []
						this.routeLineIndex = 0
						this.roadSectionIndex = 0
						this.tunnelNameIndex = 0
						this.branchNameIndex = 0
						this.deviceNameIndex = 0
						this.checkContentIndex = 0
						this.routeLineList = ['请选择']
						this.roadSectionList = ['请选择']
						this.tunnelNameList = ['请选择']
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
						let routeLineList = new Set()
						this.dataListCopy.forEach((val)=>{
							routeLineList.add(val.routeLine)
						})
						this.roadSectionList = ['请选择']
						this.routeLineList.push(...Array.from(routeLineList))
						// 所属路线  列表结束--------------------
					}
				})
			},
			// 路线名称变换
			routeLineChange(e){
				if(e.detail.value == this.routeLineIndex){
					return
				}
				this.pageNo = 1
				this.roadSectionDataListCopy = []
				this.tunnelNameDataListCopy = []
				this.branchNameDataListCopy = []
				this.deviceNameDataListCopy = []
				this.roadSectionIndex = 0
				this.tunnelNameIndex = 0
				this.branchNameIndex = 0
				this.deviceNameIndex = 0
				this.checkContentIndex = 0
				this.roadSectionList = ['请选择']
				this.tunnelNameList = ['请选择']
				this.branchNameList = ['请选择']
				this.deviceNameList = ['请选择']
				this.checkContentList = ['请选择']
				this.routeLineIndex = e.detail.value	//选中选项的索引值
				this.routeLine = this.routeLineList[this.routeLineIndex]	//选中的选项
				let data
				if(this.routeLineIndex != '0'){
					data = this.dataListCopy.filter((val)=>{
						return val.routeLine == this.routeLine
					})
				}else{
					data = this.dataListCopy
				}
				console.log(data)
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.routeLineDataListCopy = data
				if(this.dataList.length >= this.routeLineDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				
				// 所属路段  列表开始---------
				let roadSectionList = new Set()
				this.routeLineDataListCopy.forEach((val)=>{
					if(val.routeLine == this.routeLine){
						roadSectionList.add(val.routeSection)
					}
				})
				this.roadSectionList = ['请选择']
				this.roadSectionList.push(...Array.from(roadSectionList))
				// 所属路段  列表结束---------
				data = []
			},
			// 所属路段改变
			roadSectionChange(e){
				if(e.detail.value == this.roadSectionIndex){
					return
				}
				this.pageNo = 1
				this.tunnelNameDataListCopy = []
				this.branchNameDataListCopy = []
				this.deviceNameDataListCopy = []
				this.tunnelNameIndex = 0
				this.branchNameIndex = 0
				this.deviceNameIndex = 0
				this.checkContentIndex = 0
				this.tunnelNameList = ['请选择']
				this.branchNameList = ['请选择']
				this.deviceNameList = ['请选择']
				this.checkContentList = ['请选择']
				this.roadSectionIndex = e.detail.value	//选中选项的索引值
				this.routeSection = this.roadSectionList[this.roadSectionIndex]	//选中的选项
				let data
				if(this.roadSectionIndex != '0'){
					data = this.routeLineDataListCopy.filter((val)=>{
						return val.routeSection == this.routeSection
					})
				}else{
					data = this.routeLineDataListCopy
				}
				console.log(data)
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.roadSectionDataListCopy = data
				if(this.dataList.length >= this.roadSectionDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				
				// 所属隧道  列表开始---------
				let tunnelNameList = new Set()
				this.roadSectionDataListCopy.forEach((val)=>{
					if(val.routeSection == this.routeSection){
						tunnelNameList.add(val.chunnel)
					}
				})
				this.tunnelNameList = ['请选择']
				this.tunnelNameList.push(...Array.from(tunnelNameList))
				// 所属隧道  列表结束---------
				
				data = []
			},
			// 所属隧道改变
			tunnelNameChange(e){
				if(e.detail.value == this.tunnelNameIndex){
					return
				}
				this.pageNo = 1
				this.branchNameDataListCopy = []
				this.deviceNameDataListCopy = []
				this.branchNameIndex = 0
				this.deviceNameIndex = 0
				this.checkContentIndex = 0
				this.branchNameList = ['请选择']
				this.deviceNameList = ['请选择']
				this.checkContentList = ['请选择']
				this.tunnelNameIndex = e.detail.value	//选中选项的索引值
				this.chunnel = this.tunnelNameList[this.tunnelNameIndex]	//选中的选项
				let data
				if(this.tunnelNameIndex != '0'){
					data = this.roadSectionDataListCopy.filter((val)=>{
						return val.chunnel == this.chunnel
					})
				}else{
					data = this.roadSectionDataListCopy
				}
				console.log(data)
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.tunnelNameDataListCopy = data
				if(this.dataList.length >= this.tunnelNameDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				
				// 设施分项  列表开始---------
				let branchNameList = new Set()
				this.tunnelNameDataListCopy.forEach((val)=>{
					if(val.chunnel == this.chunnel){
						branchNameList.add(val.branchName)
					}
				})
				this.branchNameList = ['请选择']
				this.branchNameList.push(...Array.from(branchNameList))
				// 设施分项  列表结束---------
				
				data = []
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
					data = this.tunnelNameDataListCopy.filter((val)=>{
						return val.branchName == this.branchName
					})
				}else{
					data = this.tunnelNameDataListCopy
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
				if(val == 'addVirse'){
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
						    res.eventChannel.emit('homeIndexToAddVirus', item)
						},
						fail:function(res){
							console.log(res)
						}
					})
					return
				} 
				if(val == 'update'){
					uni.navigateTo({
						url:'/pages/home/viruseInfo/updateAndAdd',
						events: {
							formUpdateAndAdd(data){
								console.log(data)
								if(data.val == 'update'){
									Object.assign(item,data.data)
									return
								}
								if(data.val == 'add'){
									console.log(data.data)
									let addVal = {
										addTime: data.data.addTime,
										branchName: data.data.branchName,
										checkCode: data.data.checkCode,
										checkDate: "",
										checkItem: data.data.checkItem,
										checkNo: "",
										checkState: "",
										checker: "",
										chunnel: data.data.chunnel,
										customerName: "",
										deviceCode: data.data.deviceCode,
										directionType: data.data.directionType,
										diseaseContent: "",
										facilitiesName: data.data.facilitiesName,
										faultDays: "",
										id: data.data.id,
										imageName: "",
										imageOriginal: "",
										imageUrl: "",
										isfault: "",
										remarks: "",
										routeLine: data.data.routeLine,
										routeSection: data.data.routeSection,
										statusCode: "",
										testDateEnd: "",
										testDateStart: "",
										testYear: ""
									}
									that.dataList.unshift(addVal)
									that.dataListCopy.push(addVal)
									that.routeLineDataListCopy.push(addVal)
									that.roadSectionDataListCopy.push(addVal)
									that.tunnelNameDataListCopy.push(addVal)
									that.branchNameDataListCopy.push(addVal)
									that.deviceNameDataListCopy.push(addVal)
									that.checkContentDataListCopy.push(addVal)
									return
								}
							}
						},
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							console.log(item)
							res.eventChannel.emit('homeIndexToUpdateAndAdd', item)
						},
						fail:function(res){
							console.log(res)
						}
					})
					return
				}
				if(val == 'del'){
					console.log('del')
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
	.homeContainer /deep/ .uni-card__footer.uni-border-top {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-around;
	}
</style>
