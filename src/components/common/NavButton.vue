<template>
	<div @mouseleave="mouseLeave()">
	<div class='NavButton' @mouseenter="mouseEnter()" @click="toHome()" style="cursor:pointer">
		<i class='el-icon-s-home'></i>
	</div>
	
	<div class='NavItem' @click="toNews()" style="cursor:pointer">
		<i class='el-icon-document-copy' style='margin-right: 5px'></i>
		新闻页面
	</div>
	
	<div class='NavItem'>
		<i class='el-icon-office-building' style='margin-right: 5px'></i>
		我的城市
	</div>
	
	<div class='NavItem'>
		<i class='el-icon-position' style='margin-right: 5px'></i>
		行程提醒
	</div>
	
	</div>
</template>

<script>
export default {
	name: 'NavButton',
	methods: {
		mouseEnter() {
			this.$gsap.to(".NavButton", {
						duration: 0.5, ease: 'power4.out',
						width: '200px', 
						boxShadow:'0px 0px 30px 5px rgba(128, 128, 128, 0.25)',
						borderRadius: '30px',
						})
			
			this.$gsap.fromTo('.NavItem', { 
						duration: 1, 
						ease: 'power4.out',
						top: "+=40px", 
						opacity: 0, 
						}, {
						duration: 1,
						ease: 'power4.out', 
						top: "0px", 
						opacity: 1, 
						stagger: {
							amount: 0.2
						}})
		},
		mouseLeave() {
			this.$gsap.to(".NavButton", {
						duration: 0.5, ease: 'power4.out',
						width: '40px', 
						boxShadow:'0px 0px 10px 2px rgba(128, 128, 128, 0.1)',
						borderRadius: '50%',
						})
			this.$gsap.to('.NavItem', { 
						duration: 1, 
						ease: 'power4.out',
						opacity: 0
						})
		},
		toHome () {
			this.$router.push('/')
		},
		toNews () {
			this.$router.push('/news')
		}
	}
}
</script>

<style>
.NavButton {
	/* outline: #00ff00 dotted thick; */
	height: 40px;
	width: 40px;
	position: relative;
	backdrop-filter: blur(20px);
	background-color: rgba(255,255,255,0.5);
	
	border-radius: 50%;
	border: #bfbec0 solid thin;
	
	box-shadow: 0px 0px 10px 2px rgba(128, 128, 128, 0.1);
	
	overflow: hidden;

	display: flex;
	justify-content: center;
	align-items: center;

	color: rgb(65, 65, 65) ;
	font-size: 25px;
}
.NavItem {
	/* outline: #00ff00 dotted thick; */
	width: 200px;
	height: 40px;

	color: rgb(65, 65, 65);

	position: relative;
	backdrop-filter: blur(20px);
	background-color: rgba(255,255,255,0.5);
	margin-top: 10px;
	
	border-radius: 30px;
	border: #bfbec0 solid thin;
	
	box-shadow: 0px 0px 30px 5px rgba(128, 128, 128, 0.25);
	
	overflow: hidden;

	opacity: 0;

	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
