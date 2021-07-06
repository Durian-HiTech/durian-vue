<template>
  <div class="root">
    <span class="title">
      <b>Covid</b> News
    </span>

    <div class="newsSection">
      <NewsList title="中国病例最新变化情况" style="width: 400px"/>
      <NewsList title="中国疫情防控措施" style="width: 400px"/>
      <NewsList title="国际疫情防控措施" style="width: 400px"/>
    </div>
  </div>
</template>
<script>
import NewsList from '@/components/NewsList.vue';
export default {
  name: "NewsAndNotice",
  components: {
    NewsList
  },
  data() {
    return {
         activeName: '1'
    };
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
    margin-bottom: 50px;
    position: relative;
    left: 250px;
  }

  .newsSection {
    width: 85%;
    display: flex;
    justify-content: space-around;
  }
</style>
