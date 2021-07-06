<template>
  <div class="root">
    <span class="title">
      <b>Covid</b> <span>Q&A</span>
    </span>
    <el-divider/>
    <div class="QASection">
      <NewsList title="中国病例最新变化情况" style="width: 400px"/>
      <NewsList title="中国疫情防控措施" style="width: 400px"/>
      <NewsList title="国际疫情防控措施" style="width: 400px"/>
    </div>
  </div>
</template>
<script>
import NewsList from '@/components/NewsList.vue';
export default {
  name: "Q&A",
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
