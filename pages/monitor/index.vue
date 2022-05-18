<template>
	<view class="navbar monitor">
		<u-navbar :isBack="false" back-icon-color="white" :title="title" title-color="white" :titleTap="toProjectPage">
			<view slot="right" class="slot-wrap iconfont icon-shangchuan navUpdateIcon">
				<u-icon @click="jumpToPage('updateList')" name="shangchuan" custom-prefix="custom-icon"></u-icon>
				<u-badge size="mini" type="success" :count='count' :offset="offset"></u-badge>
				<u-icon v-show="!isConnect" @click="jumpToPage('bluetooth')" style="margin-right: 5px;" name="lanya" custom-prefix="custom-icon" label="未连接" label-pos="left" margin-right ="2"></u-icon>
				<u-icon v-show="isConnect" @click="jumpToPage('bluetooth')" style="margin-right: 5px;color: #007AFF;" name="lanya" custom-prefix="custom-icon" :label="blueName" label-pos="left" margin-right ="2"></u-icon>
			</view>
			<view class="navbarRight">
				<u-button type="success" size="mini" @click="logout()">注销</u-button>
			</view>
		</u-navbar>
		<view class="search">
			<u-search class="searchContent" placeholder="请输入监测桩号关键字" v-model="detectionStation" :show-action="false" @custom="clickQuery" @search="clickQuery"></u-search>
			<view class="sea" @click="clickQuery()"><u-icon name="search" size="40"></u-icon></view>
			<view class="add" @click="addInformation"><u-icon name="plus-circle" size="40"></u-icon></view>
		</view>
		<view class="cardContent">
			<scroll-view class="scroll-list msg-list-item" scroll-y="true" @scrolltolower="getScrollData">
				<u-collapse ref="collapse" event-type="close" :item-style="itemStyle" :head-style="headStyle" hover-class="none">
					<u-collapse-item :title="item.testDate" :index="index" v-for="(item, index) in showMonitorList" :key="item.testDate">
						<view class="collapse-item" v-for="(val, index) in item.data" :key="item.id" @longpress="start(val)">
							<u-row gutter="16">
								<u-col span="12">
									<view class="apply-text"><span>监测桩号：</span>{{val.detectionStation}}</view>
								</u-col>
								<u-col span="12">
									<view class="apply-text"><span>测点名称：</span>{{val.testName}}</view>
								</u-col>
								<u-col span="12">
									<view class="apply-text"><span>观测值：</span>{{val.calculatZ}}</view>
								</u-col>
								<u-col span="12">
									<view class="apply-text"><span>本次变形：</span>{{val.lastTimeChange}}</view>
								</u-col>
								<u-col span="12">
									<view class="apply-text"><span>累计变形：</span>{{val.firstTimeChange}}</view>
								</u-col>
							</u-row>
							<hr>
						</view>
					</u-collapse-item>
				</u-collapse>
				<view class="example-body">
					<uni-load-more :status="status" :content-text="contentText"/>
				</view>
			</scroll-view>
		</view>
		<u-popup v-model="showPopup" mode="center">
			<view class="popupBox">
				<view class="title">操作</view>
				<view class="measureBtn" @click="addInformation('measure')">测量</view>
				<view class="cancleBtn" @click="showPopup = false">取消</view>
			</view>
		</u-popup>
		<u-modal v-model="show" :show-cancel-button="true" :content="content" @confirm="openBluetooth"></u-modal>
		<u-modal v-model="islogout" content="确认退出当前登录？" :show-cancel-button="true" @confirm="toLogin"></u-modal>
	<my-tabbar></my-tabbar>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
	    data() {
	        return {
				blueName:'',
				blueDeviceId:'',
				isConnect:false,
				offset:[15,20],//上传图标
				count:0,//待上传数量
				title:'全站仪',
				islogout:false,//是否退出登录
				projectId:'',//项目id
				recordNumber:'',//记录编号
				monitorListCopy:[],//查询全量数据列表--备份
				monitorList:[],//查询全量数据列表--根据日期分类展示
				searchMonitorList:[],//根据桩号
				showMonitorList:[],//分页展示的数据
				// 查询参数
				pageNum:1,
				pageSize:20,
				detectionStation:'',//查询关键字
				status: 'more',//数据状态
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},	
				show:false,//蓝牙连接提示框
				content:'',//蓝牙状态提示文字
				showPopup:false,//popup框是否显示
				longPressItem:{},//长按的数据
				itemStyle:{
					padding: '0 10px',
					border: '1px solid #cccccc'
				},
				headStyle:{
					fontSize: '16px'
				}
			}
	    },
		onLoad(option) {
			let projectInfo = uni.getStorageSync('projectInfo') ? uni.getStorageSync('projectInfo') : {};
			this.projectId = projectInfo.value?projectInfo.value:''
			this.recordNumber = projectInfo.recordNumber?projectInfo.recordNumber:''
			this.title = projectInfo.label?projectInfo.label:'全站仪'
			this.getData()
			// #ifdef APP-PLUS
			this.player()
			// #endif
		},
		onShow() {
			uni.getStorage({
			    key: 'monitor_key',
			    success: (res) => {
					this.count = res.data.length
			    },
				fail: (err) => {
					this.count = 0
				}
			});
			// this.getData()
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
			this.status = 'loading'
			this.pageNum = 1
			this.showMonitorList = []
			this.getData()
		},
	    methods: {
			...mapMutations(['DELET_INFO']),
			// 判断时候连接蓝牙
			player(){
				uni.openBluetoothAdapter({
					success:(res)=> { //蓝牙已打开
						uni.getConnectedBluetoothDevices({
							success:(res1)=>{
								if(res1.devices.length == 0){
									uni.getBluetoothAdapterState({//蓝牙的匹配状态
										success:(res1)=>{
											this.show = true
											this.content = '是否连接已配对设备'
										},
										fail(error) {
											this.show = true
											this.content = '请手动打开蓝牙'
										}
									});
								}else{
									this.blueName = res1.devices[0].name
									this.blueDeviceId = res1.devices[0].deviceId
									this.isConnect = true
								}
							},
							fail(error) {
								this.show = true
								this.content = '请手动打开蓝牙'
							}
						})
					},
					fail:err=>{ //蓝牙未打开 
						this.show = true
						this.content = '是否打开蓝牙'
					}
				})
			},
			// 确认打开蓝牙
			openBluetooth(){
				let that = this
				if(this.content.indexOf('打开蓝牙') != '-1'){
					this.$utils.openPhoneBluetooth()
					uni.onBluetoothAdapterStateChange(function (res) {
						if(res.available){
							that.jumpToPage('bluetooth')
						}else{
							that.$u.toast('蓝牙已关闭')
						}
					})
				}else{
					that.jumpToPage('bluetooth')
				}
			},
			// 查询数据
			getData(){
				this.monitorListCopy = []
				this.monitorList = []
				this.showMonitorList = []
				uni.getStorage({
					key: 'allMonitor_key',
					success: (res) => {
						res.data.forEach(val => {
							// 筛选对应项目id的
							if(val.projectId == this.projectId){
								this.monitorListCopy.push(val)
							}
						})
						this.monitorList = this.tranListToTreeData(this.monitorListCopy,'testDate')
						this.showMonitorList = this.monitorList.slice(0,this.pageSize)
						if(this.showMonitorList.length < this.monitorList.length){
							this.status = 'more'
						}else{
							this.status = 'noMore'
						}
					},
					fail: (err) => {
						this.monitorListCopy = []
						this.monitorList = []
						this.showMonitorList = []
						this.status = 'noMore'
					}
				});
				// 更新视图内部高度
				this.$nextTick(()=>{
					this.$refs.collapse.init()
				})
			},
			// 数据处理
			tranListToTreeData(list,str) {
				// 1. 定义两个中间变量
				let treeList = [],  // 最终要产出的树状数据的数组
					map = {}      // 存储映射关系
				// 2. 建立一个映射关系，并给每个元素补充children属性.
				// 映射关系: 目的是让我们能通过id快速找到对应的元素
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
				// 4. 返回出去
				return treeList
			},
			// 点击搜索
			clickQuery(){
				this.pageNum = 1
				if(this.detectionStation){
					let list = []
					this.monitorListCopy.forEach(val => {
						if(val.detectionStation.includes(this.detectionStation)){
							list.push(val)
						}
					})
					this.monitorList = this.tranListToTreeData(list,'testDate')
				}else{
					this.monitorList = this.tranListToTreeData(this.monitorListCopy,'testDate')
				}
				this.showMonitorList = this.monitorList.slice(0,this.pageSize)
				if(this.showMonitorList.length < this.monitorList.length){
					this.status = 'more'
				}else{
					this.status = 'noMore'
				}
				// 更新视图内部高度
				this.$nextTick(()=>{
					this.$refs.collapse.init()
				})
			},
			// 长按触发
			start(item) {
				this.longPressItem = Object.assign({},item)
				this.showPopup = true
			},
			// 滚动加载
			getScrollData(){
				if(this.status == 'noMore'){
					return
				}
				this.pageNum++;
				let num = this.pageNum*20
				this.showMonitorList = this.monitorList.slice(0,num)
				if(this.showMonitorList.length < this.monitorList.length){
					this.status = 'more'
				}else{
					this.status = 'noMore'
				}
			},
			// 点击新增
			addInformation(val){
				uni.navigateTo({
					url:'/pages/monitor/add',
					events: {
					    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					    toMonitorIndex: (data) => {
							this.pageNum = 1
							this.pageSize = 20
							// this.getData()
					    }
					},
					success: (res) => {
						if(val && val == 'measure'){
							this.showPopup = false
							res.eventChannel.emit('toAddPage', {projectId:this.projectId,recordNumber:this.recordNumber,longPressItem:this.longPressItem,dataList:this.monitorListCopy})
						}else{
							res.eventChannel.emit('toAddPage', {projectId:this.projectId,recordNumber:this.recordNumber,longPressItem:null,dataList:this.monitorListCopy})
						}
					    // 通过eventChannel向被打开页面传送数据
					},
					fail:(res) => {
						console.log(res)
					}
				})
			},
			// 点击右上角的上传按钮
			jumpToPage(val){
				if(val == 'updateList'){
					uni.navigateTo({
						url:'/pages/monitor/updateMsgList/index',
						success: function(res) {
						    // 通过eventChannel向被打开页面传送数据
						},
						fail:function(res){
							console.log(res)
						}
					})
				}
				if(val == 'bluetooth'){
					uni.navigateTo({
						url:'/pages/monitor/bluetooth',
						events: {
						    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						    bluetoothToIndex: (data) => {
								uni.getConnectedBluetoothDevices({
									success:(res1)=>{
										if(res1.devices.length == 0){
											
										}else{
											this.blueName = res1.devices[0].name
											this.blueDeviceId = res1.devices[0].deviceId
											this.isConnect = true
										}
									},
									fail(error) {
										this.show = true
										this.content = '请手动打开蓝牙'
									}
								})
						    }
						},
						success: (res) => {
							console.log(this.blueDeviceId)
							console.log(this.blueName)
						    // 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('toBluetooth', {deviceId:this.blueDeviceId,blueName:this.blueName})
						},
						fail:(res) => {
							console.log(res)
						}
					})
				}
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
			// 点击标题返回项目选择页面
			toProjectPage(){
				console.log(123)
				uni.reLaunch({
					url: '/pages/monitor/transitionPage'
				})
			}
	    }
	}
</script>

<style lang="scss" scoped>
page {
	background-color: #f5f5f5;
}
.monitor .navUpdateIcon {
		padding-right: 20px;
		line-height: 44px;
		font-size: 20px;
	}
.monitor {
	.search {
		display: flex;
		margin: 0 10px;
		.add,.sea {
			padding: 0 5px;
			line-height: 90rpx;
		}
	}
	.scroll-list {
		// 45px 为 .search 的高度  50px为底部tabbar高度  44px为导航栏高度
		height:calc(100vh - var(--window-top) - var(--window-bottom) - var(--status-bar-height) - 139px); 
		width: 100%;
		.loadmore {
			padding: 30rpx;
		}
	}
}
.monitor .cardContent .collapse-item {
	margin-top: 5px;
	hr {
		margin-top: 5px;
	}
}
.monitor .cardContent .msg-list-item .task-list-item {
	margin: 10px!important
}
.monitor .apply-text{
	font-size: 28rpx;
	color: #333333;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	span{
		display: inline-block;
		width: 70px;
		color: #999999;
		text-align-last: justify;
		text-align: justify;
	}
}
.monitor .popupBox {
	text-align: center;
	font-size: 20px;
	width: 240px;
	.title {
		padding: 6px;
		background-color: #269a5a;
		color: #f5f5f5;
	}
	.measureBtn {
		padding: 10px;
		border-bottom: 1px solid #cccccc;
	}
	.cancleBtn {
		padding: 10px;
	}
}
</style>
