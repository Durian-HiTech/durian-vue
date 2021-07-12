<template>
    <div class="AirlineDetailRoot">
        <airline-map ref="AirlineMap">
        </airline-map>
        <el-button style="font-size: 18px; font-weight: bold; margin: 20px;" round>国内预警航线</el-button>
        <div class="TravelWarningList">
            <TravelCard v-for="item in risk_flights"
                        :key="item.flight_number"
                        :startTime='item.departure_date'
                        :arriveTime='item.arrival_date'
                        :start='item.departure_city_name'
                        :destination='item.arrival_city_name'
                        :num='item.flight_number'
                        :status='item.status'/>
        </div>
    </div>
</template>

<script>
    import AirlineMap from "./charts/AirlineMap";
    // import api from "../commonApi.js";
    // import $ from "jquery";
    import TravelCard from "./common/TravelCard";

    export default {
        name: "AirlineDetail",
        components: {TravelCard, AirlineMap},
        // data() {
        //     return {
        //
        //     }
        // }
        data() {
            return {
                risk_flights: [],
                risk_area: [
                    {
                        province: '云南',
                        city: '德宏',
                        level: 'high'
                    }
                ],
            }
        },
        created() {
            // var flights_data;
            // // var _this = this;
            // $.ajax({
            //     url: api.baseApi + "/travel/list_all_flights",
            //     type: 'GET',
            //     async: false,
            //     dataType: 'json',
            //     success: function (response) {
            //         flights_data = response.data;
            //     }
            // });
            // this.risk_flights = flights_data

            //     .filter(function (item) {
            //     return item.departure_city_name.search(_this.risk_area[0].province) !== 0 ||
            //         item.departure_city_name.search(_this.risk_area[0].city) !== 0 ||
            //         item.departure_airport_name.search(_this.risk_area[0].province) !== 0 ||
            //         item.departure_airport_name.search(_this.risk_area[0].city) !== 0 ||
            //         item.arrival_city_name.search(_this.risk_area[0].province) !== 0 ||
            //         item.arrival_city_name.search(_this.risk_area[0].city) !== 0 ||
            //         item.arrival_airport_name.search(_this.risk_area[0].province) !== 0 ||
            //         item.arrival_airport_name.search(_this.risk_area[0].city) !== 0
            // })

            // ;
            // console.log(this.risk_flights);
            // $.ajax({
            //     url: 'https://flights.ctrip.com/international/search/api/lowprice/calendar/getCalendarDetailList?v=0.6484558983472863',
            //     type: 'POST',
            //     async: false,
            //     dataType: 'json',
            //     data: {
            //         aCode: "BJS",
            //         dCode: "LUM",
            //         extparam: "",
            //         head: {
            //             auth: "",
            //             cid: "09031103315452306247",
            //             ctok: "",
            //             cver: "1.0",
            //             extension: [],
            //             lang: "01",
            //             sid: "8888",
            //             syscode: "09",
            //             xsid: ""
            //         },
            //         queryType: 2,
            //         srchDate: "2021-07-11",
            //         token: null
            //     },
            //     success: function (response) {
            //         console.log(response)
            //     }
            // })
            // $.ajax({
            //     url: 'https://flights.ctrip.com/itinerary/api/12808/products',
            //     type: 'POST',
            //     async: false,
            //     dataType: 'json',
            //
            //     data: {
            //         "flightWay": "Oneway",
            //         "classType": "ALL",
            //         "hasChild": false,
            //         "hasBaby": false,
            //         "searchIndex": 1,
            //         "airportParams": [
            //             {"dcity": 'BJS', "acity": 'SHA', "date": '2021-7-14'}
            //         ]
            //     },
            //     succeed: function (response) {
            //         console.log(response)
            //     }
            // })
        }
    }
</script>

<style scoped>

</style>