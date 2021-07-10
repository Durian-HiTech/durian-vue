<template>
  <div class="travelRoot">
	<span class="travelTitle" >
		<span class='titleText'>
			<b>Covid</b> <span>Travel</span>
		</span>
		<SelectBar class='SelectBar' :buttons="buttons"/>
	</span>
    <el-divider/>

	<!-- China -->
	<div class="travelChina" v-if="showChina">
		<div class="travelMain">

			<div class="travelUpSection">

				<div style="display: flex;">	
					<div style='width: 500px'>
						<el-button  style="font-size: 18px; font-weight: bold; margin: 20px;" round>国内预警航线</el-button>
						<TravelCard startTime='2020.6.2 12:30' arriveTime='2020.6.3 12:30' start='圣弗朗西斯科' destination='上海' num='D8828' status='已取消'/>
					</div>

					<div style='width: 500px; margin-left: 50px;'>
						<el-button  style="font-size: 18px; font-weight: bold; margin: 20px;" round>国内预警高铁</el-button>
						<TravelCard startTime='2020.6.2 12:30' arriveTime='2020.6.3 12:30' start='北京' destination='上海' num='D8828' status='已取消'/>
					</div>
				</div>

			</div>

			<div class="travelDownSection">

				<div class="travelMap">
					<!-- This is the map -->
				</div>

				<div class="travelTable">
					<TravelTable/>
				</div>

			</div>

		</div>
	</div>
	
	<!-- World -->
	<div class="travelWorld" v-if="!showChina">
		<div class="travelMain">

			<div class="travelUpSection">

				<div style="display: flex;">	
					<div style='width: 500px'>
						<el-button  style="font-size: 18px; font-weight: bold; margin: 20px;" round>国内出发预警航线</el-button>
						<TravelCard startTime='2020.6.2 12:30' arriveTime='2020.6.3 12:30' start='圣弗朗西斯科' destination='上海' num='D8828' status='已取消'/>
					</div>

					<div style='width: 500px; margin-left: 50px;'>
						<el-button  style="font-size: 18px; font-weight: bold; margin: 20px;" round>国际到达预警航线</el-button>
						<TravelCard startTime='2020.6.2 12:30' arriveTime='2020.6.3 12:30' start='北京' destination='上海' num='D8828' status='已取消'/>
					</div>
				</div>


			</div>

			<div class="travelDownSection">

				<div class="travelMap">
					<!-- This is the map -->
				</div>

				<div class="travelTable">
					This is the table
				</div>

			</div>

		</div>
	</div>

	<div class="track" style="padding:20px;margin:0 auto;margin-top:70px;">
		<div style="font-size:30px;padding:5px">
				疫情轨迹
		</div>
		<div class="trackCardRoot">
			<div class="row">
				<div class="trackCity">印度尼西亚</div>
				<track-card destination="浙江杭州"></track-card>
				<track-card destination="浙江徐州"></track-card>
			</div>
		</div>
		<div class="trackCardRoot">
			<div class="row">
				<div class="trackCity">广州东莞</div>
				<track-card destination="陕西咸阳"></track-card>
				<track-card destination="紫阳县汉王镇"></track-card>
			</div>
		</div>
		<div class="trackCardRoot">
			<div class="row">
				<div class="trackCity">北京</div>
				<track-card destination="广州"></track-card>
				<track-card destination="深vbhhshfdsdfdasfs圳"></track-card>
				<track-card destination="深大范德萨范德萨发生	"></track-card>
			</div>
		</div>
	</div>

  </div>
</template>
<script>
import SelectBar from '../components/common/SelectBar.vue'
import TravelCard from '../components/common/TravelCard.vue'
import TravelTable from '../components/charts/TravelTable.vue'
import TrackCard from '@/components/common/TrackCard.vue'
export default {
  name: "Travel",
  components: {
	SelectBar,
	TravelCard,
	TravelTable,
    TrackCard,
  },
  data() {
    return {
		SearchInput: '',
		buttons: ['国内', '国际'],
		showChina: true,
    }
  },
  methods: {
	selected (index, differkey) {
	if (differkey == '国内') {
		switch(index)
		{
			case 0:
				this.showChina = true
				break
			case 1:
				this.showChina = false
				break
		}
	}
	},
  }
}
</script>
<style scoped>

	.travelRoot {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	}

	.travelTitle {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 70px;

	position: relative;
	right: 400px;
	}
	.titleText {
		font-size: 30px; 
		align-self: flex-start; 
		position: relative;
		
	}
	.travelTitle .SelectBar {
		/* outline: #00ff00 dotted thick; */

		margin-left: 30px;
	}


	.travelMain {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	}
	.travelUpSection {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.travelMap {
	/* background-color: rgb(0, 0, 0); */
	justify-content: center;
	align-items: center;
	text-align:cente;
	width: 800px;
	height: 650px;
	margin: 30px;

	border: #cccccc solid thin;
	border-radius: 40px;
	}
	.travelDownSection {
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.travelTable {
	margin-left: 20px; 
	width: 550px;
	}
	.track {
		border: #cccccc solid thin;
		border-radius: 40px;
		width: 80%;
		justify-content: center;
		align-items: center;
	}
	.trackCardRoot {
	border: #bfbec0 solid thin;
	border-radius: 30px;
	width: auto;
	height: 120px;
	
	position: relative;
	
	display: flex;
	/* flex-direction: column; */
	align-items: center;
	justify-content: space-around;
	white-space: nowrap;
	}
	.trackCity {
	font-size: 40px;
	font-weight: bold;
	
	white-space: nowrap;
	text-align: center;
	
	font-size: 27px;
	font-weight: 500;
	
	background-color: #e6e6e6;
	
	border-radius: 30px;
	
	padding: 5px 15px 5px 15px;
	margin: 3px;
	
	}
	.row {
		display: flex;
		margin-right: 0px;
		flex-direction: row;
	}
</style>
