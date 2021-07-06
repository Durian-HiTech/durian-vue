<template>
	<div>
		<div class="covidMap" style="position: relative;"
		@mouseenter="mouseEnter()" @mouseleave="mouseLeave()">
			<div id="mask1">
				<h1 style="color: white;">Covid Map</h1>
			</div>
			<iframe id='map' :src="ruta"></iframe>
		</div>
		
		<div class="news">
			
		</div>
		
		<div class="wraper">
			<div class="section">
			</div>
			
			<div class="section">
			</div>
			
			<div class="section">
			</div>
			
			<div class="section">
			</div>
		</div>
		<covid-map></covid-map>
		<risk-map></risk-map>
	</div>
</template>

<script>
import CovidMap from '../components/CovidMap'
import RiskMap from "../components/RiskMap";
export default {
	name: 'Home',
	components:{
		RiskMap,
		CovidMap
	},
    data: () => ({
        ruta: 'https://covid19.health/'
    }),
	methods: {
		mouseEnter () {
			this.$gsap.to("#mask1", {duration: 0.2, opacity: 0})
			this.$gsap.to("#mask1", {duration: 0.3, opacity: 0, bottom: '800px', ease: 'power2.out'})
			this.$gsap.to(".covidMap", {duration: 0.2, height: '800px', ease: 'power2.out'})
		},
		mouseLeave () {
			this.$gsap.to("#mask1", {duration: 0.2, opacity: 1})
			this.$gsap.to("#mask1", {duration: 0.3, opacity: 1, bottom: '0px', ease: 'power2.out'})
			this.$gsap.to(".covidMap", {duration: 0.2, height: '600px', ease: 'power2.out'})
		}
	}
}
</script>

<style>
.covidMap {
	/* outline: #21ff06 dotted thick; */
	
	width: 100%;
	height: 600px;

	margin-bottom: 10px;
	overflow: hidden;
}
.news {
	/* outline: #21ff06 dotted thick; */
	background-color: antiquewhite;
	
	width: 100%;
	height: 600px;
	
	margin-bottom: 10px;

}

.wraper {
	width: 100%;
	height: 900px;
	
	margin-bottom: 10px;
	
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.section {
	/* outline: #21ff06 dotted thick; */
	background-color: burlywood;
	
	width: 49.5%;
	height: 49%;
}
#mask1 {
	/* outline: #363636 dotted thick; */
	background-color: rgba(54, 54, 54, 0.85);
	width: 100%;
	height: 100%;
	
	position: absolute;
	display: flex; 
	align-items: center; 
	justify-content: center;
}
#map {
	width: 100%; 
	height: 800px; 
	background-color: #565659;
}
</style>