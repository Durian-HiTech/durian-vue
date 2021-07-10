<template>
  <div class="root">
    <span class="title">
      <b>Covid</b> Q&A
    </span>
      
    <el-divider/>
    <QuestionList/>
  </div>
</template>


<script>
import QuestionList from '../components/QuestionList'

export default {
  name: 'QuestionAll',
  components: {
    QuestionList,
  },

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

