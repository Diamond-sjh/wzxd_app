<template>
	<view class="navbar inOutCave">
		<u-navbar back-icon-color="white" title="测量列表" title-color="white">
			<view slot="right" class="slot-wrap iconfont icon-shangchuan navUpdateIcon">
				<u-icon @click="jumpToPage('updateList')" name="shangchuan" custom-prefix="custom-icon"></u-icon>
				<u-badge size="mini" type="success" :count='count' :offset="offset"></u-badge>
			</view>
		</u-navbar>
		<view class="search">
			<u-search class="searchContent" placeholder="请输入监测桩号关键字" v-model="queryParams.detectionStation" :show-action="false" @custom="clickQuery" @search="clickQuery"></u-search>
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
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				offset:[15,20],//上传图标
				count:0,//待上传数量
				inoutcaveData:[],//查询数据列表
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
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
			this.queryParams.pageSize = 10
			this.inoutcaveData = []
			this.getData()
		},
	    methods: {
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
				this.queryParams.pageSize = 10
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
							this.queryParams.pageSize = 10
							this.inoutcaveData = []
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
						url:'/pages/monitor/inOutCave/updateMsgList/index',
						success: function(res) {
						    // 通过eventChannel向被打开页面传送数据
						},
						fail:function(res){
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
.inOutCave .navUpdateIcon {
		padding-right: 20px;
		line-height: 44px;
		font-size: 20px;
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
		height: calc(100vh - var(--window-top) - var(--window-bottom) - 190rpx); // 105rpx 为 .search 的高度
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
