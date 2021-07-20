<template>
	<view>
		<u-navbar back-text="返 回" :background="{backgroundColor: '#F2F2F2'}">
			<view style="display: flex;align-items: center; color: rgb(96, 98, 102);font-size: 30rpx;width: 100%;padding:14rpx 35rpx 14rpx 14rpx;">
				<u-icon name="search"></u-icon>
				<u-input v-model="keyword" placeholder="按桥梁名称搜索" style="margin-left: 10rpx;"></u-input>
				<view @click="getBridgeData(null,keyword)" style="margin-left: 50rpx;">搜 索</view>
			</view>
		</u-navbar>
		<view>
			<u-dropdown :border-bottom="true">
				<u-dropdown-item v-model="value1" title="路线" :options="options1" @change="getBridgeData(value1)">
				</u-dropdown-item>
				<u-dropdown-item v-model="value2" title="路段" :options="options2" @change="filterBySection(value2)">
				</u-dropdown-item>
			</u-dropdown>
		</view>
		<scroll-view>
			<u-card v-for="(item, index) in dataListCopy" :key=index :title="item.bridgeName" :sub-title="item.rangeType | rangeType"
				border-radius="0" box-shadow="1px 1px 1px #aaaaaa">
				<view slot="body">
					<view>桥别:{{item.bridgeCategory | bridgeCategory}}</view>
					<view>桥型:{{item.bridgeType | bridgeType}}</view>
					<view>路线:{{item.roadlineName}}</view>
					<view>路段:{{item.roadsectionName}}</view>
					<!-- <view>pdfname:{{item.pdfName}}</view> -->
					<!-- <view>pdfurl:{{item.pdfUrl}}</view> -->
				</view>
				<view slot="foot" style="display: flex;">
					<u-button type="primary" size="medium" :plain="true">按钮</u-button>
					<u-button type="primary" size="medium" :plain="true">按钮</u-button>
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
				value1: '',		//路线value
				value2: '',		//路段value
				options1: [],	//路线选项
				options2: [],	//路段选项
				dataList: [], //桥梁list
				dataListCopy: [], //桥梁list备份
			}
		},
		filters:{
			//幅别
			 rangeType: function (value) {
			    if (value == 1) return '左幅'
			    if (value == 2) return '右幅'
					if (value == 3) return '————'
			  },
			//桥别
			bridgeCategory: function (value) {
			    if (value == 1) return '主线桥'
			    if (value == 2) return '匝道桥'
			  },
			//桥型
			bridgeType: function (value) {
			    if (value == 1) return '简支梁桥'
			    if (value == 2) return '连续梁桥'
			    if (value == 3) return '悬臂梁桥'
			    if (value == 4) return '拱桥(三铰、两铰、无铰)'
			    if (value == 5) return '刚架桥(门式、斜腿)'
			    if (value == 6) return '刚构桥(T形、连续)'
			    if (value == 7) return '刚构桥(T形、连续)'
			    if (value == 8) return '悬索桥'
			  },
		},
		methods: {
			//获取桥梁list
			getBridgeData(rid, name) {
				this.$http.queryBridgeInfoList({
					roadlineId: rid,
					bridgeName: name
				}).then(res => {
					if (res.code == 200) {
						this.dataList = res.data
						this.dataListCopy = res.data.slice(0,10)
						console.log(this.dataList)
						//option1去重
						if (this.options1.length == 0) {
							let roadline = []
							res.data.forEach(item => {
								roadline.push({
									label: item.roadlineName,
									value: item.roadlineId
								})
							})
							let hash = {}
							roadline = roadline.reduce((item, next) => {
								hash[next.roadlineId] ? '' : hash[next.roadlineId] = true && item.push(next);
								return item
							}, [])
							this.options1 = roadline
							// console.log('option1去重')
						}
						//option2去重
						if (rid) {
							let roadsection = []
							res.data.forEach(item => {
								roadsection.push({
									label: item.roadsectionName,
									value: item.roadsectionId
								})
							})
							let hash = {}
							roadsection = roadsection.reduce((item, next) => {
								hash[next.roadsectionId] ? '' : hash[next.roadsectionId] = true && item.push(next);
								return item
							}, [])
							this.options2 = roadsection
							// console.log('option2去重')
						}
					}
				})
			},
			//根据路段筛选
			filterBySection(val) {
				this.dataList = this.dataList.filter(item => {
					if(val == item.roadsectionId){
						return item
					}
				})
				console.log('filterBySection', this.dataList)
			}

		},
		onLoad() {
			this.getBridgeData()
		}

	}
</script>

<style>
</style>
