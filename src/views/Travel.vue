<template>
  <div class="root">
    <div class="map">
        
    </div>
    <div class="right">
        <el-input  style="width: 300px " v-model="input" placeholder="请输入搜索内容"></el-input>
        <div class="choice">
            <el-button  style="font-weight: bold;" round>国际预警航线</el-button>
        </div>
        <div class="choice">
            <el-button  style="font-weight: bold;" round>国内预警航线</el-button>
        </div>
        <div class="choice">
            <el-button  style="font-weight: bold;" round>国内预警高铁</el-button>
        </div>
        
    </div>
  </div>
</template>
<script>
// import RiskMap from "../components/RiskMap";
export default {
  name: "Travel",
  components: {
    // RiskMap
  },
}
</script>
<style scoped>
  .root {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
  }
  .map {
      background-color: rgb(0, 0, 0);
      justify-content: center;
      align-items: center;
      text-align:cente;
      height: 500px;
      width: 50%;
      margin: 30px;
  }
  .right {
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 500px;
        
  }
  .choice {
      margin: 20%;
      
  }
  
</style>
