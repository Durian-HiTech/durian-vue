<template>
  <div style="margin:0; padding:0;background:linear-gradient(to right, #bb313e25, #bb313e25, #d7222925, #dd4a1625, #e4761525, #f5c50025, #f0e92725, #b1ce2425, #48a93525, #03944525, #157c4f25, #176a5825, #1b556325, #1d386f25, #1d386f25, #20277825, #52266325, #8a244b25);">
<!--    <bargraph/>-->
<el-container>
  <el-header>导航栏</el-header>
  <el-main >
<el-row :gutter="10">
  <el-col >
    <div >
      <el-card class="box-card test" shadow="hover">
        <div slot="header" class="clearfix">
          <span style ="font-size:18px;font-weight: 700;">中国病例最新变化情况</span>
         </div>
          <div class="text item"  >这是新闻1</div>
             <div class="text item"  >这是新闻2</div>
             <div class="text item"  >新闻3</div>
          
            
      </el-card>
    </div>
  </el-col>


  
</el-row>


</el-main>
</el-container>
  </div>
</template>
<script>
//import NewsList from '@/components/NewsList.vue';
// import bargraph from "@/components/echart/bar-graph.vue"
//import linechart from "@/components/echart/line_chart.vue"
export default {
  name: "NewsDetails",
  components: {
    //NewsList
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
<style>
  .text {
    
    font-size: 14px;
  }

  .item {
    
    padding: 30px 0;
  }

  .box-card {
    
    align-items: center;
    border-radius: 4px;
    
  }
  .test{
    
    align-items: center;
    width: 1500px;
    height: 700px;
    background: rgb(250, 222, 213);
    transition: all 0.4s;
    -moz-transition:all .4s;
    -webkit-transition:all .4s;
    -o-transition:all .4s;
    background: url(../assets/backgroundImage/news1.jpg);
    background-repeat:no-repeat;   /* 不会重复 */
    background-position: center;   /* 是为了让图片放大的时候从中部放大，不会偏移 */
    background-size: 100% 100%;
  }
  .test:hover{
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
