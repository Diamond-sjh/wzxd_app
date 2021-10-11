<template>
  <view class="humiture">
		<view class="charts-box">
			<qiun-data-charts type="line" :eopts="ringOpts" :chartData="chartsData" :echartsH5="true" :echartsApp="true"/>
		</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		param:{},
		timer: null,
		chartsData: {},
		ringOpts:{},
		titieAndUnit:{}
    };
  },
	created() {
		// this.getServerData();
		// this.timer = setInterval(this.getServerData,60000)
	},
	methods: {
		getData(params,arg){
			let that = this
			this.param = Object.assign({},params)
			this.titieAndUnit = Object.assign({},arg)
			that.getServerData(that.param)
			this.timer = setInterval(() => {
				that.getServerData(that.param)
			},60000)
		},
		getServerData(stationVal) {
			let data2 = [];
			let data3 = [];
			let unit = this.titieAndUnit.unit.split('||')[0]
			this.$http.structuralTemperature(stationVal).then(res => {
				if(res.code == 200){
					res.data.forEach(val=>{
						data2.push(val.collectTime.split('.')[0].replace(' ', '\n'))
						data3.push(val.temp)
					})
					this.ringOpts = {
						grid: {
							left: 50,
							right: 30,
							bottom: 80
						},
						toolbox: {
							feature: {
								dataZoom: {
									yAxisIndex: 'none'
								},
								restore: {},
								saveAsImage: {}
							}
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'cross',
								animation: false,
								label: {
									backgroundColor: '#505765'
								}
							}
						},
						title:{
							text:this.titieAndUnit.title,
							top:-5,
							left:'center'
						},
						dataZoom: [
							{
								show: true,
								realtime: true,
								start: 0,
								end: 100
							},
							{
								type: 'inside',
								realtime: true,
								start: 65,
								end: 85
							}
						],
						xAxis: [
							{
								type: 'category',
								boundaryGap: false,
								axisLine: {onZero: false},
								data: data2
							}
						],
						yAxis: [
							{
								name: '单位：' + unit,
								type: 'value',
								scale:true,
							}
						],
					  }
					this.chartsData={
						series: [
							{
								name: '',
								type: 'line',
								lineStyle: {
									width: 1
								},
								itemStyle: {
									normal: {
										label: {
											show: false
										}
									}
								},
								emphasis: {
									focus: 'series'
								},
								data: data3
							}
						]
					}
				}
			})
		}
	},
	destroyed() {
		clearInterval(this.timer)
		this.timer = null
		console.log('销毁组件')
	}
};
</script>

<style>
.humiture {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.charts-box {
  width: 100%;
  height: 300px;
}
</style>
