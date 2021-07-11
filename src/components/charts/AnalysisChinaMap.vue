<template>
  <div id="analysis-china-map"></div>
</template>
<script>
import * as echarts from "echarts";
var chinaen2zh = require("../../data/utils/china_en2province.json");
var coviddata; //为了显示所有数据存储一份全局数据
var mapdata = {}; // 中文名字和adcode的对照表
export default {
  name: "AnalysisChinaMap",
  props: {
    data: {
      type: Array,
      required: true,
    },
    type: {
      // 控制热力图主键
      type: String,
      required: false,
    },
    country: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    coviddata = this.$props.data;
    var mapname;
    if (this.$props.country["name"] == "China") {
      mapname = "China";
      this.dataprocessing(); //全国数据需要转中文
    } else {
      mapname = this.$props.country["adcode"];
    }
    this.myChart = echarts.init(document.getElementById("analysis-china-map"));
    this.loadMap(mapname);
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
      option: {
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
          padding: 40,
          textStyle: {
            fontStyle: "normal",
            fontFamily: "Microsoft YaHei",
            lineHeight: 2000,
            width: 4,
            height: 4,
          },
          formatter: function (params) {
            // 光标浮动显示内容控制
            var name = params.name; //name是中文，数据可能是英文
            var enname = ""; //英文名字
            for (var j in chinaen2zh) {
              if (chinaen2zh[j]["label"] == name) {
                enname = chinaen2zh[j]["name"];
                break;
              }
            }
            var mapping = {
              nowcases: "现有",
              cases: "确诊",
              deaths: "死亡",
              recovered: "治愈",
              vaccine: "接种",
            };
            var res =
              '<font size="7">' +
              "<b>" +
              name +
              "</b>" +
              "</font>" +
              "<br/>" +
              "<br/>";
            res += '<font size="4">';
            var tmp = {};
            for (var i in coviddata) {
              if (
                coviddata[i]["name"] == name ||
                coviddata[i]["name"] == enname
              ) {
                tmp = coviddata[i];
                break;
              }
            }
            for (var key in mapping) {
              res +=
                '<p align="left">' +
                "<b>" +
                mapping[key] +
                "</b>" +
                ":  " +
                tmp[key] +
                "<br/>" +
                "</p >";
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
            {
              min: 100000,
              max: 1000000,
              label: "100000-1000000",
              color: "#f46d43",
            },
            { min: 1000000, label: "大于1000000", color: "#a50026" },
          ],
        },
        series: [
          {
            name: "ChinaMap",
            nameProperty: "name",
            type: "map",
            roam: true,
            zoom: 2,
            scaleLimit:{
              min:1,
              max:4
            },
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
    data() {// data若变则country必定已经变
      coviddata = this.$props.data;
      var mapname;
      if (this.$props.country["name"] == "China") {
        mapname = "China";
        this.dataprocessing(); //全国数据需要转中文
      } else {
        mapname = this.$props.country["adcode"];
      }
      this.loadMap(mapname);
      this.option["series"][0]["data"] = coviddata;
      this.loadData();
    },
  },
  methods: {
    dataprocessing() {
      // 当前图为China时将获取的省会数据英文名称转中文
      for (var i in coviddata) {
        for (var item in chinaen2zh) {
          if (coviddata[i]["name"] == chinaen2zh[item]["value"]) {
            coviddata[i]["name"] = chinaen2zh[item]["label"];
            break;
          }
        }
      }
    },
    loadMap(name) {
      this.myChart.showLoading();
      const mapData = require("../../data/map/json/GeoMapData_CN/" + name);
      for (var item in mapData.features) {
        mapdata[mapData.features[item].properties.name] =
          mapData.features[item].properties.adcode;
      }
      echarts.registerMap(name, mapData);
      this.option["series"][0]["map"] = name;
      this.option["series"][0]["zoom"] = 2;
      this.option["series"][0]["center"] = undefined;
      this.myChart.setOption(this.option);
    },
    clickevent(newcountry) {
      if(this.$props.country.name != 'China')return ;//最多到二级
      this.$parent.changeCountry({
        name: newcountry,
        adcode: mapdata[newcountry],
      });
    },
    loadData() {
      // 数据已经加载完毕，改变数据中value对应的值
      for (var i in this.option["series"][0]["data"]) {
        this.option["series"][0]["data"][i]["value"] =
          this.option["series"][0]["data"][i][this.$props.type];
      }
      this.myChart.setOption(this.option);
      this.myChart.hideLoading();
    },
  },
};
</script>
<style scoped>
#analysis-china-map {
  width: 800px;
  height: 500px;
}
</style>