<template>
  <div class="homeRoot">
    <div class="hometitle">
      <div class="titleText"><b>Durian</b> <span>Covid</span></div>
      <SelectBar class="SelectBar" :buttons="buttons" />
    </div>

    <!-- china -->
    <div class="homeChina" v-if="showChina">
      <div class="homeMain">
        <div class="homeLeftSection">
          <!-- <h1>这里是地图！！</h1> -->
        </div>

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

          <div class="homeOverview" v-if="overviewDataloaded">
            <div v-for="(data, index) in ChinaoverviewData" :key="index">
              <LittleDataCard
                :nownum="data.nownum"
                :type="data.type"
                :newnum="data.newnum"
                :color="data.color"
              />
            </div>
          </div>

          <StatisticTable style="margin-top: 20px; width: 860px" />
        </div>
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

          <div class="homeOverview" v-if="overviewDataloaded">
            <div v-for="(data, index) in GlobaloverviewData" :key="index">
              <LittleDataCard
                :nownum="data.nownum"
                :type="data.type"
                :newnum="data.newnum"
                :color="data.color"
              />
            </div>
          </div>

          <div class="homeMapSection">
            <global-map :data="GlobalmapData" :type="type"></global-map>
          </div>

          <StatisticTable style="margin-top: 20px; width: 860px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LittleDataCard from "../components/common/LittleDataCard.vue";
import StatisticTable from "../components/charts/StatisticTable.vue";
import SelectBar from "../components/common/SelectBar.vue";
import GlobalMap from "../components/charts/GlobalMap.vue";

export default {
  name: "Home",
  components: {
    LittleDataCard,
    StatisticTable,
    SelectBar,
    GlobalMap,
  },
  data() {
    return {
      ChinaoverviewData: [],
      GlobaloverviewData: [],
      buttons: ["全国", "世界"],
      showChina: true,
      overviewDataloaded: false,
      type: "nowcases", //当前地图上显示的热力图主键
      GlobalmapData: {},
      ChinamapData: {},
    };
  },
  watch: {},
  mounted() {
    this.loadoverviewData();
    this.loadCovidData();
  },
  methods: {
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
    loadoverviewData() {
      //加载全球和中国数据
      var overviewData = require("../data/samples/overviewDataSample.json");
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
        vaccine: {
          type: "累积接种",
          color: "#00ACA5",
        },
      };
      var list = [];
      for (var key in mapping) {
        var res = {
          nownum: overviewData[key]["nownum"],
          type: mapping[key]["type"],
          newnum: overviewData[key]["newnum"],
          color: mapping[key]["color"],
        };
        list.push(res);
      }
      this.ChinaoverviewData = list;
      this.GlobaloverviewData = list;
      this.overviewDataloaded = true;
    },
    loadCovidData() {
      var chinamapData = require("../data/samples/GlobalMapSample.json");
      this.GlobalmapData = chinamapData;
    },
    test() {
      console.log(this.GlobaloverviewData);
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

  margin-top: 100px;
  margin-bottom: 80px;

  align-self: flex-start;

  margin-right: 40%;
}
.titleText {
  font-size: 80px;
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
}

.homeRightSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.homeMapSection{
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
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

  background-color: #06a19c;
  color: white;

  border-radius: 30px;

  padding: 5px 15px 5px 15px;
  margin: 3px;
}
</style>
