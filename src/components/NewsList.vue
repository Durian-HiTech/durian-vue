<template>
    <div>
            <div
            style="font-size:14px"
            v-for="post in posts"
            v-bind:key="post.news_id"
            v-bind:title="post.news_title"
        ><router-link :to="'news/'+post.news_id">{{post.news_title|ellipsis}}</router-link> <el-divider></el-divider></div>
    </div>
    
    
</template>


<script>
import api from '../commonApi.js'
export default {
    // name:"NewsList",
    data(){
        return {
            posts: [
            //      {news_id:"1",news_title: '关于印发新型冠状病毒肺炎诊疗方案（试行第八版 修订版）的通知',news_content: "新闻内容01",news_created_time: "2021-07-04T10:53:50Z"} ,
            //      {news_id:"2",news_title: '关于调整《新冠肺炎疫情相关租金减让会计处理规定》适用范围的通知',news_content: "新闻内容01",news_created_time: "2021-07-04T10:53:50Z"} ,
            // 
            ]
        }
    },
    filters: {//限制文本显示字数,超出部分用...代替
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 25) {
        return value.slice(0,20) + '...'//0:下标,从第一个字开始显示,50:显示字数,多余用...代替
      }
      return value
    },
    },
    
    methods:{
    },
    
    mounted : function(){
        var _this = this
         this.$axios
			.get(api.baseApi+'/news/list_all_news')
                .then(function(response) {
                    console.log(response.data)
                    if (response.data.success) {  
                        for ( var m in response.data.data){
                            _this.posts.push(response.data.data[m])
                            console.log(response.data.data)
                        }

                        
                        console.log(_this.posts)
				}else {
					this.$message({message: response.data.message,
									type: 'error'})
				}
                })
    }
        
    ,
    }
  
    // GoUrl(){
    //     window.open(this.UrlAddr,"_blank"); //在新窗口打开外链接
    //     window.location.href = this.UrlAddr; //在本页面打开外部链接
    // }

</script>

<style scope>
    .router-link-active {
        text-decoration: none;
        color: rgb(32, 32, 3);
    }
    a{
        text-decoration: none;
        color: rgb(15, 9, 9);
    }
</style>