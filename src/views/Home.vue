<template>
	<div class="homeRoot">
		<div class="homeRightSection">
			<div class="homeHeader">
			</div>

			<div class="homeOverview">
				<div v-for="(data, index) in overviewData" :key="index">
					<LittleDataCard :nownum="data.nownum" :type="data.type" :newnum="data.newnum" :color="data.color" />
				</div>
			</div>

			<div class="homeTable">
			</div>
		</div>
	</div>
</template>

<script>
import LittleDataCard from '../components/common/LittleDataCard'
export default {
	name: 'Home',
	components: {
		LittleDataCard,
	},
	data() {
		return {
			overviewData : [
				{
					nownum: 123143241,
					type: '确诊',
					newnum: 2313,
					color: '#AC3500',
				},
				{
					nownum: 123143241,
					type: '死亡',
					newnum: 2313,
					color: '#AC3500',
				},
				{
					nownum: 123143241,
					type: '治愈',
					newnum: 2313,
					color: "#00ACA5",
				},
				{
					nownum: 123143241,
					type: '疫苗',
					newnum: 2313,
					color: "#00ACA5",
				}
			]
		}
	},

	methods: {

	},
}
</script>

<style>
.homeRoot {
	margin-top: 45px;
}
.homeRightSection {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.homeOverview {
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding-left: 30px;
	padding-right: 30px;
	padding-top: 10px;
	padding-bottom: 10px;
	border: #cccccc solid thin;
	border-radius: 40px;
}
</style>
