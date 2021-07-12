<template>
  <div class="GlobalAnalysisTabOverviewCmp">
    <div class="topselector">
      <el-select v-model="countries" multiple>
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
export default {
  name: "GlobalAnalysisTabOverviewCmp",
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
      list:[
          {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, 
      ],
    };
  },
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