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
      this.mycharts()
    },
    mycharts(){
      option = {
        dataset: [{
          id: 'dataset_raw',
          source: global_data
        },{
          id: 'cases',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Number', gte: 5},
                { dimension: 'Type', '=': 'cases'},
              ]
            }
          }
        },{
          id: 'deaths',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Number', gte: 5},
                { dimension: 'Type', '=': 'deaths' },
              ]
            }
          }
        },{
          id: 'nowcases',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Number', gte: 5},
                { dimension: 'Type', '=': 'nowcases' },
              ]
            }
          }
        }, {
          id: 'recovered',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Number', gte: 5},
                { dimension: 'Type', '=': 'recovered'},
              ]
            }
          }
        },{
          id: 'vaccine',
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Number', gte: 5},
                { dimension: 'Type', '=': 'vaccine'},
              ]
            }
          }
        }],
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
        series: [{
          type: 'line',
          datasetId: 'cases',
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
        },{
          type: 'line',
          datasetId: 'deaths',
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
        },{
          type: 'line',
          datasetId: 'nowcases',
          showSymbol: false,
          endLabel: {
            show: true,
            formatter: function (params) {
              return params.value[1];
            }
          },
          encode: {
            x: 'Date',
            y: 'Number',
            label: ['Number'],
            itemName: 'Date',
            tooltip: ['Number'],
          }
        }, {
          type: 'line',
          datasetId: 'recovered',
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
        },{
          type: 'line',
          datasetId: 'vaccine',
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
        }]
      };

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
