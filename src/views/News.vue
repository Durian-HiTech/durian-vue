<template>
  <div >
<!--    <bargraph/>-->
<el-container>
  <el-header>导航栏</el-header>
  <el-main >
<el-row :gutter="10">
  <el-col :span="8">
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
  <el-col :span="8">
    <div >
      <el-card class="box-card test2" shadow="hover">
        <div slot="header" class="clearfix">
          <span style ="font-size:18px;font-weight: 700;">中国疫情防控措施</span>
         </div>
          <news-list></news-list>

          
            
      </el-card>
    </div>
  </el-col>
  <el-col :span="8">
    <div >
      <el-card class="box-card test3" shadow="hover">
        <div slot="header" class="clearfix">
          <span style ="font-size:18px;font-weight: 700;">国际疫情防控措施</span>
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
import NewsList from '@/components/NewsList.vue';
// import bargraph from "@/components/echart/bar-graph.vue"
//import linechart from "@/components/echart/line_chart.vue"
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
<style>
  .text {
    
    font-size: 14px;
  }

  .item {
    
    padding: 30px 0;
  }

  .box-card {
    border-color: grey;
    border-radius: 4px;
    width: 480px;
  }
  .test{
    width: 400px;
    height: 700px;
    background: orange;
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
   .test2{
    width: 400px;
    height: 700px;
    background: orange;
    transition: all 0.4s;
    -moz-transition:all .4s;
    -webkit-transition:all .4s;
    -o-transition:all .4s;
    background: url(../assets/backgroundImage/news0.jpg);
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
    background: url(../assets/backgroundImage/news2.jpg);
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
