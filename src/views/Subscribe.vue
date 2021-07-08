<template>
  <div class="subscribe_root">
    <span class="title"> <b>Covid</b> Subscriptions </span>
    <el-divider />
		<div class="homeChina">

			<div class="homeMain">
                <div class="cityList">

                    <div class="homeSection" v-for="city in cityList" v-bind:key="city.subscription_id">
                        <div class="homeHeader">
                            <div class="region">
                                {{city.city_name}}
                            </div>
                            <div style="display: flex; align-items: center; ">
                                <svg width="35px" height="35px" style="transform:rotate(90deg);" viewBox="0 0 1000 1000"><path fill="#666666" d="M796.014 412.647l-257.492-257.492c-20.11-20.11-52.709-20.11-72.819 0l-257.492 257.492c-20.11 20.11-20.11 52.709 0 72.819s52.709 20.11 72.819 0l169.585-169.585v493.664c0 28.453 23.046 51.499 51.499 51.499s51.499-23.046 51.499-51.499v-493.664l169.585 169.585c10.042 10.043 23.226 15.089 36.41 15.089s26.367-5.021 36.41-15.089c20.11-20.11 20.11-52.709 0-72.819z" /></svg>
                                <div style="font-size: 20px; font-weight: 700; color: #666666; margin-left:5px;">Learn more...</div>
                            </div>
                        </div>

                        <div class="homeOverview">
                            <div v-for="(data, index) in overviewData" :key="index">
                                <LittleDataCard :nownum="data.nownum" :type="data.type" :newnum="data.newnum" :color="data.color" />
                            </div>
                        </div>    
                    </div>


                    
                        
                </div>
			</div>

		</div>
  </div>
</template>
<script>
import LittleDataCard from "../components/common/LittleDataCard";
import axios from "axios";
import api from '../commonApi.js'
export default {
  name: "Subscribe",
  components: {
    LittleDataCard,
  },
  data() {
		return {
            cityList: [],
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
			],
		}
	},
    mounted: function(){
        this.querySubCity()
    },
    methods:{
        querySubCity(){
            let formData = new FormData();
            formData.append("user_id", this.$store.getters.userState.id);
      let config = {
        headers: {"Content-Type": "multipart/form-data",},
      };
      var _this = this;
      axios.post(
          api.baseApi+"/sub/list_all_subs",
          formData,
          config
      )
          .then(function (response) {
            console.log(response)
            console.log(response.status)
            if (response.status == 200) {
              console.log((response.data.data))
              _this.cityList = response.data.data
              console.log(_this.cityList)
            } else {
              console.log("请求失败");
              // console.log(response.data);
              // _this.fail()
            }
          });
        }
    }
};
</script>

<style scoped>
.subscribe_root {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
}
.title {
  font-size: 80px;
  align-self: flex-start;
  position: relative;
  left: 250px;
}
.hometitle {
	/* outline: #00ff00 dotted thick; */

	display: flex;
	justify-content: center;
	align-items: center;

	margin-top: 100px;
	margin-bottom: 80px;
	
    align-self: flex-start; 

    margin-right: 40%;

}
.titleText {
	font-size:80px; 
}
.hometitle .SelectBar {
	/* outline: #00ff00 dotted thick; */

	margin-top: 20px;
	margin-left: 30px;
}

.homeMain {
	display: flex;
	justify-content: center;
	align-content: center;
    margin: 20px;
}

.homeSection {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    margin: 20px;
}

.homeHeader {
	display: flex;
	justify-content: center;
	align-items: flex-end;
	margin-bottom: 20px;

	align-self: start;
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

.region {
	white-space: nowrap;
	text-align: center;

	font-size: 27px;
	font-weight: 500;

	background-color:#06a19c;
	color: white;

	border-radius: 30px;

	padding: 5px 15px 5px 15px;
	margin: 3px;
}
</style>
