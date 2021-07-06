<template>
  <div>
    <el-table
        :data="question_list"
        style="width: 100%">
      <el-table-column
          prop="question_time"
          label="提问时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="user_id"
          label="用户ID"
          width="180">
      </el-table-column>
      <el-table-column
          prop="question_title"
          label="问题标题">
      </el-table-column>
      <el-table-column
          prop="question_content"
          label="问题内容">
      </el-table-column>
    </el-table>
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

  }
}
</script>
