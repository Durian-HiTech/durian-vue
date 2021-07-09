<template>
  <div class="main">
    <div class="content">
      <div class="left_margin" style="width: 18%;"></div>
      <div class="main_content">
        <div class="question">
          <div class="question_title">
            {{question.question_title}}
          </div>
          <div class="question_content">
            {{question.question_content}}
          </div>
          <div class="question_user" style="text-align: left; color: gray; margin-left: 20px">
            {{comment_list.length}}条回答
          </div>
          <el-divider>{{question.user_id}} 发布于 {{question.question_time}} </el-divider>

        </div>
        <div class="comment">
          <div class="left_comment_margin" style="width: 10%;"></div>

          <div class="comment_list" style="display: flex; flex-direction: column; width: 80%">
            <div v-for="item in comment_list" :key="item.comment_id" style="width: 100%;">
              <CommentCard style="margin: 20px" :user=item.user_id :is-authority=item.user_type :content=item.comment_content :time=item.comment_time></CommentCard>
            </div>
          </div>

          <div class="right_comment_margin" style="width: 10%;"></div>
        </div>
      </div>
      <div class="right_margin" style="width: 18%;"></div>
    </div>
  </div>
</template>

<script>
import api from '../commonApi.js'
import axios from "axios";
import moment from "moment";
import 'moment/locale/zh-cn'
import CommentCard from '../components/common/CommentCard.vue'
export default {
  components: {
    // GlobalMap,
    CommentCard,
  },
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
      formData.append("question_id", id);
      let config = {
        headers: {"Content-Type": "multipart/form-data",},
      };
      var _this = this;
      axios.post(
          api.baseApi+"/notice/question_detail",
          formData,
          config
      ).then(function (response) {
            console.log(response.status)
            if (response.status == 200) {
              _this.question = response.data.data
              console.log(_this.question)
              console.log(moment(_this.question.question_time).utcOffset(8))
              _this.question.question_time = moment(_this.question.question_time).utcOffset(8).format('YYYY/MM/DD HH:mm:ss');
              console.log(_this.question.question_time)
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
          api.baseApi+"/notice/list_all_comments",
          formData,
          config
      ).then(function (response) {
            console.log(response)
            console.log(response.status)
            if (response.status == 200) {
              console.log((response))
              _this.comment_list = response.data.data
              if(_this.comment_list != null) {
                for (var i = 0; i < _this.comment_list.length; i++) {
                  // console.log(moment(_this.comment_list[i].comment_time).format("MMM Do YY") )
                  _this.comment_list[i].comment_time = moment(_this.comment_list[i].comment_time).startOf('day').fromNow();
                }
              }
              console.log(_this.comment_list)
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
          api.baseApi+"/notice/create_comment",
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
.main{
  width: 100%; background-color: #F2F6FC; margin-top: 50px
}
.content{
  /*background-color: #FFFFFF;*/
  display: flex;
  flex-direction: row;
  height: 800px;
  /*margin: 25px 50px 25px 100px;*/
}
.question_content {
  text-align: left;
  width: 95%;
  margin: 20px;
}
.comment{
  /*background-color: #FFFFFF;*/
  display: flex;
  flex-direction: row;
  /*width: 75%;*/
  height: 800px;
  /*margin: 25px 50px 25px 100px;*/
}
.main_content{
  display: flex;
  flex-direction: column;
  /*height: 500px;*/
  width: 64%;
}

.question{
  display: flex;
  flex-direction: column;
  height: 300px;
  /*background-color: violet;*/
}
.question_title{
  /*background-color: blueviolet;*/
  width: 95%;
  text-align: left;
  font-size: 28px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 20px;
}

p{
  word-break: keep-all;
}
</style>
