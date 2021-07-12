<template>
  <div class="GlobalAnalysisTabDetailedCmp" v-if="dataloaded">
    <div class="topselector">
      <el-select v-model="countries" multiple filterable>
        <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="type">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="main">这是胡鹏飞写的</div>
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
        v-model="t2"
        :max="maxTimeNum"
        :show-tooltip="false"
      ></el-slider>
    </div>
  </div>
</template>
<script>
var countryen2zh = require("../data/utils/countryen2zh.json");
export default {
  name: "GlobalAnalysisTabOverviewCmp",
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
    data() {
      this.countries = [];
      this.list = [];
      this.loadtimeline();
      this.loadlist(); //区域列表
    },
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
    };
  },
  methods: {
    loadlist() {
      var detailed = this.$props.data[0]["detailed"];
      for (var i in detailed) {
        var enname = detailed[i]["name"];
        for (var j in countryen2zh) {
          if (countryen2zh[j]["value"] == enname) {
            this.list.push({
              value: enname,
              label: countryen2zh[j]["label"],
            });
          }
        }
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
      console.log(this.data_table);
    },
  },
};
</script>

<style scoped>
.GlobalAnalysisTabDetailedCmp {
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