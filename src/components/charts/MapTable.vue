<template>
  <div id="map-table">
    <el-table :data="data" height="250" border style="width: 100%">
      <el-table-column label="区域" width="80"> 
          <template slot-scope = "scope">
              <span style="margin-left:10px" @click="clickevent(scope.row)">{{scope.row.region}}</span>
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
export default {
  name: "MapTable",
  props:{
      data:{
          type:Array,
          required:true
      }
  },
  methods:{
    clickevent(obj){
      console.log(obj);
    }
  }
};
</script>