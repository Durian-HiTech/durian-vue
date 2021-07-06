<template>
  <div class="main_content">
    <el-container class="el-container" v-for="question in question_list"
                  :key="question.question_id" >
      <el-header height="25px" class="el-header">{{question.question_title}} </el-header>
      <el-main class="el-main-2" height="20px">{{question.user_id}}</el-main>
      <div>
        <p class="el-main">{{question.question_content}}</p>
        <p> ...继续阅读 </p>
      </div>
      <el-row align="left">
        <el-button icon="el-icon-search" circle></el-button>
      </el-row>

      <el-divider>{{question.question_time}}</el-divider>

    </el-container>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      question_list: [],
    }

  },
  mounted() {
    this.getAllComments()
  },
  methods: {
    getAllComments() {
      let formData = new FormData();
      let config = {
        headers: {"Content-Type": "multipart/form-data",},
      };
      var _this = this;
      axios.get(
          "http://durian-go-318509.df.r.appspot.com/api/v1/notice/list_all_questions",
          formData,
          config
      )
          .then(function (response) {
            console.log(response)
            console.log(response.status)
            if (response.status == 200) {
              console.log((response))
              _this.question_list = response.data.data
              for (var i = 0; i < _this.question_list.length; i++) {
                _this.question_list[i].question_time = moment(_this.question_list[i].question_time).startOf('day').fromNow();
              }
            } else {
              console.log("请求失败");
              // console.log(response.data);
              // _this.fail()
            }
          });
    },
    jumpTo(id) {
      console.log(id);
    }
  }
}
</script>

<style scope>
.main_content{
  /*background-color: #26BEB8;*/
  width: 85%;
  height: 800px;
  margin: 25px 50px 25px 100px;
}
.el-container{
  height: 200px;
}
.el-header{
  /*background-color: #dace0a;*/
  text-align: left;
  font-size: 24px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 0px;
}
.el-main{
  text-align: left;
  /*height: 30px;*/
  margin-left: 5px;
  margin-top: 5px;
  font-size: 14px;
}
.el-main::-webkit-scrollbar {
  display: none;
}
.author{
  /*background-color: antiquewhite;*/
  text-align: left;
  font-size: 14px;
  margin-left: 5px;
  margin-top: 5px;
}
p{
  word-break: keep-all;
}
</style>

