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
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {

                return params.seriesName + '<br/>' + params.name + ': ' + params.value;
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
                type:"map",
                roam:true,
                map:"",
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data:[
                    {
                        name:'China',
                        value:100232
                    }
                ]
            }

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
      const mapData = require("../../data/map/json/" + this.mapName);
      echarts.registerMap(this.mapName, mapData);
      this.option["series"][0]["name"] = this.mapName;
      this.option["series"][0]["map"] = this.mapName;
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
