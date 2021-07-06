<template>
  <div class="CovidMapRoot">
    <div class="CovidMap">
      <main-map
        ref="MainMap"
        :country="this.country"
        :type="type"
        :data="mapData"
        v-if="dataloaded"
      ></main-map>

      <div
        style="
          width: 500px;
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        "
      >
        <el-radio-group v-model="typeName" size="small">
          <el-radio-button label="确诊"></el-radio-button>
          <el-radio-button label="死亡"></el-radio-button>
          <el-radio-button label="治愈"></el-radio-button>
          <el-radio-button label="接种"></el-radio-button>
        </el-radio-group>

        <el-select v-model="country" placeholder="请选择" size="small">
          <el-option
            v-for="item in countries"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.value
            }}</span>
          </el-option>
        </el-select>
      </div>

      <div style="margin-top: 15px; width: 100px">
        <el-slider
          v-model="timevalue"
          :max="maxTimeNum"
          :format-tooltip="formatTime"
          style="width :100px"
          v-if="dataloaded"
        ></el-slider>
      </div>

      <el-radio-group size="medium">
        <el-button
          class="timeButton"
          type="text"
          icon="el-icon-caret-left"
          @click="timeMinus"
        ></el-button>
        <el-button
          class="timeButton"
          type="text"
          icon="el-icon-video-play"
          size="medium"
          style="color: rgb(212 108 75)"
          @click="timePlayStart"
        ></el-button>
        <el-button
          class="timeButton"
          type="text"
          icon="el-icon-caret-right"
          size="medium"
          @click="timeAdd"
        ></el-button>
      </el-radio-group>
    </div>

    <div class="CovidMapTables" v-if="dataloaded">
      <div>
        <el-row>{{countryData}}</el-row>
        <el-row class="demo-autocomplete">
          <el-autocomplete
            class="inline-input"
            v-model="searchinput"
            :fetch-suggestions="querySearch"
            placeholder="请输入国家"
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
               <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.value
            }}</span>
            </template></el-autocomplete
          >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-row>
        <time-show :time="timeData"></time-show>
        <map-top-show :data="maptopshowData" ></map-top-show>
      </div>
<!--      <>-->
      <div>
        <map-table :data="tableData" ></map-table>
      </div>
    </div>
  </div>
</template>
<script>
import MainMap from "./charts/MainMap.vue";
import MapTable from "./charts/MapTable.vue";
import MapTopShow from "./common/MapTopShow.vue";
import TimeShow from "./common/TimeShow.vue";
var countrymapping = require("../data/utils/countryen2zh.json");

// import api from '../commonApi.js';
var sampledata = require("../data/samples/sample.json");
export default {
  name: "CovidMap",
  components: {
    MainMap,
    MapTable,
    MapTopShow,
    TimeShow,
  },
  data() {
    return {
      countries: [],
      country: "World",
      type: "vaccine",
      timevalue: 0,
      searchinput: "",
      data: {},
      dataloaded: false, //数据是否加载完成，控制所有组件的加载
    };
  },
  watch: {
    country(newvalue, oldvalue) {
      if (newvalue == oldvalue || newvalue == "") return;
      this.countryChange(newvalue);
    },
  },
  mounted() {
    this.countries = countrymapping;
    // var _this = this;
    // this.$axios.get(api.baseApi+'/data/list_all_covid_cdrv_response').then(function(response){
    //   if(response.data.success){
    //     _this.data = response.data.data;
    //     _this.timevalue = _this.maxTimeNum;
    //     _this.dataloaded = true;
    //   }
    // })
    this.data = sampledata;
    this.timevalue = this.maxTimeNum;
    this.dataloaded = true;
  },
  computed: {
    typeName: {
      //控制显示数据类别get set function
      get: function () {
        var mapping = {
          cases: "确诊",
          deaths: "死亡",
          recovered: "治愈",
          vaccine: "接种",
        };
        return mapping[this.type];
      },
      set: function (value) {
        var mapping = {
          确诊: "cases",
          死亡: "deaths",
          治愈: "recovered",
          接种: "vaccine",
        };
        this.type = mapping[value];
      },
    },
    maxTimeNum() {
      //滑块的最大值
      return this.data[this.type].length - 1;
    },
    mapData() {
      // 给地图返回的当前类别当前区域的数据
      return this.data[this.type][this.timevalue]["value"];
    },
    tableData() {
      //给表格的数据
      console.log(this.data);
      var res = [];
      var len = this.data[this.type][this.timevalue]["value"].length;
      for (var i = 0; i < len; i++) {
        res.push({
          region: this.data["cases"][this.timevalue]["value"][i]["name"],
          cases: this.data["cases"][this.timevalue]["value"][i]["value"],
          deaths: this.data["deaths"][this.timevalue]["value"][i]["value"],
          recovered:
            this.data["recovered"][this.timevalue]["value"][i]["value"],
          vaccine: this.data["vaccine"][this.timevalue]["value"][i]["value"],
        });
      }
      return res;
    },
    maptopshowData() {
      //给topshow的数据，包括累积和新增的当前总数
      console.log(this.data);
      var res = {};
      for (var key in this.data) {
        var reslist = [];
        reslist.push(this.data[key][this.timevalue]["value"]);
        if (this.timevalue != 0)
          reslist.push(this.data[key][this.timevalue - 1]["value"]);
        res[key] = reslist;
      }
      console.log(res);
      return res;
    },
    timeData() {
      // 给时间显示器的数据
      return this.formatTime();
    },
    countryData(){
      for(var i in this.countries){
        if(this.countries[i]["value"] == this.country)return this.countries[i]["label"];
      }
      return "";
    }
  },
  methods: {
    countryChange(name) {
      //全局地图改变触发的方法
      this.$refs.MainMap.changemap(name);
      this.changeData(name);
    },
    changeCountry(name) {
      //被其他组件修改当前地图的方法
      this.country = name;
    },
    formatTime() {
      // 滑块的时间显示控制
      return this.data[this.type][this.timevalue]["date"];
    },
    changeData(name) {
      //改变地图数据，需要重新请求
      console.log(name);
    },
    querySearch(queryString, cb) {
      var countries = this.countries;
      var results = queryString
        ? countries.filter(function (val) {
            return (
              val.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1
                 || val.value.indexOf(queryString) != -1
            );
          })
        : countries;
      cb(results);
    },
    handleSelect(item) {
      this.changeCountry(item.value);
    },
    timeAdd() {
      if (this.timevalue + 1 > this.maxTimeNum) return;
      this.timevalue++;
    },
    timeMinus() {
      if (this.timevalue == 0) return;
      this.timevalue--;
    },
    timePlayStart() {
      let _this = this;
      if (this.timevalue + 1 > this.maxTimeNum) return;
      this.timevalue++;
      setTimeout(function () {
        _this.timePlayStart();
      }, 2000);
    },
  },
};
</script>

<style>
.CovidMapRoot {
  background-color: #575551;

  display: flex;
  justify-content: center;
  align-items: center;
}
.CovidMap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.CovidMapTables {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 80px;
}
.CovidMapRoot .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #686562 !important;
  border-color: #c7c7c7 !important;
  box-shadow: -1px 0 0 0 #bfbfbf !important;
}
.CovidMapRoot .el-radio-button:last-child .el-radio-button__inner {
  border-radius: 0 20px 20px 0 !important;
}
.CovidMapRoot .el-radio-button:first-child .el-radio-button__inner {
  border-radius: 20px 0 0 20px !important;
}
.CovidMapRoot .el-input__inner {
  border-radius: 20px !important;
}
.CovidMapRoot .el-slider__button {
  border: 2px solid #a1a1a1;
}
.CovidMapRoot .el-slider__runway {
  width: 300px;
}
.CovidMapRoot .el-slider__bar {
  background-color: #cacaca;
}
.CovidMapRoot .timeButton {
  font-size: 30px;
  color: #cacaca;
}
</style>
