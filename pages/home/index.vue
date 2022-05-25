<template>
	<view class="addProject navbar">
		<u-navbar back-text="返回" title="" back-icon-color="white" :back-text-style="letVal">
			<view class="slot-wrap">
				<view class="content" @click="search">搜索</view>
				<view class="search">
					<u-input 
					ref="chunelInput"
					@blur="loseFocus" 
					confirm-type="search"
					:focus="focusVal"
					@confirm="search"
					v-model="chunelValue" 
					height="20" 
					placeholder="试试搜索: xx隧道" />
				</view>
			</view>
		</u-navbar>
		<view class="downMenu">
			<u-dropdown duration="0">
				<u-dropdown-item v-model="routeName" title="所属路线" :options="routeLineList" @change="routeLineChange"></u-dropdown-item>
				<u-dropdown-item v-model="roadsectionName" title="所属路段" :options="roadSectionList" @change="roadSectionChange"></u-dropdown-item>
				<u-dropdown-item v-model="chunnelName" title="所属隧道" :options="chunnelNameList" @change="chunnelNameChange"></u-dropdown-item>
			</u-dropdown>
			<view class="tagList">
				<u-tag :text="routeName" />
				<u-tag :text="roadsectionName" />
				<u-tag :text="chunnelName" />
			</view>
		</view>
		<view class="cards">
			<scroll-view 
			class="scrool-more" 
			:style="{height: scrollHeight}" 
			scroll-y="true" 
			:scroll-top="scrollTop"
			 @scroll="scroll"
			scroll-with-animation="true"
			lower-threshold="300"
			@scrolltolower="myOnReachBottom">
				<uni-row class="demo-uni-row">
					<uni-col :xs="24" :sm="12" :md="8" v-for="item in dataList" :key=item.id>
						<u-card padding="20">
							<view class="cardHearder" slot="head">
								<view class="tunnel">{{item.chunnelName}}</view>
							</view>
							<view class="cardBody" slot="body">
								<view>路线: {{item.routeName}}</view>
								<view class="second">路段: {{item.roadsectionName}}</view>
								<view>幅别: {{item.floatDirection==1?'左幅':item.projectFloat==2?'右幅':'———'}}</view>
							</view>
							<view class="footBtns" slot="foot">
								<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('project',item)">查看设施分项</button>
								<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('viruse',item)">病害信息</button>
							</view>
						</u-card>
					</uni-col>
				</uni-row>
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
				letVal:{
					color:'white'
				},//导航栏左边字体颜色
				chunelValue:'',//导航栏搜索框内容
				focusVal:false,
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
				// 数据状态 more--查看更多  noMore--没有更多   loading--加载中
				scrollTop:0,//滚动轴的位置
				old: {
					scrollTop:0
				},
				scrollHeight:0,//滚动区域高度
				downMenuHeight:0,//下拉菜单区域高度
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
			let barHeight = 0
			//#ifdef APP-PLUS
			barHeight = plus.navigator.getStatusbarHeight()*plus.screen.scale
			// #endif
			uni.getSystemInfo({
				success:  (res)=> {
					const wid = res.windowWidth
					const hei = res.windowHeight
					// 140是除了可滚动区域外的其它部分占的rpx高度
					this.downMenuHeight = wid > hei?140*(hei/750):140*(wid/750)
					this.scrollHeight=(hei/(wid/750))*(wid/750) - this.downMenuHeight - barHeight +'px'
				}
			});
			this.status = 'loading'
			this.getData()
			this.getDiseaseList()
		},
		onResize(){
			let barHeight = 0
			//#ifdef APP-PLUS
			barHeight = plus.navigator.getStatusbarHeight()*plus.screen.scale
			// #endif
			uni.getSystemInfo({
				success:  (res)=> {
					const wid = res.windowWidth
					const hei = res.windowHeight
					// 140是除了可滚动区域外的其它部分占的rpx高度
					this.scrollHeight=(hei/(wid/750))*(wid/750) - this.downMenuHeight - barHeight +'px'
				}
			});
		},
		//下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
			this.status = 'loading'
			this.routeName = '请选择'
			this.roadsectionName = '请选择'
			this.chunnelName = '请选择'
			this.scrollTop = this.old.scrollTop
			this.$nextTick(function() {
				this.scrollTop = 0
			});
			this.getData()
		},
		methods: {
			//上拉加载
			myOnReachBottom(){
				if (this.status == 'noMore'){
					return;
				}
				this.pageNo++;
				let num = this.pageNo*10
				if(this.chunnelName != "请选择"){
					this.dataList = this.chunnelNameDataListCopy.slice(0,num)
					if(this.dataList.length >= this.chunnelNameDataListCopy.length){
						this.status = 'noMore'
					}else{
						this.status = 'more'
					}
					return
				}
				if(this.roadsectionName != "请选择"){
					this.dataList = this.roadSectionDataListCopy.slice(0,num)
					if(this.dataList.length >= this.roadSectionDataListCopy.length){
						this.status = 'noMore'
					}else{
						this.status = 'more'
					}
					return
				}
				if(this.routeName != "请选择"){
					this.dataList = this.routeLineDataListCopy.slice(0,num)
					if(this.dataList.length >= this.routeLineDataListCopy.length){
						this.status = 'noMore'
					}else{
						this.status = 'more'
					}
					return
				}
				this.dataList = this.dataListCopy.slice(0,num)
				if(this.dataList.length >= this.dataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
			},
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
							this.status = 'noMore'
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
			// 获取全部病害信息
			getDiseaseList(){
				this.$http.diseaseList({}).then(res => {
					if(res.code == 200){
						uni.setStorage({
						    key: 'disease_key',
						    data: res.data,
						    success: function () {
						        console.log('success');
						    }
						});
					}
				}).catch(e => {
					
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
				this.roadsectionName = '请选择'
				this.chunnelName = '请选择'
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.routeLineDataListCopy = data
				if(this.dataList.length >= this.routeLineDataListCopy.length){
					this.status = 'noMore'
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
				this.chunnelName = '请选择'
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.roadSectionDataListCopy = data
				if(this.dataList.length >= this.roadSectionDataListCopy.length){
					this.status = 'noMore'
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
				// 默认展示10条数据
				this.dataList = data.slice(0,10)
				this.chunnelNameDataListCopy = data
				if(this.dataList.length >= this.chunnelNameDataListCopy.length){
					this.status = 'noMore'
				}else{
					this.status = 'more'
				}
				data = []
			},
			// 点击搜索
			search(){
				let that = this
				this.routeName = '请选择'
				this.roadsectionName = '请选择'
				this.chunnelName = '请选择'
				this.roadSectionList = [{label:'请选择',value:'请选择'}]
				this.chunnelNameList = [{label:'请选择',value:'请选择'}]
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				if(this.chunelValue == ''){
					// this.$refs.chunelInput.focus()
					this.focusVal = true
					this.dataList = this.dataListCopy.slice(0,10) //需要展示的数据
					if(this.dataList.length >= this.dataListCopy.length){
						this.status = 'noMore'
					}else{
						this.status = 'more'
					}
					return
				}
				if(this.chunelValue){
					let arr = this.dataListCopy.filter(val => {
						if(val.chunnelName.indexOf(this.chunelValue) != -1){
							return val
						}
					})
					this.dataList = arr
					this.status = 'noMore'
				}
			},
			loseFocus(){
				this.focusVal = false
			},
			// 记录滚动位置
			scroll(e){
				this.old.scrollTop = e.detail.scrollTop
			},
			// 跳转页面
			jumpToPage(val,item){
				let that = this
				if(val == 'project'){
					uni.navigateTo({
						url:'/pages/home/projectInfo/index',
						success: function(res) {
						    // 通过eventChannel向被打开页面传送数据
						    res.eventChannel.emit('toProjectInfoIndex', {id:item.id,chunnelName:item.chunnelName})
						},
						fail:function(res){
							console.log(res)
						}
					})
					return
				} 
				if(val == 'viruse'){
					uni.navigateTo({
						url:'/pages/home/viruseInfo/index',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('toViruseInfoIndex', {id:item.id,chunnelName:item.chunnelName})
						},
						fail:function(res){
							console.log(res)
						}
					})
					return
				} 
			}
		}
	}
</script>

<style scoped>	
	.addProject {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.addProject .slot-wrap {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 12px;
		flex-direction: row-reverse;
	}
	.addProject .downMenu {
		width: 100%;
		height: 140rpx;
	}
	.addProject .cards {
		flex: 1;
		position: relative;
	}
	.addProject .cards .scrool-more {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		touch-action: none 
	}
/* 	.addProject .cards .scrool-more .example-body .uni-load-more {
		height: 80rpx;
	} */
	.addProject .downMenu .tagList {
		display: flex;
		justify-content: space-around;
	}
	.addProject .downMenu .tagList .u-tag {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 0 5px;
		flex: 1;
		text-align: center;
	}
	.addProject .cardHearder {
		font-size: 16px;
		font-weight: 800;
	}
	.addProject .second {
		margin: 20rpx 0;
	}
	.addProject .footBtns {
		display: flex;
	    flex-direction: row;
	    flex-wrap: nowrap;
	    justify-content: space-around;
	}
</style>
