<template>
	<view class="navbar surface">
		<u-navbar  :isBack="false" back-icon-color="white" :title="title" title-color="white" :titleTap="toProjectPage">
			<view slot="right" class="slot-wrap iconfont icon-shangchuan navUpdateIcon">
				<u-icon @click="jumpToPage('updateList')" name="shangchuan" custom-prefix="custom-icon"></u-icon>
				<u-badge size="mini" type="success" :count='count' :offset="offset"></u-badge>
			</view>
			<view class="navbarRight">
				<u-button type="success" size="mini" @click="logout()">注销</u-button>
			</view>
		</u-navbar>
		<view class="search">
			<u-search class="searchContent" v-model="queryParams.parameterName" placeholder="请输入检测参数关键字" :show-action="false" @custom="clickQuery" @search="clickQuery"></u-search>
			<view class="sea" @click="clickQuery()"><u-icon name="search" size="40"></u-icon></view>
			<view class="add" @click="addInformation"><u-icon name="plus-circle" size="40"></u-icon></view>
		</view>
		<view class="cardContent">
			<scroll-view class="scroll-list msg-list-item" scroll-y="true" @scrolltolower="getScrollData">
				<u-card v-for="(item,index) in surfaceList" :key="index" class="task-list-item" :border="true" padding="20" margin="10rpx 20rpx">
					<view slot="head" style="display: flex;align-items: center;justify-content: space-between;">
						<view style="font-size: 30rpx;">{{item.parameterName}}</view>
						<view style="color: #999999;font-size: 22rpx;">{{item.recordNumber}}</view>
					</view>
					<view class="" slot="body">
						<u-row gutter="16">
							<u-col span="12">
								<view class="apply-text"><span>安装位置：</span>{{item.installationPosition}}</view>
							</u-col>
							<u-col span="12">
								<view class="apply-text"><span>检测桩号：</span>{{item.detectionStation}}</view>
							</u-col>
							<u-col span="12">
								<view class="apply-text"><span>元件编号：</span>{{item.componentNumber}}</view>
							</u-col>
							<u-col span="12">
								<view class="apply-text"><span>测量频率：</span>{{item.measurementFrequency}}</view>
							</u-col>
						</u-row>
					</view>
				</u-card>
				<view class="example-body">
					<uni-load-more :status="status" :content-text="contentText"/>
				</view>
			</scroll-view>
		</view>
		<u-modal v-model="islogout" content="确认退出当前登录？" :show-cancel-button="true" @confirm="toLogin"></u-modal>
		<my-tabbar></my-tabbar>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
	    data() {
	        return {
				offset:[15,20],//上传图标
				count:0,//待上传数量
				surfaceList:[],//查询数据列表
				projectId:null,//项目id
				recordNumber:'',//记录编号
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 15,
					parameterName:'',
					projectId:null
				},
				status: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				islogout:false,
				title:'振弦式读数仪'
			}
	    },
		onLoad(option) {
			let projectInfo = uni.getStorageSync('projectInfo') ? uni.getStorageSync('projectInfo') : {};
			this.projectId = projectInfo.value?projectInfo.value:''
			this.recordNumber = projectInfo.recordNumber?projectInfo.recordNumber:''
			this.title = projectInfo.label?projectInfo.label:'振弦式读数仪'
			this.queryParams.projectId = this.projectId
			this.getData()
		},
		onShow() {
			uni.getStorage({
			    key: 'surface_key',
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
			this.queryParams.pageSize = 15
			this.surfaceList = []
			this.getData()
		},
	    methods: {
			...mapMutations(['DELET_INFO']),
			// 查询数据
			getData(){
				this.$httpMonitor.queryGwzmRecordSon(this.queryParams).then(res => {
					if(res.code == 200){
						this.surfaceList.push(...res.rows)
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
				this.queryParams.pageSize = 15
				this.surfaceList = []
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
					url:'/pages/monitor/surface/add',
					events: {
					    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					    toSurfaceIndex: (data) => {
							this.queryParams.pageNum = 1
							this.queryParams.pageSize = 15
							this.surfaceList = []
							this.getData()
					    }
					},
					success: (res) => {
					    // 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('toAddPage', {projectId:this.projectId,recordNumber:this.recordNumber})
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
						url:'/pages/monitor/surface/updateMsgList/index',
						success: function(res) {
						    // 通过eventChannel向被打开页面传送数据
						},
						fail:function(res){
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
.surface .navUpdateIcon {
		padding-right: 20px;
		line-height: 44px;
		font-size: 20px;
	}
.surface {
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

.surface .cardContent .msg-list-item .task-list-item {
	margin: 10px!important
}
.surface .apply-text{
	font-size: 28rpx;
	color: #333333;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	span{
		color: #999999;
	}
}
.surface .user-images{
	width: 28px;
	height:28px;
	margin-right: 8px;
}
.surface .apply-list-foot{
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
