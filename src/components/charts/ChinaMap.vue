<template>
  <div id="china-map" style="width: 600px; height: 500px"></div>
</template>
<script>
import * as echarts from "echarts";
import risk_areas from "../../data/map/json/list_all_high_risk_areas.json";
// import $ from "jquery";

var data = [];
export default {
  name: "ChinaMap",
  props: {
    medium_risk: {
      type: Array,
      required: true,
    },
    high_risk: {
      type: Array,
      required: true,
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("china-map"));
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
      mapName: "china",
      option: {
        title: {
          text: "国内疫情中高风险地区",
          subtext: "数据来源于官方",
          left: "center",
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
              console.log(params);
              var res = data.filter(function (item) {
                return item.adcode === params.name;
              });
                      // + '<br/>';
              // res += params.seriesName;
              return res[0].name + '<br/>' + params.value;
            }

        },
        visualMap: {
            left: 'right',
            pieces: [
                {min: 0, max: 0,label:'低风险',color:'#fee090'},
                {min: 1, max: 1,label:'中风险',color:'#f46d43'},
                {min: 2, max: 2,label:'高风险',color:'#a50026'},
            ],
        },
        series: [
          {
            name: "",
            nameProperty: "adcode",
            type: "map",
            roam: true,
            map: "",
            // emphasis: {
            //   label: {
            //     show: true
            //   }
            // },
            normal: {
              label: {
                show: false
              }
            },
            emphasis: {
                label: {
                  show: false,
                }
              },
            data: [],
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: false,
            //     },
            //   },
            //   emphasis: {
            //     label: {
            //       show: false,
            //     }
            //   }
            // }
            // nameMap: {
            //   '110000' : '北京市'
            // }
          },
        ]
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
      const mapData = require("../../data/map/json/GeoMapData_CN/" + this.mapName);
      echarts.registerMap(this.mapName, mapData);
      this.option["series"][0]["name"] = this.mapName;
      this.option["series"][0]["map"] = this.mapName;
      this.option["series"][0]["center"] = ['50%, 50%'];
      this.option["series"][0]["zoom"] = 1;
      this.option["series"][0]["center"] = undefined;
      this.option["series"][0].normal.label.show = false;
      this.option["series"][0].emphasis.label.show = false;
      console.log(mapData.features);
      console.log(risk_areas);
      var features = mapData.features;
      features.forEach((item)=>{
        // console.log(item.properties);
        var properties = item.properties;
        data.push(properties);
        var newdata = {name: properties.adcode, value: 0};
        this.$props.medium_risk.forEach((item1)=>{
          if(properties.name === item1.province || properties.name === item1.city){
            newdata.value = 1;
          }
        });
        this.$props.high_risk.forEach((item1)=>{
          if(properties.name === item1.province || properties.name === item1.city){
            newdata.value = 2;
          }
        });
        console.log(newdata);
        this.option["series"][0].data.push(newdata);
      });
      console.log(this.$props.medium_risk);
      console.log(this.option["series"][0].data);
      console.log(data);
      this.myChart.setOption(this.option);
      this.myChart.hideLoading();
    },

    clickevent(param) {
      console.log(param.name);
      this.changemap(param.name);
    },
    backtochina() {
      this.mapName = "china";
    },
    changemap(name) {
      this.mapName = name;
    },
  },
};
</script>

