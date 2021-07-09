<template>
    <div id="airline-map" style="width: 1000px; height: 800px;"></div>
</template>

<script>
    import * as echarts from "echarts";
    // import api from "../../commonApi";
    import $ from "jquery";

    var mapData;
    var data = [];

    export default {
        name: "AirlineMap",
        mounted() {
            require('echarts/lib/component/geo');
            this.myChart = echarts.init(document.getElementById("airline-map"));
            // require("echarts/lib/component/geo");
            this.myChart.showLoading();
            this.loadMap();
            // console.log(mapData);
            mapData.features.forEach((item) => {
                var properties = item.properties;
                data.push(properties);
            });
            var _this = this;
            this.myChart.on("click", function (param) {
                _this.clickevent(param);
            });

        },
        data() {
            return {
                myChart: "",
                mapName: "China",
                curr: "",
                option: {
                    title: {
                        text: "国内航班",
                    },
                    // visualMap: {
                    // left: 'right',
                    // textStyle: {
                    //     color: "#000",
                    // },
                    // pieces: [
                    //     {min: 0, max: 0,label:'低风险',color:'#EAE0D7'},
                    //     {min: 1, max: 1,label:'中风险',color:'#f46d43'},
                    //     {min: 2, max: 2,label:'高风险',color:'#a50026'},
                    // ],
                    // },
                    geo: [{
                        map: 'China',
                        itemStyle: {
                            color: "#000"
                        }
                    }],
                    series: [
                        {
                            name: "",
                            nameProperty: "name",
                            type: "map",
                            map: "",
                            roam: false,
                            zoom: 1,
                            data: [],
                            normal: {
                                label: {
                                    show: true,
                                },
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "rgb(144 144 144)",
                                        },
                                    },
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                    }
                                }
                            }
                        },
                        {
                            name: "",
                            coordinateSystem: 'geo',
                            type: 'lines',
                            // polyline: true,
                            // effect: {
                            //     show: true,
                            //     trailWidth: 1,
                            //     trailOpacity: 0.5,
                            //     trailLength: 0.2,
                            //     constantSpeed: 5
                            // },

                            // blendMode: 'lighter',

                            lineStyle: {
                                color: '#000',
                                width: 1,
                                opacity: 0.6
                            },

                            data: [
                            ]
                        }
                    ]
                },
            }
        },
        watch: {
            // mapName() {
            //     this.loadMap();
            // },
            curr() {
                console.log(this.curr);
                var posMap;
                var curr = this.curr;
                $.ajax({
                    url: "https://www.umetrip.com/gateway/api/web/umeflightstatus-live/live/getlivestatistics",
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {
                        province: this.curr
                    },
                    success: function (response) {
                        // console.log(response);
                        console.log(curr);
                        posMap = response.posMap[curr];
                    }
                });
                console.log(posMap);
                this.setCoords(posMap)
            }
        },
        methods: {
            loadMap() {
                mapData = require("../../data/map/json/GeoMapData_CN/" + this.mapName);
                echarts.registerMap("China", mapData);
                this.option["series"][0]["name"] = this.mapName;
                this.option["series"][0]["map"] = this.mapName;
                this.myChart.setOption(this.option);
                this.myChart.hideLoading();
            },
            clickevent(param) {
                this.curr = data.find(function (item) {
                    return item.name === param.name;
                }).shorter;
            },
            setCoords (data) {
                if (data !== undefined) {
                    this.option["series"][1].data = data;
                    this.myChart.setOption(this.option);
                    this.myChart.hideLoading();
                } else {
                    this.option["series"][1].data = [];
                    this.myChart.setOption(this.option);
                    this.myChart.hideLoading();
                }
            }
        }
    }

</script>

<style scoped>

</style>