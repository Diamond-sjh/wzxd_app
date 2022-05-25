<template>
	<view class="updateMsg navbar">
		<u-navbar back-text="返回" title="自动上传任务" back-icon-color="white" title-color="white" :back-text-style="letVal"></u-navbar>
		<u-empty mode="list" :show="isShow"></u-empty>
		<u-cell-group>
			<u-swipe-action  
				:index="index" 
				v-for="(item, index) in msgList" :key="index" 
				@click="click"
				:options="options"
			>
				<u-cell-item 
				:title="item.parameterName" 
				:label="item.testDate" 
				:value="item.detectionStation" 
				@click="detail({item,index})"></u-cell-item>
				<!-- v-for="(item,index) in msgList"
				:key="index" -->
			</u-swipe-action>
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
				isShow: true,
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
	    },
		onShow() {
			uni.getStorage({
			    key: 'monitor_key',
			    success: (res) => {
			        console.log(res.data);
					this.msgList = res.data
					if(this.msgList.length > 0){
						this.isShow = false
					}
			    },
				fail: (err) => {
					this.msgList = []
					this.isShow = true
				}
			});
		},
	    methods: {
			// 重新保存数据到缓存
			click(index, index1) {
				let that = this
				uni.getStorage({
				    key: 'monitor_key',
				    success:(res) => {
						let dataArr = res.data
						dataArr.splice(index,1)
						if(dataArr.length == 0){
							this.isShow = true
							uni.removeStorage({
							    key: 'monitor_key',
							    success: function (res) {
							        console.log('success');
									that.msgList = dataArr
							    }
							});
						}else{
							uni.setStorage({
								key: 'monitor_key',
								data: dataArr,
								success(res) {
									console.log(res);
									that.msgList = dataArr
									// that.$u.toast('缓存修改成功')
								},
								fail(err) {
									console.log(err);
									// that.$u.toast('缓存修改失败')
								}
							});
						}
				    }
				});
			},
			detail(item){
				uni.navigateTo({
					url:'/pages/monitor/updateMsgList/msgDetail',
					success: function(res) {
					    // 通过eventChannel向被打开页面传送数据
					    res.eventChannel.emit('toMsgDetail', item)
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

</style>
