<template>
	<view class="navbar monitor">
		<u-navbar back-icon-color="white" title="全站仪" title-color="white">
			<view slot="right" class="slot-wrap iconfont icon-shangchuan navUpdateIcon">
				<u-icon @click="jumpToPage('updateList')" name="shangchuan" custom-prefix="custom-icon"></u-icon>
				<u-badge size="mini" type="success" :count='count' :offset="offset"></u-badge>
				<u-icon v-show="!isConnect" @click="jumpToPage('bluetooth')" style="margin-right: 5px;" name="lanya" custom-prefix="custom-icon" label="未连接" label-pos="left" margin-right ="2"></u-icon>
				<u-icon v-show="isConnect" @click="jumpToPage('bluetooth')" style="margin-right: 5px;color: #007AFF;" name="lanya" custom-prefix="custom-icon" :label="blueName" label-pos="left" margin-right ="2"></u-icon>
			</view>
		</u-navbar>
		<view class="search">
			<u-search class="searchContent" placeholder="请输入监测桩号关键字" v-model="queryParams.detectionStation" :show-action="false" @custom="clickQuery" @search="clickQuery"></u-search>
			<view class="sea" @click="clickQuery()"><u-icon name="search" size="40"></u-icon></view>
			<view class="add" @click="addInformation"><u-icon name="plus-circle" size="40"></u-icon></view>
		</view>
		<view class="cardContent">
			<scroll-view class="scroll-list msg-list-item" scroll-y="true" @scrolltolower="getScrollData">
				<u-card v-for="(item,index) in monitorList" :key="index" class="task-list-item" :border="true" padding="20" margin="10rpx 20rpx">
					<view slot="head" style="display: flex;align-items: center;justify-content: space-between;">
						<view style="font-size: 30rpx;">{{item.parameterName}}</view>
						<view style="color: #999999;font-size: 22rpx;">{{item.recordNumber}}</view>
					</view>
					<view class="" slot="body">
						<u-row gutter="16">
							<u-col span="12">
								<view class="apply-text"><span>监测时间：</span>{{item.testDate}}</view>
							</u-col>
							<u-col span="12">
								<view class="apply-text"><span>监测桩号：</span>{{item.detectionStation}}</view>
							</u-col>
							<u-col span="12">
								<view class="apply-text"><span>测点名称：</span>{{item.testName}}</view>
							</u-col>
							<u-col span="12">
								<view class="apply-text"><span>观测值：</span>{{item.calculatZ}}</view>
							</u-col>
						</u-row>
					</view>
					<!-- <view class="apply-list-foot" slot="foot">
						<u-row gutter="16" v-if="">
							<u-col span="3" text-align="center">
								<view class="view-text" @click="jumpPage('preview',item)">查看</view>
							</u-col>
							<u-col span="3" text-align="center">
								<view class="confirm-text" v-if="promoterId!=item.writtenBy||item.noteStatus!=0" style="color:#cccccc">提交</view>
								<view class="confirm-text" v-else @click="handleSubmit(item)" style="color:#43b67e">提交</view>
							</u-col>
							<u-col span="3" text-align="center">
								<view class="amend-text" v-if="promoterId!=item.writtenBy || (item.noteStatus != 0 && item.noteStatus!= 3)" style="color:#cccccc">修改</view>
								<view class="amend-text" v-else @click="jumpPage('update',item)" style="#ff4400">修改</view>
							</u-col>
							<u-col span="3" text-align="center">
								<view class="delet-text" v-if="promoterId!=item.writtenBy||item.noteStatus!=0" style="color:#cccccc">删除</view>
								<view class="delet-text" v-else @click="handleDelete(item)" style="#ff0000">删除</view>
							</u-col>
						</u-row>
					</view> -->
				</u-card>
				<view class="example-body">
					<uni-load-more :status="status" :content-text="contentText"/>
				</view>
			</scroll-view>
		</view>
		<u-modal v-model="show" :show-cancel-button="true" :content="content" @confirm="openBluetooth"></u-modal>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				blueName:'',
				blueDeviceId:'',
				isConnect:false,
				offset:[15,20],//上传图标
				count:0,//待上传数量
				islogout:false,//是否退出登录
				monitorList:[],//查询数据列表
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					// detectionStation:''
				},
				status: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},	
				show:false,
				content:''
			}
	    },
		onLoad() {
			this.getData()
			// #ifdef APP-PLUS
			this.player()
			// #endif
		},
		onShow() {
			uni.getStorage({
			    key: 'monitor_key',
			    success: (res) => {
			        console.log(res.data);
					this.count = res.data.length
			    },
				fail: (err) => {
					this.count = 0
				}
			});
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
			this.status = 'loading'
			this.queryParams.pageNum = 1
			this.queryParams.pageSize = 10
			this.monitorList = []
			this.getData()
		},
	    methods: {
			// 判断时候连接蓝牙
			player(){
				uni.openBluetoothAdapter({
					success:(res)=> { //蓝牙已打开
						uni.getConnectedBluetoothDevices({
							success:(res1)=>{
								console.log(res1)
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
				this.$httpMonitor.query(this.queryParams).then(res => {
					if(res.code == 200){
						this.monitorList.push(...res.rows)
						if(this.queryParams.pageNum * this.queryParams.pageSize < res.total){
							this.status = 'more'
						}else{
							this.status = 'noMore'
						}
					}else{
						this.$u.toast(res.msg)
					}
				})
			},
			// 点击搜索
			clickQuery(){
				this.queryParams.pageNum = 1
				this.queryParams.pageSize = 10
				this.monitorList = []
				this.getData()
			},
			// 滚动加载
			getScrollData(){
				if(this.status == 'noMore'){
					return
				}
				this.queryParams.pageNum++
				this.getData()
			},
			// 点击新增
			addInformation(){
				uni.navigateTo({
					url:'/pages/monitor/add',
					events: {
					    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					    toMonitorIndex: (data) => {
							this.queryParams.pageNum = 1
							this.queryParams.pageSize = 10
							this.monitorList = []
							this.getData()
					    }
					},
					success: function(res) {
					    // 通过eventChannel向被打开页面传送数据
					},
					fail:function(res){
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
										console.log(res1)
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
		height: calc(100vh - var(--window-top) - var(--window-bottom) - 250rpx); // 105rpx 为 .search 的高度
		width: 100%;
		.loadmore {
			padding: 30rpx;
		}
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
		color: #999999;
	}
}
.monitor .user-images{
	width: 28px;
	height:28px;
	margin-right: 8px;
}
.monitor .apply-list-foot{
	font-size: 28rpx;
	justify-content: space-around;
	.view-text {
		color: #4094ff;
		border-right: 1px solid #cccccc;
	}
	.confirm-text {
		color: #43b67e;
		border-right: 1px solid #cccccc;
	}
	.amend-text {
		border-right: 1px solid #cccccc;
		color: #ff4400;
	}
	.delet-text {
		color: #ff0000;
	}
}
</style>
