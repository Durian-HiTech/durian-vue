<template>
	<div class="root">
		<h1>This is Test Page</h1>
		<br>
		<h2 style="margin-top: 20px;"> user state</h2>
		<el-button @click="login()"> login </el-button>
		<el-button @click="reset()"> reset </el-button>



		<global-map></global-map>
	</div>
</template>

<script>

import GlobalMap from '../components/charts/GlobalMap.vue'
export default {
	name: 'Test',
	components: {
		GlobalMap,
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
