<template>
  <div >
    <div id="BingChart" style="width: 1000px; height: 600px;">xdm有无三上悠亚资源。樱桃空也可。</div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
var option;
export default{
    name: 'BingChart',
    props: {
        dataType:{
            type: String,
            require: true
        },
        dataTable:{
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
            //console.log("Hello from Other Side",this.$props.dataTable[0])
            var PresentData = this.$props.dataTable[0]
            var SaveList = [];
            var All = PresentData["overview"][this.$props.dataType]["nownum"];
            var Sum = 0;
            //console.log("Test",PresentData["detailed"][0][this.$props.dataType])
            var SortData = PresentData["detailed"]
            var _this = this;
            SortData.sort(function(a,b){
                return (b[_this.$props.dataType]-a[_this.$props.dataType]);
            });
            //console.log(All)

            var Count = SortData.length;
            if (Count>10) {
                Count = 10;
            }
            for (var i=0;i<Count;i++)
            {
                //console.log("项目展示",i,SortData[i]["name"],SortData[i][this.$props.dataType]);
                Sum += SortData[i][this.$props.dataType];
                SaveList.push({value:SortData[i][this.$props.dataType],name:SortData[i]["name"]})
            }
            SaveList.push({value:(All-Sum),name:"Others"})
            //console.log(SaveList);
            option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                //minShowLabelAngle: 2,
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
        dataType(){
            this.getData()
        }
    }
};
</script>
<style scoped>

</style>
