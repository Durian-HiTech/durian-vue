<template>
	<center>
		<div class='avatar' @mouseenter="mouseEnter()" @mouseleave="mouseLeave()">
			<img v-if="isLogined" src="../../assets/avatar/cat.jpg">
			<img v-if="!isLogined" src="../../assets/avatar/cat_grey.jpg">
			<span v-if="isLogined" class="name">{{ userState.userName }}</span>
		</div>
	</center>
</template>

<script>
export default {
	name: 'UserAvatar',
	computed: {
		userState () {
			return this.$store.getters.userState
		},
		isLogined () {
			return this.userState.isLogined
		}
	},
	methods: {
		mouseEnter () {
			this.$gsap.to(".avatar", {
						duration: 0.5, ease: 'power4.out',
						height: '300px', width: '250px', 
						boxShadow:'0px 0px 30px 5px rgba(128, 128, 128, 0.25)',
						borderRadius: '15%',
						})
			this.$gsap.to(".avatar img", {
						duration: 0.5, ease: 'power4.out',
						top: "15px"
						})
		},
		mouseLeave () {
			this.$gsap.to(".avatar", {
						duration: 0.5, ease: 'power4.out',
						height: '40px', width: '40px', 
						boxShadow: '0px 0px 10px 2px rgba(128, 128, 128, 0.1)',
						borderRadius: '50%',
						})
			this.$gsap.to(".avatar img", {
						duration: 0.5, ease: 'power4.out',
						top: "0px"
						})
		},
	}
}
</script>

<style>
.avatar {
	/* outline: #00ff00 dotted thick; */
	height: 40px;
	width: 40px;
	position: relative;
	backdrop-filter: blur(20px);
	background-color: rgba(255,255,255,0.5);
	
	border-radius: 50%;
	border: #bfbec0 solid thin;
	
	boxShadow: 0px 0px 10px 2px rgba(128, 128, 128, 0.1);
	
	overflow: hidden;
	white-space: nowrap; 
}
.avatar img {
	height: 40px;
	width: 40px;
	
	border-radius: 50%;	
	position: relative;
}
.name {
	margin-left: 10px;
	position: relative;
}
</style>
