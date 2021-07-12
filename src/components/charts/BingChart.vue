<template>
  <div >
    <div id="BingChart" style="width: 1000px; height: 600px;">123 </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
var data = require("../../data/samples/WorldAnalysisSample.json");
var option;
export default{
    name: 'BingChart',
    props: {
        data_table:{
            type: Array,
            require: true
        }
    },
    data() {
        return {
            name: '复兴社',
        };
    },
    created() {

    },
    mounted() {

        this.getData();
    },
    methods: {
        getData(){
            this.mycharts()
        },
        mycharts(){
            console.log(data[0])

            option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 1048, name: '搜索引擎'},
                            {value: 735, name: '直接访问'},
                            {value: 580, name: '邮件营销'},
                            {value: 484, name: '联盟广告'},
                            {value: 300, name: '视频广告'}
                        ]
                    }
                ]
            };
            let myChart = echarts.init(document.getElementById('BingChart'));
            myChart.setOption(option)
        },
    },
    watch: {

    }
};
</script>
<style scoped>

</style>
