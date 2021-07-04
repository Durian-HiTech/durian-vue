<template>
	<div class="root">
		<h1>This is Test Page</h1>
		<h2 style="margin-top: 20px;">vuex storage example</h2>
		<el-button @click="increment()"> increment </el-button>
		<el-button @click="reset()"> reset </el-button>
		<br>
		<div> {{count}} </div>
	</div>
</template>

<script>
export default {
	name: 'Test',
	methods: {
		increment () {
			this.$store.commit('increment')
		},
		reset () {
			this.$store.commit('reset')
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
