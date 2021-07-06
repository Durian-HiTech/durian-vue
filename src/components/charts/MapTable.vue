<template>
  <div id="map-table">
    <el-table :data="data" height="250" border style="width: 100%">
      <el-table-column label="区域" width="80"> 
          <template slot-scope = "scope">
              <span style="margin-left:10px" @click="clickevent(scope.row)">{{regionName(scope.row.region)}}</span>
          </template>
      </el-table-column>
      <el-table-column label="确诊" width="80"> 
          <template slot-scope = "scope">
              <span style="margin-left:10px" @click="clickevent(scope.row)">{{scope.row.cases}}</span>
          </template>
      </el-table-column>
      <el-table-column label="死亡" width="80"> 
          <template slot-scope = "scope">
              <span style="margin-left:10px" @click="clickevent(scope.row)">{{scope.row.deaths}}</span>
          </template>
      </el-table-column>
      <el-table-column label="治愈" width="80"> 
          <template slot-scope = "scope">
              <span style="margin-left:10px" @click="clickevent(scope.row)">{{scope.row.recovered}}</span>
          </template>
      </el-table-column>
      <el-table-column label="接种" width="80"> 
          <template slot-scope = "scope">
              <span style="margin-left:10px" @click="clickevent(scope.row)">{{scope.row.vaccine}}</span>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
var countrymapping = require("../../data/utils/countryen2zh.json")
export default {
  name: "MapTable",
  props:{
      data:{
          type:Array,
          required:true
      }
  },
  data(){
    return{
      mapping:{}
    } 
  },
  created(){
    this.mapping = countrymapping;
  },
  methods:{
    clickevent(obj){
      this.$parent.changeCountry(obj.region);
    },
    regionName(region){
      for(var i in this.mapping){
        if(this.mapping[i]["value"] == region)return this.mapping[i]["label"];
      }
      return "";
    }
  }
};
</script>