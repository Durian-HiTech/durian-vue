<template>
  <div class="root">
    <div class="CovidMap">
      <main-map
        ref="MainMap"
        :country="this.country"
        :type="type"
        :data="mapData"
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

      <div style="margin-top: 15px">
        <el-slider
          v-model="timevalue"
          :max="maxTimeNum"
          :format-tooltip="formatTime"
        ></el-slider>
      </div>
    </div>

    <div class="tables">
      <div>
        <h1>Section1</h1>
      </div>
      <div>
        <map-table></map-table>
      </div>
    </div>
  </div>
</template>
<script>
import MainMap from "./charts/MainMap.vue";
import MapTable from "./charts/MapTable.vue";
var countrymapping = require("../data/utils/countryen2zh.json");
var sampledata = require("../data/samples/sample.json");
export default {
  name: "CovidMap",
  components: {
    MainMap,
    MapTable,
  },
  data() {
    return {
      countries: [],
      country: "World",
      type: "cases",
      timevalue: 0,
      data: {},
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
    this.data = sampledata;
  },
  computed: {
    typeName: { //控制显示数据类别get set function
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
    maxTimeNum() { //滑块的最大值
      if (this.isempty(this.data)) return 1;
      return this.data[this.type].length - 1;
    },
    mapData() { // 给地图返回的当前类别当前区域的数据
      if (this.isempty(this.data)) return [];
      return this.data[this.type][this.timevalue]["value"];
    },
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
    formatTime() { // 滑块的时间显示控制
      if (this.isempty(this.data)) return "0";
      return this.data[this.type][this.timevalue]["date"];
    },
    changeData(name) {
      //改变地图数据，需要重新请求
      console.log(name);
    },
    isempty(obj) {// 判断字典是否为空
      for (var _ in obj) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.root {
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
}
.tables {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>