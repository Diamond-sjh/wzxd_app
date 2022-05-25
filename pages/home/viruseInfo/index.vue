<template>
	<view class="homeContainer navbar">
		<u-navbar
		back-text="返回" 
		title="病害信息" 
		back-icon-color="white" 
		title-color="white" 
		:back-text-style="letVal">
			<view slot="right" class="slot-wrap iconfont icon-shangchuan">
				<view  @click="jumpToPage('updateList')">
					<u-icon  name="shangchuan" custom-prefix="custom-icon"></u-icon>
					<u-badge size="mini" type="success" :count='count' :offset="offset"></u-badge>
				</view>
			</view>
		</u-navbar>
		<view>
			<u-tabs-swiper class="firstMenu" ref="uTabs" name="branchName" :list="branchNameList" :show-bar="false" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper :style="{height: scrollHeight}" :duration="200" disable-programmatic-animation="true" disable-touch="true" :current="swiperCurrent" @animationfinish="animationfinish" >
			<swiper-item class="swiper-item" v-for="(item, index) in branchNameList" :key="index">
				<u-tabs name="facilitiesName" :list="item.data" :current="tabCurrent"  @change="tabChange"></u-tabs>
				<scroll-view 
					class="scroll-list msg-list-item" 
					scroll-y="true" 
					:scroll-top="scrollTop"
					:lower-threshold="420" 
					@scrolltolower="getScrollData">
					<uni-row class="demo-uni-row">
						<uni-col :xs="24" :sm="12" :md="8" v-for="(item,index) in dataList" :key=item.id>
							<u-card padding="10" v-if="deleteIndex&&index == deleteIndex?false:true">
								<view class="cardHearder" slot="head">	
									<view class="floatLeft">{{item.facilitiesName}}</view>
									<view class="floatRight">{{item.checkNo}}</view>
								</view>
								<view class="cardBody" slot="body">
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
				</scroll-view>
			</swiper-item>
			<u-back-top :scroll-top="scrollTopBack" top="2000"></u-back-top>
		</swiper>
		<u-tabbar activeBgColor="#4987F7" v-model="currentTabbar" :list="list" active-color="#ffffff" @change="checkTabItem"></u-tabbar>
	</view>
</template>

<script>
	let timer;
	import { mapGetters,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				letVal:{
					color:'white'
				},//导航栏左边字体颜色
				offset:[15,20],//上传图片位置
				titleWidth: 300,//标题宽度
				count:0,//待上传任务数量
				scrollHeight:0,//滚动区域高度
				
				
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabsSwiper组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				tabCurrent:0,//tabs组件的current值
				
				currentTabbar:0,//tabbar选中值
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
				
				
				
				dataList:[],//页面展示的列表
				dataListCopy:[],//查询返回的所有的数据列表--备份
				branchNameList:[],//根据设施分项和设备名称处理的数据
				// 查询返回的数据列表
				branchNameDataListCopy:[],//筛选设施分项之后的列表-
				deviceNameDataListCopy:[],//筛选设备名称之后的列表---全部
				noTestDeviceNameDataListCopy:[],//筛选设备名称之后的列表----未检测
				isTestDeviceNameDataListCopy:[],//筛选设备名称之后的列表----已检测
				
				
				chunnelName:'',//隧道名称
				tunnelId:'',//隧道ID
				deleteIndex:'',//修改状态删除的卡片信息？？？？？？？？

				
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
				scrollTopBack:0,
				isBack:false //页面返回
			}
		},
		// 进入页面加载
		onLoad(){
			// #ifdef APP-PLUS
			// plus.screen.lockOrientation('landscape-primary')
			// #endif
			// 待上传数据长度
			this.count = this.getVirusListLen
			let barHeight = 0
			//#ifdef APP-PLUS
			barHeight = plus.navigator.getStatusbarHeight()*plus.screen.scale
			// #endif
			uni.getSystemInfo({
				success:  (res)=> {
					console.log(res)
					const wid = res.windowWidth
					const hei = res.windowHeight
					// 124是除了可滚动区域外的其它部分占的px高度
					this.downMenuHeight = wid > hei?124*(hei/750):124*(wid/750)
					this.scrollHeight= hei - this.downMenuHeight - barHeight +'px'
				}
			});
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toViruseInfoIndex', (val) => {
				this.tunnelId = val.id
				this.chunnelName = val.chunnelName
				this.status = 'loading'
				this.getData()
			})
		},
		onUnload(){
			// #ifdef APP-PLUS
			// plus.screen.lockOrientation('default')
			// this.titleWidth = 300
			// #endif
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
			this.status = 'loading'
			this.current = 0
			this.swiperCurrent = 0
			this.tabCurrent = 0
			this.currentTabbar = 0
			this.dataList = []
			this.scrollTop = 0
			this.getData()
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
				let compare = (val1,val2)=>{
					return (val1.checkNo.toLowerCase() < val2.checkNo.toLowerCase()?-1:val1.checkNo.toLowerCase() > val2.checkNo.toLowerCase()?1:0)
				}
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
						this.branchNameList = [{branchName:'全部',data:[{facilitiesName:'全部',data:[]}]}]
						// 还原数据--结束
						// 默认展示10条数据
						let arr = res.data.sort(compare)//根据桩号排序
						this.dataListCopy = arr //备份的查询总数据
						// tabswiper菜单开始------------
						let a = this.tranListToTreeData(this.dataListCopy,'branchName')
						this.branchNameList = a.map(val => {
							return {
								branchName:val.branchName,
								data:this.tranListToTreeData(val.data,'facilitiesName')
							}
						})
						this.branchNameList.unshift({branchName:'全部',data:[{facilitiesName:'全部',data:this.dataListCopy}]})
						this.branchNameChange()
						// 所属路线  列表结束--------------------
					}
				})
			},
			// 数据处理
			tranListToTreeData(list,str) {
				// 1. 定义两个中间变量
				let treeList = [],  // 最终要产出的树状数据的数组
					map = {}      // 存储映射关系
				// 2. 建立一个映射关系，并给每个元素补充children属性.
				// 映射关系: 目的是让我们能通过id快速找到对应的元素
				if(str == 'facilitiesName'){
					let centerStr
					let centerStr2
					list.forEach(item => {
						centerStr = item.facilitiesName.replace(/[0-9]/ig,"")
						centerStr2 = item.facilitiesName.slice(0,9)
						if(centerStr&&centerStr!="kV电力变压器"){
							if(!map[centerStr]){
								let obj = {
									data:[item]
								}
								obj[str] = centerStr;
								treeList.push(obj)
								map[centerStr] = item;
							}else{
								treeList.some(val => {
									if(val[str] == centerStr){
										val.data.push(item)
										return
									}
								})
							}
						}else{
							if(!map[centerStr2]){
								let obj = {
									data:[item]
								}
								obj[str] = centerStr2;
								treeList.push(obj)
								map[centerStr2] = item;
							}else{
								treeList.some(val => {
									if(val[str] == centerStr2){
										val.data.push(item)
										return
									}
								})
							}
						}
					})
				}else{
					list.forEach(item => {
						if(item[str] && !map[item[str]]){
							let obj = {
								data:[item]
							}
							obj[str] = item[str];
							treeList.push(obj)
							map[item[str]] = item;
						}else{
							treeList.some(val => {
								if(val[str] == item[str]){
									val.data.push(item)
									return
								}
							})
						}
					})
				}
				// 4. 返回出去
				return treeList
			},
			// 设施分项改变
			branchNameChange(){
				this.branchNameDataListCopy = this.branchNameList[this.current].data
				this.deviceNameChange()
			},
			// 设备名称改变
			deviceNameChange(){
				this.deviceNameDataListCopy = this.branchNameDataListCopy[this.tabCurrent].data
				this.noTestDeviceNameDataListCopy = this.deviceNameDataListCopy.filter(val => {
					return val.ischecked != 1
				})
				this.isTestDeviceNameDataListCopy = this.deviceNameDataListCopy.filter(val => {
					return val.ischecked == 1
				})
				this.list[0].count = this.deviceNameDataListCopy.length
				this.list[1].count = this.noTestDeviceNameDataListCopy.length
				this.list[2].count = this.isTestDeviceNameDataListCopy.length
				let data = []
				console.log(this.currentTabbar)
				switch (this.currentTabbar){
					case 0:
						data = this.deviceNameDataListCopy
						break;
					case 1:
						data = this.noTestDeviceNameDataListCopy
						break;
					case 2:
						data = this.isTestDeviceNameDataListCopy
						break;
					default:
						break;
				}
				// 默认展示18条数据
				this.dataList = data.slice(0,18) //需要展示的数据
				// this.dataList = this.deviceNameDataListCopy.slice(0,18)
				if(this.dataList.length >= data.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
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
				this.deviceNameChange()
				return
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
				if(index == this.currentTabbar){ return }
				this.dataList = [];
				this.scrollTop = 0
				let data = []
				switch (index){
					case 0:
						data = this.deviceNameDataListCopy
						break;
					case 1:
						data = this.noTestDeviceNameDataListCopy
						break;
					case 2:
						data = this.isTestDeviceNameDataListCopy
						break;
					default:
						break;
				}
				// 默认展示18条数据
				this.dataList = data.slice(0,18) //需要展示的数据
				if(this.dataList.length >= data.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
			},
			// tabs通知swiper(一级菜单)切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.current = index;
				this.dataList = []
				this.scrollTop = 0
				this.tabCurrent = 0
				this.currentTabbar = 0
				this.branchNameChange()
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// 二级菜单切换
			tabChange(index){
				this.tabCurrent = index;
				this.dataList = []
				this.scrollTop = 0
				this.currentTabbar = 0
				this.deviceNameChange()
			},
			// 滚动加载
			getScrollData(){
				if(this.status == 'noMore'){
					return
				}
				this.pageNo++;
				let num = this.pageNo*18
				let data = []
				switch (this.currentTabbar){
					case 0:
						data = this.deviceNameDataListCopy
						break;
					case 1:
						data = this.noTestDeviceNameDataListCopy
						break;
					case 2:
						data = this.isTestDeviceNameDataListCopy
						break;
					default:
						break;
				}
				this.dataList = data.slice(0,num)
				if(this.dataList.length >= data.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.homeContainer {
		// padding: 20px;
		font-size: 14px;
		line-height: 36px;
		padding: 0 10px;
	}
	.homeContainer .firstMenu /deep/ .u-tabs-item,
	.homeContainer .swiper-item .u-tabs /deep/.u-tab-item{
		height: 30px!important;
		line-height: 30px!important;
		padding: 0 10px!important;
	}
	.homeContainer .swiper-item .scroll-list {
		// 30px 为 .firstMenu 的高度  43px为底部tabbar高度  44px为导航栏高度
		// height:calc(100vh - var(--window-top) - var(--window-bottom) - var(--status-bar-height) - 117px); 
		height:calc(100% - 50px); 
		width: 100%;
		.loadmore {
			padding: 30rpx;
		}
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
		overflow: hidden;
	}
	.homeContainer .floatLeft {
		float: left;
	}
	.homeContainer .floatRight {
		float: right;
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
