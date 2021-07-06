<template>
  <div class="root">
    <span class="title">
      <b>Covid</b> <span>Info</span>
    </span>
    <el-divider/>
    <div class="QASection">
      <NewsList title="公告" style="width: 400px"/>
      <NewsList title="辟谣" style="width: 400px"/>
      <NewsList title="问答" style="width: 400px"/>
    </div>
  </div>
</template>
<script>
import NewsList from '@/components/NewsList.vue';
export default {
  name: "Info",
  components: {
    NewsList
  },
  data() {
    
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

  .QASection {
    margin-top: 20px;
    width: 85%;
    display: flex;
    justify-content: space-around;
  }
</style>
