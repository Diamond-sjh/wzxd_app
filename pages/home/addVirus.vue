<template>
	<view class="addVirus">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="检测人：" prop="checker" :required="true">
				<u-input v-model="form.checker" placeholder="请输入检测人" />
			</u-form-item>
			<u-form-item label="检测时间：">
				<u-input v-model="form.checkDate" @click="checkDateShow = true" placeholder="请选择检测日期" :disabled="true"/>
				<!-- <u-calendar v-model="checkDateShow" @change="checkDateChange"></u-calendar> -->
			</u-form-item>
			<u-form-item label="里程桩号：" prop="checkNo" :required="true">
				<u-input v-model="form.checkNo" placeholder="请输入里程桩号" />
			</u-form-item>
			<u-form-item label="设施分项：" :required="true">
				<u-input v-model="form.branchName" placeholder="" :disabled="true" />
			</u-form-item>
			<u-form-item label="设备名称：" :required="true">
				<u-input v-model="form.facilitiesName" placeholder="" :disabled="true" />
			</u-form-item>
			<u-form-item label="检查项目：" :required="true" prop="checkItem">
				<u-checkbox-group @change="checkItemChange">
					<u-checkbox 
						v-model="item.checked"
						v-for="(item, index) in checkItemList" :key="index" 
						:name="item.name"
						style="flex: 0 1 auto;"
					>{{item.name}}</u-checkbox>
				</u-checkbox-group>
				<!-- <picker @change="checkItemChange" :value="checkItemIndex" :range="checkItemList" style="width: 100%;">
					<view>{{checkItemList[checkItemIndex]?checkItemList[checkItemIndex]:'请选择'}}</view>
				</picker> -->
			</u-form-item>
			<u-form-item label="病害：">
				<u-checkbox-group @change="checkboxGroupChange">
					<u-checkbox 
						v-model="item.checked"
						v-for="(item, index) in diseaseList" :key="index" 
						:name="item.name"
						style="flex: 0 1 auto;"
					>{{item.name}}</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="病害图片url：">
				<u-upload 
				ref="uUpload" 
				:action="action" 
				:auto-upload="true" 
				max-count="1"
				@on-success="uploadSuccess" >
				</u-upload>
				<!-- <u-input v-model="form.imageUrl" type="select" /> -->
			</u-form-item>
			<u-form-item label="病害图片名称:" label-width="200">
				<u-input v-model="form.imageName" placeholder="" />
			</u-form-item>
			<u-form-item label="状态描述：">
				<u-input 
				v-model="form.statusCode" 
				placeholder="" 
				type="textarea" 
				:auto-height="true" 
				:border="true" />
			</u-form-item>
			<u-form-item label="是否故障：">
				<u-radio-group v-model="form.isfault" @change="radioGroupChange">
					<u-radio 
						v-for="(item, index) in isFaultList" 
						:key="index" 
						:name="item.value"
					>
						{{item.label}}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="故障天数：">
				<u-input v-model="form.faultDays" placeholder="" :border="true" :disabled="faultDay" />
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
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapGetters,mapMutations } from 'vuex'
	export default {
	    data() {
	        return {
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
				updateForm:{},//更新接口的参数
				checkDateShow:false,//是否显示日期组件
				checkItemIndex:0,//选中的检查项目
				// 检查项目列表
				allDataList:[],//所有的检测项目加病害
				checkItemList:[],//检查项目列表
				diseaseList: [],//病害列表
				isFaultList: [{value:'1',label:'是'},{value:'0',label:'否'}],//是否故障
				faultDay:true,//故障天数是否可以输入
				checkDiseaseList:[],
				action: 'http://47.114.76.25:9505/guns-cloud-config/gunscheckRecords/upload',
				timestamp: '',
				rules: {
					checker: [
						{
							required: true,
							message: '请填写检测人',
							trigger: 'blur'
						}
					],
					checkNo: [
						{
							required: true,
							message: '请填写里程桩号',
							trigger: 'blur'
						}
					],
					checkItem: [
						{
							required: true,
							message: '请至少选择一项检查项目',
							trigger: 'blur'
						}
					]
				}
			}
	    },
		computed: {
			...mapGetters(['getCustInfo','getVirusList']),
		},
		// 必须要在onReady生命周期设置验证规则
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			this.timestamp = new Date().getTime()
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('homeIndexToAddVirus', (data) => {
				console.log(data)
				Object.assign(this.form,data)
				// 检测人
				if(this.getCustInfo&&(this.getCustInfo.lastName||this.getCustInfo.firstName)){
					this.form.checker = this.getCustInfo.lastName + this.getCustInfo.firstName
				}
				//检测时间
				this.form.checkDate = this.$utils.getDate(new Date())
				// 获取检测项目  病害 列表
				this.$http.diseaseList({facilitiesNo:data.deviceCode}).then(res=>{
					if(res.code == '200'){
						this.allDataList = res.data
						let list = new Set()
						let list2 = new Set()
						// 检查项目列表
						if(data.checkCode != ''){
							this.checkItemList = [{name:data.checkItem,checked:true}]
						}else{
							this.allDataList.forEach((item)=>{
								list.add(item.checkItem)
							})
							list.forEach(val=>{
								let flag = false
								flag = data.checkItem.split(',').some(item => {
									if(val == item){ return true }
								})
								this.checkItemList.push({name:val,checked:flag})
								
							})
						}
						// 病害列表
						this.allDataList.forEach(val=>{
							let flag = false
							flag = data.diseaseContent.split(',').some(item => {
								if(val.diseaseName == item){ return true }
							})
							list2.add({name:val.diseaseName,checked:flag})
						})
						this.diseaseList.push(...Array.from(list2))
					}
				})
			})
		},
		// 右上角  保存  按钮的点击方法
		onNavigationBarButtonTap() {
			// this.$refs.uUpload.upload()
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			this.$refs.uForm.validate(valid=>{
				if (valid) {
					this.$http.addDisease(this.form).then(res=>{
						if(res.code == '200'){
							// 触发父级页面定义的方法
							eventChannel.emit('updateCurrentInfo', this.form);
							this.$refs.uToast.show({
								title: '保存成功',
								type: 'success',
								back: true
							})
						}else{
							this.$refs.uToast.show({
								title: '保存失败',
								type: 'error'
							})
						}
					}).catch(e=>{
						let virusInfo = {
							timestamp:this.timestamp,
							data: JSON.parse(JSON.stringify(this.form))
						}
						this.SET_VIRUSINFO(virusInfo)
					})
				}
			})
		},
	    methods: {
			...mapMutations(['SET_VIRUSINFO']),
			// 检测时间
			checkDateChange(e){
				this.form.checkDate = e.result
			},
			// 检查项目发生变化
			checkItemChange(e){
				this.form.checkItem = e.join(",")
				return
				this.diseaseList = []
				this.form.checkItem = ''
				this.checkItemIndex = e.detail.value
				this.form.checkItem = this.checkItemList[this.checkItemIndex]
				this.allDataList.forEach(item=>{
					if(item.checkItem == this.form.checkItem){
						this.diseaseList.push({name:item.diseaseName,checked:false})
					}
				})
			},
			// 选中的病害列表
			checkboxGroupChange(e){
				this.form.diseaseContent = e.join(",")
			},
			// 图片上传成功的回调
			uploadSuccess(data, index, lists, name){
				this.form.imageUrl = data.src
			},
			// 是否故障
			radioGroupChange(e){
				if(e==1){
					this.faultDay = false
				}else{
					this.faultDay = true
					this.form.faultDays = ''
				}
			}
	    }
	}
</script>

<style scoped>
	.addVirus {
		padding: 20px;
	}
	.addVirus .u-form .u-form-item{
		padding: 5px 0;
	}
</style>
