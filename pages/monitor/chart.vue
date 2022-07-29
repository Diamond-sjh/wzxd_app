<template>
	<view class="chart navbar">
		<u-navbar title="测点详情" title-color="white" back-icon-color="white"></u-navbar>
		<view class="titie">
			<view class="">
				<text>监测项目：</text>
				<text>{{currentItem.parameterName}}</text>
			</view>
			<view class="">
				<text>监测点：</text>
				<text>{{currentItem.testName}}</text>
			</view>
		</view>
		<u-gap height="2" bgColor="#bbb"></u-gap>
		<view class="btns" @click="clickBtn">
			<view :class="currentIndex==0?'btn isCurrent':'btn'" data-index="0">变形曲线</view>
			<view :class="currentIndex==1?'btn isCurrent':'btn'" data-index="1">回归分析</view>
			<view :class="currentIndex==2?'btn isCurrent':'btn'" data-index="2">预警信息</view>
		</view>
		<u-gap height="2" bgColor="#bbb"></u-gap>
		<view class="echartsBox" v-if="currentIndex==0">
			<view class="charts-box" style="border:1px solid pink">
				<echarts :option="optionOne" id="myChart" style="height: 100%"></echarts>
			</view>
			<view class="charts-box" style="border:1px solid skyblue">
				<echarts :option="optionTwo" id="myChart" style="height: 100%"></echarts>
			</view>
		</view>
		<view class="echartsBoxTwo" v-if="currentIndex==1">
			<view class="echartsTitle">
				<picker mode="selector" :value="index" :range="array" @change="bindPickerChange">
					<view class="contentBox">
						<text class="title">回归分析函数选择：</text>
						<view class="content">{{array[index]}}
							<u-icon class="icon" name="arrow-down-fill"></u-icon>
						</view>
					</view>
					
				</picker>
			</view>
			<view class="echartsTitle" v-show="index == 0">
				<text class="title">最高次幂：</text>
				<u-number-box :min="1" :max="10" v-model="value"></u-number-box>
			</view>
			<view class="echartsTitle">
				<text class="title">预测天数：</text>
				<input class="uni-input" type="number" v-model="forecast" placeholder="" />
				<button type="default" size="mini" @tap="reloadThree">重绘</button>
			</view>
			<view class="charts-box">
				<echarts :option="optionThree" id="myChart" style="height: 100%"></echarts>
			</view>
		</view>
		<view class="warnTableBox" v-if="currentIndex == 2">
			<view class="warnTable">
				<uni-table border stripe emptyText="暂无更多数据" >
					<!-- 表头行 -->
					<uni-tr>
						<uni-th width="50" align="center">序号</uni-th>
						<uni-th width="100" align="center">断面</uni-th>
						<uni-th width="80" align="center">点名</uni-th>
						<uni-th width="100" align="center">测量时间</uni-th>
						<uni-th width="50" align="center">速率</uni-th>
						<uni-th width="80" align="center">累计值</uni-th>
						<uni-th width="50" align="center">预警</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item,index) in warnDataList">
						<uni-td align="center">{{index + 1}}</uni-td>
						<uni-td align="center">{{item.monitorSectionNumber}}</uni-td>
						<uni-td align="center">{{item.testName}}</uni-td>
						<uni-td align="center">{{item.startTime}}</uni-td>
						<uni-td align="center">{{item.outShapeRate}}</uni-td>
						<uni-td align="center">{{item.accumulate}}</uni-td>
						<uni-td align="center">
							<template>
								<view class="box red" v-if = "item.warningLevel == 1"></view>
								<view class="box yellow" v-if = "item.warningLevel == 2"></view>
								<view class="box green" v-if = "item.warningLevel == 3"></view>
							</template>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
	</view>
</template>

<script>
	import echarts from '@/components/echarts/echarts.vue';
	var that
	export default {
		// 注册组件
		components: {
			 echarts
		},
		data() {
			return {
				currentItem: {}, //当前的测点信息
				currentIndex: null, //当前所在tab
				optionOne: {},// 单次变形配置参数
				optionTwo: {},// 累计变形配置参数
				optionThree: {},// 回归分析配置参数
				dataList:[],//当前项目当前测点的全量数据
				chartsDataX: [],// 数据X轴时间列表
				lastTimeChangeData: [],//单次变形数据
				firstTimeChangeData: [],//累计变形数据
				regressionChangeData: [],//回归方程展示数据
				chartsDataThree: [],//回归分析数据
				array: ['多项式回归','对数回归','线性回归','指数回归'],//回归分析选项
				index: 2, //回归分析函数 选择的索引值
				forecast: 5,//预测天数
				value: 3,//最高次幂
				warnDataList: [],//预警列表数据
			}
		},
		onLoad() {
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('toChart', (val) => {
				this.currentItem = Object.assign({}, val)
				console.log(this.currentItem)
				const res = uni.getStorageSync('allMonitor_key')
				let data = [];
				let data2 = [];
				let data3 = [];
				let data4 = [];
				let data5 = [];
				if(res){
					res.forEach((item,index) => {
						// 筛选对应项目id的
						if(item.projectId == this.currentItem.projectId && item.detectionStation == this.currentItem.detectionStation && item.parameterName == this.currentItem.parameterName && item.testName == this.currentItem.testName){
							
							data.push(item)
							data2.push(item.testDate)
							data3.push(Number(item.lastTimeChange))
							data4.push(Number(item.firstTimeChange))
						}
					})
					JSON.parse(JSON.stringify(data4)).forEach((item,index) => {
						if(item > 0){
							data5.push([index+1 , item])
						}
					})
					this.dataList = data
					this.chartsDataX = data2
					this.lastTimeChangeData = data3
					this.firstTimeChangeData = data4
					this.chartsDataThree = data5
					this.regressionChangeData = data5.slice(0,this.forecast)
					this.$nextTick(()=>{
						this.logstatrtOne()
						this.logstatrtTwo()
						this.logstatrtThree()
						this.getData()
						this.currentIndex = 0
					})
				}else{
					console.log(res)
				}
			})
			that = this
		},
		methods: {
			// 查询预警数据
			getData(){
				this.warnDataList = []
				let params = {
					projectId: this.currentItem.projectId,
					monitorSectionNumber: this.currentItem.detectionStation,
					testItems: this.currentItem.parameterName,
					pointPosition:this.currentItem.testName
				}
				this.$httpMonitor.queryStatistics(params).then(res => {
					if(res.code == 200){
						res.rows.some(val => {
							this.$httpMonitor.selectWarnList({wsId:val.id}).then(res => {
								if(res.code == 200){
									if(res.data.length > 0){
										return this.warnDataList = res.data.length > 0?res.data:this.warnDataList
									}
								}
							})
						})
					}
				})
			},
			// 切换tab
			clickBtn(e) {
				this.currentIndex = e.target.dataset.index
			},
			// 切换回归方程
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			logstatrtOne() {
				// console.log('初次调用');
				this.optionOne = {
					notMerge: true,
					backgroundColor: "#F8FAFF",
					title: {
					    text: '单次变形曲线',
					    left: 'center'
					},
					tooltip: {
					    trigger: 'axis',
					    axisPointer: {
					      animation: false
					    }
					},
					dataZoom: [
					    {
							show: true,
							realtime: true,
							start: 0,
							end: 100,
							xAxisIndex: [0, 1]
					    },
					    {
							type: 'inside',
							realtime: true,
							start: 0,
							end: 100,
							xAxisIndex: [0, 1]
					    }
					],
					xAxis: {
					    type: 'category',
						boundaryGap: false,
						axisLine: {onZero: false},
					    data: this.chartsDataX
					},
					yAxis: {
					    type: 'value',
						name: '单次变形(mm)'
					},
					series: [
					    {
							data: this.lastTimeChangeData,
							name: '单次变形',
							type: 'line'
					    }
					]
				};
			}, 
			logstatrtTwo() {
				// console.log('初次调用');
				this.optionTwo = {
					notMerge: true,
					backgroundColor: "#F8FAFF",
					title: {
					    text: '累计变形曲线',
					    left: 'center'
					},
					tooltip: {
					    trigger: 'axis',
					    axisPointer: {
					      animation: false
					    }
					},
					dataZoom: [
					    {
							show: true,
							realtime: true,
							start: 0,
							end: 100,
							xAxisIndex: [0, 1]
					    },
					    {
							type: 'inside',
							realtime: true,
							start: 0,
							end: 100,
							xAxisIndex: [0, 1]
					    }
					],
					xAxis: {
					    type: 'category',
						boundaryGap: false,
						axisLine: {onZero: false},
					    data: this.chartsDataX
					},
					yAxis: {
					    type: 'value',
						name: '累计变形(mm)'
					},
					series: [
					    {
							data: this.firstTimeChangeData,
							name: '累计变形',
							type: 'line'
					    }
					]
				};
			}, 
			logstatrtThree() {
				// console.log('初次调用');
				this.optionThree = {
					notMerge: true,
					backgroundColor: "#F8FAFF",
					dataset: [
					    {
							source: this.regressionChangeData
					    },
					    {
							transform: {
								type: 'ecStat:regression',
								config: { method: 'linear', formulaOn: 'end' }
							}
					    }
					],
					legend: {
						show: false,
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					xAxis: {
						splitLine: {
							lineStyle: {
								type: 'dashed'
							}
						},
						splitNumber: 5
					},
					yAxis: {
						min: -40,
						splitLine: {
							lineStyle: {
								type: 'dashed'
							}
						}
					},
					series: [
					    {
							name: '累计变形',
							type: 'scatter'
					    },
					    {
					      name: '累计变形',
					      type: 'line',
					      smooth: true,
					      datasetIndex: 1,
					      symbolSize: 0.1,
					      symbol: 'circle',
					      label: { show: true, fontSize: 16 },
					      labelLayout: { 
							x: '50%',
							y: '50',
							verticalAlign: 'middle',
							align: 'center',
							draggable: true
						  },
					      encode: { label: 2, tooltip: 1 }
					    }
					]
				};
			}, 
			reloadThree(){
				let index = this.index
				this.regressionChangeData = this.chartsDataThree.slice(0,this.forecast)
				console.log(this.regressionChangeData)
				// 多项式回归
				if(index == 0){
					this.optionThree.dataset = [
						{
							source: this.regressionChangeData
						},
						{
							transform: {
								type: 'ecStat:regression',
								config: { method: 'polynomial', order: this.value }
							}
						}
					]
					return
				}
				// 对数回归
				if(index == 1){
					this.optionThree.dataset = [
						{
							source: this.regressionChangeData
						},
						{
							transform: {
								type: 'ecStat:regression',
								config: { method: 'logarithmic' }
							}
						}
					]
					return
				}
				// 线性回归
				if(index == 2){
					this.optionThree.dataset = [
						{
							source: this.regressionChangeData
						},
						{
							transform: {
								type: 'ecStat:regression',
								config: { method: 'linear', formulaOn: 'end' }
							}
						}
					]
					return
				}
				// 指数回归
				if(index == 3){
					this.optionThree.dataset = [
						{
							source: this.regressionChangeData
						},
						{
							transform: {
								type: 'ecStat:regression',
								config: { method: 'exponential',formulaOn: 'start' }
							}
						}
					]
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.chart {
		/* #ifdef H5 */
		height: calc(100vh - var(--window-bottom) - var(--window-top));
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		.title {
		}
		.btns {
			display: flex;
			.btn {
				flex: 1;
				text-align: center;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 20px;
				border-left: 1px solid #cccccc;

				&:last-child {
					border-right: 1px solid #cccccc;
				}

				&.isCurrent {
					background-color: aquamarine;
				}
			}
		}
		.echartsBox {
			flex: 1;
			border: 1px solid #cccccc;
			.charts-box {
				width: 100%;
				height: 50%;
			}
		}
		.echartsBoxTwo {
			flex: 1;
			// margin-top: 20rpx;
			overflow: auto;//BFC
			.echartsTitle {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				.contentBox {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.content {
						padding: 6rpx;
						border: 1px solid #cccccc;
						margin-right: 10rpx;
						.icon {
							padding-left: 20rpx;
						}
					}
				}
				.uni-input {
					border: 1px solid #cccccc;
					text-align: center;
				}
			}
			.charts-box {
				width: 100%;
				height: calc(100% - 240rpx)
			}
		}
		.warnTableBox {
			flex: 1;
			overflow: auto;//BFC
			.warnTable {
				margin-top: 20rpx;
				.box {
					width: 30px;
					height: 20px;
					margin: 0 auto;
					&.red {
						background-color:red;
					}
					&.yellow {
						background-color:yellow;
					}
					&.green {
						background-color:green;
					}
				}
			}
		}
	}
</style>
