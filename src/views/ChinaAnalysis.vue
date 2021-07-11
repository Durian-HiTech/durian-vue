<template>
  <div class="homeRoot">
    <div class="hometitle">
      <div class="titleText"><b>Durian</b> <span>Covid</span></div>
      <div class="subtitleText">国内疫情分析</div>
    </div>
    <div class="MapSection" v-if="dataloaded">
      <div class="MapMain">
        <div class="Map">
          <analysis-china-map :data="mapData" :country="country" :type="type"></analysis-china-map>
        </div>
        <div class="Overview">
          <span>{{ date }}</span>
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
      <div class="Player">这里是播放器</div>
    </div>
    <div class="TableSection" v-if="dataloaded">
      <analysis-table :type="country['name']" :tableData="mapData"></analysis-table>
    </div>
    <div class="ChartSection">这里是Echarts图表</div>
  </div>
</template>
<script>
import AnalysisTable from "../components/charts/AnalysisTable.vue";
import LittleDataCard from "../components/common/LittleDataCard.vue";
import AnalysisChinaMap from "../components/charts/AnalysisChinaMap.vue"
export default {
  name: "ChinaAnalysis",
  components: {
    AnalysisTable,
    LittleDataCard,
    AnalysisChinaMap
  },
  data() {
    return {
      date: "",
      timevalue: 0,
      country:{},//China或省或省会 {name:"",adcode:"",}
      type:"",//热力图主键
      data: "", //const
      dataloaded: false,
      maxTimeNum: 0, //const
      mapData: [], //表格和地图
      overviewData: [], //littlecard
    };
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
  computed: {},
  mounted() {
    this.loaddata("China");
    this.country = {name:"China",adcode:""};
    this.type = "nowcases";
  },
  methods: {
    loaddata(name) {
      // 获得中国或指定省会或指定城市
      this.dataloaded = false;
      this.data = require("../data/samples/" + name + "AnalysisSample.json");
      this.maxTimeNum = this.data.length - 1;
      this.date = this.data[this.timevalue]["date"];
      this.loadporpsdata();
      this.dataloaded = true;
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
        vaccine: {
          type: "累积接种",
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
    changeCountry(obj) {
      this.country = obj;
      this.loaddata(obj.name);
    },
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
}
.Overview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
.Map {
  width: 80%;
}
.slider {
  margin-left: 20px;
  width: 500px;
}
.datepicker {
  width: 200px;
}
</style>