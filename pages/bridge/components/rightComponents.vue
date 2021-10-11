<template>
	<view class="first">
		<view class="top" ref="imgBox">
			<view class="picBox">
				<u-image width="100%" mode="aspectFit" height="100%" :src="imgUrl"></u-image>
			</view>
			<view class="sign" ref="red" :style="{left:signLeft,top:signTop}">
				<u-image width="100%" mode="aspectFit" height="100%" src="../../../static/red.png"></u-image>
			</view>
			<view class="station" ref="station" v-for="(item,index) in stationArr" :index="index" :style="{left:item.style.left,top:item.style.top}">
				<text @click="queryData(item)">{{item.testNo}}</text>
			</view>
			<view class="selectList">
				<u-input @click="selectListShow = true" type="select" :value="selectVal" />
				<u-select v-model="selectListShow" :list="selectList" :default-value="defaultVal" value-name="monitorId" label-name="section" @confirm="comfirmBridge"></u-select>
			</view>
		</view>
		<!-- 环境温湿度 -->
		<view class="bottom" v-if="menuCode == 'envTempHumi'">
			<humiture ref="humiture"></humiture>
		</view>
		<!-- 风速风向 -->
		<view class="bottom" v-if="menuCode == 'windSpeedDriection'">
			<windLoad ref="windLoad"></windLoad>
		</view>
		
		<!-- 地震监测 -->
		<view class="bottom" v-if="menuCode == 'earthquake'&&currentBridgeInfo.databaseName != 'monitor_aojiang_bridge'">
			<earthquake ref="earthquake"></earthquake>
		</view>
		<!-- 地震监测 -->
		<view class="bottom" v-if="menuCode == 'earthquake'&&currentBridgeInfo.databaseName == 'monitor_aojiang_bridge'">
			<earthquakeAJ ref="earthquakeAJ"></earthquakeAJ>
		</view>
		<!-- 钢箱梁温湿度 -->
		<view class="bottom" v-if="menuCode == 'teelBoxHumiture'">
			<steelModule ref="steelModule"></steelModule>
		</view>
		
		
		
		<!-- 梁体振动监测 -->
		<view class="bottom" v-if="menuCode == 'beamVibration'">
			<beamVibration ref="beamVibration"></beamVibration>
		</view>
		<!-- 索力监测 -->
		<view class="bottom" v-if="menuCode == 'stayCableSoly'">
			<cableForce ref="cableForce"></cableForce>
		</view>
		<!-- 结构应变 -->
		<view class="bottom" v-if="menuCode == 'structuralStrain'">
			<structuralStrain ref="structuralStrain"></structuralStrain>
		</view>
		<!-- 结构振动 -->
		<view class="bottom" v-if="menuCode == 'structuralVibration'">
			<structuralVibration ref="structuralVibration"></structuralVibration>
		</view>
		<!-- 结构温度 -->
		<view class="bottom" v-if="menuCode == 'structureTemp'">
			<structuralTemperature ref="structuralTemperature"></structuralTemperature>
		</view>
		<!-- 伸缩缝 -->
		<view class="bottom" v-if="menuCode == 'expansionJoint'">
			<expansionJoint ref="expansionJoint"></expansionJoint>
		</view>
		<!-- 裂缝宽度 -->
		<view class="bottom" v-if="menuCode == 'crackWidth'">
			<crackWidth ref="crackWidth"></crackWidth>
		</view>
		<!-- 主梁挠度 -->
		<view class="bottom" v-if="menuCode == 'deflection'">
			<girder ref="girder"></girder>
		</view>
		<!-- 空间变位（倾斜） -->
		<view class="bottom" v-if="menuCode == 'towerTopIncidence'">
			<towerTopIncidence ref="towerTopIncidence"></towerTopIncidence>
		</view>
		<!-- 空间变位（位移） -->
		<view class="bottom" v-if="menuCode == 'gnss'">
			<alterLocation ref="alterLocation"></alterLocation>
		</view>
		<!-- 主梁位移 -->
		<view class="bottom" v-if="menuCode == 'displacement'">
			<girderOffset ref="girderOffset"></girderOffset>
		</view>
		
		
		<!-- 车速 -->
		<view class="bottom" v-if="menuCode == 'carSpeed'">
			<speed ref="speed"></speed>
		</view>
		<!-- 轴数 -->
		<view class="bottom" v-if="menuCode == 'axleMonitor'">
			<axles ref="axles"></axles>
		</view>
		<!-- 总重 -->
		<view class="bottom" v-if="menuCode == 'weightMonitor'">
			<totalWeight ref="totalWeight"></totalWeight>
		</view>
	</view>
</template>

<script>
	import humiture from './humiture.vue'	//环境温湿度
	import windLoad from './windLoad.vue'	//风速风向
	import earthquake from './earthquake.vue'	// 地震监测
	import earthquakeAJ from './earthquakeAJ.vue'	// 地震监测
	import steelModule from './steelModule.vue'	// 钢箱梁温湿度
	
	import beamVibration from './beamVibration.vue'	//梁体振动监测 
	import cableForce from './cableForce.vue'	//索力检测 
	import structuralStrain from './structuralStrain.vue'	//结构应变
	import structuralVibration from './structuralVibration.vue'	//结构振动
	import structuralTemperature from './structuralTemperature.vue'	//结构温度
	import crackWidth from './crackWidth.vue'	//裂缝宽度
	import girder from './girder.vue'	//主梁挠度
	import expansionJoint from './expansionJoint.vue'	//主梁伸缩缝
	import towerTopIncidence  from './towerTopIncidence.vue'	//空间变位
	import alterLocation  from './alterLocation .vue'	//空间变位
	import girderOffset from './girderOffset.vue'	//主梁位移
	
	import totalWeight from './totalWeight.vue'	//总重
	import speed from './speed.vue'	// 车速
	import axles from './axles.vue'	// 轴数
	
	export default {
		components:{ 
			windLoad,
			humiture,
			earthquake,
			earthquakeAJ,
			steelModule,
			beamVibration,
			cableForce,
			expansionJoint,
			crackWidth,
			structuralStrain,
			structuralTemperature,
			structuralVibration,
			girder,
			towerTopIncidence,
			alterLocation,
			girderOffset,
			speed,
			axles,
			totalWeight
		},
		props:{
			// 选中的左侧菜单索引
			menuCode:{
				type:String,
				default:'envTempHumi'
			},
			// 选中的左侧菜单名称
			menuName:{
				type:String,
				default:'环境温湿度'
			},
			// 截面列表
			selectList:{
				type:Array,
				default:[]
			},
			// 选中的桥梁信息
			currentBridgeInfo:{
				type:Object,
				default:{}
			}
		},
	    data() {
	        return {
				imgUrl:'',//桥梁图片url
				selectListShow:false,//截面列表
				selectVal:'',//选中的截面的值
				monitorId:'',//选中的截面的monitorId
				defaultVal:[0],
				imgBoxWidth:null,
				imgBoxHeight:null,
				xScale:1,//宽度缩放比例
				yScale:1,//高度缩放比例
				selectionX:0,//截面点x轴位置
				selectionY:0,//截面点y轴位置
				stationArr:[],//测点坐标数组
				signLeft:0,
				signTop:0,
				testNo:'',
				testLocation:'',
				unit:''
			}
	    },
		created() {
			this.selectVal = this.selectList.length > 0?this.selectList[0].section:''
			this.monitorId = this.selectList.length > 0?this.selectList[0].monitorId:''
		},
		watch: {
			selectList(newValue, oldValue) {
				if(newValue && newValue.length > 0){
					this.selectVal = newValue[0].section
					this.monitorId = newValue[0].monitorId
					this.defaultVal = [0]
					this.queryListSections()
				}else{
					this.stationArr = []
					this.selectVal = ''
					this.monitorId = ''
				}
			},
			currentBridgeInfo:{
				handler(newVal,oldVal){
					console.log(newVal)
					this.queryListSections()
				},
				deep:true,
			}
		},
		mounted() {
			let info = uni.createSelectorQuery().in(this)
			info.select(".top").boundingClientRect(data => {
				this.imgBoxWidth = data.width
				this.imgBoxHeight = data.height
				this.queryListSections()
			}).exec()
		},
	    methods: {
			// 根据截面获取对应的测点
			queryListSections(){
				if(!this.monitorId){
					this.stationArr = []
					return
				}
				let params = {
					monitorSectionId:this.monitorId
				}
				this.$http.queryListSections(params).then(res => {
					this.testNo = res.data[0].testNo
					this.testLocation = res.data[0].testLocation
					this.unit = res.data[0].unit
					let wh //桥梁图片的宽高
					let pictureSideType = res.data[0].pictureSideType  // 所需要展示的桥梁图片类型
					this.imgUrl = 'https://wzxd-bridge-tunnel.oss-cn-hangzhou.aliyuncs.com/' + this.currentBridgeInfo[pictureSideType]
					// 计算截面坐标点的位置
					let x = res.data[0].pictureMainPosition.split(',')[0] //截面点坐标X轴位置（原比例）
					let y = res.data[0].pictureMainPosition.split(',')[1]//截面点坐标Y轴位置（原比例）
					let yxScale = y/x //原比例坐标Y/X比例
					if(pictureSideType == 'pictureMain'){
						wh = this.currentBridgeInfo.pictureMainWh.split(',') //所展示图片的大小（wdith,height）
					}else if(pictureSideType == 'pictureSide'){
						wh = this.currentBridgeInfo.pictureSideWh.split(',')//所展示图片的大小（wdith,height）
					}else{
						wh = this.currentBridgeInfo.pictureAssistantWh.split(',')//所展示图片的大小（wdith,height）
					}
					let w = wh[0]//所展示图片的宽度（wdith）
					let h = wh[1]//所展示图片的高度（height）
					let whScale = w/h //原图片大小的宽高比
					let boxwhScale = this.imgBoxWidth/this.imgBoxHeight //图片盒子的宽高比
					this.xScale = this.imgBoxWidth/w //宽度缩放比例（现盒子宽/原图片宽）
					this.yScale = this.imgBoxHeight/h //高度缩放比例（现盒子高/原图片高）
					let countH,excessH,countW,excessW
					if(whScale > boxwhScale){
						countH = this.xScale * h //现盒子里面图片的高度
						excessH = (this.imgBoxHeight - countH) / 2 //未撑满部分盒子高度的一半					
						this.selectionX = this.xScale * x //现坐标点X
						this.selectionY = yxScale * this.selectionX + excessH//现坐标点Y
					}else{
						countW = this.yScale * w //现盒子里面图片的宽度
						excessW = (this.imgBoxWidth - countW) / 2 //未撑满部分盒子宽度的一半	
						this.selectionY = this.yScale * y//现坐标点Y
						this.selectionX = this.selectionY / yxScale + excessW //现坐标点XcessH
					}
					this.signLeft = this.selectionX + 'px'
					this.signTop = this.selectionY + 'px'
					// 计算测点的位置
					this.stationArr = []
					res.data.forEach(valData => {
						let stationX = valData.pictureSidePosition.split(',')[0]
						let stationY = valData.pictureSidePosition.split(',')[1]
						let station = stationY/stationX
						let style = {}
						if(whScale > boxwhScale){
							style = {
								left:this.xScale * stationX + 'px',
								top:station * this.xScale * stationX + excessH + 'px'
							}
						}else{
							style = {
								top:this.yScale * stationY + 'px',
								left:(this.yScale * stationY) / station + excessW + 'px',
							}
						}
						this.stationArr.push({
							style:style,
							tabId:valData.tabId,
							testNo:valData.testNo,
							tableName:valData.tableName,
							sn:valData.sn,
							bridgeNo:valData.bridgeNo
						})
					})
					this.queryData(this.stationArr[0],)
				})
			},
			// 根据测点去时序数据库查询测点信息
			queryData(dataVal){
				let tableName = ''
				if(this.menuCode == 'earthquake'){
					if(this.currentBridgeInfo.databaseName == 'monitor_aojiang_bridge'){
						tableName = "stb_earthquake"
					}else{
						tableName = dataVal.tableNameVal=='earthquake_y1'?'stb_earthquake_y':dataVal.tableNameVal=='earthquake_z1'?'stb_earthquake_z':'stb_earthquake_x'
					}
				}
				let param = {
					databases:this.currentBridgeInfo.databaseName,
					monitorItem:this.menuName=="地震或船撞监测"?'地震监测':this.menuName,
					tabId:dataVal.tabId,
					tableName:tableName,
					bridgeNo:dataVal.bridgeNo
				}
				if(this.currentBridgeInfo.databaseName == 'monitor_oujiang_bridge'){
					param.sid = dataVal.sn
				}
				let paramTwo = {
					title:dataVal.testNo?dataVal.testNo + this.testLocation:this.testNo + this.testLocation,
					unit:this.unit
				}
				// 环境温湿度
				if(this.menuCode == 'envTempHumi'){
					this.$refs.humiture.getData(param,paramTwo)
					return
				}
				// 风速风向
				if(this.menuCode == 'windSpeedDriection'){
					this.$refs.windLoad.getData(param,paramTwo)
					return
				}
				// 地震监测
				if(this.menuCode == 'earthquake'){
					if(this.currentBridgeInfo.databaseName == 'monitor_aojiang_bridge'){
						this.$refs.earthquakeAJ.getData(param,paramTwo)
						return
					}
					this.$refs.earthquake.getData(param,paramTwo)
					return
				}
				// 钢箱梁温湿度
				if(this.menuCode == 'teelBoxHumiture'){
					this.$refs.steelModule.getData(param,paramTwo)
					return
				}
				
				// 梁体振动监测
				if(this.menuCode == 'beamVibration'){
					this.$refs.beamVibration.getData(param,paramTwo)
					return
				}
				// 索力监测
				if(this.menuCode == 'stayCableSoly'){
					this.$refs.cableForce.getData(param,paramTwo)
					return
				}
				// 结构应变 
				if(this.menuCode == 'structuralStrain'){
					this.$refs.structuralStrain.getData(param,paramTwo)
					return
				}
				// 结构振动
				if(this.menuCode == 'structuralVibration'){
					this.$refs.structuralVibration.getData(param,paramTwo)
					return
				}
				// 结构温度
				if(this.menuCode == "structureTemp"){
					this.$refs.structuralTemperature.getData(param,paramTwo)
					return
				}
				// 伸缩缝
				if(this.menuCode == "expansionJoint"){
					this.$refs.expansionJoint.getData(param,paramTwo)
					return
				}
				// 裂缝宽度
				if(this.menuCode == "crackWidth"){
					this.$refs.crackWidth.getData(param,paramTwo)
					return
				}
				// 主梁挠度
				if(this.menuCode == "deflection"){
					this.$refs.girder.getData(param,paramTwo)
					return
				}
				// 空间变位
				if(this.menuCode == "gnss"){
					this.$refs.alterLocation.getData(param,paramTwo)
					return
				}
				// 空间变位
				if(this.menuCode == "towerTopIncidence"){
					this.$refs.towerTopIncidence.getData(param,paramTwo)
					return
				}
				// 主梁位移
				if(this.menuCode == "displacement"){
					this.$refs.girderOffset.getData(param,paramTwo)
					return
				}
				
				// 车速
				if(this.menuCode == "carSpeed"){
					this.$refs.speed.getData(param,paramTwo)
					return
				}
				// 轴数
				if(this.menuCode == "axleMonitor"){
					this.$refs.axles.getData(param,paramTwo)
					return
				}
				// 重量
				if(this.menuCode == "weightMonitor"){
					this.$refs.totalWeight.getData(param,paramTwo)
					return
				}
			},
			// 切换截面
			comfirmBridge(e){
				this.selectVal = e[0].label
				this.monitorId = e[0].value
				let index = this.selectList.findIndex(val => {
					return val.monitorId == e[0].value
				})
				this.defaultVal[0] = index
				this.queryListSections()
			},
	    }
	}
</script>

<style scoped>
	.first{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.first .top {
		flex: 1;
		/* height: 50%; */
		box-shadow: 0px 2px 3px 1px #92ceb0;
		background: url(../../../static/bridge/background.png);
		position: relative;
	}
	.first .top .picBox{
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
	.first .top .selectList{
		position: absolute;
		left: 10px;
		top: 10px;
		padding: 0 10px;
		background-color: #00c0eb;
		border-radius: 4px;
	}
	.first .top .sign{
		position: absolute;
		width: 20px;
		height: 20px;
		left: 0;
		top: 0;
	}
	.first .top .station{
		position: absolute;
		left: 0;
		top: 0;
		color: #ffffff;
	}
	.first .bottom {
		margin-top: 5px;
		flex: 1;
		/* height: 50%; */
		box-shadow: 0px 2px 3px 1px #8dc63f;
		display: flex;
		align-items: center;
	}
	.first .bottom .left{
		flex: 1;
	}
	.first .bottom .right{
		flex: 1;
	}
</style>
