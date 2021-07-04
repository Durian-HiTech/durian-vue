<template>
  <div>
<!--    <bargraph/>-->
    <linechart/>
    <linechart2/>
  </div>
</template>
<script>
// import bargraph from "@/components/echart/bar-graph.vue"
import linechart from "@/components/echart/line_chart.vue"
import linechart2 from "@/components/echart/line_chart_cmp.vue"
export default {
  name: "vaccine-bar-graph",
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
