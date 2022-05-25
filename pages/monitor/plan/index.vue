<template>
	<view class="navbar plan">
		<u-navbar :isBack="false" back-icon-color="white" :titleWidth="500" :title="title" title-color="white" :titleTap="toProjectPage">
			<view slot="right" class="slot-wrap iconfont icon-shangchuan">
				<u-icon @click="jumpToPage('updateList')" name="shangchuan" custom-prefix="custom-icon"></u-icon>
				<u-badge size="mini" type="success" :count='count' :offset="offset"></u-badge>
			</view>
			<view class="navbarRight">
				<u-button type="success" size="mini" @click="logout()">注销</u-button>
			</view>
		</u-navbar>
		<view class="search">
			<u-search class="searchContent" v-model="queryParams.testItems" placeholder="请输入检测参数关键字" :show-action="false" @custom="clickQuery" @search="clickQuery"></u-search>
			<view class="sea" @click="clickQuery()"><u-icon name="search" size="40"></u-icon></view>
			<view class="add" @click="addInformation"><u-icon name="plus-circle" size="40"></u-icon></view>
		</view>
		<view class="cardContent">
			<scroll-view class="scroll-list msg-list-item" scroll-y="true" @scrolltolower="getScrollData">
				<u-cell-group>
					<u-cell-item 
						:title="item.testItems"
						:value="item.burialDate" 
						v-for="(item,index) in planList"
						@click="loolDetail(item)"
						>
						<view slot="label">
							桩号：{{item.pointPosition}}
						</view>
					</u-cell-item>
				</u-cell-group>
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
				planList:[],//查询数据列表
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 15,
					testItems:''
				},
				status: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},	
				islogout:false,
				title:'监控计划'
			}
	    },
		onLoad() {
			let projectInfo = uni.getStorageSync('projectInfo') ? uni.getStorageSync('projectInfo') : {};
			this.title = projectInfo.label?projectInfo.label:'监控计划'
			this.queryParams.projectId = projectInfo.value?projectInfo.value:null
			this.getData()
		},
		onShow() {
			uni.getStorage({
			    key: 'plan_key',
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
			this.planList = []
			this.getData()
		},
	    methods: {
			...mapMutations(['DELET_INFO']),
			// 查询数据
			getData(){
				this.$httpMonitor.queryStatistics(this.queryParams).then(res => {
					if(res.code == 200){
						this.planList.push(...res.rows)
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
				this.planList = []
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
			// 查看详情
			loolDetail(item){
				uni.navigateTo({
					url:'/pages/monitor/plan/updateMsgList/msgDetail',
					success: function(res) {
					    // 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('IndexToMsgDetail', item)
					},
					fail:function(res){
						console.log(res)
					}
				})
			},
			// 点击新增
			addInformation(){
				uni.navigateTo({
					url:'/pages/monitor/plan/add',
					events: {
					    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					    toPlanIndex: (data) => {
							this.queryParams.pageNum = 1
							this.queryParams.pageSize = 15
							this.planList = []
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
						url:'/pages/monitor/plan/updateMsgList/index',
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
.plan {
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

.plan .cardContent .msg-list-item .task-list-item {
	margin: 10px!important
}
.plan .apply-text{
	font-size: 28rpx;
	color: #333333;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	span{
		color: #999999;
	}
}
.plan .user-images{
	width: 28px;
	height:28px;
	margin-right: 8px;
}
.plan .apply-list-foot{
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
