<template>
  <div class="root">
	<div class="travelTitle" >
		<div class='titleText'>
			<b>Covid</b> <span>Travel</span>
		</div>
		<SelectBar class='SelectBar' :buttons="buttons"/>
	</div>
    <el-divider/>

	<!-- China -->
	<div class="travelChina" v-if="showChina">
		<div class="travelMain">

			<div class="travelUpSection">

				<div class="travelMap">
					<!-- This is the map -->
				</div>

				<div class="travelTable">
					<TravelTable/>
				</div>

			</div>

			<div class="travelDownSection">

				<el-input  style="width: 300px " v-model="SearchInput" placeholder="请输入搜索内容"></el-input>
					
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

		</div>
	</div>
	
	<!-- World -->
	<div class="travelWorld" v-if="!showChina">
		<div class="travelMain">

			<div class="travelUpSection">

				<div class="travelMap">
					<!-- This is the map -->
				</div>

				<div class="travelTable">
					This is the table
				</div>

			</div>

			<div class="travelDownSection">

				<el-input  style="width: 300px " v-model="SearchInput" placeholder="请输入搜索内容"></el-input>
					
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

		</div>
	</div>

  </div>
</template>
<script>
import SelectBar from '../components/common/SelectBar.vue'
import TravelCard from '../components/common/TravelCard.vue'
import TravelTable from '../components/charts/TravelTable.vue'
export default {
  name: "Travel",
  components: {
	SelectBar,
	TravelCard,
	TravelTable,
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
	}

	.travelTable {
	margin-left: 20px; 
	width: 550px;
	}


</style>
