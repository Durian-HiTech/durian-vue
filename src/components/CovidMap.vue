<template>
  <div>
    <el-select v-model="country" placeholder="请选择">
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
    <main-map ref="MainMap"></main-map>
  </div>
</template>
<script>
import MainMap from "./charts/MainMap.vue";

export default {
  name: "CovidMap",
  components: {
    MainMap,
  },
  data() {
    return {
      countries: [
        {
          value: "China",
          label: "中国",
        },
        {
          value: "World",
          label: "世界",
        },
      ],
      country: "World",
    };
  },
  watch: {
    country(newvalue, oldvalue) {
      if (newvalue == oldvalue || newvalue == "") return;
      this.countryChange(newvalue);
    },
  },
  methods: {
    countryChange(name) { //全局地图改变触发的方法
      this.$refs.MainMap.changemap(name);
    },
    changeCountry(name){  //被其他组件修改当前地图的方法
      this.country = name;
    }
  },
};
</script>
