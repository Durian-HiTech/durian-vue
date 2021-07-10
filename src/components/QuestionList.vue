<template>
  <div class="main">

    <v-app style="margin: 30px">
      <h1>谣言&辟谣</h1>
      <p style="color:grey;">共{{this.rumor_list.length}}条谣言/辟谣</p>
      <div
          style="margin: 30px"
          v-for="rumor in rumor_list.slice((this.currentPage - 1) * this.eachPage,
            this.currentPage * this.eachPage)"
          v-bind:key="rumor.rumor_id"
      >
        <RumorCard v-bind:title="rumor.rumor_title" :content="rumor.rumor_content" :rumor_type="rumor.rumor_type" :link="'rumor/'+rumor.rumor_id" />
      </div>
      <v-pagination
          style="margin-top: 30px;"
          v-model="currentPage"
          :length="Math.ceil(this.rumor_list.length / eachPage)"
          circle
          color="cyan"
      ></v-pagination>

    </v-app>

    <v-app style="margin: 30px">
      <h1>问答专区</h1>
      <p style="color:grey;">共{{this.question_list.length}}条提问</p>
      <div
          class="rumor"
          style="margin: 30px;"
          v-for="question in question_list.slice((this.currentPage_2 - 1) * this.eachPage,
            this.currentPage_2 * this.eachPage)"
          v-bind:key="question.question_id"
      >
        <QuestionCard v-bind:title="question.question_title" :link="'question/'+question.question_id" :content="question.question_content"/>
      </div>
      <v-pagination
          style="margin-top: 30px;"
          v-model="currentPage_2"
          :length="Math.ceil(this.question_list.length / eachPage)"
          circle
          color="cyan"
      ></v-pagination>

    </v-app>


    <v-app style="margin: 30px">
      <h1>防疫小知识</h1>
      <p style="color:grey;">共{{total}}条防疫小知识</p>
      <div
          style="margin: 30px"
          v-for="question in question_list.slice((this.currentPage_3 - 1) * this.eachPage,
            this.currentPage_3 * this.eachPage)"
          v-bind:key="question.question_id"
      >
        <QuestionCard v-bind:title="question.question_title" :link="'question/'+question.question_id" :content="question.question_content"/>
      </div>
      <v-pagination
          style="margin-top: 30px;"
          v-model="currentPage_3"
          :length="Math.ceil(total / eachPage)"
          circle
          color="cyan"
      ></v-pagination>

    </v-app>
  </div>

</template>


<script>
import api from '../commonApi.js'
import QuestionCard from './common/QuestionCard.vue'
import RumorCard from './common/RumorCard'
import moment from "moment"

export default {
    name:"NewsList",
    data(){
        return {
            question_list: [],
            rumor_list: [],
            currentPage: 1,
            currentPage_2: 1,
            currentPage_3: 1,
            eachPage: 5,
            total: 0,
        }
    },
    props: ['title'],
    components: {
        QuestionCard,
        RumorCard
    },
    methods:{
        getAllQuestions() {
        let formData = new FormData();
        let config = {
            headers: {"Content-Type": "multipart/form-data",},
        };
        var _this = this;
        this.$axios.get(
            api.baseApi+"/notice/list_all_questions",
            formData,
            config
        ).then(function (response) {
                console.log(response.status)
                if (response.status == 200) {
                // console.log((response))
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
        getAllRumors() {
          let formData = new FormData();
          let config = {
            headers: {"Content-Type": "multipart/form-data",},
          };
          var _this = this;
          this.$axios.get(
              api.baseApi+"/notice/list_all_rumor",
              formData,
              config
          ).then(function (response) {
                console.log(response)
                console.log(response.status)
                if (response.status == 200) {
                  console.log((response))
                  _this.rumor_list = response.data.data
                  for (var i = 0; i < _this.rumor_list.length; i++) {
                    _this.rumor_list[i].rumor_time = moment(_this.rumor_list[i].rumor_time).subtract(12,"hours").startOf('day').fromNow();
                  }
                  _this.total = _this.rumor_list.length
                } else {
                  console.log("请求失败");
                  // console.log(response.data);
                  // _this.fail()
                }
              });
        },
    },
    mounted : function(){
        this.getAllQuestions();
        this.getAllRumors();
    },
}
</script>

<style scoped>
.main{
  /*background-color: violet;*/
  display: flex;
  flex-direction: row;
}
.rumor{
  background-image: url(../static/tag1.png);
  background-size: 200px 200px;
}
</style>
