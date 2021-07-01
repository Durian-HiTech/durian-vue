<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
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
  color: #191919;
}

</style>
