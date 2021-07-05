<template>
	<div class="root">
		<h1>This is Test Page</h1>
		<br>
		<h2 style="margin-top: 20px;">Test func</h2>
		<el-button @click="test()"> test </el-button>
		<br>
		<h2 style="margin-top: 20px;"> user state</h2>
		<el-button @click="login()"> login </el-button>
		<el-button @click="reset()"> reset </el-button>
	</div>
</template>

<script>
export default {
	name: 'Test',
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
		test() {
			this.$message({message: 'register succeeded!',
							type: 'success'})
		}
	},
	computed: {
		count () {
			return this.$store.getters.count
		}
	}
}
</script>

<style>

</style>
