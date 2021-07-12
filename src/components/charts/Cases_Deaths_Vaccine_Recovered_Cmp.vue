<template>
  <div >
    <div id="Four_Type_Cmp" style="width: 1200px; height: 540px;"> </div>
  </div>
</template>

<script>
// import axios from "axios";
import * as echarts from 'echarts';
var global_data = [];
var option;
var json_data = ["Date", "Number", "Type", "Country"];
export default{
  name: 'CasesDeathsVaccineRecoveredCmp',
  props:{
    data_table:{
      type: Array,
      require: true
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
      global_data = []
      console.log(this.$props.data_table)
      global_data.push(json_data)
      console.log(this.$props.data_table.length)
      for(let i = this.$props.data_table.length - 1; i >= 0; i--) {
        global_data.push([this.$props.data_table[i]['date'], this.$props.data_table[i]["overview"]['cases']['nownum'], 'cases', 'Global']);
        global_data.push([this.$props.data_table[i]['date'], this.$props.data_table[i]["overview"]['deaths']['nownum'], 'deaths', 'Global']);
        global_data.push([this.$props.data_table[i]['date'], this.$props.data_table[i]["overview"]['nowcases']['nownum'], 'nowcases', 'Global']);
        global_data.push([this.$props.data_table[i]['date'], this.$props.data_table[i]["overview"]['recovered']['nownum'], 'recovered', 'Global']);
        // global_data.push([this.$props.data_table[i]['date'], this.$props.data_table[i]["overview"]['vaccine']['nownum'], 'vaccine', 'Global']);
      }
      this.mycharts()
    },
    mycharts(){
      console.log(global_data)
      let type_list = ['cases', 'deaths', 'nowcases', 'recovered']
      var seriesList = [];
      var datasetWithFilters = [];
      echarts.util.each(type_list, function (type) {
        datasetWithFilters.push({
          id: type,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Number', gte: 5},
                { dimension: 'Type', '=': type},
                { dimension: 'Country', '=': 'Global'}
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
          emphasis: {
            focus: 'series'
          },

          encode: {
            x: 'Date',
            y: 'Number',
            label: ['Type', 'Number'],
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
        dataZoom: [{
          id: 'dataZoomx',
          type: 'slider',
          realtime: true,
          filterMode: 'empty',
          start:0,
          end: 1000,
          xAxisIndex: [0]
        },{
          id: 'dataZoomY',
          type: 'slider',
          realtime: true,
          filterMode: 'empty',
          start:0,
          end: 100,
          yAxisIndex: [0]
        }],
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

      // 使用 macarons 主题
      let myChart = echarts.init(document.getElementById('Four_Type_Cmp'));
      myChart.clear()
      myChart.setOption(option)
      //图表自适应

    },
  },
  watch: {

  },
};
</script>
<style scoped>

</style>
