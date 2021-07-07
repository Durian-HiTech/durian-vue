<template>
	<div class="root">
		<h1>This is Test Page</h1>
		<br>
		<h2 style="margin-top: 20px;"> user state</h2>
		<el-button @click="login()"> login </el-button>
		<el-button @click="reset()"> reset </el-button>
		<!-- <center style="display: flex; justify-content: center; align-items: center; background-color: #575551; padding:100px;"> -->
		<!-- <SelectBar :buttons="buttons"/> -->
		<!-- <SelectBarForCovidMap :buttons="buttons"/> -->
		<!-- </center> -->

		<!-- <CovidMap/> -->
		<QuestionList/>
	</div>
</template>

<script>
// import SelectBar from '../components/common/SelectBar.vue'
// import SelectBarForCovidMap from '../components/common/SelectBarForCovidMap'
// import CovidMap from '../components/CovidMap'
import QuestionList from '../components/QuestionList'
export default {
	name: 'Test',
	components: {
		// SelectBar,
		// CovidMap,
		// SelectBarForCovidMap,
		QuestionList
	},
	data() {
		return {
			buttons: [
				"table",
				"map",
				"index",
			]
		}
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
		/**
		 * @param {Object} index
		 * @param {Object} differkey : differkey是对应的SelectBar的第一个选项的名字，用于区分不同的SelectBar
		 */
		selected (index, differkey) {
			if (differkey == 'table') {
				switch(index)
				{
					case 0:
						console.log(0)
						break
					case 1:
						console.log(1)
						break
					case 2:
						console.log(2)
						break
				}
			}
		}
	},
}
</script>

<style>

</style>
