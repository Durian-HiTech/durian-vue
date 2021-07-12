<template>
	<div class="root">
		<h1 style='margin-top:100px;'>This is Test Page</h1>
		
		<Location/>

		<airline-detail ref="AirlineDetail"></airline-detail>
	</div>
</template>

<script>
import Location from '../components/Location.vue'
import AirlineDetail from "../components/AirlineDetail";
export default {
	name: 'Test',
	components: {
		AirlineDetail,
		Location,
	},
}
</script>

<style>

</style>
