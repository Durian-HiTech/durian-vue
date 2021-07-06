<template>
  <div id="china-map" style="width: 600px; height: 500px"></div>
</template>
<script>
import * as echarts from "echarts";
var data = [];
export default {
  name: "ChinaMap",
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
              return res[0].name;
            }

        },
        visualMap: {
            left: 'right',
            pieces: [
                {min: 0,max:999,label:'小于1000',color:'#ffffff'},
                {min: 1000, max: 10000,label:'1000-10000',color:'#fee090'},
                {min: 10000, max: 100000,label:'10000-100000',color:'#f46d43'},
                {min: 100000,label:'大于100000',color:'#a50026'},
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
      var features = mapData.features;
      features.forEach((item)=>{
        // console.log(item.properties);
        data.push(item.properties);
      });
      this.myChart.setOption(this.option);
      this.myChart.hideLoading();
    },

    clickevent(param) {
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

