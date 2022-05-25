<template>
	<view class="addProject navbar">
		<u-navbar back-text="返回" back-icon-color="white" :back-text-style="letVal" :title='title' title-color="#ffffff">
			<view class="slot-wrap">
				<view class="rightNav" @click="bridgeListShow = true">
					切换桥梁
					<u-icon name="xuanze" custom-prefix="custom-icon"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="bridgeList">
			<u-select v-model="bridgeListShow" :list="list" :default-value="defaultVal" value-name="bridgeNo" label-name="bridgeName" @confirm="comfirmBridge"></u-select>
		</view>
		<view class="bottomContent">
			<view class="left" :style="{height: scrollHeight}">
				<u-cell-group v-for="(item,index) in menuList" :key="index">
					<u-cell-item :title="item.name" :index="index" @click="clickCell" :style="{'backgroundColor':index == cellVal?'#d1d1d1':'#ffffff'}"></u-cell-item>
				</u-cell-group>
			</view>
			<view class="cards right">
				<rightComponents :menuIndex="cellVal" :menuCode="cellValCode" :menuName="cellValName" :selectList="selectList" :currentBridgeInfo="currentBridgeInfo"></rightComponents>
			</view>
		</view>
	</view>
</template>

<script>
	import rightComponents from './components/rightComponents.vue'
	export default {
		components:{ rightComponents },
		data() {
			return {
				title:'',
				letVal:{
					color:'white'
				},//导航栏左边字体颜色
				scrollHeight:0,
				menuList:[],//左侧菜单列表
				cellVal:0,//选中的菜单索引
				cellValCode:'envTempHumi',//选中的菜单Code
				cellValName:'环境温湿度',//选中的菜单名称
				selectList:[],//截面列表
				bridgeListShow:false,//是否显示多选组件
				defaultVal:[0],//默认桥梁数组索引
				list:[],//桥梁列表
				currentBridgeInfo:{},//选中的桥梁信息
			}
		},
		// 进入页面加载
		onLoad(){
			let barHeight = 0
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('landscape-primary')
			barHeight = plus.navigator.getStatusbarHeight()*plus.screen.scale
			// #endif
			uni.getSystemInfo({
				success:  (res)=> {
					const wid = res.windowWidth
					const hei = res.windowHeight
					// 20是除了可滚动区域外的其它部分占的高度
					this.scrollHeight= wid > hei?hei - barHeight - 20 +'px':wid - barHeight - 20 +'px'
				}
			});
		},
		onUnload(){
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('default')
			// #endif
		},
		created() {
			this.getBridgeName()
		},
		methods: {
			// 获取全部的桥梁列表
			getBridgeName(){
				this.$http.getBridgeName().then(res => {
					if(res.code == 200){
						this.list = res.data
						this.title = this.list.length>0?this.list[0].bridgeName:''
						this.bridgeNo = this.list.length>0?this.list[0].bridgeNo:''
						this.getLeftMenuList()
					}
				})
			},
			// 获取桥梁对应的左侧菜单列表和图片
			getLeftMenuList(){
				this.menuList = []
				let params = {
					appId:'1174270350789906435',
					bridgeNo: this.bridgeNo
				}
				this.$http.getAppLeftMenuList(params).then(res => {
					if(res.code == 200){
						res.data.forEach(val => {
							if(val.code == 'monitor' && val.children.length > 0){
								this.arrForeach(val.children)
							}
						})
						this.getBridgeMonitorSections()
						this.cellVal = 0
						this.cellValCode = this.menuList[0].code
						this.cellValName = this.menuList[0].name
					}
					console.log(this.menuList)
				})
				this.$http.getBridgeInfoForName({bridgeNo: this.bridgeNo}).then(res => {
					if(res.code == 200){
						this.currentBridgeInfo = Object.assign({},res.data.rows[0])
					}
				})
			},
			// 数组递归遍历
			arrForeach(data){
				if(data.length > 0){
					data.forEach(val => {
						if(val.children.length > 0){
							this.arrForeach(val.children)
						}else{
							this.menuList.push({name:val.name,resCode:val.resCode,code:val.code})
						}
					})
				}else{
					this.menuList = []
				}
			},
			// 获取桥梁当前监测项目对应的截面列表
			getBridgeMonitorSections(){
				if(this.menuList.length == 0){
					this.selectList = []
					return
				}
				let params = {
					bridgeResourceId: this.bridgeNo + this.menuList[this.cellVal].resCode,
				}
				this.$http.getBridgeMonitorSections(params).then(res => {
					if(res.code == 200){
						this.selectList = res.data
					}
				})
			},
			// 切换桥梁
			comfirmBridge(e){
				this.title = e[0].label
				this.bridgeNo = e[0].value
				this.cellVal = 0
				this.selectList = []
				let index = this.list.findIndex(val => {
					return val.bridgeNo == e[0].value
				})
				this.defaultVal[0] = index
				this.getLeftMenuList()
			},
			clickCell(e){
				this.cellVal = e
				this.cellValCode = this.menuList[e].code
				this.cellValName = this.menuList[e].name
				this.getBridgeMonitorSections()
			}
		}
	}
</script>

<style scoped>	
	.addProject {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.addProject .slot-wrap {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 12px;
		flex-direction: row-reverse;
	}
	.addProject .bottomContent {
		display: flex;
	}
	.addProject .bottomContent .left {
		width: 130px;
		overflow: scroll;
		/* filter: drop-shadow(0px 0px 3px #333) */
		box-shadow: 1px 1px 1px 0px #1cbbb4;
	}
	.addProject .bottomContent .right {
		flex: 1;
		margin-left: 2px;
	}
	.addProject .cards {
		flex: 1;
		position: relative;
	}
</style>
