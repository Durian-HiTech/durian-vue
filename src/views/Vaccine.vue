<template>
  <div>
<!--    <bargraph/>-->
    <linechart/>
    <linechart2/>
  </div>
</template>
<script>
// import bargraph from "@/components/echart/BarGraph.vue"
import linechart from "@/components/echart/LineChart.vue"
import linechart2 from "@/components/echart/LineChartCmp.vue"
export default {
  name: "VaccineBarGraph",
  components: {
    // bargraph,
    linechart,
    linechart2,
  },
  data() {
    return {

    };
  },
}
</script>
