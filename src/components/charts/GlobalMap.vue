<template>
  <div id="global-main-map"></div>
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
var countrymapping = require("../../data/utils/countryen2zh.json");
var countryName = function (name) {
  // en2zh
  for (var key in countrymapping) {
    if (countrymapping[key]["value"] == name)
      return countrymapping[key]["label"];
  }
  return name;
};
var coviddata; //为了显示所有数据存储一份全局数据
export default {
  name: "GlobalMap",
  /*
    data:所有区域或国家的**当天**四个数据
    {
      "cases":[{name:"",value:""}],
      "deaths":[],
      "recovered":[],
      "vaccine":[]
    }

    type:热力图主键:
    __type__=["cases","deaths","recovered","vaccine","nowcases"]
    
    country:当前国家/World String
  */
  props: {
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
  },
  mounted() {
    coviddata = this.$props.data;
    this.myChart = echarts.init(document.getElementById("global-main-map"));
    this.loadMap();
    this.dataProcessing();
    this.loadData();
    var _this = this;
    this.myChart.on("click", function (param) {
      _this.clickevent(param.name);
    });
  },
  data() {
    return {
      myChart: "",
      country: "World", //不变
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
            fontStyle: 'italic',
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
            var res = "<font size=\"7\" color=\"black\">" + "<b>" + name + "</b>" + "</font>" + "<br/>";
            res += "<font size=\"4\">"
            for (var key in mapping) {
              res += "<p align=\"left\">" + "<b>" + mapping[key] + "</b>" + ":";
              for (var i in coviddata[key]) {
                if (coviddata[key][i]["name"] == params.name) {
                  res += coviddata[key][i]["value"] + "<br/>";
                  break;
                }
              }
              res += "</p>";
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
              color: "#f46d43",
            },
            { min: 100000, label: "大于100000", color: "#a50026" },
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
      this.option["series"][0]["data"] = coviddata[this.$props.type];
      this.myChart.setOption(this.option);
    },
    dataProcessing() {
      //计算当前确诊
      var list = [];
      for (var i in coviddata["cases"]) {
        var name = coviddata["cases"][i]["name"];
        var cnt = coviddata["cases"][i]["value"];
        for (var j in coviddata["deaths"]) {
          if (name == coviddata["deaths"][j]["name"]) {
            cnt -= coviddata["deaths"][j]["value"];
            break;
          }
        }
        for (j in coviddata["recovered"]) {
          if (name == coviddata["recovered"][j]["name"]) {
            cnt -= coviddata["recovered"][j]["value"];
            break;
          }
        }
        list.push({
          name: name,
          value: cnt,
        });
      }
      coviddata["nowcases"] = list;
    },
  },
};
</script>
<style scoped>
#global-main-map {
  width: 1000px;
  height: 400px;
}
</style>