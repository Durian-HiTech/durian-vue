<template>
  <div id="analysis-china-map"></div>
</template>
<script>
import * as echarts from "echarts";
var coviddata; //为了显示所有数据存储一份全局数据
export default {
  name: "AnalysisChinaMap",
  props: {
    data: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
  },
  mounted() {
    coviddata = this.$props.data;
    this.myChart = echarts.init(document.getElementById("anslysis-china-map"));
    this.loadMap();
    this.option["series"][0]["data"] = coviddata;
    this.loadData();
    var _this = this;
    this.myChart.on("click", function (param) {
      _this.clickevent(param.name);
    });
  },
  data() {
    return {
      myChart: "",
      country: "China", //不变
      option: {
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
          padding: 40,
          textStyle:{
            fontStyle: 'normal',
            fontFamily: 'Microsoft YaHei',
            lineHeight: 2000,
            width: 4,
            height: 4,
          },
          formatter: function (params) {
            // 光标浮动显示内容控制
            var name = countryName(params.name);
            var mapping = {
              nowcases: "现有",
              cases: "确诊",
              deaths: "死亡",
              recovered: "治愈",
              vaccine: "接种",
            };
            var res = "<font size=\"7\">" + "<b>" + name + "</b>" + "</font>" + "<br/>"+ "<br/>";
            res += "<font size=\"4\">"
            var tmp = {};
            for(var i in coviddata){
              if(coviddata[i]["name"] == params.name){
                tmp = coviddata[i];
                break;
              }
            }
            for (var key in mapping) {
              res += "<p align=\"left\">" + "<b>" + mapping[key] + "</b>" + ":  " + tmp[key] + "<br/>"+"</p >";
            }
            res += "</font>";
            return res;
          },
        },
        visualMap: {
          left: "right",
          textStyle: {
            color: "#000000",
          },
          pieces: [
           { min: 0, max: 999, label: "小于1000", color: "#FFFACD" },
            { min: 1000, max: 10000, label: "1000-10000", color: "#fee090" },
            {
              min: 10000,
              max: 100000,
              label: "10000-100000",
              color: "#fdae61",
            },
            { min: 100000, max:1000000,label: "100000-1000000", color: "#f46d43" },
            {min:1000000, label:"大于1000000", color:"#a50026"}
          ],
        },
        series: [
          {
            name: "GlobalMap",
            nameProperty: "NAME_1",
            type: "map",
            roam: true,
            zoom:2,
            map: "",
            emphasis: {
              label: {
                show: true,
                formatter:function(param){
                  var name = param.name;
                  return countryName(name);
                }
              },
            },
            data: [],
          },
        ],
      },
    };
  },
  watch: {
    type() {
      this.loadData();
    },
  },
  methods: {
    loadMap() {
      this.myChart.showLoading();
      const mapData = require("../../data/map/json/" + this.country);
      echarts.registerMap(this.country, mapData);
      this.option["series"][0]["map"] = this.country;
      this.option["series"][0]["zoom"] = 2;
      this.option["series"][0]["center"] = undefined;
      this.myChart.setOption(this.option);
      this.myChart.hideLoading();
    },
    clickevent(newcountry) {
      //地图点击事件
      console.log("开启新页面跳转到" + newcountry + "的分析页面");
    },
    loadData() {
      for(var i in this.option["series"][0]["data"]){
        this.option["series"][0]["data"][i]["value"] = this.option["series"][0]["data"][i][this.$props.type];
      }
      this.myChart.setOption(this.option);
    },
  },
};
</script>
<style scoped>
#home-china-map {
  width: 800px;
  height: 500px;
}
</style>