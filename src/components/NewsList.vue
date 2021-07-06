<template>
<v-app>

    <div
        style="margin: 30px"
        v-for="post in posts.slice((this.currentPage - 1) * this.eachPage,
            this.currentPage * this.eachPage)"
        v-bind:key="post.news_id"
    >
        <NewsCard v-bind:title="post.news_title" :link="'news/'+post.news_id" :content="post.news_content"/>
    </div>
    <v-pagination
        style="margin-top: 30px"
        v-model="currentPage"
        :length="total"
        circle
        color="orange lighten-2"
    ></v-pagination>

</v-app>
</template>


<script>
import api from '../commonApi.js'
import NewsCard from './common/NewsCard.vue'

export default {
    name:"NewsList",
    data(){
        return {
            posts: [
            //      {news_id:"1",news_title: '关于印发新型冠状病毒肺炎诊疗方案（试行第八版 修订版）的通知',news_content: "新闻内容01",news_created_time: "2021-07-04T10:53:50Z"} ,
            //      {news_id:"2",news_title: '关于调整《新冠肺炎疫情相关租金减让会计处理规定》适用范围的通知',news_content: "新闻内容01",news_created_time: "2021-07-04T10:53:50Z"} ,
            // 
            ],
            currentPage: 1,
            eachPage: 5,
            total: 0,
        }
    },
    components: {
        NewsCard
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
                // console.log(response.data)
                if (response.data.success) {  
                    for ( var m in response.data.data){
                        _this.posts.push(response.data.data[m])
                        // console.log(response.data.data)
                    }

                    // console.log(_this.posts)

                    _this.total = _this.posts.length
            }else {
                this.$message({message: response.data.message,
                                type: 'error'})
            }
            })
    }
        
    ,
    }


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