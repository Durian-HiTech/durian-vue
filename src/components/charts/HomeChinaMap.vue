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
import api from "@/commonApi";
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
var highrisk = [];
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
    // 赋值进去
    this.option["series"][0]["data"] = coviddata;
    this.option["series"][0]["data"] = coviddata;
    this.loadData();
    var _this = this;
    this.myChart.on("click", function (param) {
      _this.clickevent(param.name);
    });
    this.get_all_high_risk_areas();
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

        },
        visualMap: [
            {
            left: "right",
            seriesIndex: 0,
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
                { min:1000000, label:"大于1000000", color:"#a50026" }
              ],
            }
        ],
        geo: {
          name: "geo_layer",
          show: true,
          map: "China",
          scaleLimit:{
            min:1,
            max:4
          },
          selectedMode : 'single',
          nameProperty: 'NAME_1',
          roam: true,
          zoom: 1.2,
          emphasis: {
            label: {
              show: true,
              formatter:function(param){
                var name = param.name;
                return countryName(name);
              }
            },
          },
          tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            padding: 10,
            formatter: function (params) {
              if(params.seriesIndex == 0) {
                var name = countryName(params.name);
                var mapping = {
                  nowcases: "现有",
                  cases: "确诊",
                  deaths: "死亡",
                  recovered: "治愈",
                };
                var res = "<b>" + name + "</b>" + "<br/>";
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
                return res;
              }
              else {
                res = ''
                for(key in highrisk[0]) {
                  if(key == 'coordinate')
                    continue
                  res += "<p align=\"left\">" + "<b>" + highrisk[0][key] + "</b>" + ":  "  + "<br/>"+"</p >"
                }
                return res;
              }

            },
          },
        },
        series: [
          {
            name: "ChinaMap",
            nameProperty: "NAME_1",
            type: "map",
            geoIndex: 0,
            roam: true,
            zoom: 1.2,
            scaleLimit:{
              min:1,
              max:4
            },
            data: [],
          },
          {
            name: '高风险地区',
            type: "scatter",
            symbol: 'pin',
            coordinateSystem: 'geo',
            zoom: 1.2,
            data:[
              {name: '云南', value: [97.855883,
                  24.010734, 1000]}
            ],
            symbolSize: function (val) {
              return val[2] / 10;
            },
            label: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 9
              }
            },
            itemStyle: {
              color: '#F62157' // 标志颜色
            },
            tooltip: {

            }
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
      echarts.registerMap("China", mapData);
      this.option["series"][0]["map"] = this.country;
      this.option["series"][0]["zoom"] = 2;
      this.option["series"][0]["center"] = undefined;
      this.myChart.setOption(this.option);
      this.myChart.hideLoading();
    },
    clickevent(newcountry) {
      //地图点击事件
      const {href} = this.$router.resolve({
        path:'chinaanalysis',
        query:{
          name:newcountry
        }
      })
      window.open(href,'_blank')
    },
    loadData() {
      for(var i in this.option["series"][0]["data"]){
        this.option["series"][0]["data"][i]["value"] = this.option["series"][0]["data"][i][this.$props.type];
      }
      this.myChart.setOption(this.option);
    },
    get_all_high_risk_areas() {
      this.$axios.get(api.baseApi + '/data/list_all_high_risk_areas').then(function(response){
        if(response.data.success){
          highrisk = response.data.data
        }
      })
    }
  },
};
</script>
<style scoped>
#home-china-map {
  width: 700px;
  height: 500px;
}
</style>
