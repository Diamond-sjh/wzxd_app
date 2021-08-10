<template>
	<view>
		<u-navbar back-text="返 回" :background="{backgroundColor: '#F2F2F2'}">
			<view
				style="display: flex;align-items: center; color: rgb(96, 98, 102);font-size: 30rpx;width: 100%;padding:14rpx 35rpx 14rpx 14rpx;">
				<!-- <u-icon name="search"></u-icon> -->
				<!-- <u-input v-model="keyword" placeholder="按桥梁名称搜索" style="margin-left: 10rpx;"></u-input> -->
				<u-search v-model="keyword" @search="getData(null,keyword)" :show-action="false"></u-search>
				<u-icon name="scan" @click="scan()" style="margin-left: 50rpx;"></u-icon>
			</view>
		</u-navbar>
		<u-toast ref="uToast" />
		<u-toast ref="keywordneed" />
		<scroll-view>
			<u-card v-for="(item, index) in dataList" :key=index :title="item.bridgeName" border-radius="0"
				box-shadow="1px 1px 1px #aaaaaa">
				<view slot="body">
					<u-table>
	<!-- 					<u-tr>
							<u-th>创建人</u-th>
							<u-th>创建时间</u-th>
							<u-th>文件名称</u-th>
							<u-th>备注</u-th>
						</u-tr>
						<u-tr>
							<u-th>{{item.createPerson}}</u-th>
							<u-th>{{item.createTime}}</u-th>
							<u-th>{{item.pdfName}}</u-th>
							<u-th>{{item.remarks}}</u-th>
						</u-tr> -->
						<u-tr>
							<u-th>创建人</u-th>
							<u-th>{{item.createPerson}}</u-th>
						</u-tr>
						<u-tr>
							<u-th>创建时间</u-th>
							<u-th>{{item.createTime}}</u-th>
						</u-tr>
						<u-tr>
							<u-th>文件名称</u-th>
							<u-th>{{item.pdfName}}</u-th>
						</u-tr>
						<u-tr>
							<u-th>备注</u-th>
							<u-th>{{item.remarks}}</u-th>
						</u-tr>
					</u-table>
					<view>
						<u-button type="primary" style="margin-top: 30rpx;" @click="showPDF(item.pdfUrl,item.bridgeName)">预览文件</u-button>
					</view>
				</view>
			</u-card>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '', //搜索框keyword
				dataList: [], //桥梁list
				dataListCopy: [],
			}
		},
		methods: {
			//获取桥梁list
			getData(sid, name) {
				if(sid == null && name ==''){
					this.$refs.keywordneed.show({
						title: '请输入关键字',
						type: 'default',
						// url: '/pages/user/index'
					})
					return
				}
				let _this = this
				this.$http.queryStructureTestData({
					sid: sid,
					bridgeName: name
				}).then(res => {
					if (res.code == 200) {
						this.dataList = res.data
						// this.dataListCopy = res.data.slice(0, 10)
						if (sid && res.data.length !== 0) {
							_this.getData(null,res.data[0].bridgeName)
						}
						this.$refs.uToast.show({
							title: this.dataList.length+' 条 记 录',
							type: 'default',
							// url: '/pages/user/index'
						})
					}
				})

			},
			showPDF(url,name) {
					uni.navigateTo({
						url:'/pages/bridgeAssets/pdf',
						success: function(res) {
						    // 通过eventChannel向被打开页面传送数据
						    res.eventChannel.emit('showPDF', url,name)
						},
						fail:function(res){
							console.log(res)
						}
					})
			},
			scan() {
				uni.scanCode({
					scanType:['qrCode'],
					success: (res) => {
						console.log('条码内容：' + res.result);
						let sid = res.result.slice(res.result.search('bridgeId=')+9,res.result.length)
						this.getData(sid)
					}
				})
			}
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('qrCode',res => {
				console.log(res)
				let sid = res.slice(res.search('bridgeId=')+9,res.length)
				this.getData(sid)
			})
		},

	}
</script>

<style>
</style>
