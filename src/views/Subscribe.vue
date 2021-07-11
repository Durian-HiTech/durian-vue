<template>
  <div class="subscribe_root">
    <span class="title"> <b>Covid</b> Subscriptions </span>
    <el-divider />

    <v-app style='height: 20px;'>
      <v-btn
        rounded
        color="cyan"
        dark
        @click="dialogTableVisible = true"
        width='200px'
      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        更新我的订阅城市
      </v-btn>
    </v-app>

    <div class="homeChina">
      <div class="homeMain">
        <el-dialog title="订阅的城市" :visible.sync="dialogTableVisible">
          <el-table :data="cityList" style="width: 100%">
            <el-table-column label="订阅城市" prop="city_name">
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >取消订阅</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-select
            v-model="value"
            filterable
            placeholder="请选择"
            style="margin-right: 8px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="margin-top: 15px"
            @click="subCity"
            >订阅</el-button
          >
        </el-dialog>
        <div class="cityList">
          <div
            class="homeSection"
            v-for="city in cityList"
            v-bind:key="city.city_name"
          >
            <div class="homeHeader">
              <div class="region">
                {{ city.city_name }}
              </div>
              <div style="display: flex; align-items: center">
                <svg
                  width="35px"
                  height="35px"
                  style="transform: rotate(90deg)"
                  viewBox="0 0 1000 1000"
                >
                  <path
                    fill="#666666"
                    d="M796.014 412.647l-257.492-257.492c-20.11-20.11-52.709-20.11-72.819 0l-257.492 257.492c-20.11 20.11-20.11 52.709 0 72.819s52.709 20.11 72.819 0l169.585-169.585v493.664c0 28.453 23.046 51.499 51.499 51.499s51.499-23.046 51.499-51.499v-493.664l169.585 169.585c10.042 10.043 23.226 15.089 36.41 15.089s26.367-5.021 36.41-15.089c20.11-20.11 20.11-52.709 0-72.819z"
                  />
                </svg>
                <div
                  style="
                    font-size: 20px;
                    font-weight: 700;
                    color: #666666;
                    margin-left: 5px;
                  "
                >
                  Learn more...
                </div>
              </div>
            </div>

            <div class="homeOverview">
              <div v-for="(data, index) in overviewData" :key="index">
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
    </div>
  </div>
</template>
<script>
import LittleDataCard from "../components/common/LittleDataCard";
import axios from "axios";
import api from "../commonApi.js";
export default {
  name: "Subscribe",
  components: {
    LittleDataCard,
  },
  data() {
    return {
      dialogTableVisible: false,
      cityList: [],
      overviewData: [
        {
          nownum: 123143241,
          type: "确诊",
          newnum: 2313,
          color: "#AC3500",
        },
        {
          nownum: 123143241,
          type: "死亡",
          newnum: 2313,
          color: "#AC3500",
        },
        {
          nownum: 123143241,
          type: "治愈",
          newnum: 2313,
          color: "#00ACA5",
        },
        {
          nownum: 123143241,
          type: "疫苗",
          newnum: 2313,
          color: "#00ACA5",
        },
      ],
      options: [
        { value: "安徽省", label: "安徽省" },
        { value: "北京市", label: "北京市" },
        { value: "重庆市", label: "重庆市" },
        { value: "福建省", label: "福建省" },
        { value: "甘肃省", label: "甘肃省" },
        { value: "广东省", label: "广东省" },
        { value: "广西壮族自治区", label: "广西壮族自治区" },
        { value: "贵州省", label: "贵州省" },
        { value: "海南省", label: "海南省" },
        { value: "河北省", label: "河北省" },
        { value: "黑龙江省", label: "黑龙江省" },
        { value: "河南省", label: "河南省" },
        { value: "香港", label: "香港" },
        { value: "湖北省", label: "湖北省" },
        { value: "湖南省", label: "湖南省" },
        { value: "江苏省", label: "江苏省" },
        { value: "江西省", label: "江西省" },
        { value: "吉林省", label: "吉林省" },
        { value: "辽宁省", label: "辽宁省" },
        { value: "澳门", label: "澳门" },
        { value: "内蒙古自治区", label: "内蒙古自治区" },
        { value: "宁夏回族自治区", label: "宁夏回族自治区" },
        { value: "青海省", label: "青海省" },
        { value: "陕西省", label: "陕西省" },
        { value: "山东省", label: "山东省" },
        { value: "上海市", label: "上海市" },
        { value: "山西省", label: "山西省" },
        { value: "四川省", label: "四川省" },
        { value: "台湾", label: "台湾" },
        { value: "天津市", label: "天津市" },
        { value: "新疆维吾尔自治区", label: "新疆维吾尔自治区" },
        { value: "西藏自治区", label: "西藏自治区" },
        { value: "云南省", label: "云南省" },
        { value: "浙江省", label: "浙江省" },
      ],
      convertEngOptions: [
        { value: "Anhui", label: "安徽省" },
        { value: "Beijing", label: "北京市" },
        { value: "Chongqing", label: "重庆市" },
        { value: "Fujian", label: "福建省" },
        { value: "Gansu", label: "甘肃省" },
        { value: "Guangdong", label: "广东省" },
        { value: "Guangxi", label: "广西壮族自治区" },
        { value: "Guizhou", label: "贵州省" },
        { value: "Hainan", label: "海南省" },
        { value: "Hebei", label: "河北省" },
        { value: "Heilongjiang", label: "黑龙江省" },
        { value: "Henan", label: "河南省" },
        { value: "Hong Kong", label: "香港" },
        { value: "Hubei", label: "湖北省" },
        { value: "Hunan", label: "湖南省" },
        { value: "Jiangsu", label: "江苏省" },
        { value: "Jiangxi", label: "江西省" },
        { value: "Jilin", label: "吉林省" },
        { value: "Liaoning", label: "辽宁省" },
        { value: "Macao", label: "澳门" },
        { value: "Nei Mongol", label: "内蒙古自治区" },
        { value: "Ningxia Hui", label: "宁夏回族自治区" },
        { value: "Qinghai", label: "青海省" },
        { value: "Shaanxi", label: "陕西省" },
        { value: "Shandong", label: "山东省" },
        { value: "Shanghai", label: "上海市" },
        { value: "Shanxi", label: "山西省" },
        { value: "Sichuan", label: "四川省" },
        { value: "Taiwan", label: "台湾" },
        { value: "Tianjin", label: "天津市" },
        { value: "Xinjiang Uygur", label: "新疆维吾尔自治区" },
        { value: "Xizang", label: "西藏自治区" },
        { value: "Yunnan", label: "云南省" },
        { value: "Zhejiang", label: "浙江省" },
      ],
      value: "",
    };
  },
  mounted: function () {
    this.querySubCity();
  },
  methods: {
    querySubCity() {
      let formData = new FormData();
      formData.append("user_id", this.$store.getters.userState.id);
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      var _this = this;
      axios
        .post(api.baseApi + "/sub/list_all_subs", formData, config)
        .then(function (response) {
          if (response.status == 200) {
            _this.cityList = response.data.data;
          } else {
            console.log("请求失败");
          }
        });
    },
    handleDelete(index, row) {
      let formData = new FormData();
      formData.append("city_name", row.city_name);
      formData.append("user_id", this.$store.getters.userState.id);
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      var _this = this;
      this.cityList.forEach(function (item, ind, arr) {
        if (item.city_name == row.city_name) {
          arr.splice(ind, 1);
        }
      });
      axios
        .post(api.baseApi + "/sub/del_sub", formData, config)
        .then(function (response) {
          if (response.status == 200) {
            _this.$message({ message: "成功删除订阅", type: "true" });
          } else {
            console.log("请求失败");
          }
        });
    },
    subCity() {
      console.log(this.value);
      let formData = new FormData();
      formData.append("city_name", this.value);
      formData.append("user_id", this.$store.getters.userState.id);
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      var _this = this;
      var is_success = true;
      var len_city = this.cityList.length;

      if (this.value==""){
        _this.$message({ message: "您尚未订阅，请先选择一项订阅城市", type: "false" });
          is_success = false;
      }


      if (is_success == true){
        for (var i = 0; i < len_city; i++) {
          if (this.cityList[i].city_name == this.value) {
            _this.$message({ message: "已订阅该城市", type: "false" });
            is_success = false;
            break;
          }
        }
      }
      
      if (is_success == true) {
        var tmp = {
          city_name: this.value,
          user_id: this.$store.getters.userState.id,
          disabled: true,
        };
        this.cityList.push(tmp);
        axios
          .post(api.baseApi + "/sub/subscribe", formData, config)
          .then(function (response) {
            if (response.status == 200) {
              _this.$message({ message: "成功订阅", type: "true" });
            } else {
              console.log("请求失败");
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.subscribe_root {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.title {
    margin-top: 70px;
    font-size: 30px; 
    align-self: flex-start; 
    position: relative;
    left: 250px;
  }
.hometitle {
  /* outline: #00ff00 dotted thick; */

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 100px;
  margin-bottom: 80px;

  align-self: flex-start;

  margin-right: 40%;
}
.titleText {
  font-size: 80px;
}
.hometitle .SelectBar {
  /* outline: #00ff00 dotted thick; */

  margin-top: 20px;
  margin-left: 30px;
}

.homeMain {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px;
}

.homeSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.homeHeader {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;

  align-self: start;
}
.homeOverview {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: #cccccc solid thin;
  border-radius: 40px;
}

.region {
  white-space: nowrap;
  text-align: center;

  font-size: 27px;
  font-weight: 500;

  background-color: #06a19c;
  color: white;

  border-radius: 30px;

  padding: 5px 15px 5px 15px;
  margin: 3px;
}
</style>
