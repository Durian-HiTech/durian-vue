<template>
  <div id="app">

    <!-- <NavButton id='NavButton'/> -->
    <router-view/>
    <Footer/>
	<NavBar/>
  </div>
</template>

<script>
// import NavButton from './components/common/NavButton.vue'
import Footer from './components/common/Footer.vue'
import NavBar from './components/common/NavBar.vue'
export default{
	name: 'App',
	components: {
		Footer,
		NavBar,
	}
}
</script>

<style>
*{		/* CSS Reset */
	margin : 0;
	padding : 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #191919;
}

</style>
