<template>
	<div class="root">
		<h1>This is Test Page</h1>
		<br>
		<h2 style="margin-top: 20px;"> user state</h2>
		<el-button @click="login()"> login </el-button>
		<el-button @click="reset()"> reset </el-button>

		<h2 style="margin-top: 20px;"> user state</h2>
		<NewsCard/>
	</div>
</template>

<script>
import NewsCard from "../components/common/NewsCard.vue"
export default {
	name: 'Test',
	components: {
		NewsCard
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

</style>
