<template>
  <div class="homeRoot">
    <div class="hometitle">
      <div class="titleText"><b>Durian</b> <span>Covid</span></div>
      <SelectBar class="SelectBar" :buttons="buttons" />
    </div>

    <center>
    <i class="el-icon-loading" v-if='!dataLoaded' style='font-size:40px; margin-top: 100px;'></i>
    </center>

    <!-- china -->
    <div class="homeChina" v-if="showChina && dataLoaded">
      <div class="homeMain">
        <div class="homeRightSection">
          <div class="homeHeader">
            <div class="region">全国</div>
            <div style="display: flex; align-items: center">
              <span
                style="font-size: 30px; margin-left: 10px; margin-right: 5px"
                >🇨🇳</span
              >
              <svg
                width="35px"
                height="35px"
                style="transform: rotate(90deg)"
                viewBox="0 0 1000 1000"
              >
                <path
                  fill="#666666"
                  d="M796.014 412.647l-257.492-257.492c-20.11-20.11-52.709-20.11-72.819 0l-257.492 257.492c-20.11 20.11-20.11 52.709 0 72.819s52.709 20.11 72.819 0l169.585-169.585v493.664c0 28.453 23.046 51.499 51.499 51.499s51.499-23.046 51.499-51.499v-493.664l169.585 169.585c10.042 10.043 23.226 15.089 36.41 15.089s26.367-5.021 36.41-15.089c20.11-20.11 20.11-52.709 0-72.819z"
                />
              </svg>
              <div
                style="
                  font-size: 20px;
                  font-weight: 700;
                  color: #666666;
                  margin-left: 5px;
                "
              >
                Learn more...
              </div>
            </div>
          </div>

          <div class="homeOverview">
            <div v-for="(data, index) in ChinaoverviewData" :key="index">
              <div @click="changeKey(data.type)">
              <LittleDataCard
                :nownum="data.nownum"
                :type="data.type"
                :newnum="data.newnum"
                :color="data.color"
              />
              </div>
            </div>
          </div>

          <div class="homeMapSection">
            <home-china-map :data="ChinamapData" :type="type"></home-china-map>
          </div>

        </div>

        <StatisticTable
            class="homeTable"
            :tableData="ChinamapData"
            :type="'China'"
          />

      </div>
    </div>

    <!-- world -->
    <div class="homeWorld" v-if="!showChina">
      <div class="homeMain">

        <div class="homeRightSection">
          <div class="homeHeader">
            <div class="region" style="background-color: #d9d221">世界</div>
            <div style="display: flex; align-items: center">
              <span
                style="font-size: 30px; margin-left: 10px; margin-right: 5px"
                >🌍</span
              >
              <svg
                width="35px"
                height="35px"
                style="transform: rotate(90deg)"
                viewBox="0 0 1000 1000"
              >
                <path
                  fill="#666666"
                  d="M796.014 412.647l-257.492-257.492c-20.11-20.11-52.709-20.11-72.819 0l-257.492 257.492c-20.11 20.11-20.11 52.709 0 72.819s52.709 20.11 72.819 0l169.585-169.585v493.664c0 28.453 23.046 51.499 51.499 51.499s51.499-23.046 51.499-51.499v-493.664l169.585 169.585c10.042 10.043 23.226 15.089 36.41 15.089s26.367-5.021 36.41-15.089c20.11-20.11 20.11-52.709 0-72.819z"
                />
              </svg>
              <div
                style="
                  font-size: 20px;
                  font-weight: 700;
                  color: #666666;
                  margin-left: 5px;
                "
              >
                Learn more...
              </div>
            </div>
          </div>

          <div class="homeOverview">
            <div v-for="(data, index) in GlobaloverviewData" :key="index">
              <div @click="changeKey(data.type)">
                <LittleDataCard
                  :nownum="data.nownum"
                  :type="data.type"
                  :newnum="data.newnum"
                  :color="data.color"
                />
              </div>
            </div>
          </div>

          <div class="homeMapSection">
            <home-global-map :data="GlobalmapData" :type="type"></home-global-map>
          </div>
        </div>

        <StatisticTable
          class="homeTable"
          :tableData="GlobalmapData"
          :type="'Global'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LittleDataCard from "../components/common/LittleDataCard.vue";
import StatisticTable from "../components/charts/StatisticTable.vue";
import SelectBar from "../components/common/SelectBar.vue";
import HomeGlobalMap from "../components/charts/HomeGlobalMap.vue";
import HomeChinaMap from '../components/charts/HomeChinaMap.vue'
import api from '../commonApi.js'
export default {
  name: "Home",
  components: {
    LittleDataCard,
    StatisticTable,
    SelectBar,
    HomeGlobalMap,
    HomeChinaMap
  },
  data() {
    return {
      ChinaoverviewData: [],
      GlobaloverviewData: [],
      buttons: ["全国", "世界"],
      showChina: true,
      dataLoaded: false,
      type: "nowcases", //当前地图上显示的热力图主键
      GlobalmapData: {},
      ChinamapData: {},
      locationInfo: {
        ip: '', 
        country: '',
        province: '',
        city: '',
        district: '',
        location: '',
      },
    };
  },
  watch: {},
  mounted() {
    var _this = this;
    this.$axios.get(api.baseApi + '/data/list_overview').then(function(response){
      if(response.data.success){
        _this.loadhomeData(response.data);
      }
    })
    //this.loadhomeData(); //加载国内国外细节数据和总数据
  },
  methods: {
    getLocation () {
      // eslint-disable-next-line 
      this.locationInfo.ip = returnCitySN.cip

      var _this = this
      this.$axios.get("https://restapi.amap.com/v5/ip?key=a593d64ab73229be6b3d1ef802b76849&type=4&ip="+this.locationInfo.ip)
        .then( response => {
          _this.locationInfo.country = response.data.country
          _this.locationInfo.province = response.data.province
          _this.locationInfo.city = response.data.city
          _this.locationInfo.district = response.data.district
          _this.locationInfo.location = response.data.location

          console.log(_this.locationInfo)
        })
    },
    selected(index, differkey) {
      if (differkey == "全国") {
        switch (index) {
          case 0:
            this.showChina = true;
            break;
          case 1:
            this.showChina = false;
            break;
        }
      }
    },
    loadhomeData(homeData) {
      //加载全球和中国数据
      //var homeData = require("../data/samples/HomeData.json");
      console.log(homeData)
      var mapping = {
        nowcases: {
          type: "现有确诊",
          color: "orange",
        },
        cases: {
          type: "累计确诊",
          color: "#AC3500",
        },
        deaths: {
          type: "累计死亡",
          color: "#000000",
        },
        recovered: {
          type: "累计治愈",
          color: "#00ACA5",
        },
      };
      var list = [];
      var res = {};
      for (var key in mapping) {
        res = {
          nownum: homeData["China"]["overview"][key]["nownum"],
          type: mapping[key]["type"],
          newnum: homeData["China"]["overview"][key]["newnum"],
          color: mapping[key]["color"],
        };
        list.push(res);
      }
      this.ChinaoverviewData = list;
      console.log(this.ChinaoverviewData)
      list = [];
      for (key in mapping) {
        res = {
          nownum: homeData["Global"]["overview"][key]["nownum"],
          type: mapping[key]["type"],
          newnum: homeData["Global"]["overview"][key]["newnum"],
          color: mapping[key]["color"],
        };
        list.push(res);
      }
      this.GlobaloverviewData = list;
      this.ChinamapData = homeData["China"]["detailed"];
      this.GlobalmapData = homeData["Global"]["detailed"];
      this.dataLoaded = true;
    },
    changeKey(nowtype) {
      var mapping = {
        现有确诊: "nowcases",
        累计确诊: "cases",
        累计死亡: "deaths",
        累计治愈: "recovered",
      };
      for (var key in mapping) {
        if (key == nowtype) {
          this.type = mapping[key];
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.hometitle {
  /* outline: #00ff00 dotted thick; */

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 60px;

  margin-right: 1160px;
}
.titleText {
  font-size: 30px;
}
.hometitle .SelectBar {
  /* outline: #00ff00 dotted thick; */
  margin-left: 30px;
}

.homeMain {
  display: flex;
  justify-content: center;
  align-content: center;
}

.homeRightSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.homeMapSection {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  border: #cccccc solid thin;
  border-radius: 10px;
  overflow: hidden;
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

  padding-left: 25px;
  padding-right: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: #cccccc solid thin;
  border-radius: 10px;
  width: 700px;
}
.homeTable {
  margin-top: 70px;
  margin-left: 30px;
  width: 650px;
}

.region {
  white-space: nowrap;
  text-align: center;

  font-size: 27px;
  font-weight: 500;

  background-color: #06a19c;
  color: white;

  border-radius: 30px;

  padding: 5px 15px 5px 15px;
  margin: 3px;
}
</style>
