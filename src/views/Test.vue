<template>
	<div class="root">
		<h1>This is Test Page</h1>
		<br>
		<h2 style="margin-top: 20px;"> user state</h2>
		<el-button @click="login()"> login </el-button>
		<el-button @click="reset()"> reset </el-button>

		<h2 style="margin-top: 20px;"> covid map </h2>
		<CovidMap id='CovidMap'/>
	</div>
</template>

<script>
import CovidMap from '../components/CovidMap.vue'
export default {
	name: 'Test',
	components: {
		CovidMap
	},
	methods: {
		reset () {
			this.$store.commit('reset')
		},
		login () {
			this.$store.commit('login', {
				name: 'John Keats',
				id: '10',
				type: '1',
				affiliation: 'Oxford'
			})
		},

	},
}
</script>

<style>
#CovidMap {
	outline: #00ff00 dotted thick;
}
</style>
