<template>
	<div class="root">
		<h1 style='margin-top:100px;'>This is Test Page</h1>

		<h1>{{ locationInfo }}</h1>
		
		<airline-detail ref="AirlineDetail"></airline-detail>
	</div>
</template>

<script>
// import TravelCard from '../components/common/TravelCard.vue'

// import GlobalMap from '../components/charts/GlobalMap.vue'
// import CommentCard from '../components/common/CommentCard.vue'
import AirlineDetail from "../components/AirlineDetail";
// import RiskMap from "../components/RiskMap";
// var coviddata = require("../data/samples/GlobalMapSample.json")
export default {
	name: 'Test',
	components: {
		// RiskMap,
		AirlineDetail,
		// GlobalMap,
		// TravelCard,
	},
	data() {
      return {
        locationInfo: {
			ip: '',
			country: '',
			province: '',
			city: '',
			district: '',
			location: '',
		}
      };
    },
	mounted () {
		// eslint-disable-next-line
		this.locationInfo.ip = returnCitySN.cip

		var _this = this
		this.$axios.get("https://restapi.amap.com/v5/ip?key=a593d64ab73229be6b3d1ef802b76849&type=4&ip="+this.locationInfo.ip)
			.then( response => {
				_this.locationInfo.country = response.data.country
				_this.locationInfo.province = response.data.province
				_this.locationInfo.city = response.data.city
				_this.locationInfo.district = response.data.district
				_this.locationInfo.location = response.data.location

				console.log(_this.locationInfo)
			})
	}
}
</script>

<style>
#container {width:300px; height: 180px; }
</style>
