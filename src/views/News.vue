<template>
  <!-- <div style="margin:0; padding:0;background:linear-gradient(to right, #bb313e25, #bb313e25, #d7222925, #dd4a1625, #e4761525, #f5c50025, #f0e92725, #b1ce2425, #48a93525, #03944525, #157c4f25, #176a5825, #1b556325, #1d386f25, #1d386f25, #20277825, #52266325, #8a244b25);"> -->
  <div class="root">
    <div class="newsSection">
      <!-- <el-card class="box-card test" shadow="hover">        

          <div slot="header" class="clearfix">
            <span style ="font-size:18px;font-weight: 700;">中国病例最新变化情况</span>
          </div>
          <div class="text item"  >这是新闻1</div>
          <div class="text item"  >这是新闻2</div>
          <div class="text item"  >新闻3</div>
      </el-card>

      <el-card class="box-card test2" shadow="hover">
        <div slot="header" class="clearfix">
          <span style ="font-size:18px;font-weight: 700;">中国疫情防控措施</span>
        </div>
        <news-list></news-list>
      </el-card>

      <el-card class="box-card test3" shadow="hover">
        <div slot="header" class="clearfix">
          <span style ="font-size:18px;font-weight: 700;">国际疫情防控措施</span>
         </div>
          <div class="text item"  >这是新闻1</div>
             <div class="text item"  >这是新闻2</div>
             <div class="text item"  >新闻3</div>
      </el-card> -->
      <NewsList style="width: 30%"/>
    </div>
  </div>
</template>
<script>
import NewsList from '@/components/NewsList.vue';
// import bargraph from "@/components/echart/BarGraph.vue"
//import linechart from "@/components/echart/LineChart.vue"
export default {
  name: "NewsAndNotice",
  components: {
    NewsList
    // bargraph,
    //linechart
  },
  data() {
    return {
         activeName: '1'
    };
  },
}
</script>
<style scoped>
  .root {
    margin-top: 100px;
    display: flex;
    justify-content: center;
  }

  /* .mask {
    backdrop-filter: blur(5px);
    background-color: rgba(255,255,255,0.2);  

    width: 200%;
    height: 200%;
    top: -100px;
    left: -100px;
    position: absolute;
    z-index: -1;
  } */

  .newsSection {
    width: 85%;
    display: flex;
    justify-content: space-around;
  }

  .text {    
    font-size: 14px;
  }

  .item {
    
    padding: 30px 0;
  }

  .box-card {
    border-radius:30px 30px 30px 30px;
    /* border-radius: 4px; */
    width: 480px;
    position: relative;
  }
  .test{
    width: 400px;
    height: 700px;
    background: rgb(250, 222, 213);
    transition: all 0.4s;
    -moz-transition:all .4s;
    -webkit-transition:all .4s;
    -o-transition:all .4s;
    /* background: url(../assets/backgroundImage/news0.jpg); */
    background-repeat:no-repeat;   /* 不会重复 */
    background-position: center;   /* 是为了让图片放大的时候从中部放大，不会偏移 */
    background-size: 100% 100%;
  }
  .test:hover{
    background-size: 110% 110%;
  }
   .test2{
    width: 400px;
    height: 700px;
    background: orange;
    transition: all 0.4s;
    -moz-transition:all .4s;
    -webkit-transition:all .4s;
    -o-transition:all .4s;
    /* background: url(../assets/backgroundImage/news1.jpg); */
    background-repeat:no-repeat;   /* 不会重复 */
    background-position: center;   /* 是为了让图片放大的时候从中部放大，不会偏移 */
    background-size: 100% 100%;
  }
  .test2:hover{
    background-size: 110% 110%;
  }
   .test3{
    width: 400px;
    height: 700px;
    background: orange;
    transition: all 0.4s;
    -moz-transition:all .4s;
    -webkit-transition:all .4s;
    -o-transition:all .4s;
    /* background: url(../assets/backgroundImage/news2.jpg); */
    background-repeat:no-repeat;   /* 不会重复 */
    background-position: center;   /* 是为了让图片放大的时候从中部放大，不会偏移 */
    background-size: 100% 100%;
  }
  .test3:hover{
    background-size: 110% 110%;
  }
  .el-row {
    margin-bottom: 20px;
   
  }
  .el-col {
    border-radius: 4px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
    
  }
  .clearfix:after {
    clear: both
  }
</style>
