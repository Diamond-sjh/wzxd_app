<template>
	<view class="container">
		<uni-forms ref="form">
			<uni-forms-item label="所属路线:">
				<picker @change="routeLineChange" :value="routeLineIndex" :range="routeLineList" range-key="routeLine">
					<view class="uni-input">{{routeLineList[routeLineIndex].routeLine}}</view>
				</picker>
			</uni-forms-item>
			<uni-forms-item label="所属路段:">
				<picker @change="bindPickerChange" :value="index" :range="date" range-key="id">
					<view class="uni-input">{{date[index].id}}</view>
				</picker>
			</uni-forms-item>
			<uni-forms-item label="所属隧道:">
				<picker @change="bindPickerChange" :value="index" :range="date" range-key="id">
					<view class="uni-input">{{date[index].id}}</view>
				</picker>
			</uni-forms-item>
			<uni-forms-item label="设施分项:">
				<picker @change="bindPickerChange" :value="index" :range="date" range-key="id">
					<view class="uni-input">{{date[index].id}}</view>
				</picker>
			</uni-forms-item>
			<uni-forms-item label="设备名称:">
				<picker @change="bindPickerChange" :value="index" :range="date" range-key="id">
					<view class="uni-input">{{date[index].id}}</view>
				</picker>
			</uni-forms-item>
			<uni-forms-item label="检测项目:">
				<picker @change="bindPickerChange" :value="index" :range="date" range-key="id">
					<view class="uni-input">{{date[index].id}}</view>
				</picker>
			</uni-forms-item>
		</uni-forms>
		<button type="default" @click="search('click')">查询</button>
		<uni-card :title="item.routeLine" thumbnail="" :extra="item.roadSection" v-for="item in dateList" :key=item.id note="true">
			<view>隧道名称: {{item.tunnelName}}</view>
			<view>幅别: {{item.id}}</view>
			<view>设施分项: {{item.branchName}}</view>
			<view>设备名称: {{item.deviceName}}</view>
			<view>检测项目: {{item.checkContent}}</view>
			<view>状态: {{item.state==0?'正常':'异常'}}</view>
			<template v-slot:footer>
				<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('addVirse')">添加病毒</button>
				<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('update')">修改/新增</button>
				<button type="warn" size="mini" class="footerBtn" @click="jumpToPage('del')">删除</button>
			</template>
		</uni-card>
		<view class="example-body">
			<uni-load-more :status="status" :content-text="contentText"  @clickLoadMore="clickLoadMore"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params:{
					pageSize: 10,
					pageNo: 1,
					routeLine: '',
					roadSection: '',
					tunnelName: '',
					branchName: '',
					deviceName: '',
					checkContent:'',
				},
				routeLineList:[{routeLine:'G15'},{routeLine:'S10绕城高速公路'}],
				date:[{id:1},{id:2},{id:3}],
				routeLineIndex:'0',
				index: '0',
				dateList:[],
				totalRow:0,
				status: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		// 进入页面加载
		onLoad(){
			this.search()
		},
		//上拉加载
		onReachBottom(){
			if (this.status == 'moMore'){
				return;
			}
			this.params.pageNo++;
			console.log(this.params.pageNo)
			this.search();
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
			this.dateList = [];
			this.params.pageNo = 1
			this.search()
		},
		methods: {
			routeLineChange(e){
				this.routeLineIndex = e.detail.value
				this.params.routeLine = this.routeLineList[this.routeLineIndex].routeLine
			},
			bindPickerChange(e){
				this.index = e.detail.value
			},
			search(val){
				if(val && val == 'click'){
					this.dateList = []
					this.totalRow = 0
					this.status = 'more'
					this.params.pageNo = 1
				}
				this.$http.queryList(this.params).then((res)=>{
					if(res.data.code == '200'){
						// uni.showToast({
						// 	title:'请求成功',
						// 	duration:100
						// })
						this.totalRow = res.data.data.totalRow
						if(this.dateList.length == 0){
							this.status = 'more'
							this.dateList = this.dateList.concat(res.data.data.rows)
							if(this.dateList.length == this.totalRow){
								this.status = 'moMore'
								return false
							}
						}else{
							if(this.dateList.length == this.totalRow){
								this.status = 'moMore'
								return false
							}else{
								this.status = 'more'
								this.dateList = this.dateList.concat(res.data.data.rows)
							}
						}
					}
				})
			},
			// 跳转 添加病毒   修改/新增 页面  删除方法
			jumpToPage(val){
				if(val == 'addVirse'){
					console.log('add')
					uni.navigateTo({
						url:'/pages/home/addVirus'
					})
					return
				} 
				if(val == 'update'){
					console.log('update')
					uni.navigateTo({
						url:'/pages/home/viewProject'
					})
					return
				}
				if(val == 'del'){
					console.log('del')
					return
				}
			},
			//点击查看更多触发事件
			clickLoadMore(e) {
				console.log('加载更多')
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	/deep/ .uni-card__footer.uni-border-top {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-around;
	}
</style>
