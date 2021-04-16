<template>
	<view class="addProject">
		<view class="downMenu">
			<u-dropdown duration="0">
				<u-dropdown-item v-model="routeName" title="所属路线" :options="routeLineList" @change="routeLineChange"></u-dropdown-item>
				<u-dropdown-item v-model="roadsectionName" title="所属路段" :options="roadSectionList" @change="roadSectionChange"></u-dropdown-item>
				<u-dropdown-item v-model="chunnelName" title="所属隧道" :options="chunnelNameList" @change="chunnelNameChange"></u-dropdown-item>
			</u-dropdown>
			<view class="tagList">
				<u-tag closeable :text="routeName" type="success"  @close="tagClick('routeName')" />
				<u-tag closeable :text="roadsectionName" type="success"  @close="tagClick('roadsectionName')" />
				<u-tag closeable :text="chunnelName" type="success"  @close="tagClick('chunnelName')" />
			</view>
		</view>
		<u-card padding="20" v-for="item in dataList" :key=item.id>
			<view class="cardHearder" slot="head">
				<view class="tunnel">{{item.chunnelName}}</view>
				<view class="clickContent">
					<u-button type="primary" size="mini">添加设施分项</u-button>
				</view>
			</view>
			<view class="cardBody" slot="body">
				<view>路线: {{item.routeName}}</view>
				<view class="second">路段: {{item.roadsectionName}}</view>
				<view>幅别: {{item.projectFloat==1?'左幅':item.projectFloat==2?'右幅':'———'}}</view>
			</view>
		</u-card>
		<view class="example-body">
			<uni-load-more :status="status" :content-text="contentText"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 筛选条件的值
				routeName: '请选择',
				roadsectionName: '请选择',
				chunnelName: '请选择',
				// 对应筛选条件的下拉列表
				routeLineList:[{label:'请选择',value:'请选择'}],//所属路线
				roadSectionList:[{label:'请选择',value:'请选择'}],//所属路段
				chunnelNameList:[{label:'请选择',value:'请选择'}],//所属隧道
				// 查询返回的数据列表
				dataList:[],//页面展示的列表
				dataListCopy:[],//查询所有的数据列表--备份
				routeLineDataListCopy:[],//筛选路线之后展示的列表--备份
				roadSectionDataListCopy:[],//筛选路段之后展示的列表--备份
				chunnelNameDataListCopy:[],//筛选隧道之后展示的列表--备份
				// 数据状态 more--查看更多  moMore--没有更多   loading--加载中
				status: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				pageNo:1
			}
		},
		// 进入页面加载
		onLoad(){
			this.status = 'loading'
			this.getData()
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if(e.type == 'home'){
				uni.switchTab({
				    url: '/pages/index'
				})
				return
			}
			this.getData()
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 300
			})
		},
		//上拉加载
		onReachBottom(){
			if (this.status == 'moMore'){
				return;
			}
			this.pageNo++;
			let num = this.pageNo*10
			if(this.chunnelName != "请选择"){
				this.dataList = this.chunnelNameDataListCopy.slice(0,num)
				if(this.dataList.length >= this.chunnelNameDataListCopy.length){
					this.status = 'moMore'
				}else{
					this.status = 'more'
				}
				return
			}
			if(this.roadsectionName != "请选择"){
				this.dataList = this.roadSectionDataListCopy.slice(0,num)
				if(this.dataList.length >= this.roadSectionDataListCopy.length){
					this.status = 'moMore'
				}else{
					this.status = 'more'
				}
				return
			}
			if(this.routeName != "请选择"){
				this.dataList = this.routeLineDataListCopy.slice(0,num)
				if(this.dataList.length >= this.routeLineDataListCopy.length){
					this.status = 'moMore'
				}else{
					this.status = 'more'
				}
				return
			}
			this.dataList = this.dataListCopy.slice(0,num)
			if(this.dataList.length >= this.dataListCopy.length){
				this.status = 'moMore'
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
		methods: {
			// 获取全部的待检数据
			getData(){
				this.pageNo = 1
				this.$http.queryChunnelList({}).then((res)=>{
					if(res.code == '200'){
						// 还原数据--开始
						this.dataList = [];
						this.dataListCopy = []
						this.routeLineDataListCopy = []
						this.roadSectionDataListCopy = []
						this.chunnelNameDataListCopy = []
						this.routeLineList = [{label:'请选择',value:'请选择'}]
						this.roadSectionList = [{label:'请选择',value:'请选择'}]
						this.chunnelNameList = [{label:'请选择',value:'请选择'}]
						// 还原数据--结束
						// 默认展示10条数据
						this.dataList = res.data.slice(0,10) //需要展示的数据
						this.dataListCopy = res.data //备份的查询总数据
						if(this.dataList.length >= this.dataListCopy.length){
							this.status = 'moMore'
						}else{
							this.status = 'more'
						}
						
						// 所属路线  列表开始------------
						let routeLineList = new Set(['请选择'])
						this.dataListCopy.forEach((val)=>{
							if(val.routeName != ''){
								routeLineList.add(val.routeName)
							}
						})
						this.routeLineList = Array.from(routeLineList).map(item => {
							return {label:item,value:item}
						})
						// 所属路线  列表结束--------------------
					}
				})
			},
			// 路线名称变换
			routeLineChange(e){
				this.routeName = e
				this.pageNo = 1
				this.roadSectionDataListCopy = []
				this.chunnelNameDataListCopy = []
				this.roadSectionList = [{label:'请选择',value:'请选择'}]
				this.chunnelNameList = [{label:'请选择',value:'请选择'}]
				let data
				if(this.routeName != '请选择'){
					data = this.dataListCopy.filter((val)=>{
						return val.routeName == this.routeName
					})
				}else{
					data = this.dataListCopy
				}
				console.log(data)
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.routeLineDataListCopy = data
				if(this.dataList.length >= this.routeLineDataListCopy.length){
					this.status = 'moMore'
				}else{
					this.status = 'more'
				}
				
				// 所属路段  列表开始---------
				let roadSectionList = new Set(['请选择'])
				this.routeLineDataListCopy.forEach((val)=>{
					if(val.routeName == this.routeName){
						roadSectionList.add(val.roadsectionName)
					}
				})
				console.log(roadSectionList)
				this.roadSectionList = Array.from(roadSectionList).map(item => {
					return {label:item,value:item}
				})
				// 所属路段  列表结束---------
				data = []
			},
			// 所属路段改变
			roadSectionChange(e){
				this.roadsectionName = e
				this.pageNo = 1
				this.chunnelNameDataListCopy = []
				this.chunnelNameList = [{label:'请选择',value:'请选择'}]
				let data
				if(this.roadsectionName != '请选择'){
					data = this.routeLineDataListCopy.filter((val)=>{
						return val.roadsectionName == this.roadsectionName
					})
				}else{
					data = this.routeLineDataListCopy
				}
				console.log(data)
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.roadSectionDataListCopy = data
				if(this.dataList.length >= this.roadSectionDataListCopy.length){
					this.status = 'moMore'
				}else{
					this.status = 'more'
				}
				
				// 所属隧道  列表开始---------
				let chunnelNameList = new Set(['请选择'])
				this.roadSectionDataListCopy.forEach((val)=>{
					if(val.roadsectionName == this.roadsectionName){
						chunnelNameList.add(val.chunnelName)
					}
				})
				this.chunnelNameList = Array.from(chunnelNameList).map(item => {
					return {label:item,value:item}
				})
				// 所属隧道  列表结束---------
				data = []
			},
			// 所属隧道改变
			chunnelNameChange(e){
				this.pageNo = 1
				this.chunnelName = e
				let data
				if(this.chunnelName != '请选择'){
					data = this.roadSectionDataListCopy.filter((val)=>{
						return val.chunnelName == this.chunnelName
					})
				}else{
					data = this.roadSectionDataListCopy
				}
				console.log(data)
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.chunnelNameDataListCopy = data
				if(this.dataList.length >= this.chunnelNameDataListCopy.length){
					this.status = 'moMore'
				}else{
					this.status = 'more'
				}
				data = []
			},
			// 点击标签的❌
			tagClick(val){
				if(val == 'routeName'){
					if(this.routeName != '请选择'){
						this.routeName = '请选择'
						this.routeLineChange('请选择')
					}
					return
				}
				if(val == 'roadsectionName'){
					if(this.roadsectionName != '请选择'){
						this.roadsectionName = '请选择'
						this.roadSectionChange('请选择')
					}
					return
				}
				if(val == 'chunnelName'){
					if(this.chunnelName != '请选择'){
						this.chunnelName = '请选择'
						this.chunnelNameChange('请选择')
					}
					return
				}
			}
		}
	}
</script>

<style scoped>
	.addProject .downMenu .tagList {
		display: flex;
		justify-content: space-around;
	}
	.addProject .cardHearder {
		display: flex;
		justify-content: space-between;
	}
	.addProject .second {
		margin: 20rpx 0;
	}
</style>
