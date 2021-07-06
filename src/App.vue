<template>
  <!-- <v-app>
    <v-main>
      <router-view/>
      <user-avatar id='user-avatar'/>
      <NavButton id='NavButton'/>
    </v-main>
  </v-app> -->
  <div id="app">
    <user-avatar id='user-avatar'/>
    <NavButton id='NavButton'/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import UserAvatar from './components/common/UserAvatar.vue'
import NavButton from './components/common/NavButton.vue'
import Footer from './components/common/Footer.vue'
export default{
	name: 'App',
	components: {
		UserAvatar,
		NavButton,
    Footer
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

#user-avatar {
	position: fixed;
	right: 20px;
	top: 20px;
	z-index: 10;
}

#NavButton {
	position: fixed;
	left: 20px;
	top: 20px;
	z-index: 9;
}
</style>
