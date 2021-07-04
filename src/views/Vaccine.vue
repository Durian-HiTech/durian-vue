<template>
  <div>
<!--    <bargraph/>-->
    <linechart/>
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
  data() {
    return {

    };
  },
}
</script>
