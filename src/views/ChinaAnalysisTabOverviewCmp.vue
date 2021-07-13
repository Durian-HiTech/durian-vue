<template>
  <div class="ChinaAnalysisTabOverviewCmp">
    <div class="topselector">
      <el-select v-model="countries" multiple filterable style="width: 200px;margin-right:20px;">
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
    <div>
      <div id="FourTypeSelector" style="width: 1200px; height: 540px"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
var provinceen2zh = require("../data/utils/provinceen2zh.json");
var provincezh2en = require("../data/utils/provincezh2en.json");
var option;
var json_data = ["Date", "Number", "Type", "Country"];
var global_data = [];
var region_data = [];
export default {
  name: "ChinaAnalysisTabOverviewCmp",
  props: {
    data_table: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("FourTypeSelector"));
    this.loadlist(); //区域列表
    // 加载全局变量
    this.getGlobalData();
    this.getRegionData();
    this.update(this.countries, this.type);
  },
  data() {
    return {
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
      // 默认
      type: "nowcases",
      countries: [],
      list: [],
      myChart: "",
    };
  },
  watch: {
    countries(newvalue) {
      console.log(this.countries);
      this.update(newvalue, this.type);
    },
    type(newvalue) {
      this.update(this.countries, newvalue);
    },
    data_table() {
      this.list = [];
      this.countries = [];
      this.loadlist(); //区域列表
      // 加载全局变量
      this.getGlobalData();
      this.getRegionData();
      this.update(this.countries, this.type);
    },
  },
  methods: {
    loadlist() {
      var detailed = this.$props.data_table[0]["detailed"];
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
    getGlobalData() {
      global_data = [];
      global_data.push(json_data);
      for (let i = this.$props.data_table.length - 1; i >= 0; i--) {
        global_data.push([
          this.$props.data_table[i]["date"],
          this.$props.data_table[i]["overview"]["cases"]["nownum"],
          "cases",
          "Global",
        ]);
        global_data.push([
          this.$props.data_table[i]["date"],
          this.$props.data_table[i]["overview"]["deaths"]["nownum"],
          "deaths",
          "Global",
        ]);
        global_data.push([
          this.$props.data_table[i]["date"],
          this.$props.data_table[i]["overview"]["nowcases"]["nownum"],
          "nowcases",
          "Global",
        ]);
        global_data.push([
          this.$props.data_table[i]["date"],
          this.$props.data_table[i]["overview"]["recovered"]["nownum"],
          "recovered",
          "Global",
        ]);
        // global_data.push([this.$props.data_table[i]['date'], this.$props.data_table[i]["overview"]['vaccine']['nownum'], 'vaccine', 'Global']);
      }
    },
    getRegionData() {
      region_data = [];
      region_data.push(json_data);
      for (let i = this.$props.data_table.length - 1; i >= 0; i--) {
        var item = this.$props.data_table[i];
        for (let j = 0; j < item["detailed"].length; j++) {
          var zhname = provinceen2zh[item["detailed"][j]["name"]];
          if (zhname == undefined) zhname = item["detailed"][j]["name"]; //说明直接就是中文
          region_data.push([
            item["date"],
            item["detailed"][j]["cases"],
            "cases",
            zhname,
          ]);
          region_data.push([
            item["date"],
            item["detailed"][j]["deaths"],
            "deaths",
            zhname,
          ]);
          region_data.push([
            item["date"],
            item["detailed"][j]["nowcases"],
            "nowcases",
            zhname,
          ]);
          region_data.push([
            item["date"],
            item["detailed"][j]["recovered"],
            "recovered",
            zhname,
          ]);
        }
      }
    },
    update(countries, type) {
      var seriesList = [];
      var datasetWithFilters = [];
      var now_countries = [];
      for (let i in countries) {
        now_countries.push(countries[i]);
      }
      if (now_countries !== []) {
        for (var i in now_countries) {
          var zhname = provinceen2zh[now_countries[i]];
          if (zhname != undefined) now_countries[i] = zhname;
        }
        for (let i = 0; i < now_countries.length; i++) {
          datasetWithFilters.push({
            id: now_countries[i] + type,
            fromDatasetId: "dataset_raw",
            transform: {
              type: "filter",
              config: {
                and: [
                  { dimension: "Number", gte: 5 },
                  { dimension: "Type", "=": type },
                  { dimension: "Country", "=": now_countries[i] },
                ],
              },
            },
          });
          seriesList.push({
            type: "line",
            datasetId: now_countries[i] + type,
            showSymbol: false,
            endLabel: {
              show: true,
              formatter: function (params) {
                return params.value[3];
              },
            },
            emphasis: {
              focus: "series",
            },
            encode: {
              x: "Date",
              y: "Number",
              label: ["Type", "Number"],
              itemName: "Date",
              tooltip: ["Number"],
            },
          });
        }
      }

      option = {
        dataset: [
          {
            id: "dataset_raw",
            source: region_data,
          },
        ].concat(datasetWithFilters),
        title: {
          text: "Doese of Vaccination of USA and China last 30 days",
          textStyle: {
            color: "#fff",
          },
        },
        dataZoom: [
          {
            id: "dataZoomx",
            type: "slider",
            realtime: true,
            filterMode: "empty",
            start: 0,
            end: 1000,
            xAxisIndex: [0],
          },
          {
            id: "dataZoomY",
            type: "slider",
            realtime: true,
            filterMode: "empty",
            start: 0,
            end: 100,
            yAxisIndex: [0],
          },
        ],
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          nameLocation: "middle",
        },
        yAxis: {
          name: "Number",
        },
        series: seriesList,
      };

      this.myChart.clear();
      this.myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.ChinaAnalysisTabOverviewCmp {
  display: flex;
  flex-direction: column;
}
.topselector {
  display: flex;
  justify-content: flex-end;
}
</style>
