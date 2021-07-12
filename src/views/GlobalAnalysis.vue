<template>
  <div class="homeRoot">
    <!-- <div class="hometitle">
      <div class="titleText"><b>Durian</b> <span>Covid</span></div>
      <div class="subtitleText">国际疫情分析</div>
    </div> -->
    <div class="MapSection" v-if="dataloaded">
      <div class="MapMain">
        <div class="Map">
          <el-page-header
            @back="backtoWorld"
            :content="countryzhname + '疫情地图'"
            v-if="country != 'World'"
          ></el-page-header>
          <div v-if="country == 'World'">世界疫情地图</div>

          <div style='border: #cccccc solid thin;
                border-radius: 10px;
                overflow: hidden;'>
            <analysis-global-map
              :data="mapData"
              :country="country"
              :type="type"
            ></analysis-global-map>
          </div>

        </div>
        <div class="Overview">
          <!-- 显示时间，待美化 -->
          <span>{{ date | cutLongDate}}</span>
          
          <div class='overviewData'>
            <div v-for="(data, index) in overviewData" :key="index">
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

        </div>
      </div>
      <div class="TimeLine">
        <el-date-picker
          class="datepicker"
          v-model="date"
          type="date"
          value-format="yyyy-MM-dd 00:00:00"
          format="yyyy 年 MM 月 dd 日"
        >
        </el-date-picker>
        <el-slider
          class="slider"
          v-model="timevalue"
          :max="maxTimeNum"
          :show-tooltip="false"
        ></el-slider>
      </div>
    </div>
    <div class="TableSection" v-if="dataloaded">
      <analysis-table :type="country" :tableData="mapData" style="width: 950px"></analysis-table>
    </div>
    <div class="ChartSection">这里是Echarts图表</div>
    <div class="Cases">待插入</div>
    <!-- <div class="Cases_Deaths_Vaccine_Recovered_Cmp">
      <CasesDeathsVaccieRecoveredCmp :DateTable="{}" />
    </div> -->
  </div>
</template>
<script>
import api from "../commonApi.js";
import AnalysisTable from "../components/charts/AnalysisTable.vue";
import LittleDataCard from "../components/common/LittleDataCard.vue";
import AnalysisGlobalMap from "../components/charts/AnalysisGlobalMap.vue";
import countryen2zh from "../data/utils/countryen2zh.json";
import countries from "../data/utils/countries.json";
// import CasesDeathsVaccieRecoveredCmp from "../components/charts/Cases_Deaths_Vaccine_Recovered_Cmp.vue";
export default {
  name: "GlobalAnalysis",
  components: {
    AnalysisTable,
    LittleDataCard,
    AnalysisGlobalMap,
    //CasesDeathsVaccieRecoveredCmp,
  },
  data() {
    return {
      date: "",
      timevalue: 0,
      country: "", //World或其他国家
      type: "", //热力图主键
      data: "", //const
      dataloaded: false,
      maxTimeNum: 0, //const
      mapData: [], //表格和地图
      overviewData: [], //littlecard
      loadlocal: false,
    };
  },
  computed: {
    countryzhname() {
      for (var i in countryen2zh) {
        if (countryen2zh[i]["value"] == this.country)
          return countryen2zh[i]["label"];
      }
      return this.country;
    },
  },
  filters: {
      cutLongDate: function (value) {
        return value.slice(0,10)
      },
  },
  watch: {
    timevalue(newvalue) {
      this.date = this.data[newvalue]["date"];
      this.loadporpsdata();
    },
    date(newvalue) {
      for (var item in this.data) {
        if (this.data[item]["date"] == newvalue) {
          this.timevalue = Number(item);
          return;
        }
      }
    },
  },
  mounted() {
    this.loaddata("World");
    this.country = "World";
    this.type = "nowcases";
  },
  methods: {
    loaddata(name) {
      // 获得世界或指定国家
      this.dataloaded = false;
      if (this.loadlocal) {
        this.data = require("../data/samples/" + name + "AnalysisSample.json");
        this.maxTimeNum = this.data.length - 1;
        this.date = this.data[this.timevalue]["date"];
        this.loadporpsdata();
        this.dataloaded = true;
      } else {
        var formData = new FormData();
        var _this = this;
        let config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        if (name == "World") {
          this.$axios
            .get(api.baseApi + "/data/list_history_overview")
            .then(function (response) {
              if (response.data.success) {
                _this.data = response.data.Global;
                console.log(_this.data);
                _this.maxTimeNum = _this.data.length - 1;
                _this.date = _this.data[_this.timevalue]["date"];
                _this.loadporpsdata();
                _this.dataloaded = true;
              }
            });
        } else {
          formData.append("country", name);
          this.$axios
            .post(api.baseApi + "/data/list_country_overview", formData, config)
            .then(function (response) {
              if (response.data.success) {
                _this.data = response.data.data;
                _this.maxTimeNum = _this.data.length - 1;
                _this.date = _this.data[_this.timevalue]["date"];
                _this.loadporpsdata();
                _this.dataloaded = true;
              }
            });
        }
      }
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
    loadporpsdata() {
      //Update mapData & overviewData
      this.mapData = this.data[this.timevalue]["detailed"];
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
          nownum: this.data[this.timevalue]["overview"][key]["nownum"],
          type: mapping[key]["type"],
          newnum: this.data[this.timevalue]["overview"][key]["newnum"],
          color: mapping[key]["color"],
        };
        list.push(res);
      }
      this.overviewData = list;
    },
    hasMap(name) {
      for (var i in countries) {
        if (countries[i]["value"] == name) return true;
      }
      return false;
    },
    changeCountry(name) {
      if (!this.hasMap(name)) return;
      this.country = name;
      this.loaddata(name);
    },
    backtoWorld() {
      this.changeCountry("World");
    },
    loadCasesDeathsVaccieRecoveredCmp() {},
  },
};
</script>
<style scoped>
.homeRoot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hometitle {
  /* outline: #00ff00 dotted thick; */

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 80px;
  margin-bottom: 40px;

  align-self: flex-start;

  margin-right: 30%;
}
.titleText {
  font-size: 80px;
}
.subtitleText {
  font-size: 80px;
}
.MapSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
}
.Overview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}
.overviewData {
  border: #cccccc solid thin;
  border-radius: 10px;
  overflow: hidden;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
}
.TimeLine {
  display: flex;
  justify-content: center;
  align-items: center;
}
.MapMain {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider {
  margin-top: 20px;
  margin-left: 20px;
  width: 500px;
}
.datepicker {
  width: 200px;
}
</style>