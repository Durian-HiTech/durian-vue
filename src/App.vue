<template>
  <div id="app">
    <UserAvatar/>
    <NavBar/>
    <!-- <NavButton id='NavButton'/> -->
    <router-view/>
    <Footer/>
    
  </div>
</template>

<script>
// import NavButton from './components/common/NavButton.vue'
import Footer from './components/common/Footer.vue'
import NavBar from './components/common/NavBar.vue'
import UserAvatar from './components/common/UserAvatar.vue'
export default{
	name: 'App',
	components: {
		Footer,
		NavBar,
    UserAvatar,
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
