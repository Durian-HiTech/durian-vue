<template>
  <div id="main">
    <div>
      这是一首简单的小情歌
      {{this.name}}
      {{this.$route.params.id}}
    </div>
    <div>
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
    }
  },
  mounted() {
    this.getComment(this.$route.params.id)
  },
  methods: {
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
      )
          .then(function (response) {
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
