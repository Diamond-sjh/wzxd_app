<template>
	<view class="virusDetail">
		<u-navbar back-text="返回" title="病害详情" back-icon-color="white" title-color="white" :back-text-style="letVal"></u-navbar>
		<u-cell-group>
			<u-cell-item :arrow="false" title="所属路线：">{{form.routeLine}}</u-cell-item>
			<u-cell-item :arrow="false" title="所属路段：">{{form.routeSection}}</u-cell-item>
			<u-cell-item :arrow="false" title="所属隧道：">{{form.chunnel}}</u-cell-item>
			<u-cell-item :arrow="false" title="客户名称：">{{form.customerName}}</u-cell-item>
			<u-cell-item :arrow="false" title="幅别：">{{form.directionType==1?'左幅':form.directionType==2?'右幅':'———'}}</u-cell-item>
			<u-cell-item :arrow="false" title="设施分项：">{{form.branchName}}</u-cell-item>
			<u-cell-item :arrow="false" title="设备名称：">{{form.facilitiesName}}</u-cell-item>
			<u-cell-item :arrow="false" title="检查项目：">{{form.checkItem}}</u-cell-item>
			<u-cell-item :arrow="false" title="里程桩号：">{{form.checkNo}}</u-cell-item>
			<u-cell-item :arrow="false" title="病害：">{{form.diseaseContent}}</u-cell-item>
			<u-cell-item :arrow="false" title="病害图片：">
				<view class="imgContent">
					<image 
					style="width: 100px; height: 100px; background-color: #eeeeee;" 
					mode="aspectFit" 
					:src="captchaSrc"
					@error="imageError"
					@tap="_previewImage(captchaSrc)"
					></image>
				</view>
			</u-cell-item>
			<u-cell-item :arrow="false" title="病害图片名称：">{{form.imageName}}</u-cell-item>
			<u-cell-item :arrow="false" title="原来图片名称：">{{form.imageOriginal}}</u-cell-item>
			<u-cell-item :arrow="false" title="检测时间：">{{form.checkDate}}</u-cell-item>
			<u-cell-item :arrow="false" title="检测人：">{{form.checker}}</u-cell-item>
			<u-cell-item :arrow="false" title="检测状态：">{{form.checkState}}</u-cell-item>
			<u-cell-item :arrow="false" title="状态描述：">{{form.statusCode}}</u-cell-item>
			<u-cell-item :arrow="false" title="备注：">{{form.remarks}}</u-cell-item>
		</u-cell-group>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {base64ToPath} from '../../../static/js/image-tools.js'
	export default {
	    data() {
	        return {
				letVal:{
					color:'white'
				},//导航栏左边字体颜色
				id:'',
				form:{
					addTime: "",//添加时间
					branchName: "",//设施分项
					checkDate: "",//检测时间
					checkItem: "",//检测项目
					checkNo: "",//测点编号
					checkState: "",//检测状态
					checker: "",//检测人
					chunnel: "",//所属隧道
					customerName: "",//客户名称
					directionType: 0,//幅别(0左幅；1右幅)
					diseaseContent: "",//主要检查内容
					facilitiesName: "",//设施名称
					id: '',//id
					imageName: "",//病害图片名称
					imageOriginal: "",//原来图片名称
					imageUrl: "",//病害图片url
					remarks: "",//备注
					routeLine: "",//所属路线
					routeSection: "",//所属路段
					statusCode: "",//状态描述
					isfault:'0',//是否故障
					faultDays:''//故障天数
				},
				src:""
			}
	    },
		onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toVirusDetail', (id) => {
				this.id = id
				this.getVirusInfo()
			})
		},
		computed:{
			captchaSrc(){
				return this.src.replace(/[\r\n]/g, "");
			}
		},
	    methods: {
			// 获取病害信息
			getVirusInfo(){
				this.$http.VirusDetailInfo({id:this.id}).then(res => {
					if(res.code == 200){
						Object.assign(this.form,res.data)
						this.src = res.data.imageUrl
					}
				})
			},
			// 图片加载失败
			imageError(e){
				console.log(e)
				this.src = '/static/imgError.png'
			},
			_previewImage(src){
				let that = this;
				uni.showLoading({
					title:"图片处理中..."
				})
				//src为base64为图片流
				base64ToPath(src).then(path => {
					let imgsArray = [];
					uni.hideLoading()
					imgsArray.push(path);
					uni.previewImage({
						current: 0, 
						urls: imgsArray
					});
				}).catch(error => {
					that.$refs.uToast.show({
						title: '图片加载失败',
						type: 'warning'
					})
					uni.hideLoading()
				})
			}
	    }
	}
</script>

<style scoped>
	.virusDetail /deep/ .u-navbar {
		background: linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))!important;
	}
</style>
