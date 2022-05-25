<template>
	<view class="projectContent navbar">
		<u-navbar back-text="返回" title="" back-icon-color="white" :back-text-style="letVal">
			<view class="slot-wrap">
				<view class="content" @click="search">搜索</view>
				<view class="search">
					<u-input 
					:focus="focusVal" 
					@blur="loseFocus"
					confirm-type="search"
					@confirm="search"
					v-model="checkItemValue" 
					height="20" 
					placeholder="输入设备名称(区分大小写)" />
				</view>
			</view>
		</u-navbar>
		<uni-row class="demo-uni-row">
			<uni-col :xs="24" :sm="12" :md="8" v-for="item in dataList" :key=item.id>
				<u-card padding="20">
					<view class="cardHearder" slot="head">
						<view class="tunnel">{{chunnelName}}</view>
					</view>
					<view class="cardBody" slot="body">
						<view>设施分项: {{item.branchName}}</view>
						<view class="second">设备名称: {{item.deviceName}}</view>
						<view>检测项目: {{item.checkContent?item.checkContent:'———'}}</view>
					</view>
					<view class="footBtns" slot="foot">
						<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('editAndAdd',item)">修改/新增</button>
						<button type="primary" size="mini" class="footerBtn" @click="jumpToPage('delet',item)">删除</button>
					</view>
				</u-card>
			</uni-col>
		</uni-row>
		<view class="example-body">
			<uni-load-more :status="status" :content-text="contentText"/>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				// 头部导航栏
				letVal:{
					color:'white'
				},//导航栏左边字体颜色
				checkItemValue:'',//导航栏搜索框内容
				focusVal:false,
				// 页面数据
				tunnelId:'',//隧道ID
				chunnelName:'',//隧道名字
				dataList:[],
				dataListCopy:[],
				status: 'more',
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				pageNo:1
			}
	    },
		onLoad() {
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toProjectInfoIndex', (val) => {
				this.tunnelId = val.id
				this.chunnelName = val.chunnelName
				this.status = 'loading'
				this.getData()
			})
		},
		// 上拉加载
		onReachBottom(){
			if (this.status == 'noMore'){
				return;
			}
			this.pageNo++;
			let num = this.pageNo*10
			this.dataList = this.dataListCopy.slice(0,num)
			if(this.dataList.length >= this.dataListCopy.length){
				this.status = 'noMore'
			}else{
				this.status = 'more'
			}
		},
		// 下拉刷新
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
			this.status = 'loading'
			this.getData()
		},
	    methods: {
			// 获取数据
			getData(){
				let params = {tunnelId:this.tunnelId}
				this.$http.queryCheckRecordsList(params).then(res => {
					if(res.code == 200){
						this.dataList = res.data.slice(0,10)
						this.dataListCopy = res.data
						if(this.dataList.length >= this.dataListCopy.length){
							this.status = 'noMore'
						}else{
							this.status = 'more'
						}
						console.log(34)
					}
					console.log(this.status)
				}).catch(e=>{
					
				})
			},
			// 点击修改/新增
			jumpToPage(val,item){
				let that = this
				if(val == 'editAndAdd'){
					uni.navigateTo({
						url:'/pages/home/projectInfo/editAndAdd',
						events: {
							formEditAndAdd(data){
								Object.assign(item,data)
								if(data.val == 'update'){
									that.$refs.uToast.show({
										title: '修改成功',
										type: 'success',
										duration: 1000
									})
									Object.assign(item,data.data)
									return
								}
								if(data.val == 'add'){
									that.$refs.uToast.show({
										title: '新增成功',
										type: 'success',
										duration: 1000
									})
									that.getData()
								}
							}
						},
						success: function(res) {
						    // 通过eventChannel向被打开页面传送数据
						    res.eventChannel.emit('toEditAndAdd', item)
						},
						fail:function(res){
							console.log(res)
						}
					})
					return
				}
				if(val == 'delet'){
					this.$http.delProjectDevice({id:item.id}).then(res=>{
						if(res.code == 200){
							let params1 = {
								checkCode: item.checkCode,
								deviceCode: item.deviceCode,
								tunnelId: item.tunnelId
							}
							this.$http.queryProjectInfo(params1).then(res=>{
								if(res.code == 200){
									let params2 = res.data[0]
									params2.deviceCount -= 1
									this.$http.updateProjectInfo(params2).then(res=>{
										if(res.code == 200){
											this.$refs.uToast.show({
												title: '删除成功,修改数量成功',
												type: 'success',
												duration: 1000
											})
										}else{
											this.$refs.uToast.show({
												title: '删除成功,修改数量失败',
												type: 'success',
												duration: 1000
											})	
										}
									})
								}else{
									this.$refs.uToast.show({
										title: '删除成功,修改数量失败',
										type: 'success',
										duration: 1000
									})	
								}
							})
							this.getData()
						}else{
							this.$refs.uToast.show({
								title: '删除失败,修改数量失败',
								type: 'success',
								duration: 1000
							})
						}
					}).catch(e=>{
						
					})
				}
			},
			search(){
				this.focusVal = true
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				if(this.checkItemValue == ''){
					this.dataList = this.dataListCopy.slice(0,10) //需要展示的数据
					if(this.dataList.length >= this.dataListCopy.length){
						this.status = 'noMore'
					}else{
						this.status = 'more'
					}
					return
				}
				if(this.checkItemValue){
					let arr = this.dataListCopy.filter(val => {
						if(val.deviceName.indexOf(this.checkItemValue) != -1){
							return val
						}
					})
					console.log(arr)
					this.dataList = arr
					this.status = 'noMore'
				}
				
			},
			loseFocus(){
				this.focusVal = false
			}
	    }
	}
</script>

<style scoped>
	page{
		width: 100%;
		height: 100%;
	}
	.projectContent .slot-wrap {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 12px;
		flex-direction: row-reverse;
	}
	.projectContent .cardHearder {
		font-size: 16px;
		font-weight: 800;
	}
	.projectContent .second {
		margin: 20rpx 0;
	}
	.projectContent .footBtns {
		display: flex;
	    flex-direction: row;
	    flex-wrap: nowrap;
	    justify-content: space-around;
	}
</style>
