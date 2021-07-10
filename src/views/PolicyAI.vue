<template>
  <div class="policy_root">
    <span class="title"> <b>Covid</b> AI Policy </span>
    <el-divider />

    <div
      style="
        font-size: 30px;
        color: #444444;
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
      "
      @click="dialogTableVisible = true"
    >
      <el-button
        type="primary"
        icon="el-icon-edit"
        circle
        style="margin-right: 20px"
      ></el-button>
      请输入您的问题，耐心等待回复
    </div>
  </div>
</template>

<script>
export default {
  name: "PolicyAI",
  components: {},
};
</script>

<style scoped>
.policy_root {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
}
.title {
  font-size: 80px;
  align-self: flex-start;
  position: relative;
  left: 250px;
}

</style>
