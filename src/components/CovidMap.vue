<template>
  <div>
    <el-button @click="reset">世界地图</el-button>
    <el-select v-model="country" placeholder="请选择">
      <el-option
        v-for="item in countries"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{item.value}}</span>
      </el-option>
    </el-select>
    <main-map ref="MainMap"></main-map>
    <china-map ref="ChinaMap"></china-map>
  </div>
</template>
<script>
import MainMap from "./charts/MainMap.vue";
import ChinaMap from "./charts/ChinaMap";

export default {
  name: "CovidMap",
  components: {
    MainMap,
    ChinaMap,
  },
  data(){
    return {
      countries:[
          {
              value:'China',
              label:'中国'
          }
      ],
      country:'',
    }
  },
  watch:{
      country(newvalue){
          if(newvalue == '')return ;
          this.$refs.MainMap.changemap(newvalue)
      }
  },
  methods: {
    reset() {
      this.$refs.MainMap.backtoworld();
      this.$refs.ChinaMap.backtochina();
    },
  },
};
</script>
