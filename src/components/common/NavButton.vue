<template>
	<div @mouseleave="mouseLeave()">
	<div class='NavButton' @mouseenter="mouseEnter()" @click="toHome()" style="cursor:pointer">
		<i class='el-icon-s-home'></i>
	</div>

	<div class='NavItem' @click="toNews()" style="cursor:pointer">
		<i class='el-icon-document-copy' style='margin-right: 5px'></i>
		新闻页面
	</div>

	<div class='NavItem' @click="dialogTableVisible = true">
		<i class='el-icon-office-building' style='margin-right: 5px'></i>
		我的城市
	</div>

	<div class='NavItem'>
		<i class='el-icon-position' style='margin-right: 5px'></i>
		行程提醒
	</div>

  <el-dialog title="订阅的城市" :visible.sync="dialogTableVisible">
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          label="订阅城市"
          prop="city_name">
      </el-table-column>
      <el-table-column
          label="今日新增"
          prop="name">
      </el-table-column>
      <el-table-column
          align="right">
        <template slot="header">
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
<!--          <el-button-->
<!--              size="mini"-->
<!--              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>-->
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">取消订阅</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

	</div>
</template>

<script>
import axios from "axios";
// import moment from "moment";

export default {
	name: 'NavButton',
  mounted : function(){
    this.updateSub()
  },
	methods: {
		mouseEnter() {
			this.$gsap.to(".NavButton", {
						duration: 0.5, ease: 'power4.out',
						width: '200px',
						boxShadow:'0px 0px 30px 5px rgba(128, 128, 128, 0.25)',
						borderRadius: '30px',
						})

			this.$gsap.fromTo('.NavItem', {
						duration: 1,
						ease: 'power4.out',
						top: "+=40px",
						opacity: 0,
						}, {
						duration: 1,
						ease: 'power4.out',
						top: "0px",
						opacity: 1,
						stagger: {
							amount: 0.2
						}})
		},
		mouseLeave() {
			this.$gsap.to(".NavButton", {
						duration: 0.5, ease: 'power4.out',
						width: '40px',
						boxShadow:'0px 0px 10px 2px rgba(128, 128, 128, 0.1)',
						borderRadius: '50%',
						})
			this.$gsap.to('.NavItem', {
						duration: 1,
						ease: 'power4.out',
						opacity: 0
						})
		},
		toHome () {
			this.$router.push('/')
		},
		toNews () {
			this.$router.push('/news')
		},
    handleDelete(index, row) {
      let formData = new FormData();
      formData.append("subscription_id", row.subscription_id);
      let config = {
        headers: {"Content-Type": "multipart/form-data",},
      };
      var _this = this;
      axios.post(
          "https://durian-go-318509.df.r.appspot.com/api/v1/sub/del_sub",
          formData,
          config
      ).then(function (response) {
            if (response.status == 200) {
              // console.log((response.data.data))
              _this.updateSub()
            } else {
              console.log("请求失败");
              // console.log(response.data);
              // _this.fail()
            }
          });
    },
    updateSub() {
      let formData = new FormData();
      formData.append("user_id", this.$store.getters.userState.id);
      let config = {
        headers: {"Content-Type": "multipart/form-data",},
      };
      var _this = this;
      axios.post(
          "https://durian-go-318509.df.r.appspot.com/api/v1/sub/list_all_subs",
          formData,
          config
      )
          .then(function (response) {
            console.log(response)
            console.log(response.status)
            if (response.status == 200) {
              // console.log((response.data.data))
              _this.tableData = response.data.data
              console.log(_this.tableData)
            } else {
              console.log("请求失败");
              // console.log(response.data);
              // _this.fail()
            }
          });
    },
	},
  data(){
    return {
      dialogTableVisible: false,
      tableData: [],
      search: '1',
    }
  },
}
</script>

<style>
.NavButton {
	/* outline: #00ff00 dotted thick; */
	height: 40px;
	width: 40px;
	position: relative;
	backdrop-filter: blur(20px);
	background-color: rgba(255,255,255,0.5);

	border-radius: 50%;
	border: #bfbec0 solid thin;

	box-shadow: 0px 0px 10px 2px rgba(128, 128, 128, 0.1);

	overflow: hidden;

	display: flex;
	justify-content: center;
	align-items: center;

	color: rgb(65, 65, 65) ;
	font-size: 25px;
}
.NavItem {
	/* outline: #00ff00 dotted thick; */
	width: 200px;
	height: 40px;

	color: rgb(65, 65, 65);

	position: relative;
	backdrop-filter: blur(20px);
	background-color: rgba(255,255,255,0.5);
	margin-top: 10px;

	border-radius: 30px;
	border: #bfbec0 solid thin;

	box-shadow: 0px 0px 30px 5px rgba(128, 128, 128, 0.25);

	overflow: hidden;

	opacity: 0;

	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
