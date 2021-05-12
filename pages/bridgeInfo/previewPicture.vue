<template>
	  <!--页面容器-->
	    <div class="index-content" id="my">
	      <div class="banner">
	          <img  v-for="(v,i) in img " :key="i" :src="v" v-show="i==n" style="max-height:800px;"/>   
	          <div class="banner-circle">
	              <ul>
	                  <li  v-for="(v,i) in img " :key="i" :class="i==n ?'selected':''"></li>  
	              </ul> 
	          </div>
	      </div>
		  </div>
</template>
<script>
import picture1 from '../../static/img/erweima/picture1.png'
import picture2 from '../../static/img/erweima/picture2.png'
import picture3 from '../../static/img/erweima/picture3.png'
import picture4 from '../../static/img/erweima/picture4.png'
import picture5 from '../../static/img/erweima/oujiangdaqiao.png'

export default {
  name: 'previewPicture',
  components: {},
  data(){
	  return{
		  img:[picture1,
		      picture2,
		      picture3,
		      picture4,
			  picture5],
		  n:3,
	  }
  },
  created(){    //生命周期  钩子函数   挂载完成
      this.fun();
	  this.play();
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

