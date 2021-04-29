<template>
	<view class="updateMsg">
		<u-navbar back-text="返回" title="自动上传任务" back-icon-color="white" title-color="white" :back-text-style="letVal"></u-navbar>
		<u-empty mode="list" :show="isShow"></u-empty>
		<u-cell-group>
			<u-cell-item 
			:title="item.branchName" 
			:label="item.facilitiesName" 
			:value="item.checkItem" 
			v-for="item in msgList" 
			:key="item.id"
			@click="detail(item)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
	    data() {
	        return {
				letVal:{
					color:'white'
				},//导航栏左边字体颜色
				msgList: [],
				isShow: true
			}
	    },
		onLoad() {
			console.log(12)
			this.msgList = [...this.getVirusList.values()]
			if(this.msgList.length > 0){
				this.isShow = false
			}
		},
		computed: {
			...mapGetters(['getVirusList']),
		},
	    methods: {
			add(){
				let timestamp = new Date().getTime()
				let params = {
					addTime:"2021-04-27 10:18:53",
					branchName:"供配电设施",
					checkCode:"118200",
					checkDate:"2021-04-28 14:00:05",
					checkItem:"接地装置1",
					checkNo:"cccccccxcc",
					checkState:"",
					checker:"温州信达检测",
					chunnel:"20210426002隧道名称_czx_001",
					customerName:"",
					deviceCode:"118000",
					directionType:0,
					diseaseContent:"电源和信号输入端的浪涌保护器不完好",
					facilitiesName:"防雷接地设施",
					faultDays:20,
					id:880,
					imageName:"",
					imageOriginal:"",
					imageUrl:"/diseaseParams/2255f2cb-e224-4e2f-9c31-b1ce25b911c3安全检测.png",
					isfault:"1"
				}
				this.a.set(timestamp,params)
				console.log(this.a)
				this.msgList = [...this.a.values()]
				console.log(this.b)
			},
			detail(item){
				uni.navigateTo({
					url:'/pages/home/viruseInfo/updateMsgList/virusDetail',
					success: function(res) {
					    // 通过eventChannel向被打开页面传送数据
					    res.eventChannel.emit('toVirusDetail', item)
					},
					fail:function(res){
						console.log(res)
					}
				})
			}
	    }
	}
</script>

<style scoped>
	.updateMsg /deep/ .u-navbar {
		background: linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))!important;
	}
</style>
