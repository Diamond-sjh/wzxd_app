<template>
	<view class="navbar inOutCave">
		<u-navbar :isBack="false" back-icon-color="white" :title="title" title-color="white" :titleTap="toProjectPage">
			<view slot="right" class="slot-wrap iconfont icon-shangchuan">
				<u-icon @click="jumpToPage('updateList')" name="shangchuan" custom-prefix="custom-icon"></u-icon>
				<u-badge size="mini" type="success" :count='count' :offset="offset"></u-badge>
			</view>
			<view class="navbarRight">
				<u-button type="success" size="mini" @click="logout()">注销</u-button>
			</view>
		</u-navbar>
		<view class="search">
			<u-search class="searchContent" placeholder="请输入掌子面里程关键字" v-model="queryParams.faceMileage" :show-action="false" @custom="clickQuery" @search="clickQuery"></u-search>
			<view class="sea" @click="clickQuery()"><u-icon name="search" size="40"></u-icon></view>
			<view class="add" @click="addInformation"><u-icon name="plus-circle" size="40"></u-icon></view>
		</view>
		<view class="cardContent">
			<scroll-view class="scroll-list msg-list-item" scroll-y="true" @scrolltolower="getScrollData">
				<u-cell-group>
					<u-cell-item 
						:title="`掌子面里程：${item.faceMileage}`"
						:label="item.recordNumber?`记录编号：${item.recordNumber}`:''" 
						:value="item.testDate" 
						v-for="(item,index) in inoutcaveData"
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
				inoutcaveData:[],//查询数据列表
				projectId:'',//项目id
				recordNumber:'',//记录编号
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 15,
				},
				status: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},	
				show:false,
				content:'',
				islogout:false,
				title:'洞内外观察'
			}
	    },
		onLoad(option) {
			let projectInfo = uni.getStorageSync('projectInfo') ? uni.getStorageSync('projectInfo') : {};
			this.projectId = projectInfo.value?projectInfo.value:''
			this.recordNumber = projectInfo.recordNumber?projectInfo.recordNumber:''
			this.title = projectInfo.label?projectInfo.label:'洞内外观察'
			this.queryParams.projectId = this.projectId
			this.getData()
		},
		onShow() {
			uni.getStorage({
			    key: 'inoutcave_key',
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
			this.inoutcaveData = []
			this.getData()
		},
	    methods: {
			...mapMutations(['DELET_INFO']),
			// 查询数据
			getData(){
				this.$httpMonitor.queryInoutcaveObservationRecord(this.queryParams).then(res => {
					if(res.code == 200){
						this.inoutcaveData.push(...res.rows)
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
				this.inoutcaveData = []
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
					url:'/pages/monitor/inOutCave/updateMsgList/msgDetail',
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
					url:'/pages/monitor/inOutCave/add',
					events: {
					    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					    toInOutCaveIndex: (data) => {
							this.queryParams.pageNum = 1
							this.queryParams.pageSize = 15
							this.inoutcaveData = []
							this.getData()
					    }
					},
					success: (res) => {
					    // 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('toAddPage', {projectId:this.projectId,recordNumber:this.recordNumber})
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
						url:'/pages/monitor/inOutCave/updateMsgList/index',
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
.inOutCave {
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

.inOutCave .cardContent .msg-list-item .task-list-item {
	margin: 10px!important
}
.inOutCave .apply-text{
	font-size: 28rpx;
	color: #333333;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	span{
		color: #999999;
	}
}
.inOutCave .user-images{
	width: 28px;
	height:28px;
	margin-right: 8px;
}
.inOutCave .apply-list-foot{
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
