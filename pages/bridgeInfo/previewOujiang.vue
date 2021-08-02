<template>
  <div title="瓯江大桥">
	  <!--页面容器-->
	    <div class="index-content" id="my">
	      <div class="banner">
	          <img  v-for="(v,i) in img " :key="i" :src="v" v-show="i==n" style="min-height: 31.25rem;"/>   
	          <div class="banner-circle">
	              <ul>
	                  <li  v-for="(v,i) in img " :key="i" :class="i==n ?'selected':''"></li>  
	              </ul> 
	          </div>
	      </div>
	  	</div>	
   <div style="border: 1px solid #999999;height: auto;">
   		<h1 style="background-color:seagreen;width: 240px;font-size: 1.875rem;color: #F9F9F9;">瓯江大桥</h1>
<!--  		 <ul style="padding: 2.5rem">
   		  <li style="padding-left: 5px;margin-top: 0.3125rem;margin-bottom: 1.25rem;">
   		  <p style="font-weight: bold;color: seagreen;">桥梁概况</p>
   		  <p style="text-indent: 2em;">
   			  瓯江大桥位于S10（温州绕城）高速公路北线跨瓯江上，西接接仰义枢纽主线桥。瓯江大桥为主跨变截面预应力砼连续箱梁，配跨为75+3×125+75=525米，主跨箱梁采用单箱单室断面，梁底采用二次抛物线。箱梁全宽16.25米，梁底宽8米，两侧悬臂长均为4.125米，中跨跨中高度为3.0米，墩顶支点处梁高为7.2米，边跨支点梁高为3.0米。全桥在15号、20号桥墩处设置320型伸缩缝。
   		  </p>
   		    </li>
   		  <li style="padding-left: 5px;margin-top: 0.9375rem;margin-bottom: 1.25rem;">
   			  <p style="font-weight: bold;color: seagreen;">结构信息</p>
   			  <p style="text-indent: 2em;">
   				  本桥纵断面线形：变坡点K1+744，高程37.885，竖曲线要素：R=12000m，T=333m，E=4.537m，i1=2.0%，i2=-3.5%。
   			  </p>
   		  </li>
   		  <li style="padding-left: 5px;margin-top: 0.9375rem;margin-bottom: 1.25rem;">
   			  <p style="font-weight: bold;color: seagreen;">其他信息</p>
   			  <p style="text-indent: 2em;">
   				  设计荷载：公路-Ⅰ级；
   			  </p>
   			  <p style="text-indent: 2em;">
   			  	  {{'地震动峰值加速度&lt;0.05g。'}}
   			  </p>
   		  </li>
   		</ul> -->
				<u-cell-group>
					<u-cell-item title="桥梁名称:" :arrow="false">{{data.bridgeName}}</u-cell-item>
					<u-cell-item title="路线名称:" :arrow="false">{{data.routeName}}</u-cell-item>
					<u-cell-item title="路线编号:" :arrow="false">{{data.routeNo}}</u-cell-item>
					<u-cell-item title="桥型:" :arrow="false">{{data.bridgeType}}</u-cell-item>
					<u-cell-item title="通车日期:" :arrow="false">{{data.opentrafficDate}}</u-cell-item>
					<u-cell-item title="中心桩号:" :arrow="false">{{data.centerMileage}}</u-cell-item>
					<u-cell-item title="长度(M):" :arrow="false">{{data.bridgeLength}}</u-cell-item>
					<u-cell-item title="管理单位:" :arrow="false">{{data.manageCompany}}</u-cell-item>
					<u-cell-item title="联系电话:" :arrow="false">{{data.managePhone}}</u-cell-item>
					<u-cell-item title="交通运输综合行政执法单位:" :arrow="false">{{data.lawEnforceCompany}}</u-cell-item>
					<u-cell-item title="联系电话:" :arrow="false">{{data.lawEnforcePhone}}</u-cell-item>
					<u-cell-item title="监管单位:" :arrow="false">{{data.superviseCompany}}</u-cell-item>
					<u-cell-item title="联系电话:" :arrow="false">{{data.supervisePhone}}</u-cell-item>
					<u-cell-item title="备注:" :arrow="false">{{data.remarks}}</u-cell-item>
				</u-cell-group>
       </div>
  </div>
</template>

<script>
import banner1 from '../../static/img/erweima/banner1.jpg'
import banner2 from '../../static/img/erweima/banner2.jpg'
import banner3 from '../../static/img/erweima/banner3.jpg'
import banner4 from '../../static/img/erweima/banner4.jpg'
import banner5 from '../../static/img/erweima/banner5.jpg'

export default {
  name: 'app',
  components: {},
  data(){
	  return{
			id:'',
			data:{
				bridgeName:'',
				routeName:'',
				routeNo:'',
				bridgeType:'',
				opentrafficDate:'',
				centerMileage:'',
				bridgeLength:'',
				manageCompany:'',
				managePhone:'',
				lawEnforceCompany:'',
				lawEnforcePhone:'',
				superviseCompany:'',
				supervisePhone:'',
				remarks:''
			},
		  img:[banner1,
		      banner2,
		      banner3,
		      banner4,
		      banner5],
		  n:2,
	  }
  },
	
	onLoad() {
		//获取事件对象
		const eventChannel = this.getOpenerEventChannel()
		// 监听toPictureInfoIndex事件，获取上一页面通过eventChannel传送到当前页面的数据
		eventChannel.on('toPictureInfoIndex', (data) => {
			//data的结构是{id:item.id,bridgeName:item.bridgeName}
			this.id = data.id
		})
	},
	
  created(){    //生命周期  钩子函数   挂载完成
    this.fun();
	  this.play();
		this.getData();
  },
  methods:{
      fun(){
          //setInterval(函数体,时间)
          setInterval(this.play,2000)
      },
      play(){
          this.n++;
          if(this.n == this.img.length){
              this.n = 0;
          }
      },
	getData(){
		//后端接口只能用id来查询
		this.$http.queryBridgeInfoDetail({id:this.id}).then(res =>{
			console.log('res = ',res)
			this.data = res.data
		})
	}
  },
}
</script>

<style scoped>
	*{
	    margin:0;
	    padding:0;
	}
	ul {
	    list-style-type: disc;
	}
	body {
	    font-size: 14px;
	    background: #fff;
	    overflow-y:scroll;
	    overflow-x:hidden;
	}
	html,body {
	    max-width:720px;
	    height:100%;
	    margin:0 auto;
	}
	
	/*index*/
	.index-content .banner {
	    position: relative;
	}
	.index-content .banner .banner-circle {
	    position: absolute;
	    bottom: 5px;
	    left: 0;
	    right: 0;
	    color: #fff;
	}
	.index-content .banner .banner-circle li{
	    display:inline-block;
	    background: rgba(0,0,0,.3);
	    border-radius: 50%;
	    padding:5px;
	    margin:2px;
	}
	.index-content .banner .banner-circle ul {
	    text-align: center;
	}
	.index-content .banner .banner-circle .selected {
	    background: rgba(0,0,0,.8);
	}
	.index-content .banner img {
	    width: 100%;
	    margin: 0;
	    padding: 0;
	}
	/*index-category*/
	.index-content .index-category {
	    margin-top: 5%;
	}
	.index-content .index-category .category {
	    width: 50%;
	    float:left;
	    text-align:center;
	}
	.index-content .index-category .category .iconfont {
	    font-size: 40px;
	    display:inline-block;
	    padding: 10%;
	    border-radius: 50%;
	    color:#fff;
	    border: 3px solid #f9f9f9;
	    box-shadow: 0px 0px 6px rgba(0,0,0,.5);
	}
	.index-content .index-category .category .iconfont{
	    background: #92d85c;
	}
	.index-content .index-category .category:nth-child(2) .iconfont{
	    background: #f60;
	}
	.index-content .index-category .category:nth-child(4) .iconfont{
	    background: #f00;
	}
	.index-content .index-category .category label {
	    display: block;
	    padding: 10% 0;
	    color: #999;
	}
	/*index-category end*/
</style>



