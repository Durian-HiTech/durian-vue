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
    <div>
      <el-radio-group v-model="typeName">
        <el-radio-button label="确诊"></el-radio-button>
        <el-radio-button label="死亡"></el-radio-button>
        <el-radio-button label="治愈"></el-radio-button>
        <el-radio-button label="接种"></el-radio-button>
      </el-radio-group>
    </div>
    <main-map
      ref="MainMap"
      :country="this.country"
      :type="type"
      :data="mapData"
    ></main-map>
    <div>
      <el-slider v-model="timevalue" 
        :max ="maxTimeNum"
        :format-tooltip="formatTime"></el-slider>
    </div>
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
      typeName: "确诊",
      timevalue:0,
      data: {
        cases:[
        {
           date:"20/01/01",
           value:[
             {
               name:"China",
               value:123
             },
             {
               name:"United States",
               value:100203
             }
           ]
        },
        {
          date:"20/01/02",
          value:[
            {
               name:"China",
               value:100203
             },
             {
               name:"United States",
               value:123
             }
          ]
        }
      ],
      deaths:[
        {
           date:"20/01/01",
           value:[
             {
               name:"China",
               value:1233
             },
             {
               name:"United States",
               value:10011
             }
           ]
        },
        {
          date:"20/01/02",
          value:[
            {
               name:"China",
               value:10011
             },
             {
               name:"United States",
               value:1233
             }
          ]
        }
      ],
      recovered:[
        {
           date:"20/01/01",
           value:[
             {
               name:"China",
               value:1233
             },
             {
               name:"United States",
               value:10011
             }
           ]
        },
        {
          date:"20/01/02",
          value:[
            {
               name:"China",
               value:10011
             },
             {
               name:"United States",
               value:1233
             }
          ]
        }
      ],
      vaccine:[
        {
           date:"20/01/01",
           value:[
             {
               name:"China",
               value:1233
             },
             {
               name:"United States",
               value:10011
             }
           ]
        },
        {
          date:"20/01/02",
          value:[
            {
               name:"China",
               value:10011
             },
             {
               name:"United States",
               value:1233
             }
          ]
        }
      ]
      },
    };
  },
  watch: {
    country(newvalue, oldvalue) {
      if (newvalue == oldvalue || newvalue == "") return;
      this.countryChange(newvalue);
    },
  },
  computed: {
    type() {
      var mapping = {
        确诊: "cases",
        死亡: "deaths",
        治愈: "recovered",
        接种: "vaccine",
      };
      return mapping[this.typeName];
    },
    maxTimeNum(){
      return this.data[this.type].length-1;
    },
    mapData(){
      return this.data[this.type][this.timevalue]["value"];
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
    formatTime(){
      return this.data[this.type][this.timevalue]["date"];
    },
    changeData(name){//改变地图数据，需要重新请求
      console.log(name);
    }
  },
};
</script>
