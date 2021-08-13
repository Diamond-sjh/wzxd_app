<template>
	<view class="homeContainer">
		<u-navbar back-text="返回" title="病害信息" back-icon-color="white" title-color="white" :back-text-style="letVal">
			<view slot="right" class="iconfont icon-shangchuan navUpdateIcon" @click="jumpToPage('updateList')">
				<u-badge size="mini" type="success" :count='count' :offset="offset"></u-badge>
			</view>
		</u-navbar>
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
		<uni-row class="demo-uni-row">
			<uni-col :xs="24" :sm="12" :md="8" v-for="(item,index) in dataList" :key=item.id>
				<u-card padding="10" v-if="deleteIndex&&index == deleteIndex?false:true">
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
						<button type="primary" size="mini" class="footerBtn" :style="{backgroundColor:(item.ischecked==1?'#19be6b':'#f90')}" @click="updateChecked(item,index)">{{item.ischecked==1?'已检测':'未检测'}}</button>
					</view>
				</u-card>
			</uni-col>
		</uni-row>
		<view class="example-body">
			<uni-load-more :status="status" :content-text="contentText"/>
		</view>
		<u-back-top :scroll-top="scrollTop" top="2000"></u-back-top>
		<u-tabbar v-model="current" :list="list" active-color="#ffffff" @change="checkTabItem"></u-tabbar>
	</view>
</template>

<script>
	import { mapGetters,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				letVal:{
					color:'white'
				},//导航栏左边字体颜色
				offset:[15,20],
				count:'0',
				current:0,
				list: [{
						text: '全部',
						count: 0,
						customIcon: false,
					},
					{
						text: '待检测',
						count: 0,
						customIcon: false,
					},
					{
						text: '已检测',
						count: 0,
						customIcon: false,
					},
				],
				chunnelName:'',//隧道名称
				tunnelId:'',//隧道ID
				deleteIndex:'',//修改状态删除的卡片信息
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
				dataList:[],//页面展示的列表
				// ----------------------------------------全部-------------
				// 查询返回的数据列表
				dataListCopy:[],//查询所有的数据列表--备份
				branchNameDataListCopy:[],//筛选设施分项之后的列表--备份
				deviceNameDataListCopy:[],//筛选设备名称之后的列表--备份
				checkContentDataListCopy:[],//筛选检测项目之后的列表--备份
				// ---------------------------------------------全部
				// ----------------------------------------待检测-------------

				// 查询返回的数据列表
				noTestDataListCopy:[],//查询所有的数据列表--备份
				noTestBranchNameDataListCopy:[],//筛选设施分项之后的列表--备份
				noTestDeviceNameDataListCopy:[],//筛选设备名称之后的列表--备份
				noTestCheckContentDataListCopy:[],//筛选检测项目之后的列表--备份
				// ---------------------------------------------待检测
				// ----------------------------------------已检测-------------

				// 查询返回的数据列表
				isTestDataListCopy:[],//查询所有的数据列表--备份
				isTestBranchNameDataListCopy:[],//筛选设施分项之后的列表--备份
				isTestDeviceNameDataListCopy:[],//筛选设备名称之后的列表--备份
				isTestCheckContentDataListCopy:[],//筛选检测项目之后的列表--备份
				// ---------------------------------------------已检测
				// 数据状态 more--查看更多  noMore--没有更多   loading--加载中
				status: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				pageNo:1,
				scrollTop:0,
				isBack:false //页面返回
			}
		},
		// 进入页面加载
		onLoad(){
			this.count = this.getVirusListLen
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
			let dataCopy
			let num = this.pageNo*10
			if(this.checkContentIndex != 0){
				if(this.current == 0){
					dataCopy = this.checkContentDataListCopy
				}
				if(this.current == 1){
					dataCopy = this.noTestCheckContentDataListCopy
				}
				if(this.current == 2){
					dataCopy = this.isTestCheckContentDataListCopy
				}
				this.dataList = dataCopy.slice(0,num)
				if(this.dataList.length >= dataCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				return
			}
			if(this.deviceNameIndex != 0){
				if(this.current == 0){
					dataCopy = this.deviceNameDataListCopy
				}
				if(this.current == 1){
					dataCopy = this.noTestDeviceNameDataListCopy
				}
				if(this.current == 2){
					dataCopy = this.isTestDeviceNameDataListCopy
				}
				this.dataList = dataCopy.slice(0,num)
				if(this.dataList.length >= dataCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				return
			}
			if(this.branchNameIndex != 0){
				if(this.current == 0){
					dataCopy = this.branchNameDataListCopy
				}
				if(this.current == 1){
					dataCopy = this.noTestBranchNameDataListCopy
				}
				if(this.current == 2){
					dataCopy = this.isTestBranchNameDataListCopy
				}
				this.dataList = dataCopy.slice(0,num)
				if(this.dataList.length >= dataCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				return
			}
			if(this.current == 0){
				dataCopy = this.dataListCopy
			}
			if(this.current == 1){
				dataCopy = this.noTestDataListCopy
			}
			if(this.current == 2){
				dataCopy = this.isTestDataListCopy
			}
			this.dataList = dataCopy.slice(0,num)
			if(this.dataList.length >= dataCopy.length){
				this.status = 'noMore'
			}else{
				this.status = 'more'
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
			this.status = 'loading'
			this.current = 0
			this.getData()
		},
		// 页面滚动
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// 监听页面返回
		onBackPress(e){
			let that = this
			if(this.isBack){
				return false
			}else{
				uni.showModal({  
					title: '确认返回隧道列表？',  
					success(res){  
						if (res.confirm) {  
							that.isBack = true
							uni.navigateBack({
							    delta: 1
							});
						} else {  
							that.isBack = false
						}  
					}  
				});  
				return true
			}
		},
		computed: {
			...mapGetters(['getVirusListLen']),
		},
		watch:{
			getVirusListLen(curVal,oldVal){
				this.count = curVal 
			}
		},
		methods: {
			...mapMutations(['SET_STATUElIST']),
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
						
						this.noTestDataListCopy = res.data.filter(val => {
							return val.ischecked != 1
						})
						this.isTestDataListCopy = res.data.filter(val => {
							return val.ischecked == 1
						})
						this.list[0].count = this.dataListCopy.length
						this.list[1].count = this.noTestDataListCopy.length
						this.list[2].count = this.isTestDataListCopy.length
					}
				})
			},
			// 设施分项改变
			branchNameChange(e){
				if(e.detail.value == this.branchNameIndex){
					return
				}
				this.pageNo = 1
				this.deviceNameIndex = 0
				this.checkContentIndex = 0
				this.deviceNameList = ['请选择']
				this.checkContentList = ['请选择']
				this.branchNameIndex = e.detail.value	//选中选项的索引值
				this.branchName = this.branchNameList[this.branchNameIndex]	//选中的选项
				let data,listCopy
				if(this.current == 0){
					listCopy = this.dataListCopy
				}
				if(this.current == 1){
					listCopy = this.noTestDataListCopy
				}
				if(this.current == 2){
					listCopy = this.isTestDataListCopy
				}
				if(this.branchNameIndex != '0'){
					data = listCopy.filter((val)=>{
						return val.branchName == this.branchName
					})
				}else{
					data = listCopy
				}
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				if(this.current == 0){
					this.branchNameDataListCopy = data
				}
				if(this.current == 1){
					this.noTestBranchNameDataListCopy = data
				}
				if(this.current == 2){
					this.isTestBranchNameDataListCopy = data
				}
				if(this.dataList.length >= data.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				
				// 设备名称  列表开始---------
				let deviceNameList = new Set()
				data.forEach((val)=>{
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
				let data,listCopy
				if(this.current == 0){
					listCopy = this.branchNameDataListCopy
				}
				if(this.current == 1){
					listCopy = this.noTestBranchNameDataListCopy
				}
				if(this.current == 2){
					listCopy = this.isTestBranchNameDataListCopy
				}
				if(this.deviceNameIndex != '0'){
					data = listCopy.filter((val)=>{
						if(val.facilitiesName.replace(/[0-9]/ig,"")!="kV电力变压器" ){
							return val.facilitiesName.replace(/[0-9]/ig,"") == this.facilitiesName
						}else{
							return val.facilitiesName.slice(0,9) == this.facilitiesName
						}
					})
				}else{
					data = listCopy
				}
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				if(this.current == 0){
					this.deviceNameDataListCopy = data
				}
				if(this.current == 1){
					this.noTestDeviceNameDataListCopy = data
				}
				if(this.current == 2){
					this.isTestDeviceNameDataListCopy = data
				}
				if(this.dataList.length >= data.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				
				// 检测项目  列表开始---------
				let checkContentList = new Set()
				data.forEach((val)=>{
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
				let data,listCopy
				if(this.current == 0){
					listCopy = this.deviceNameDataListCopy
				}
				if(this.current == 1){
					listCopy = this.noTestDeviceNameDataListCopy
				}
				if(this.current == 2){
					listCopy = this.isTestDeviceNameDataListCopy
				}
				if(this.checkContentIndex != '0'){
					data = listCopy.filter((val)=>{
						return val.checkItem.replace(/[0-9]/ig,"") == this.checkItem
					})
				}else{
					data = listCopy
				}
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				if(this.current == 0){
					this.checkContentDataListCopy = data
				}
				if(this.current == 1){
					this.noTestCheckContentDataListCopy = data
				}
				if(this.current == 2){
					this.isTestCheckContentDataListCopy = data
				}
				if(this.dataList.length >= data.length){
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
				if(val == 'updateList'){
					uni.navigateTo({
						url:'/pages/home/viruseInfo/updateMsgList/index'
					})
				}
			},
			// 修改检测状态
			updateChecked(val,index){
				let params = {
					id:val.id,
					ischecked:val.ischecked==1?0:1
				}
				this.$http.updateChecked(params).then(res => {
					if(res.code == 200){
						// val.ischecked = val.ischecked==1?0:1
					}
				}).catch(e => {
					let statueInfo = {
						timestamp:new Date().getTime(),
						data: params
					}
					this.SET_STATUElIST(statueInfo)
				})
				val.ischecked = val.ischecked==1?0:1
				let a,b,c,d,e
				if(this.current == 0){
					if(this.checkContentIndex != 0){
						a = this.checkContentDataListCopy.indexOf(this.checkContentDataListCopy.filter(d=>d.id == val.id)[0])
					}
					if(this.deviceNameIndex != 0){
						b = this.deviceNameDataListCopy.indexOf(this.deviceNameDataListCopy.filter(d=>d.id == val.id)[0])
					}
					if(this.branchNameIndex != 0){
						c = this.branchNameDataListCopy.indexOf(this.branchNameDataListCopy.filter(d=>d.id == val.id)[0])
					}
					d = this.dataListCopy.indexOf(this.dataListCopy.filter(d=>d.id == val.id)[0])
					this.noTestDataListCopy = this.dataListCopy.filter(val => {
						return val.ischecked != 1
					})
					this.isTestDataListCopy = this.dataListCopy.filter(val => {
						return val.ischecked == 1
					})
					this.list[1].count = this.noTestDataListCopy.length
					this.list[2].count = this.isTestDataListCopy.length
				}
				if(this.current == 1){
					if(this.checkContentIndex != 0){
						a = this.noTestCheckContentDataListCopy.indexOf(this.noTestCheckContentDataListCopy.filter(d=>d.id == val.id)[0])
						this.noTestCheckContentDataListCopy.splice(a,1)
					}
					if(this.deviceNameIndex != 0){
						b = this.noTestDeviceNameDataListCopy.indexOf(this.noTestDeviceNameDataListCopy.filter(d=>d.id == val.id)[0])
						this.noTestDeviceNameDataListCopy.splice(b,1)
					}
					if(this.branchNameIndex != 0){
						c = this.noTestBranchNameDataListCopy.indexOf(this.noTestBranchNameDataListCopy.filter(d=>d.id == val.id)[0])
						this.noTestBranchNameDataListCopy.splice(c,1)
					}
					d = this.noTestDataListCopy.indexOf(this.noTestDataListCopy.filter(d=>d.id == val.id)[0])
					this.noTestDataListCopy.splice(d,1)
					e = this.dataList.indexOf(this.dataList.filter(d=>d.id == val.id)[0])
					this.dataList.splice(e,1)
					this.isTestDataListCopy.unshift(val)
					this.list[1].count = this.noTestDataListCopy.length
					this.list[2].count = this.isTestDataListCopy.length
				}
				if(this.current == 2){
					if(this.checkContentIndex != 0){
						a = this.isTestCheckContentDataListCopy.indexOf(this.isTestCheckContentDataListCopy.filter(d=>d.id == val.id)[0])
						this.isTestCheckContentDataListCopy.splice(a,1)
					}
					if(this.deviceNameIndex != 0){
						b = this.isTestDeviceNameDataListCopy.indexOf(this.isTestDeviceNameDataListCopy.filter(d=>d.id == val.id)[0])
						this.isTestDeviceNameDataListCopy.splice(b,1)
					}
					if(this.branchNameIndex != 0){
						c = this.isTestBranchNameDataListCopy.indexOf(this.isTestBranchNameDataListCopy.filter(d=>d.id == val.id)[0])
						this.isTestBranchNameDataListCopy.splice(c,1)
					}
					d = this.isTestDataListCopy.indexOf(this.isTestDataListCopy.filter(d=>d.id == val.id)[0])
					this.isTestDataListCopy.splice(d,1)
					e = this.dataList.indexOf(this.dataList.filter(d=>d.id == val.id)[0])
					this.dataList.splice(e,1)
					this.noTestDataListCopy.unshift(val)
					this.list[1].count = this.noTestDataListCopy.length
					this.list[2].count = this.isTestDataListCopy.length
				}
			},
			// 切换状态
			checkTabItem(index){
				if(index == this.current){ return }
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				})
				// 还原数据--开始
				this.dataList = [];
				this.branchNameIndex = 0
				this.deviceNameIndex = 0
				this.checkContentIndex = 0
				this.branchNameList = ['请选择']
				this.deviceNameList = ['请选择']
				this.checkContentList = ['请选择']
				// 还原数据--结束
				// 全部
				if(index == 0){
					// 默认展示10条数据
					this.dataList = this.dataListCopy.slice(0,10) //需要展示的数据
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
					return
				}
				// 待检测
				if(index == 1){
					// 默认展示10条数据
					this.dataList = this.noTestDataListCopy.slice(0,10) //需要展示的数据
					if(this.dataList.length >= this.noTestDataListCopy.length){
						this.status = 'noMore'
					}else{
						this.status = 'more'
					}
					// 所属路线  列表开始------------
					let branchNameList = new Set()
					this.noTestDataListCopy.forEach((val)=>{
						branchNameList.add(val.branchName)
					})
					this.roadSectionList = ['请选择']
					this.branchNameList.push(...Array.from(branchNameList))
					return
				}
				// 已检测
				if(index == 2){
					// 默认展示10条数据
					this.dataList = this.isTestDataListCopy.slice(0,10) //需要展示的数据
					if(this.dataList.length >= this.isTestDataListCopy.length){
						this.status = 'noMore'
					}else{
						this.status = 'more'
					}
					// 所属路线  列表开始------------
					let branchNameList = new Set()
					this.isTestDataListCopy.forEach((val)=>{
						branchNameList.add(val.branchName)
					})
					this.roadSectionList = ['请选择']
					this.branchNameList.push(...Array.from(branchNameList))
					return
				}
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
	.homeContainer .navUpdateIcon {
		padding-right: 20px;
		line-height: 44px;
		font-size: 20px;
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
	.homeContainer .uni-col .u-card {
		margin: 5px 15px!important;
	}
	.homeContainer .cardHearder {
		font-size: 16px;
		font-weight: 800;
		line-height: 26px;
	}
	.homeContainer .cardBody {
		line-height: 20px;
	}
	.homeContainer .footBtns {
		display: flex;
	    flex-direction: row;
	    flex-wrap: nowrap;
	    justify-content: space-around;
	}
	.homeContainer .u-tabbar /deep/ .u-tabbar__content__item__button .u-badge {
		top: 2px!important;
		right: -10px!important;
	}
</style>
