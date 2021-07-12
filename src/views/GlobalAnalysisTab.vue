<template>
  <v-tabs>
    <v-tab>总计</v-tab>
    <v-tab>总计对比分析</v-tab>
    <v-tab>历史总计对比分析</v-tab>

    <v-tab-item
      ><global-analysis-tab-overview :data="data"></global-analysis-tab-overview
    ></v-tab-item>
    <v-tab-item> 这里是总计对比分析</v-tab-item>
    <v-tab-item>这里是历史总计对比分析</v-tab-item>
  </v-tabs>
</template>
<script>
import GlobalAnalysisTabOverview from "./GlobalAnalysisTabOverview.vue";
export default {
  name: "GlobalAnalysisTab",
  components: {
    GlobalAnalysisTabOverview,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
