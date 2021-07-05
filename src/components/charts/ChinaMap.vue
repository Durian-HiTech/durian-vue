<template>
  <div id="china-map" style="width: 600px; height: 500px"></div>
</template>
<script>
import * as echarts from "echarts";
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
          text: "新型冠状病毒肺炎疫情图",
          subtext: "数据来源于官方",
          left: "center",
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
              console.log(params)
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
        series:[
            {
                name:"",
                nameProperty:"adcode",
                type:"map",
                roam:true,
                map:"",
                emphasis: {
                    label: {
                        show: true
                    }
                },
              data: [
                {
                  name:"",
                  value:123324
                }
              ]
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
      this.option["series"][0]["zoom"] = 1
      this.option["series"][0]["center"] = undefined;
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
