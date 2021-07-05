<template>
	<center>
		<div class='avatar' @mouseenter="mouseEnter()" @mouseleave="mouseLeave()">
			<div style="white-space: nowrap; ">
				<img v-if="isLogined" src="../../assets/avatar/cat.jpg">
				<img v-if="!isLogined" src="../../assets/avatar/cat_grey.jpg">
				<span v-if="isLogined" class="name">{{ userState.name }}</span>
				<router-link to='/login'>
					<el-button type="success" round plain
					v-if="!isLogined"
					style="margin-left: 20px;"
					>Login</el-button>
				</router-link>
			</div>
			<div style="height: 30px;"></div>
			<div class='info'>
				
				<div v-if="userState.isLogined" style="display: flex; flex-wrap: wrap; justify-content: center;">
					<b class='userTag'>
						<i class='el-icon-s-custom'></i>
						{{userType}}
					</b>
					<span v-if="userState.type==1" class='userTag' style="background-color: #dace0a;">
						<i class='el-icon-school'></i>
						{{userState.affiliation}}
					</span>
				</div>
				
			</div>
			<el-divider></el-divider>
			<el-button type="danger" round plain
			v-if="isLogined"
			size="medium"
			@click='unlogin()'
			>Unlogin</el-button>
			
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
		},
		userType() {
			return this.userState.type=='0' ? '普通用户' : '认证机构用户'
		}
	},
	methods: {
			unlogin () {

			this.$confirm('This will unlogin your account. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				this.$store.commit('reset')
				this.$router.push({path: '/'})
			}).catch(()=>{})
			
		},
		mouseEnter () {
			if (this.userState.isLogined) {
				this.$gsap.to(".avatar", {
							duration: 0.5, ease: 'power4.out',
							height: '300px', width: '250px', 
							boxShadow:'0px 0px 30px 5px rgba(128, 128, 128, 0.25)',
							borderRadius: '30px',
							})
			} else {
				this.$gsap.to(".avatar", {
							duration: 0.5, ease: 'power4.out',
							height: '72px', width: '250px', 
							boxShadow:'0px 0px 30px 5px rgba(128, 128, 128, 0.25)',
							borderRadius: "20px",
							})
			}
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
.userTag {
  white-space: nowrap;
  text-align: center;

  font-size: 13px;

  background-color: #26BEB8;
  color: white;

  border-radius: 10px;

  padding: 2px 8px 2px 8px;
  margin: 3px;
}
</style>
