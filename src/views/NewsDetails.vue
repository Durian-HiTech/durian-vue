<template>
  <div style="margin:0; padding:0;background:linear-gradient(to right, #bb313e25, #bb313e25, #d7222925, #dd4a1625, #e4761525, #f5c50025, #f0e92725, #b1ce2425, #48a93525, #03944525, #157c4f25, #176a5825, #1b556325, #1d386f25, #1d386f25, #20277825, #52266325, #8a244b25);">
<!--    <bargraph/>-->
<el-container>
  <el-header>导航栏</el-header>
  <el-main >
    <el-row :gutter="10" >
      <el-col :span="24">
        <div >
          <el-card class="card4 box-card " shadow="hover">
            <div slot="header" class="clearfix">
              <span style ="font-size:28px;font-weight: 700;">{{title}}</span>
            </div>
            <div class="text item"  >{{content}}</div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </el-main>
</el-container>
  </div>
</template>

<script>
import api from '../commonApi.js'
export default {
  name: "NewsDetails",
  components: {

  },
  data() {
    return {
        title:null,
        content:null,
        createtime:null,
        load:0
    };
  },

  mounted : function(){
        var _this = this;
        // if(this.load==0) {
         
        //     window.location.reload()
        // }
        //this.$router.replace('/refresh')
        let formData = new FormData();
        formData.append('news_id', this.$route.params.id);
        this.$axios
			.post(api.baseApi+'/news/detail',formData)
                .then(function(response) {
                    console.log(response.data)
                    if (response.data.success) {  
                          _this.title=response.data.data.news_title
                          _this.content=response.data.data.news_content
                          _this.createtime=response.data.data.news_created_time
                        console.log(_this.posts)
				}else {
					this.$message({message: response.data.message,
									type: 'error'})
				}
                })
    }

}
</script>
<style scope>
  .card4{
    align-content: center;
    align-items: center;
    width: 1360px;
    height: 700px;
    background: rgb(250, 238, 238);
   
    
  }
 
</style>
