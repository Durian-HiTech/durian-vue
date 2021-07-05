<template>
  <div id="app">
	<user-avatar id='user-avatar'/>
	<NavButton id='NavButton'/>
    <router-view/>
  </div>
</template>

<script>
import UserAvatar from './components/common/UserAvatar.vue'
import NavButton from './components/common/NavButton.vue'
export default{
	name: 'App',
	components: {
		UserAvatar,
		NavButton
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
