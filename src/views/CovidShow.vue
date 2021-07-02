<template>
	<div class="covidMap">
    <!-- <iframe :src="ruta"></iframe> -->
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
</template>

<script>
export default {
    data: () => ({
        ruta: 'https://covid19.health/'
    })
}
</script>

<style>
.covidMap {
	/* outline: #21ff06 dotted thick; */
	background-color: #2C3E50;
	
	width: 100%;
	height: 1000px;
	
	margin-bottom: 10px;
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
	
	width: 49%;
	margin-bottom: 10px;
}
</style>