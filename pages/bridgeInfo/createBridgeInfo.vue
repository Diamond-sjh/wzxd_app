<template>
	<div id="qrCode" ref="qrCodeDiv">
		<view class="updateAndAdd">
		    <u-form :model="form" ref="uForm" label-width="150">
				<u-form-item label="桥梁名称：" prop="bridgeName" :required="true">
					<u-input v-model="form.bridgeName" placeholder="请输入桥梁名称" />
				</u-form-item>
				<u-form-item label="路线名称：" prop="routeName" :required="true">
					<u-input v-model="form.routeName" placeholder="请输入路线名称" />
				</u-form-item>
				<u-form-item label="路线编号：" prop="routeNo" :required="true">
					<u-input v-model="form.routeNo" placeholder="请输入路线编号" />
				</u-form-item>
				<u-form-item label="桥型:" prop="bridgeType">
					<u-input v-model="form.bridgeType" type="select" placeholder="请选择桥型"
						 	 @click="show1 = true"></u-input>
					<u-select v-model="show1" :list="bridgeTypeList" @confirm="confirm"></u-select>
				</u-form-item>
				<u-form-item label="通车日期：" prop="opentrafficDate">
					<u-input v-model="form.opentrafficDate" type="select" placeholder="请选择日期" 
					@click="show2 = true"></u-input>
		            <u-picker v-model="show2" mode="time" @confirm="confirm"></u-picker>
				</u-form-item>
				<u-form-item label="中心桩号：">
					<u-input v-model="form.centerMileage" placeholder="请输入中心桩号" />
				</u-form-item>
				<u-form-item label="长度(m)：">
					<u-input v-model="form.bridgeLength" placeholder="请输入长度(m)" />
				</u-form-item>
				<u-form-item label="管理单位：">
					<u-input v-model="form.manageCompany" placeholder="请输入管理单位" />
				</u-form-item>
				<u-form-item label="联系电话：">
					<u-input v-model="form.managePhone" placeholder="请输入联系电话" />
				</u-form-item>
				<u-form-item label="交通运输综合行政执法单位：">
					<u-input v-model="form.lawEnforceCompany"/>
				</u-form-item>
				<u-form-item label="联系电话：">
					<u-input v-model="form.lawEnforcePhone" placeholder="请输入联系电话" />
				</u-form-item>
				<u-form-item label="监管单位：">
					<u-input v-model="form.superviseCompany" placeholder="请输入监管单位" />
				</u-form-item>
				<u-form-item label="联系电话：">
					<u-input v-model="form.supervisePhone" placeholder="请输入联系电话" />
				</u-form-item>
				<u-form-item label="上传桥梁信息图片：">
					<u-upload 
					ref="uUpload" 
					:action="action" 
					:auto-upload="true" 
					max-count="1"
					@on-success="uploadSuccess" >
					</u-upload>
				</u-form-item>
				<u-form-item label="备注：">
					<u-input 
					v-model="form.remarks" 
					placeholder="" 
					type="textarea" 
					:auto-height="true" 
					:border="true"/>
				</u-form-item>
			</u-form>
			<view class="btns">
				<u-button type="success" size="medium" @click="clickAdd">新增</u-button>
				<u-button type="warning" size="medium" style="margin-left: 3px;" @click="generateQrCode">生成二维码</u-button>
			</view>
			<u-toast ref="uToast" />
		</view>
	</div>
</template>

<script>
	import QRCode from 'qrcodejs2';
	export default {
		data() {
			return {
				// 头部导航栏
				letVal:{
					color:'white'
				},//导航栏左边字体颜色
				opentrafficDateShow:false,
				show1:false,
				show2:false,
				form:{
					bridgeName: "",//桥梁名称
					routeName: "",//路线名称
					routeNo: "",//路线编号
					bridgeType:'',//桥型
					opentrafficDate:'',//通车日期
					centerMileage: "",//中心桩号
					bridgeLength:"",//长度(m)
					manageCompany: "",//管理单位
					managePhone: "",//管理单位联系电话
					lawEnforceCompany: "",//交通运输综合行政执法单位
					lawEnforcePhone: "",//执法单位联系电话
					superviseCompany: "",//监管单位
					supervisePhone: "",//监管单位联系电话
					bridgePicturesUrl: "",//桥梁信息图片上传
					remarks: "",//备注
				},
				bridgeTypeList:[
					{
						value: '1',
						label: '简支梁桥'
					},
					{
						value: '2',
						label: '悬臂梁桥'
					},
					{
						value: '3',
						label: '拱桥(三铰、两铰、无铰)'
					},
					{
						value: '4',
						label: '刚架桥(门式、斜腿)'
					},
					{
						value: '5',
						label: '刚构桥(T形、连续)'
					},
					{
						value: '6',
						label: '斜拉桥'
					},
					{
						value: '7',
						label: '悬索桥'
					}
				],
				//更新接口的参数
				action: 'http://47.114.76.25:9505/guns-cloud-config/bridgeQrcodeInfo/add',
				timestamp: '',
				rules: {
					bridgeName: [
						{
							required: true,
							message: '请填写桥梁名称',
							trigger: 'blur'
						}
					],
					routeName: [
						{
							required: true,
							message: '请填写路线名称',
							trigger: 'blur'
						}
					],
					routeNo: [
						{
							required: true,
							message: '请填写路线编号',
							trigger: 'blur'
						}
					]
				}
			};
		},
		// 必须要在onReady生命周期设置验证规则
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toEditAndAdd', (data) => {
				console.log(data)
				Object.assign(this.form,data)
				console.log(this.form)
			})
		},
		methods: {
			// 1.点击新增按钮
			clickAdd(){	
				const eventChannel = this.getOpenerEventChannel()
				let params = {
					bridgeName:this.form.bridgeName,
					routeName: this.form.routeName,
					routeNo: this.form.routeNo,
					bridgeType: this.form.bridgeType,
					opentrafficDate: this.form.opentrafficDate,
					centerMileage: this.form.centerMileage,
					bridgeLength: this.form.bridgeLength,
					manageCompany: this.form.manageCompany,
					managePhone:this.form.managePhone,
					lawEnforceCompany: this.form.lawEnforceCompany,
					lawEnforcePhone: this.form.lawEnforcePhone,
					superviseCompany: this.form.superviseCompany,
					supervisePhone: this.form.supervisePhone,
					bridgePicturesUrl: this.form.bridgePicturesUrl,
					remarks: this.form.remarks
				}
				console.log(params)
				let addParams = JSON.parse(JSON.stringify(params))
				addParams.state = '0'
				this.$http.addBridgeInfo(addParams).then(res=>{
					if(res.code == '200'){
						// 触发父级页面定义的方法
						eventChannel.emit('formEditAndAdd', {val:'add'});
						uni.navigateBack({
						    delta: 1
						});
					}else{
						this.$refs.uToast.show({
							title: '新增失败',
							type: 'error'
						})
					}
				})
			},
			// 2.图片上传成功的回调
			uploadSuccess(data, index, lists, name){
				this.form.bridgePicturesUrl = data.src
			},
			// 3.生成二维码
			generateQrCode(){
				new QRCode(this.$refs.qrCodeDiv, {
				  text: 'http://47.114.76.25/img/banner1.e50f7eae.jpg',
				  width: 200,
				  height: 200,
				  colorDark: "#333333", //二维码颜色
				  colorLight: "#ffffff", //二维码背景色
				  correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
				})	
			},
			// 4.注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
			confirm(e) {
				console.log(e)
				if(e.timestamp!=null){
					this.form.opentrafficDate = e.year+'-'+e.month+'-'+e.day;
					console.log(this.form.opentrafficDate)
					this.show1=false;
				}else{
					this.form.bridgeType = e[0].label;
					console.log(this.form.bridgeType)
					this.show2=false;
				}
			}
		
		}
	};
</script>

<style>
	.updateAndAdd {
		padding: 10px;
	}
	.updateAndAdd /deep/ .u-navbar {
		background: linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))!important;;
	}
	.updateAndAdd .btns{
		display: flex;
	}
</style>
