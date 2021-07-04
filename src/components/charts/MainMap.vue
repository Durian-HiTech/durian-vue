<template>
  <div id="main-map" style="width: 600px; height: 500px"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "MainMap",
  mounted() {
    this.myChart = echarts.init(document.getElementById("main-map"));
    this.myChart.showLoading();
    this.loadMap();
    var _this = this;
    this.myChart.on("click", function (param) {
      _this.clickevent(param);
    });
  },
  data() {
    return {
      myChart: "",
      mapName: "world",
      option: {
        title: {
          text: "新型冠状病毒肺炎疫情图",
          subtext: "数据来源于官方",
          left: "center",
        },
      },
    };
  },
  watch: {
    mapName() {
      this.loadMap();
    },
  },
  methods: {
    loadMap() {
      const mapData = require("../../data/map/json/" + this.mapName);
      echarts.registerMap(this.mapName, mapData);
      this.option = {
        series: [
          {
            name: this.mapName,
            type: "map",
            roam: "true",
            map: this.mapName,
            emphasis: {
              label: {
                show: true,
              },
            },
          },
        ],
      };
      this.myChart.setOption(this.option);
      this.myChart.hideLoading();
    },
    clickevent(param) {
      if(this.mapName=='china'){
          console.log(param);
          this.changemap(param.adcode);
      }
      else this.changemap(param.name);
    },
    backtoworld() {
      this.mapName = "world";
    },
    changemap(name) {
      this.mapName = name.toLowerCase();
    },
  },
};
</script>
