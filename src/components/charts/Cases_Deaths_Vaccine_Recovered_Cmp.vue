<template>
  <div >
    <div id="Four_Type_Cmp" style="width: 450px; height: 300px;"> </div>
  </div>
</template>

<script>
// import axios from "axios";
import * as echarts from 'echarts';
import data_table from '../../data/samples/WorldAnalysisSample.json'
var global_data = [];
var option;
var json_data = ["Date", "Number", "Type", "Country"];
export default{
  name: 'CasesDeathsVaccineRecoveredCmp',
  props:{
    data_table:{
      type:Object,
    }
  },
  data() {
    return {
      name: "复兴组",
    };
  },
  created() {

  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      global_data.push(json_data)
      console.log(data_table)
      for(let i = 0; i < data_table.length; i++) {
        var tmp = []
        tmp[0] = data_table[i]['date']
        tmp[3] = 'Global'
        let sum = {
          0: {
            value: 0,
            name: 'cases'
          },
          1: {
            value: 0,
            name: 'deaths'
          },
          2: {
            value: 0,
            name: 'nowcases'
          },
          3: {
            value: 0,
            name: 'recovered'
          },
          4: {
            value: 0,
            name: 'vaccine'
          },
        }
        for(let i = 0; i < data_table[i]["detailed"].length; i++){
          sum[0]['value'] += data_table[i]["detailed"][i]['cases']
          sum[1]['value'] += data_table[i]["detailed"][i]['deaths']
          sum[2]['value'] += data_table[i]["detailed"][i]['nowcases']
          sum[3]['value'] += data_table[i]["detailed"][i]['recovered']
          sum[4]['value'] += data_table[i]["detailed"][i]['vaccine']
        }
        for(let j = 0; j < 5; j++) {
          global_data.push([tmp[0], sum[j]['value'], sum[j]['name'], tmp[3]]);
        }
      }
      console.log(global_data)
      this.mycharts()
    },
    mycharts(){
      console.log(global_data)
      let type_list = ['cases', 'deaths', 'nowcases', 'recovered', 'vaccine']
      var seriesList = [];
      var datasetWithFilters = [];
      echarts.util.each(type_list, function (type) {
        console.log(type)
        datasetWithFilters.push({
          id: type,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Number', gte: 5},
                { dimension: 'Type', '=': type},
              ]
            }
          }
        });
        seriesList.push({
          type: 'line',
          datasetId: type,
          showSymbol: false,
          endLabel: {
            show: true,
            formatter: function (params) {
              return params.value[2];
            }
          },
          encode: {
            x: 'Date',
            y: 'Number',
            label: ['Number'],
            itemName: 'Date',
            tooltip: ['Number'],
          }
        })
      });

      option = {
        dataset: [{
          id: 'dataset_raw',
          source: global_data
        }].concat(datasetWithFilters),
        title: {
          text: 'Doese of Vaccination of USA and China last 30 days',
          textStyle: {
              color: "#fff",
            },
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          nameLocation: 'middle',
        },
        yAxis: {
          name: 'Number'
        },
        series: seriesList
      };
      console.log(seriesList)

      // console.log(data_table)
      // 使用 macarons 主题
      let myChart = echarts.init(document.getElementById('Four_Type_Cmp'));
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

</style>
