<template>
  <div class="GlobalAnalysisTabOverviewCmp">
    <div class="topselector">
      <el-select v-model="countries" multiple filterable>
        <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="type">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="main">这是胡鹏飞写的</div>
  </div>
</template>
<script>
var countryen2zh = require("../data/utils/countryen2zh.json")
export default {
  name: "GlobalAnalysisTabOverviewCmp",
  props:{
    data:{
        type:Array,
        required:true
    },
  },
  mounted(){
      this.loadlist();//区域列表
  },
  data() {
    return {
      options: [
        {
          value: "nowcases",
          label: "现有确诊",
        },
        {
          value: "cases",
          label: "累积确诊",
        },
        {
          value: "deaths",
          label: "累积死亡",
        },
        {
          value: "recovered",
          label: "累积治愈",
        },
      ],
      type:"nowcases",
      countries:[],
      list:[],
    };
  },
  methods:{
      loadlist(){
          var detailed = this.$props.data[0]["detailed"];
          console.log(detailed)
          for(var i in detailed){
              var enname = detailed[i]["name"];
              for(var j in countryen2zh){
                  if(countryen2zh[j]["value"] == enname){
                      this.list.push({
                          value:enname,
                          label:countryen2zh[j]["label"]
                      })
                  }
              }
          }
      }
  }
};
</script>

<style scoped>
.GlobalAnalysisTabOverviewCmp {
  display: flex;
  flex-direction: column;
}
.topselector {
  display: flex;
  justify-content: flex-end;
}
</style>