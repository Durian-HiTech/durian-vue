<template>
  <div id="vaccine_root" style="width: 800px; height: 450px">
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "VaccineGraph",
  mounted() {
    this.myChart = echarts.init(document.getElementById("vaccine_root"));
    this.myChart.setOption(this.option);
  },
  data() {
    return {
      myChart: "",
      option: {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [40, 200],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
            ],
          },
        ],
      },
    };
  },
};
</script>