<template>
  <div >
    <div id="BingChart" style="width: 1000px; height: 600px;">xdm有无三上悠亚资源。樱桃空也可。</div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
var data = require("../../data/samples/WorldAnalysisSample.json");
var option;
export default{
    name: 'BingChart',
    props: {
        dataType:{
            type: String,
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
            var PresentData = data[0]
            var SaveList = [];
            var All = PresentData["overview"][this.$props.dataType]["nownum"]+223076;
            var Sum = 0;
            console.log(All)
            var TTT = this.$props.dataType;
            console.log(TTT)
            for (var i=0;i<PresentData["detailed"].length;i++)
            {
                console.log(i,Sum);
                Sum += PresentData["detailed"][i][this.$props.dataType];
                SaveList.push({value:PresentData["detailed"][i][this.$props.dataType],name:PresentData["detailed"][i]["name"]})
            }
            SaveList.push({value:(All-Sum),name:"Others"})
            console.log(SaveList);
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
                        data: SaveList
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
