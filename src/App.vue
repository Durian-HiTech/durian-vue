<template>
  <div id="app">
    <HomePage/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HomePage from './views/HomePage.vue'

@Options({
	name: 'App',
	components: {
		HomePage
	},
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
