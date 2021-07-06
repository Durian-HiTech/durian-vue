<template>
  <div>
    <div id="Four_Type_Cmp"> </div>
  </div>
</template>

<script>
// import axios from "axios";
import * as echarts from 'echarts';

var option;
var json_data = [["Date", "Number", "Type"]];
export default{
  props:{
    data_table:{
      type:Object,
      required:true
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
      for(let key in this.$props.data_table) {
        for(let i = 0; i < this.$props.data_table[key].length; i++) {
          var tmp = [];
          tmp[0] = this.$props.data_table[key][i].date;
          tmp[2] = key;
          let sum_value = 0;
          for (let j = 0; j < this.$props.data_table[key][i].value.length; j++) {
            sum_value += this.$props.data_table[key][i].value[j].value;
          }
          tmp[1] = sum_value;
          json_data.push(tmp);
        }
      }
      this.mycharts()
    },
    mycharts(){
      option = {
        dataset: [{
          id: 'dataset_raw',
          source: json_data
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
          text: 'Doese of Vaccination of USA and China last 30 days'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          nameLocation: 'middle'
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
#Four_Type_Cmp{
  width: 1000px;
  height: 800px;
}
</style>
