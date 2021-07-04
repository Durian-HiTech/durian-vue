<template>
  <div style="margin:0; padding:0;background:linear-gradient(to right, #bb313e25, #bb313e25, #d7222925, #dd4a1625, #e4761525, #f5c50025, #f0e92725, #b1ce2425, #48a93525, #03944525, #157c4f25, #176a5825, #1b556325, #1d386f25, #1d386f25, #20277825, #52266325, #8a244b25);">
<!--    <bargraph/>-->
<el-container>
  <el-header>导航栏</el-header>
  <el-main >
    <el-row :gutter="10">
      <el-col >
        <div >
          <el-card class="box-card test" shadow="hover">
            <div slot="header" class="clearfix">
              <span style ="font-size:18px;font-weight: 700;">title</span>
            </div>
            <div class="text item"  >content</div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </el-main>
</el-container>
  </div>
</template>

<script>

export default {
  name: "NewsDetails",
  components: {

  },
  data() {
    return {
         activeName: '1'
    };
  },
}
</script>
<style>

</style>
