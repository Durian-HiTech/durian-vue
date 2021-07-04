<template>
  <div>
<!--    <bargraph/>-->
    <linechart/>
  </div>
</template>
<script>
// import bargraph from "@/components/echart/bar-graph.vue"
import linechart from "@/components/echart/line_chart.vue"
export default {
  name: "vaccine-bar-graph",
  components: {
    // bargraph,
    linechart
  },
  data() {
    return {

    };
  },
}
</script>
