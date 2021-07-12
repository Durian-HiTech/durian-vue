<template>
<div class="vaccine_root">
  <h3>截止到{{convertDate(date)}}的疫苗统计饼图</h3>
  <div id="vaccine_graph" style="width: 800px; height: 450px">
  </div>
</div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
import api from "../../commonApi.js";
export default {
  name: "VaccineGraph",
  mounted() {
    this.myChart = echarts.init(document.getElementById("vaccine_graph"));
    this.myChart.setOption(this.option);
    this.getVaccineData();
  },
  data() {
    return {
      date:"",
      myChart: "",
      option: {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "疫苗统计饼图",
            type: "pie",
            radius: [40, 200],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
            ],
          },
        ],
      },
    };
  },
  methods: {
    getVaccineData(){
        var _this = this;
        axios.get(api.baseApi+"/data/list_vaccine_overview").then(function(response){
            if (response.status == 200){
                _this.date=response.data.Global[0].date;
                var detai_vaccine_list=response.data.Global[0].detailed
                var len_data=detai_vaccine_list.length;
                for(var i=0;i<len_data; i++){
                    var tmp={
                        value: detai_vaccine_list[i].vaccine,
                        name: detai_vaccine_list[i].name,
                    }
                    console.log(tmp)
                    _this.option.series[0].data.push(tmp)
                }
                _this.myChart.setOption(this.option);
                console.log(_this.date)
            }else{
                console.log("请求失败")
            }
        })
    },
    convertDate(value){
        return value.slice(0,10);
    }
  }
};
</script>