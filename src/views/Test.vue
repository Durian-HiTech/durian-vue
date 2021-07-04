<template>
	<div class="root">
		<h1>This is Test Page</h1>
		<br>
		<h2 style="margin-top: 20px;">Test button</h2>
		<el-button @click="login()"> login </el-button>
		<el-button @click="unlogin()"> unlogin </el-button>
	</div>
</template>

<script>
export default {
	name: 'Test',
	methods: {
		login () {
			this.$store.commit('login')
		},
		unlogin () {
			this.$store.commit('unlogin')
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
