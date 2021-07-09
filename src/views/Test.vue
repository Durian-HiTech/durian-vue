<template>
	<div class="root">
		<h1 style='margin-top:100px;'>This is Test Page</h1>
		<br>
		<h2 style="margin-top: 20px;"> user state</h2>
		<el-button @click="login()"> login </el-button>
		<el-button @click="reset()"> reset </el-button>



		<global-map></global-map>
		<SearchCity/>
		
		<center>
		<CommentCard user="John Keats" time="3天前" :isAuthority="true" content='The only completely stationary object in the room was an enormous couch on which two young women were buoyed up as though upon an anchored balloon. They were both in white, and their dresses were rippling and fluttering as if they had just been blown back in after a short flight around the house. I must have stood for a few moments listening to the whip and snap of the curtains and the groan of a picture on the wall. Then there was a boom as Tom Buchanan shut the rear win- dows and the caught wind died out about the room, and the curtains and the rugs and the two young women ballooned slowly to the floor.'/>
		</center>
		<!-- <global-map></global-map> -->
	</div>
</template>

<script>

// import GlobalMap from '../components/charts/GlobalMap.vue'
import CommentCard from '../components/common/CommentCard.vue'

export default {
	name: 'Test',
	components: {
		// GlobalMap,
		CommentCard,
	},
	methods: {
		reset () {
			this.$store.commit('reset')
		},
		login () {
			this.$store.commit('login', {
				name: 'John Keats',
				id: '10',
				type: '1',
				affiliation: 'Oxford'
			})
		},
		/**
		 * @param {Object} index
		 * @param {Object} differkey : differkey是对应的SelectBar的第一个选项的名字，用于区分不同的SelectBar
		 */
		selected (index, differkey) {
			if (differkey == 'table') {
				switch(index)
				{
					case 0:
						console.log(0)
						break
					case 1:
						console.log(1)
						break
					case 2:
						console.log(2)
						break
				}
			}
		}
	},
}
</script>

<style>

</style>
