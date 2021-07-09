<template>
  <div class="root">
    <span class="title">
      <b>Covid</b> Q&A
    </span>
    <el-button type="text" @click="dialogVisible = true">添加问题</el-button>

      <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="问题名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="问题内容" prop="name">
            <el-input v-model="ruleForm.content"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    </span>
    </el-dialog>
    <el-divider/>
    <QuestionList/>
  </div>
</template>


<script>
import QuestionList from '../components/QuestionList'
import axios from "axios";
import api from '../commonApi.js'
export default {
  name: 'QuestionAll',
  components: {
    QuestionList,
  },
  data() {
    return {
      dialogVisible: false,
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
  methods: {
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
          // var _this = this;
          axios.post(
              api.baseApi+"/notice/create_question",
              formData,
              config
          ).then(function (response) {
                console.log(response.status)
                if (response.status == 200) {
                  console.log((response))

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
    }

  }
}
</script>

<style scoped>
.root {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

.title {
    font-size:80px;
    align-self: flex-start;
    position: relative;
    left: 250px;
  }
</style>

