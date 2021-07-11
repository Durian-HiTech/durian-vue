<template>

  <div class="main">

    <el-input
      placeholder="Search"
      v-model="search"
      style="width: 50%;"
      >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>

    <div style="display: flex; justify-content: center; align-items: flex-start;">

      <v-app style="margin: 30px">
        <h1>辟谣专区</h1>
        <p style="color:grey;">共{{this.rumor_list_show.length}}条谣言/辟谣</p>
        <div
            style="margin: 30px"
            v-for="rumor in rumor_list_show.slice((this.currentPage_1 - 1) * this.eachPage,
              this.currentPage_1 * this.eachPage)"
            v-bind:key="rumor.rumor_id"
        >
          <RumorCard v-bind:title="rumor.rumor_title" :content="rumor.rumor_content" :rumor_type="rumor.rumor_type" :link="'rumor/'+rumor.rumor_id" />
        </div>
        <v-pagination
            style="margin-top: 30px;"
            v-model="currentPage_1"
            :length="Math.ceil(this.rumor_list_show.length / eachPage)"
            circle
            color="cyan"
        ></v-pagination>

      </v-app>

      <v-app style="margin: 30px">
        <h1>防疫小知识</h1>
        <p style="color:grey;">共{{this.knowledge_list_show.length}}条防疫小知识</p>
        <div
            style="margin: 30px"
            v-for="knowledge in knowledge_list_show.slice((this.currentPage_2 - 1) * this.eachPage,
              this.currentPage_2 * this.eachPage)"
            v-bind:key="knowledge.knowledge_id"
        >
          <QuestionCard v-bind:title="knowledge.knowledge_title" :link="'knowledge/'+knowledge.knowledge_id" :content="knowledge.knowledge_content"/>
        </div>
        <v-pagination
            style="margin-top: 30px;"
            v-model="currentPage_2"
            :length="Math.ceil(this.knowledge_list_show.length / eachPage)"
            circle
            color="cyan"
        ></v-pagination>

      </v-app>

    </div>

  </div>
</template>


<script>
import api from '../commonApi.js'
import RumorCard from './common/RumorCard'
import QuestionCard from './common/QuestionCard.vue'
import moment from "moment"

export default {
    name:"KnowledgeList",
    data(){
        return {
            knowledge_list:[],
            rumor_list: [],
            currentPage_1: 1,
            currentPage_2: 1,
            eachPage: 5,
            dialogVisible: false,
            search: '',
        }
    },
    props: ['title'],
    components: {
        QuestionCard,
        RumorCard,
    },
    computed: {
      knowledge_list_show () {
        return this.knowledge_list.filter(
          item => item.knowledge_title.indexOf(this.search)>=0
        )
      },
      rumor_list_show () {
        return this.rumor_list.filter(
          item => item.rumor_title.indexOf(this.search)>=0
        )
      },
    },
    methods:{
        sleep(ms) {
          return new Promise(resolve => 
              setTimeout(resolve, ms)
          )
        },
        getAllKnowledge() {
        let formData = new FormData();
        let config = {
            headers: {"Content-Type": "multipart/form-data",},
        };
        var _this = this;
        this.$axios.get(
            api.baseApi+"/notice/list_all_knowledge",
            formData,
            config
        ).then(function (response) {
                console.log(response.status)
                if (response.status == 200) {
                // console.log((response))
                _this.knowledge_list = response.data.data
                
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
        this.getAllRumors();
        this.getAllKnowledge();
    },
}
</script>

<style scoped>
.main{
  /*background-color: violet;*/
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rumor{
  background-image: url(../static/tag1.png);
  background-size: 200px 200px;
}
</style>
