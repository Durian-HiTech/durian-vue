<template>
  <div id="main-map" style="width: 600px; height: 500px"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "MainMap",
  props:{
    country:{
      type:String,
      required:true,
      default:'world'
    },
    type:{
      type:String,
      required:true,
      default:'cases'
    },
    data:{
      type:Array,
      required:true
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("main-map"));
    this.myChart.showLoading();
    this.myChart.on("click", function (param) {
      _this.clickevent(param);
    });
    this.loadData();
    this.loadMap();
    var _this = this;

  },
  data() {
    return {
      myChart: "",
      option: {
        title: {
          text: "新型冠状病毒肺炎疫情图",
          textStyle: {
            color: "#fff", 
          },
          subtext: "数据来源于官方",
          subtextStyle: {
            color: "#fff", 
          },
          left: "center",
        },
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {// 光标浮动显示内容控制
            var mapping = {
              cases: "确诊人数",
              deaths: "死亡人数",
              recovered: "治愈人数",
              vaccine: "疫苗接种人数",
            };
            var res = params.name + '<br/>';
            res += mapping[params.seriesName] + ":" + params.value;
            return res;
          },
        },
        visualMap: {
          left: "right",
          textStyle: {
            color: "#fff", 
          },
          pieces: [
            { min: 0, max: 999, label: "小于1000", color: "#FFFACD" },
            { min: 1000, max: 10000, label: "1000-10000", color: "#fee090" },
            { min: 10000, max: 100000, label: "10000-100000", color: "#f46d43"},
            { min: 100000, label: "大于100000", color: "#a50026" },
          ],
        },
        series: [
          {
            name: "",
            type: "map",
            roam: true,
            map: "",
            emphasis: {
              label: {
                show: true,
              },
            },
            data:[],
          },
        ],
      },
    };
  },
  watch: {
    country() {
      this.loadData();
      this.loadMap();
    },
    type(){
      this.loadData();
      this.loadMap();
    },
    data(){
      this.loadData();
      this.loadMap();
    }
  },
  methods: {
    loadMap() {
      const mapData = require("../../data/map/json/" + this.$props.country);
      echarts.registerMap(this.$props.country, mapData);
      this.option["series"][0]["name"] = this.$props.type;
      this.option["series"][0]["map"] = this.$props.country;
      this.option["series"][0]["center"] = ['50%, 50%'];
      this.option["series"][0]["zoom"] = 1
      this.option["series"][0]["center"] = undefined;
      this.myChart.setOption(this.option);
      this.myChart.hideLoading();
    },
    clickevent(param) {//地图点击事件函数
      this.changemap(param.name);
    },
    changemap(name) {//地图改变事件函数
      this.$parent.changeCountry(name);
    },
    loadData(){
      this.option["series"][0]["data"] = this.$props.data;
    }
  },
};
</script>
