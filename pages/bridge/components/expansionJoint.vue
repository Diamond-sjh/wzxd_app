<template>
  <view class="content">
		<view class="charts-box">
			<qiun-data-charts type="line" :eopts="ringOpts" :chartData="chartsDataPie2" :echartsH5="true" :echartsApp="true"/>
		</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		chartsDataPie2: {},
		ringOpts:{}
    };
  },
  created() {
      this.getServerData();
  },
  methods: {
    getServerData() {
		let data = [],datax = [],dataLegend = [],dataLegendArr = [],datay = [];
		this.$http.expansionJoint({tagCode:''}).then(res => {
			if(res.code == 200){
				data = res.data
				res.data.forEach(val => {
					dataLegend.push(val.tagCode)
					dataLegendArr = [...new Set(dataLegend)]
				})
			}
			if(dataLegendArr.length > 0){
				dataLegendArr.forEach((val,index) => {
					datay.push({
						name: val,
						smooth: true,
						lineStyle: {
							width: 1
						},
						showSymbol:false,
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
						data: []
					})
					console.log(datay)
					data.forEach(valData => {
						if(valData.tagCode == val){
							datay[datay.length-1].data.push(valData.expansion)
							if(index == 0){
								datax.push(valData.collectTime.replace(' ', '\n'))
							}
						}
					})
				})
			}
			console.log(datax,datay)
			this.ringOpts = {
				grid: {
					left: 50,
					right: 30,
					bottom: 80
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
				legend: {
					data: dataLegendArr,
					top: 0
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						axisLine: {onZero: false},
						data: datax
					}
				],
				yAxis: [
					{
						name: '实测伸缩缝宽度',
						type: 'value'
					}
				],
			  }
			this.chartsDataPie2={
				series: datay 
			}
		})
    }
  }
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.charts-box {
  width: 100%;
  height: 300px;
}
</style>
