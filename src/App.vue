<template>
  <div id="app">
	<user-avatar id='user-avatar'/>
    <router-view/>
  </div>
</template>

<script>
import UserAvatar from './components/common/UserAvatar.vue'
export default{
	name: 'App',
	components: {
		UserAvatar
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
</style>
