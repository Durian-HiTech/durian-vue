<template>

  <div id="nav_bar">
    
    <div class="nav_bar_frame">
      <div class="nav_bar_icon" @click="backtostartpage">
        <div class="nav_bar_icon_title_bold">Durian</div>
        <div class="nav_bar_icon_title"> Covid</div>
      </div>

      <div class="nav_bar_item_outer_frame">
      <router-link
        :to="item.url"
        tag="div"
        class="nav_bar_item"
        active-class="nav_bar_item_active"
        v-for="(item) in pages"
        :key="item.name"
      >
        {{ item.title }}
      </router-link>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "NavBar",
  components: {
  },
  data() {
    return {
      pages: [
        {
          title:"新闻",
          url: "/news",
        },
        {
          title:"问答",
          url: "/question",
        },
        {
          title:"行程",
          url: "/travel",
        },
        {
          title:"订阅",
          url: "/subscribe",
        }
      ],
    };
  },
  methods: {
	backtostartpage(){
		this.$router.push('/')
		window.location.reload();
	},
  }
};
</script>

<style scoped>


#user-avatar {
	position: fixed;
	right: 20px;
	top: 3px;
	z-index: 10;
}
	
#nav_bar {
  position: fixed;
  z-index: 10;
  top: 0px;
  height: 46px;
  width: 100vw;
  vertical-align: middle;
  
  border: #cecfd2 solid thin;
  
  backdrop-filter: blur(20px);
  background-color: rgba(255,255,255,0.5);
}
.nav_bar_frame {
  vertical-align: middle;
  height: 45px;
  width: 100%;
}

.nav_bar_icon {
  margin-left: 25px;
  float: left;
  line-height: 45px;
  vertical-align: middle;
  height: 45px;
  cursor: pointer;
}
.nav_bar_icon_title_bold {
  display: inline;
  font-weight: bold;
}
.nav_bar_icon_title {
  display: inline;
}
.nav_bar_item_outer_frame {
  float: left;
  margin-left: 20px;
}
.nav_bar_item {
  display: inline;
  color: black;
  margin: 0px 10px 10px 0px;
  line-height: 45px;
  cursor: pointer;
}
.nav_bar_item_active {
  display: inline;
  line-height: 45px;
  border-bottom-style: outset;
  border-bottom-color: black;
  border-bottom-width: 2px;
  font-weight: bold;
  height: 45px;
  width: 100%;
}
.nav_bar_action_frame {
  float: right;
  margin-right: 50px;
}
.nav_bar_action_link {
  display: inline;
  line-height: 45px;
}
.el-button--text{
  font-size:16px;
    color: rgb(7, 7, 7);
}
.el-button--text:hover{
  font-size:16px;
    color: rgb(7, 7, 7);
}
</style>
