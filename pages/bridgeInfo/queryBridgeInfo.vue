<template>
	<view class="bridgeInfo">
		<view class="downMenu">
			<u-dropdown duration="0">
				<u-dropdown-item v-model="bridgeName" title="桥梁名称" :options="bridgeNameList" @change="bridgeNameChange"></u-dropdown-item>
			</u-dropdown>
			<view class="tagList">
				<u-tag :text="bridgeName" type="success" />
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
				<u-card padding="20" v-for="item in dataList" :key=item.id>
					<view class="cardHearder" slot="head">
						<view class="tunnel">{{item.bridgeName}}</view>
					</view>
					<view class="cardBody" slot="body">
						<view class="second">路线名称: {{item.routeName}}</view>
						<view>通车日期: {{item.opentrafficDate}}</view>
						<view class="second">桥型: {{item.bridgeType}}</view>
						<view class="second">长度(m): {{item.bridgeLength}}</view>
					</view>
					<view class="footBtns" slot="foot">
						<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('previewPicture',item)">预览扫描信息</button>
						<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('createQrCode',item)">生成二维码</button>
					</view>
				</u-card>
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
   				bridgeName: '请选择',
   				// 对应筛选条件的下拉列表
   				bridgeNameList:[{label:'请选择',value:'请选择'}],//所属隧道
   				// 查询返回的数据列表
   				dataList:[],//页面展示的列表
   				dataListCopy:[],//查询所有的数据列表--备份
   				bridgeNameDataListCopy:[],//筛选隧道之后展示的列表--备份
   				// 数据状态 more--查看更多  noMore--没有更多   loading--加载中
   				scrollTop:0,//滚动轴的位置
   				old: {
   					scrollTop:0
   				},
   				scrollHeight:0,//滚动区域高度
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
   					this.scrollHeight=(hei/(wid/750)-140)*(wid/750) - barHeight +'px'
   				}
   			});
   			this.status = 'loading'
   			this.getData()
   		},
   		//下拉刷新
   		onPullDownRefresh(){
   			uni.stopPullDownRefresh();
   			this.status = 'loading'
   			this.bridgeName = '请选择'
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
   				if(this.bridgeName != "请选择"){
   					this.dataList = this.bridgeNameDataListCopy.slice(0,num)
   					if(this.dataList.length >= this.bridgeNameDataListCopy.length){
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
   			// 获取全部的桥梁数据
   			getData(){
   				this.pageNo = 1
   				this.$http.queryBridgeInfoList({}).then((res)=>{
   					if(res.code == '200'){
   						// 还原数据--开始
   						this.dataList = [];
   						this.dataListCopy = []
   						this.bridgeNameDataListCopy = []
   						//this.bridgeNameList = [{label:'请选择',value:'请选择'}]
   						// 还原数据--结束
   						// 默认展示10条数据
   						this.dataList = res.data.slice(0,10) //需要展示的数据
   						this.dataListCopy = res.data //备份的查询总数据
						//console.log(this.dataListCopy)
   						if(this.dataList.length >= this.dataListCopy.length){
   							this.status = 'noMore'
   						}else{
   							this.status = 'more'
   						}
						
					    //桥梁名称过滤
                        let bridgeNameList = new Set(['请选择'])
					    this.dataList.forEach((val)=>{
					    	bridgeNameList.add(val.bridgeName)
					    })
					    this.bridgeNameList = Array.from(bridgeNameList).map(item => {
					    	return {label:item,value:item}
					    })
					    //console.log(this.bridgeNameList)
   					}
   				})
   			},
   			// 桥梁名称改变
   			bridgeNameChange(e){
				console.log(e)
   				this.pageNo = 1
   				this.bridgeName = e
   				let data
   				if(this.bridgeName != '请选择'){
   					data = this.dataListCopy.filter((val)=>{
   						return val.bridgeName == this.bridgeName
   					})
   				}else{
   					data = this.dataListCopy
   				}
   				// 默认展示10条数据
   				this.dataList = data.slice(0,10)
   				this.bridgeNameDataListCopy = data
   				if(this.dataList.length >= this.bridgeNameDataListCopy.length){
   					this.status = 'noMore'
   				}else{
   					this.status = 'more'
   				}
   				data = []
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
   				if(val == 'previewPicture'){
   					uni.navigateTo({
   						url:'/pages/bridgeInfo/previewOujiang',
   						success: function(res) {
   						    // 通过eventChannel向被打开页面传送数据
   						    res.eventChannel.emit('toPictureInfoIndex', {id:item.id,bridgeName:item.bridgeName})
   						},
   						fail:function(res){
   							console.log(res)
   						}
   					})
   					return
   				} 
   				if(val == 'createQrCode'){
   					uni.navigateTo({
   						url:'/pages/bridgeInfo/QRCode',
   						success: function(res) {
   							// 通过eventChannel向被打开页面传送数据
   							res.eventChannel.emit('toQrCodeInfoIndex', {id:item.id,bridgeName:item.bridgeName})
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
   	page{
   		width: 100%;
   		height: 100%;
   	}
   	uni-page-body {
   		width: 100%;
   		height: 100%;
   	}
   	.bridgeInfo {
   		display: flex;
   		flex-direction: column;
   		width: 100%;
   		height: 100%;
   	}
   	.bridgeInfo /deep/ .u-navbar {
   		background: linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))!important;
   	}
   	.bridgeInfo .slot-wrap {
   		width: 100%;
   		display: flex;
   		align-items: center;
   		padding: 0 12px;
   		flex-direction: row-reverse;
   	}
   	.bridgeInfo .slot-wrap .search {
   		width: 80%;
   		border: 1px solid;
   		border-radius: 40px;
   		height: 26px;
   		background: white;
   		padding: 3px 15px;
   	}
   	.bridgeInfo .slot-wrap .search /deep/ .u-input__input {
   		height: 18px;
   		line-height: 18px;
   	}
   	.bridgeInfo .slot-wrap .content {
   		color: white;
   		margin: 0 5px 0 10px;
   	}
   	.bridgeInfo .downMenu {
   		width: 100%;
   		height: 140rpx;
   	}
   	.bridgeInfo .cards {
   		flex: 1;
   		position: relative;
   	}
   	.bridgeInfo .cards .scrool-more {
   		position: absolute;
   		left: 0;
   		right: 0;
   		top: 0;
   		bottom: 0;
   	}
   /* 	.bridgeInfo .cards .scrool-more .example-body .uni-load-more {
   		height: 80rpx;
   	} */
   	.bridgeInfo .downMenu .tagList {
   		display: flex;
   		justify-content: space-around;
   	}
   	.bridgeInfo .downMenu .tagList .u-tag {
   		overflow: hidden;
   		white-space: nowrap;
   		text-overflow: ellipsis;
   		margin: 0 5px;
   		flex: 1;
   		text-align: center;
   	}
   	.bridgeInfo .cardHearder {
   		font-size: 16px;
   		font-weight: 800;
   	}
   	.bridgeInfo .second {
   		margin: 20rpx 0;
   	}
   	.bridgeInfo .footBtns {
   		display: flex;
   	    flex-direction: row;
   	    flex-wrap: nowrap;
   	    justify-content: space-around;
   	}
   </style>
   
