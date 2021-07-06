<template>
  <div class="main" style="width: 100%; background-color: #F2F6FC; position: relative">
    <div class="main-content" >
      <el-container class="el-container" >
        <el-header height="25px" class="el-header">{{question.question_title}} </el-header>
        <el-main class="el-main-2" height="20px">{{question.user_id}}</el-main>
        <div>
          <p class="el-main">{{question.question_content}}</p>
        </div>
        <el-divider>{{question.question_time}}</el-divider>
      </el-container>
    </div>
    <div class="comment" style="width: 70%">
      <el-table
          :data="comment_list"
          style="width: 100%">
        <el-table-column
            prop="comment_time"
            label="评论日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="user_id"
            label="用户id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="comment_content"
            label="评论内容">
        </el-table-column>
      </el-table>
      <el-input v-model="input" placeholder="请输入评论" ></el-input>
      <el-button type="primary" @click="commit_comment">提交评论</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import 'moment/locale/zh-cn'
export default {
  data() {
    return {
      name: "问题界面",
      comment_list: [],
      input: '',
      question: {}
    }
  },
  mounted() {
    this.getQuestions(this.$route.params.id)
    this.getComment(this.$route.params.id)
  },
  methods: {
    getQuestions(id) {
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
              for (var i = 0; i < response.data.data.length; i++) {
                if(response.data.data[i].question_id == id) {
                  _this.question = response.data.data[i]
                  _this.question.question_time = moment(_this.question.question_time).startOf('day').fromNow();
                  console.log(_this.question)
                }
                else continue;
              }
            } else {
              console.log("请求失败");
              // console.log(response.data);
              // _this.fail()
            }
          });
    },
    getComment(id) {
      let formData = new FormData();
      formData.append("question_id", id);
      let config = {
        headers: {"Content-Type": "multipart/form-data",},
      };
      var _this = this;
      axios.post(
          "https://durian-go-318509.df.r.appspot.com/api/v1/notice/list_all_comments",
          formData,
          config
      ).then(function (response) {
            console.log(response)
            console.log(response.status)
            if (response.status == 200) {
              console.log((response))
              _this.comment_list = response.data.data
              for (var i = 0; i < _this.comment_list.length; i++) {
                // console.log(moment(_this.comment_list[i].comment_time).format("MMM Do YY") )
                  _this.comment_list[i].comment_time = moment(_this.comment_list[i].comment_time).startOf('day').fromNow();
              }
              // _this.relatedloaded = true;
            } else {
              console.log("请求失败");
              // console.log(response.data);
              // _this.fail()
            }
          });
    },
    commit_comment() {
      console.log(this.input)
      let formData = new FormData();
      formData.append("user_id", this.$store.getters.userState.id);
      formData.append("user_type", this.$store.getters.userState.type);
      formData.append("question_id", this.$route.params.id);
      formData.append("comment_content", this.input);
      let config = {
        headers: {"Content-Type": "multipart/form-data",},
      };
      var _this = this;
      axios.post(
          "https://durian-go-318509.df.r.appspot.com/api/v1/notice/create_comment",
          formData,
          config
      )
          .then(function (response) {
            console.log(response)
            console.log(response.status)
            if (response.status == 200) {
              //console.log((response))
              _this.getComment(_this.$route.params.id);
            } else {
              console.log("请求失败");
              // console.log(response.data);
              // _this.fail()
            }
          });
    },
  },


}
</script>
<style scope>
.comment{
  background-color: #FFFFFF;
  width: 75%;
  height: 800px;
  margin: 25px 50px 25px 100px;
}
.main_content{
  background-color: #FFFFFF;
  width: 75%;
  height: 800px;
  margin: 25px 50px 25px 100px;
}
.el-container{
  height: 250px;
}
.el-header{
  /*background-color: #C0C4CC;*/
  font-weight: bold;
  /*height: 40px;*/
  text-align: left;
  font-size: 24px;
  margin: 5px 5px 0px;
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
