<template>
  <div class="subscribe_root">
    <span class="title">
      <b>Covid</b> Subscriptions
    </span>
    <el-divider/>

    
  </div>
</template>
<script>

export default {
  name: "Subscribe",
  components: {

  },
}
</script>

<style scoped>
.subscribe_root {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
}
.title {
    font-size:80px;
    align-self: flex-start;
    position: relative;
    left: 250px;
  }
</style>
