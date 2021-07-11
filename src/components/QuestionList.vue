<template>

  <div class="main">
    <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="问题名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="问题内容" prop="content">
            <el-input v-model="ruleForm.content" type="textarea" ></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    </span>
    </el-dialog>

    <el-input
      placeholder="Search"
      v-model="search"
      style="width: 50%;"
      >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>

    <div style="display: flex; justify-content: center; align-items: flex-start;">

      <v-app style="margin: 30px">
        <h1>谣言&辟谣</h1>
        <p style="color:grey;">共{{this.rumor_list_show.length}}条谣言/辟谣</p>
        <div
            style="margin: 30px"
            v-for="rumor in rumor_list_show.slice((this.currentPage - 1) * this.eachPage,
              this.currentPage * this.eachPage)"
            v-bind:key="rumor.rumor_id"
        >
          <RumorCard v-bind:title="rumor.rumor_title" :content="rumor.rumor_content" :rumor_type="rumor.rumor_type" :link="'rumor/'+rumor.rumor_id" />
        </div>
        <v-pagination
            style="margin-top: 30px;"
            v-model="currentPage"
            :length="Math.ceil(this.rumor_list_show.length / eachPage)"
            circle
            color="cyan"
        ></v-pagination>

      </v-app>

      <v-app style="margin: 30px">
        <h1>问答专区</h1>
        <p style="color:grey;">共{{this.question_list_show.length}}条提问</p>

        <center>
          <v-btn
            rounded
            color="cyan"
            dark
            @click="dialogVisible = true"
            width='140px'
          >
            <v-icon left>
              mdi-pencil
            </v-icon>
            我要提问
          </v-btn>
        </center>

        <div
            class="rumor"
            style="margin: 30px;"
            v-for="question in question_list_show.slice((this.currentPage_2 - 1) * this.eachPage,
              this.currentPage_2 * this.eachPage)"
            v-bind:key="question.question_id"
        >
          <QuestionCard v-bind:title="question.question_title" :link="'question/'+question.question_id" :content="question.question_content"/>
        </div>
        <v-pagination
            style="margin-top: 30px;"
            v-model="currentPage_2"
            :length="Math.ceil(this.question_list_show.length / eachPage)"
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

  </div>
</template>


<script>
import api from '../commonApi.js'
import QuestionCard from './common/QuestionCard.vue'
import RumorCard from './common/RumorCard'
import moment from "moment"

export default {
    name:"QuestionList",
    data(){
        return {
            question_list: [],
            rumor_list: [],
            currentPage: 1,
            currentPage_2: 1,
            currentPage_3: 1,
            eachPage: 5,
            total: 0,
            dialogVisible: false,
            search: '',
            ruleForm: {
              name: '',
              content: '',
            },
            rules: {
              name: [
                { required: true, message: '请输入问题标题', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
              ],
              content: [
                { required: true, message: '请输入问题内容', trigger: 'blur' },
                { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
              ],
            } 
        }
    },
    props: ['title'],
    components: {
        QuestionCard,
        RumorCard
    },
    computed: {
      rumor_list_show () {
        return this.rumor_list.filter(
          item => item.rumor_title.indexOf(this.search)>=0
        )
      },
      question_list_show () {
        return this.question_list.filter(
          item => item.question_title.indexOf(this.search)>=0
        )
      }
    },
    methods:{
           sleep(ms) {
          return new Promise(resolve => 
              setTimeout(resolve, ms)
          )
        },
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
        handleClose(done) {
          this.$confirm('确认关闭？')
              // eslint-disable-next-line no-unused-vars
              .then(_ => {
                done();
              })
              // eslint-disable-next-line no-unused-vars
              .catch(_ => {});
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.dialogVisible = false
              console.log(this.ruleForm)
              let formData = new FormData();
              formData.append("user_id", this.$store.getters.userState.id);
              formData.append("question_title", this.ruleForm.name);
              formData.append("question_content", this.ruleForm.content);
              let config = {
                headers: {"Content-Type": "multipart/form-data",},
              };
               var _this = this;
              this.$axios.post(
                  api.baseApi+"/notice/create_question",
                  formData,
                  config
              ).then(function (response) {
                    console.log(response.status)
                    if (response.status == 200) {
                      console.log((response))
                       _this.$message({ message: "提问成功", type: "success" });
                      _this.sleep(500).then(()=>{
                        _this.$router.go(0)
                      })
                    } else {
                      console.log("请求失败");
                      // console.log(response.data);
                      // _this.fail()
                    }
                  });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
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
  flex-direction: column;
  align-items: center;
}
.rumor{
  background-image: url(../static/tag1.png);
  background-size: 200px 200px;
}
</style>
