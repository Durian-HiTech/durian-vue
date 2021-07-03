<template>
  <div>
    牛逼
    <div id="main"> </div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from 'echarts';
import data_table from '@/static/test.json'

var option;
var json_data = [];
var load = false;
export default{
  data() {
    return {
      name: "复兴组",
    };
  },
  created() {
    this.getChinaVaccine();
  },
  mounted() {
    // this.mycharts();
  },
  methods: {
    getChinaVaccine() {
      let formData = new FormData();
      // formData.append("author_id", this.authorId);
      let config = {
        headers: {"Content-Type": "multipart/form-data",},
      };
      var _this = this;
      axios.get(
          "https://disease.sh/v3/covid-19/vaccine/coverage/countries/China?lastdays=30&fullData=false",
          formData,
          config
      )
          .then(function (response) {

            if (response.status == 200) {
              console.log(response.data.timeline)
              var tmpt_list = ["Data", "Doses"];
              json_data.push(tmpt_list);
              for (var key in response.data.timeline) {
                var tmpt = []
                tmpt[0] = key
                tmpt[1] = response.data.timeline[key]
                json_data.push(tmpt);
              }
              load = true
              console.log(json_data)
              _this.mycharts();
              // _this.relatedloaded = true;
            } else {
              // console.log("请求失败");
              // console.log(response.data);
              // _this.fail()
            }
          });
    },
    mycharts(){
      if(load == true) {
        console.log(load)
        console.log(json_data)
        option = {
          dataset: [{
            id: 'dataset_raw',
            source: json_data
          }, {
            id: 'dataset_since_1950_of_germany',
            fromDatasetId: 'dataset_raw',
            transform: {
              type: 'filter',
              config: {
                and: [
                  { dimension: 'Doses', gte: 10000 }
                ]
              }
            }
          }],
          title: {
            text: 'Income of Germany and France since 1950'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            nameLocation: 'middle'
          },
          yAxis: {
            name: 'Income'
          },
          series: [{
            type: 'line',
            datasetId: 'dataset_since_1950_of_germany',
            showSymbol: false,
            encode: {
              x: 'Data',
              y: 'Doses',
              itemName: 'Data',
              tooltip: ['Doses'],
            }
          }]
        };
      }

      console.log(data_table)
      // 使用 macarons 主题
      let myChart = echarts.init(document.getElementById("main"), 'light');
      myChart.setOption(option)
      //图表自适应
      window.addEventListener("resize",function(){
        myChart.resize()  // myChart 是实例对象
      })
    },
  },
  watch: {

  },
};
</script>
<style scoped>
#main{
  width: 1000px;
  height: 800px;
}
</style>
