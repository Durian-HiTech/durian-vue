<template>
  <div class="main_question">
    <div class="content">
      <div class="left_margin" style="width: 15%;"></div>
      <div class="main_content">
        <div class="question">
          <div class="question_title">
            {{question.question_title}}
          </div>
          <div class="question_content">
            {{question.question_content}}
          </div>
          <div class="question_user" style="text-align: left; color: gray; margin-left: 20px" v-if="has_comments">
            {{comment_list.length}}条回答
          </div>
          <div class="question_user" style="text-align: left; color: gray; margin-left: 20px" v-else>
            0条回答
          </div>
          <el-divider>{{question.username}} 发布于 {{question.question_time}} </el-divider>
        </div>

        <div class="comment">
          <div class="left_comment_margin" style="width: 5%;"></div>

          <div class="comment_list" style="display: flex; flex-direction: column; width: 90%;">
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;
                   margin: 15px"
                  >
              <div style="height: 100%;  display: flex;
                  justify-content: center; align-items: center">
                <el-avatar size=medium style="margin-left: 10px; " >
                  <img src="../assets/avatar/cat.jpg">
                </el-avatar>
              </div>
              <el-input
                  type="textarea"
                  placeholder="输入添加评论"
                  :autosize="{ minRows: 3, maxRows: 5 }"
                  style="font-size: 16px; margin-left: 5px; margin-right: 5px"
                  v-model="input">
              </el-input>
              <el-button type="primary" style="background-color: #2b6dad; border-radius: 10px" @click="commit_comment">评论</el-button>
            </div>
            <div v-for="item in comment_list" :key="item.comment_id" style="width: 97%;">
              <CommentCard style="margin: 10px" :username=item.username :is-authority=item.user_type :content=item.comment_content :time=item.comment_time :user_info=item.user_info></CommentCard>
            </div>
          </div>

          <div class="right_comment_margin" style="width: 5%;"></div>
        </div>
      </div>
      <div class="right_margin" style="width: 21%;">
        <div class="related_question">
          <div class="related_question_header" style="margin-top: 10px; margin-left: 10px; font-size: 18px; text-align: left; ">
            为您推荐问题
            <el-divider></el-divider>
          </div>
          <div class="related_question_content" style="text-align: left; margin-left: 5px; color: gray;">
            <div v-for="item in related_list" :key="item.id" style="margin: 10px">
              <router-link :to="{path: '/question/'+ item.id}" @click.native="refresh">{{ item.content }} </router-link>
            </div>
          </div>

        </div>
      </div>
      <div class="right_margin" style="width: 10%; "></div>
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
      question: {},
      has_comments: false,
      related_list: [
        {id: 1, content: "If your partner would allow it, would you sleep, cook, read and watch TV naked?"},
        {id: 2, content: "Do you go naked when home alone?"},
        {id: 3, content: "I want to sleep shirtless at night, but I am a girl and my parents wake me up each"},
        {id: 4, content: "Do you wear clothes when you are alone at home?"},
      ]
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
            if (response.status == 200) {
              _this.question = response.data.data
              _this.question.question_time = moment(_this.question.question_time).utcOffset(8).format('YYYY/MM/DD HH:mm:ss');
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
            if (response.status == 200) {
              console.log((response.data.data))
              if(response.data.data != null) {
                _this.comment_list = response.data.data
                for (var i = 0; i < _this.comment_list.length; i++) {
                  // console.log(moment(_this.comment_list[i].comment_time).format("MMM Do YY") )
                  _this.comment_list[i].comment_time = moment(_this.comment_list[i].comment_time).utcOffset(8);
                  _this.comment_list[i].comment_time = moment(_this.comment_list[i].comment_time).startOf('minute').fromNow();
                }
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
      var tmpt = this.input
      this.input = ''
      let formData = new FormData();
      formData.append("user_id", this.$store.getters.userState.id);
      formData.append("user_type", this.$store.getters.userState.type);
      formData.append("question_id", this.$route.params.id);
      formData.append("comment_content", tmpt);

      var tmp = {}
      tmp['comment_content'] = tmpt
      tmp['comment_id'] = -1
      tmp['comment_time'] = "几秒前"
      tmp['question_id'] = this.$route.params.id
      tmp['user_id'] = this.$store.getters.userState.id
      tmp['user_type'] = this.$store.getters.userState.type
      tmp['username'] = this.$store.getters.userState.name
      console.log(this.comment_list)
      this.comment_list.unshift(tmp)
      console.log(this.comment_list)
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
    refresh(){
      this.$router.go(0);
    }
  },


}
</script>
<style scope>
.main_question{
  width: 100%;
  background-color: #F2F6FC;
  margin-top: 50px
}
.content{
  /*background-color: #FFFFFF;*/
  display: flex;
  flex-direction: row;
  /*height: 800px;*/
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
  /*height: 800px;*/
  /*margin: 25px 50px 25px 100px;*/
}
.main_content{
  display: flex;
  flex-direction: column;
  /*height: 500px;*/
  background-color: white;
  width: 54%;
}

.question{
  display: flex;
  flex-direction: column;
  /*height: 300px;*/
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
.related_question{
  /*background-color: blueviolet;*/
  height: 400px;
  width: 300px;
  position: fixed;
  right: 160px;
  top: 60px;
  }
a{
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>
