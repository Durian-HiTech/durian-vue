<template>
  <div class="RiskMapRoot">
<!--    <el-select v-model="country" placeholder="请选择">-->
<!--      <el-option-->
<!--        v-for="item in countries"-->
<!--        :key="item.value"-->
<!--        :label="item.label"-->
<!--        :value="item.value"-->
<!--      >-->
<!--        <span style="float: left">{{ item.label }}</span>-->
<!--        <span style="float: right; color: #8492a6; font-size: 13px">{{item.value}}</span>-->
<!--      </el-option>-->
<!--    </el-select>-->
    <china-map ref="ChinaMap"
               :medium_risk = "this.medium_risk"
               :high_risk = "this.high_risk"
               style="width: 600px; height: 650px"
               ></china-map>
    <div class="RiskMapSide">

      <div class="backButton" @click="reset" >返回</div>

      <h3 style="margin: 20px">中风险地区</h3>

        <div v-for="item in medium_risk"
            :key="item.city">
          {{item.detail}}
        </div>

        <div v-if="medium_risk.length==0">无</div>

      <h3 style="margin: 20px">高风险地区</h3>

        <div v-for="item in high_risk"
            :key="item.city">
          {{item.detail}}
        </div>

        <div v-if="high_risk.length==0">无</div>

    </div>
  </div>
</template>

<script>
import ChinaMap from "./charts/ChinaMap";
import risk_areas from "../data/map/json/list_all_high_risk_areas.json";

export default {
  name: "RiskMap",
  components: {
    ChinaMap,
  },
  created(){
    this.risk_data = risk_areas.data;
    this.risk_data.forEach((item)=> {
      if(item.type === "中风险") {
        this.medium_risk.push({
          province: item.province,
          city: item.district,
          detail: item.name,
        })
      } else if(item.type === "高风险") {
        this.high_risk.push({
          province: item.province,
          city: item.district,
          detail: item.name,
        })
      }
    });
    // console.log(this.medium_risk);
    // console.log(this.high_risk);
  },
  data(){
    return {
      // countries:[
      //     {
      //         value:'China',
      //         label:'中国'
      //     }
      // ],
      curr: 'china',
      risk_data: [],
      medium_risk: [],
      high_risk: [],
    }
  },
  watch:{
      country(newvalue){
          if(newvalue == '')return ;
          this.$refs.ChinaMap.changemap(newvalue);
        // console.log(risk_areas);
      }
  },
  methods: {
    reset() {
      this.$refs.ChinaMap.backtochina();
    },
  },
};
</script>
<style scoped>
.RiskMapRoot {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4E6E62;

  padding-top: 20px;
  padding-bottom: 20px;
}
.RiskMapSide {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}
.backButton {
  white-space: nowrap;
  text-align: center;
  cursor: pointer;

  font-size: 17px;
  font-weight: 100;
  width: 80px;

  background-color:rgba(20, 20, 20, 0.2);
  color: white;

  border-radius: 30px;

  padding: 5px 15px 5px 15px;
  margin: 3px;
  margin-bottom: 50px;
}
</style>
