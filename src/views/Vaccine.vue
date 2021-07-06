<template>
  <div class="VaccineRoot">
    <span class="title">
      <b>Covid</b> Vaccine
    </span>
    <el-divider/>
<!--    <bargraph/>-->
    <linechart/>
    <el-divider/>
    <linechart2/>
  </div>
</template>
<script>
// import bargraph from "@/components/charts/BarGraph.vue"
import linechart from "@/components/charts/LineChart.vue"
import linechart2 from "@/components/charts/LineChartCmp.vue"
export default {
  name: "VaccineBarGraph",
  components: {
    // bargraph,
    linechart,
    linechart2,
  },
}
</script>

<style scoped>
.VaccineRoot {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
}
.title {
    font-size:80px; 
    align-self: flex-start; 
    position: relative;
    left: 250px;
  }
</style>