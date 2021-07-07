<template>
  <div>
		<div class="covidMap" style="position: relative;"
		@mouseenter="mouseEnter1()" @mouseleave="mouseLeave1()">
			<div id="mask1">
				<h1 style="color: white;">Covid Map</h1>
			</div>
			<covid-map></covid-map>
		</div>
		
		<div class="riskMap" style="position: relative;"
		@mouseenter="mouseEnter2()" @mouseleave="mouseLeave2()">
			<div id="mask2">
				<h1 style="color: white;">Risk Map</h1>
			</div>
			<risk-map></risk-map>
		</div>
		
		<div class="wraper">
			<div class="section" @click="toNews ()" style="cursor: pointer">
				<h1 style="color: white;">News</h1>
			</div>
			
			<div class="section" @click="toVaccine ()" style="cursor: pointer">
				<h1 style="color: white;">Vaccine</h1>
			</div>
			
			<div class="section" @click="toQuestion ()" style="cursor: pointer">
				<h1 style="color: white;">Question&Answer</h1>
			</div>
			
			<div class="section">
			</div>
		</div>
		
		
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
	methods: {
		mouseEnter1 () {
			this.$gsap.to("#mask1", {duration: 0.2, opacity: 0})
			this.$gsap.to("#mask1", {duration: 0.3, opacity: 0, bottom: '680px', ease: 'power2.out'})
			this.$gsap.to(".covidMap", {duration: 0.2, height: '680px', ease: 'power2.out'})
		},
		mouseLeave1 () {
			this.$gsap.to("#mask1", {duration: 0.2, opacity: 1})
			this.$gsap.to("#mask1", {duration: 0.3, opacity: 1, bottom: '0px', ease: 'power2.out'})
			this.$gsap.to(".covidMap", {duration: 0.2, height: '400px', ease: 'power2.out'})
		},
		mouseEnter2 () {
			this.$gsap.to("#mask2", {duration: 0.2, opacity: 0})
			this.$gsap.to("#mask2", {duration: 0.3, opacity: 0, bottom: '680px', ease: 'power2.out'})
			this.$gsap.to(".riskMap", {duration: 0.2, height: '680px', ease: 'power2.out'})
		},
		mouseLeave2 () {
			this.$gsap.to("#mask2", {duration: 0.2, opacity: 1})
			this.$gsap.to("#mask2", {duration: 0.3, opacity: 1, bottom: '0px', ease: 'power2.out'})
			this.$gsap.to(".riskMap", {duration: 0.2, height: '400px', ease: 'power2.out'})
		},
		toNews () {
			this.$router.push('/news')
		},
		toVaccine () {
			this.$router.push('/vaccine')
		},
		toQuestion () {
			this.$router.push('/question/all')
		}
	}
}
</script>

<style>
.covidMap {
	/* outline: #21ff06 dotted thick; */
	
	width: 100%;
	height: 400px;

	margin-bottom: 10px;
	overflow: hidden;
}
.riskMap {
	/* outline: #21ff06 dotted thick; */
	
	width: 100%;
	height: 400px;
	
	margin-bottom: 10px;
	overflow: hidden;
}

.wraper {
	width: 100%;
	height: 800px;
	
	margin-bottom: 10px;
	
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.section {
	/* outline: #21ff06 dotted thick; */
	background-color: burlywood;
	
	display: flex;
	justify-content: center;
	align-items: center;

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

	z-index: 3;
}

#mask2 {
	/* outline: #363636 dotted thick; */
	background-color: rgba(78,110,98, 0.85);
	width: 100%;
	height: 100%;
	
	position: absolute;
	display: flex; 
	align-items: center; 
	justify-content: center;

	z-index: 2;
}

#map {
	width: 100%; 
	height: 800px; 
	background-color: #565659;
}
</style>
