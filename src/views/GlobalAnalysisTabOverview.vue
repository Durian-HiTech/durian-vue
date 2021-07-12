<template>
  <div class="overviewAnalysisMain">
    <div class="overviewLineChart">
      <cmp-chart :data_table="data"></cmp-chart>
    </div>
    <div class="overviewPieChart">
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
  </div>
</template>
<script>
import CmpChart from "../components/charts/Cases_Deaths_Vaccine_Recovered_Cmp";
export default {
  name: "GlobalAnalysisTabOverview",
  components: {
    CmpChart,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
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
      type: "nowcases",
    };
  },
  watch: {},
};
</script>

<style scoped>
.overviewAnalysisMain {
  display: flex;
}
.overviewLineChart {
  display: flex;
  justify-content: left;
  margin-right: 20px;
}
.overviewPieChart {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>