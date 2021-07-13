<template>
  <div class="ChinaAnalysisTabDetailedCmp" v-if="dataloaded">
    <div class="topselector">
      <el-select v-model="countries" multiple filterable style="width:200px;margin-right:20px;">
        <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="type" style="width:200px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div id="FourTypeSelector2" style="width: 1200px; height: 540px;">
    </div>
    <div class="TimeLine">
      <el-date-picker
        class="datepicker"
        v-model="date"
        type="date"
        value-format="yyyy-MM-ddT00:00:00Z"
        format="yyyy 年 MM 月 dd 日"
      >
      </el-date-picker>
      <el-slider
        class="slider"
        v-model="t2"
        :max="maxTimeNum"
        :show-tooltip="false"
      ></el-slider>
    </div>
  </div>
</template>
<script>
var region_data = [];
var json_data = ["Date", "Number", "Type", "Country"];
var provinceen2zh = require("../data/utils/provinceen2zh.json");
var provincezh2en = require("../data/utils/provincezh2en.json");
export default {
  name: "ChinaAnalysisTabDetailedCmp",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.loadtimeline();
    this.loadlist(); //区域列表
    this.dataloaded = true;
    this.getRegionData()
  },
  watch: {
    t2(newvalue) {
      this.timevalue = this.maxTimeNum - newvalue;
    },
    timevalue(newvalue) {
      this.date = this.data[newvalue]["date"];
      this.loadporpsdata();
      this.t2 = this.maxTimeNum - this.timevalue;
    },
    date(newvalue, oldvalue) {
      for (var item in this.data) {
        if (this.data[item]["date"] == newvalue) {
          this.timevalue = Number(item);
          return;
        }
      }
      this.date = oldvalue;
    },
    countries(newvalue) {
      console.log(newvalue)
      var enname = newvalue;
      var zhname = provinceen2zh[enname];
      if (zhname == undefined) {
        //说明name就是中文
        zhname = enname;
        enname = provincezh2en[zhname];
      }
      console.log(zhname)
      // this.update(newvalue, this.type, this.date);
    },
    type(newvalue) {
      console.log(newvalue)
      // this.update(this.countries, newvalue, this.date);
    }
  },
  data() {
    return {
      date: "",
      t2: 0,
      timevalue: 0,
      maxTimeNum: 0, //const
      data_table: [],
      dataloaded: false,
      options: [
        {
          value: "nowcases",
          label: "现有确诊",
        },
        {
          value: "cases",
          label: "累积确诊",
        },
        {
          value: "deaths",
          label: "累积死亡",
        },
        {
          value: "recovered",
          label: "累积治愈",
        },
      ],
      type: "nowcases",
      countries: [],
      list: [],
      mychart: "",
    };
  },
  methods: {
    loadlist() {
      var detailed = this.$props.data[0]["detailed"];
      for (var i in detailed) {
        var enname = detailed[i]["name"];
        var zhname = provinceen2zh[enname];
        if (zhname == undefined) {
          //说明name就是中文
          zhname = enname;
          enname = provincezh2en[zhname];
        }
        this.list.push({
          value: enname,
          label: zhname,
        });
      }
    },
    loadtimeline() {
      this.maxTimeNum = this.$props.data.length - 1;
      this.t2 = this.maxTimeNum;
      this.date = this.$props.data[this.timevalue]["date"];
      this.loadporpsdata();
    },
    loadporpsdata() {
      this.data_table = this.$props.data[this.timevalue]["detailed"];
    },
    getRegionData() {
      region_data = []
      region_data.push(json_data)
      for(let i = this.$props.data.length - 1; i >= 0; i--) {
        var item = this.$props.data[i];
        for(let j = 0; j < item['detailed'].length; j++) {
          region_data.push([item['date'], item['detailed'][j]['cases'], 'cases', item['detailed'][j]['name']])
          region_data.push([item['date'], item['detailed'][j]['deaths'], 'deaths', item['detailed'][j]['name']])
          region_data.push([item['date'], item['detailed'][j]['nowcases'], 'nowcases', item['detailed'][j]['name']])
          region_data.push([item['date'], item['detailed'][j]['recovered'], 'recovered', item['detailed'][j]['name']])
        }
      }
      console.log(region_data)
    },
  },
};
</script>

<style scoped>
.ChinaAnalysisTabDetailedCmp {
  display: flex;
  flex-direction: column;
}
.topselector {
  display: flex;
  justify-content: flex-end;
}
.TimeLine {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.slider {
  margin-left: 20px;
  width: 500px;
}
</style>
