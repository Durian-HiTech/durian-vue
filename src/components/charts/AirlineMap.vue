<template>
    <div id="airline-map-root">
        <SelectBar class="SelectBar" :buttons="buttons1"/>
        <div style="display: flex">
            <v-app>
                <v-card class="route-table">
                    <v-card-title>
                        <v-text-field
                                v-model="departActual"
                                label="出发地"
                                single-line
                                hide-details
                                color="#00ACA5"
                        ></v-text-field>
                        →
                        <v-text-field
                                v-model="arriveActual"
                                label="到达地"
                                single-line
                                hide-details
                                color="#00ACA5"
                        ></v-text-field>
                        <el-button style="font-size: 18px; font-weight: bold; margin: 20px;" round
                                   @click="updateRoute">查询
                        </el-button>
                    </v-card-title>

                    <v-card-text>
                        <div v-if="showRouteType===0" class="flight-route-list">
                            <TravelCard class='route-list-card' v-for="item in currFlights"
                                        :key="item.flight_number"
                                        :startTime='item.departure_date'
                                        :arriveTime='item.arrival_date'
                                        :start='item.departure_city_name'
                                        :destination='item.arrival_city_name'
                                        :num='item.flight_number'
                                        :status='item.status'/>
                        </div>
                        <div v-else-if="showRouteType===1" class="train-route-list">
                            <TravelCard class='route-list-card' v-for="item in currTrains"
                                        :key="item.train_id"
                                        :startTime='item.train_start_date'
                                        :arriveTime='item.train_start_date'
                                        :start='item.departure_city'
                                        :destination='item.arrival_city'
                                        :num='item.train_id'
                                        :status='0'/>
                        </div>
                    </v-card-text>
                </v-card>
            </v-app>
            <div id="airline-map" style="width: 1000px; height: 800px;"></div>
        </div>
        <SelectBar class="SelectBar" :buttons="buttons"/>
        <airline-table ref="AirlineTable"
                       :table-data="this.tableData"
                       :province="this.curr"></airline-table>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import AirlineTable from "./AirlineTable";
    import SelectBar from "../common/SelectBar";
    import api from "../../commonApi";
    import $ from "jquery";
    import TravelCard from "../common/TravelCard";

    var mapData;
    var data = [];
    var chartData = [];
    // eslint-disable-next-line no-unused-vars
    var arrCivil = [];
    // eslint-disable-next-line no-unused-vars
    var depCivil = [];

    export default {
        name: "AirlineMap",
        components: {
            TravelCard,
            AirlineTable,
            SelectBar
        },
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
            $.ajax({
                url: "https://www.umetrip.com/gateway/api/web/umeflightstatus-live/live/getchartstatistics",
                type: 'POST',
                async: false,
                dataType: 'json',
                data: {},
                success: function (response) {
                    // console.log(response);
                    chartData = response
                }
            });
            // console.log(chartData);
            arrCivil = chartData.arrCivil;
            depCivil = chartData.depCivil;
            var coords = [
                this.departCoord,
                this.arriveCoord
            ];
            this.setCoords([
                coords
            ])

        },
        data() {
            return {
                myChart: "",
                mapName: "China",
                curr: "",
                buttons: ["国内进港", "国内出港"],
                buttons1: ["航班查询", "列车查询"],
                switchContent: 0,
                showRouteType: 0,       //0显示航班，1显示列车
                tableData: [],
                departActual: "",
                arriveActual: "",
                departCity: "北京",
                departCoord: [116.231280, 40.220770],
                arriveCity: "上海",
                arriveCoord: [121.489410, 31.405270],
                currFlights: [
                    {
                        "airline_name": "南方航空",
                        "flight_number": "CZ8887",
                        "departure_date": "2021-07-14T12:00:00Z",
                        "arrival_date": "2021-07-14T14:10:00Z",
                        "departure_city_name": "北京",
                        "departure_airport_name": "大兴国际机场",
                        "arrival_city_name": "上海",
                        "arrival_airport_name": "虹桥国际机场",
                        "status": "已取消"
                    },
                    {
                        "airline_name": "南方航空",
                        "flight_number": "CZ4461",
                        "departure_date": "2021-07-14T16:40:00Z",
                        "arrival_date": "2021-07-14T18:50:00Z",
                        "departure_city_name": "北京",
                        "departure_airport_name": "大兴国际机场",
                        "arrival_city_name": "上海",
                        "arrival_airport_name": "浦东国际机场",
                        "status": "已取消"
                    },
                    {
                        "airline_name": "南方航空",
                        "flight_number": "CZ8885",
                        "departure_date": "2021-07-14T16:00:00Z",
                        "arrival_date": "2021-07-14T18:20:00Z",
                        "departure_city_name": "北京",
                        "departure_airport_name": "大兴国际机场",
                        "arrival_city_name": "上海",
                        "arrival_airport_name": "虹桥国际机场",
                        "status": "已取消"
                    },
                ],
                currTrains: [
                    {
                        "train_id": "G103",
                        "departure_city": "北京",
                        "arrival_city": "南京",
                        "departure_station": "北京南",
                        "arrival_station": "南京南",
                        "train_start_date": "2021-07-12",
                        "departure_time": "06:20",
                        "arrival_time": "10:40",
                        "duration_time": "4小时20分钟",
                        "pass_city": []
                    },
                    {
                        "train_id": "G171",
                        "departure_city": "北京",
                        "arrival_city": "南京",
                        "departure_station": "北京南",
                        "arrival_station": "南京南",
                        "train_start_date": "2021-07-12",
                        "departure_time": "06:30",
                        "arrival_time": "11:10",
                        "duration_time": "4小时40分钟",
                        "pass_city": []
                    },
                    {
                        "train_id": "G1",
                        "departure_city": "北京",
                        "arrival_city": "南京",
                        "departure_station": "北京南",
                        "arrival_station": "南京南",
                        "train_start_date": "2021-07-12",
                        "departure_time": "07:00",
                        "arrival_time": "10:24",
                        "duration_time": "3小时24分钟",
                        "pass_city": []
                    },
                ],
                option: {
                    title: {
                        text: "行程显示",
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

                            data: []
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
                // console.log(this.curr);
                // var posMap;
                // var curr = this.curr;
                // $.ajax({
                //     url: "https://www.umetrip.com/gateway/api/web/umeflightstatus-live/live/getlivestatistics",
                //     type: 'POST',
                //     async: false,
                //     dataType: 'json',
                //     data: {
                //         province: this.curr
                //     },
                //     success: function (response) {
                //         // console.log(response);
                //         // console.log(curr);
                //         posMap = response.posMap[curr];
                //     }
                // });
                // console.log(posMap);
                // this.setCoords(posMap);
                var currContent;
                var _this = this;
                if (this.switchContent === 0) {
                    currContent = arrCivil.find(function (item) {
                        return item.provinceName === _this.curr;
                    });

                } else if (this.switchContent === 1) {
                    currContent = depCivil.find(function (item) {
                        return item.provinceName === _this.curr;
                    });
                }
                // console.log(currContent);
                this.tableData = [];
                this.tableData.push(currContent.now);
                this.tableData[0].name = "总计";
                this.tableData[0].execsumHis = currContent.execsumHis;
                currContent.airportInfoList.forEach(function (item) {
                    _this.tableData.push(item.now);
                    _this.tableData[_this.tableData.length - 1].name = item.airportName;
                    _this.tableData[_this.tableData.length - 1].execsumHis = item.execsumHis;
                });
            },
            switchContent() {
                var currContent;
                var _this = this;
                if (this.switchContent === 0) {
                    currContent = arrCivil.find(function (item) {
                        return item.provinceName === _this.curr;
                    });

                } else if (this.switchContent === 1) {
                    currContent = depCivil.find(function (item) {
                        return item.provinceName === _this.curr;
                    });
                }
                // console.log(currContent);
                this.tableData = [];
                this.tableData.push(currContent.now);
                this.tableData[0].name = "总计";
                this.tableData[0].execsumHis = currContent.execsumHis;
                currContent.airportInfoList.forEach(function (item) {
                    _this.tableData.push(item.now);
                    _this.tableData[_this.tableData.length - 1].name = item.airportName;
                    _this.tableData[_this.tableData.length - 1].execsumHis = item.execsumHis;
                });
            },
            showRouteType() {
                console.log(this.showRouteType)
            },
            departCity() {
                var _this = this;
                $.ajax({
                    url: api.baseApi + '/travel/find_center_city_coordinate',
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {
                        name: _this.departCity,
                    },
                    success: function (response) {
                        _this.departCoord = [parseFloat(response.data.longitude), parseFloat(response.data.latitude)]
                    }
                });
                console.log(this.departCoord);
                console.log(this.arriveCoord);
                $.ajax({
                    url: api.baseApi + '/travel/find_specific_flight_info',
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {
                        departure_city: _this.departCity,
                        arrival_city: _this.arriveCity,
                    },
                    success: function (response) {
                        _this.currFlights = response.data
                    }
                });
                var coords = [
                    this.departCoord,
                    this.arriveCoord
                ];
                this.setCoords([
                    coords
                ])
            },
            arriveCity() {
                console.log(this.arriveCity);
                var _this = this;
                $.ajax({
                    url: api.baseApi + '/travel/find_center_city_coordinate',
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {
                        name: _this.arriveCity,
                    },
                    success: function (response) {
                        _this.arriveCoord = [parseFloat(response.data.longitude), parseFloat(response.data.latitude)]
                    }
                });
                console.log(this.departCoord);
                console.log(this.arriveCoord);
                $.ajax({
                    url: api.baseApi + '/travel/find_specific_flight_info',
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: {
                        departure_city: _this.departCity,
                        arrival_city: _this.arriveCity,
                    },
                    success: function (response) {
                        _this.currFlights = response.data
                    }
                });
                console.log(this.currFlights);
                var coords = [
                    this.departCoord,
                    this.arriveCoord
                ];
                this.setCoords([
                    coords
                ])
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
            setCoords(data) {
                if (data !== undefined) {
                    this.option["series"][1].data = data;
                    this.myChart.setOption(this.option);
                    this.myChart.hideLoading();
                } else {
                    this.option["series"][1].data = [];
                    this.myChart.setOption(this.option);
                    this.myChart.hideLoading();
                }
            },
            selected(index, differkey) {
                if (differkey === "国内进港") {
                    this.switchContent = index;
                } else if (differkey === "航班查询") {
                    this.showRouteType = index;
                }
            },
            updateRoute() {
                if (this.arriveActual === "" || this.departActual === "") alert("输入不能为空！");
                else {
                    this.departCity = this.departActual;
                    this.arriveCity = this.arriveActual;
                    this.departActual = "";
                    this.arriveActual = "";
                }

            }
        }
    }

</script>

<style scoped>
    .route-table {
        width: 750px;
        height: 800px;
        overflow: hidden;
    }
    .route-list-card {
        margin: 15px;
    }
</style>