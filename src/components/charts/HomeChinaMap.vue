<template>
  <div id="home-china-map"></div>
</template>
<script>
/*
功能：
1. 展示世界地图
2. 可以改变热力图主键
3. 鼠标悬浮显示该国家所有数据
4. 点击国家跳转到该国家分析页面
5. 国家显示中文
*/
import * as echarts from "echarts";
var provincemapping = require("../../data/utils/china_en2province.json");
var countryName = function (name) {
  // en2zh
  for (var key in provincemapping) {
    if (provincemapping[key]["value"] == name)
      return provincemapping[key]["label"];
  }
  return name;
};
var coviddata; //为了显示所有数据存储一份全局数据
export default {
  name: "HomeChinaMap",
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
    this.myChart = echarts.init(document.getElementById("home-china-map"));
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
        title: {
          text: "全球新型冠状病毒肺炎疫情图",
          textStyle: {
            color: "#000",
          },
          subtext: "数据来源于各国政府机构等",
          subtextStyle: {
            color: "#000",
          },
          left: "center",
        },
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
              now_cases: "现有",
              cases: "确诊",
              deaths: "死亡",
              recovered: "治愈",
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
            scaleLimit:{
              min:1,
              max:4
            },
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
