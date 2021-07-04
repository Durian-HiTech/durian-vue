<template>
    <div>
            <div
            style="font-size:12px"
            v-for="post in posts"
            v-bind:key="post.id"
            v-bind:title="post.title"
        ><router-link :to="'news/'+post.id">{{post.title|ellipsis}}</router-link> <el-divider></el-divider></div>
    </div>
    
    
</template>


<script>

export default {
    // name:"NewsList",
    data(){
        return {
            posts: [
                 {id:"1",title: '关于印发新型冠状病毒肺炎诊疗方案（试行第八版 修订版）的通知',link:'http://www.gov.cn/zhengce/zhengceku/2021-04/15/content_5599795.htm'} ,
                 {id:"2",title: '关于调整《新冠肺炎疫情相关租金减让会计处理规定》适用范围的通知',link:'http://www.gov.cn/zhengce/zhengceku/2021-06/04/content_5615523.htm'} ,
            ]
        }
    },
    filters: {//限制文本显示字数,超出部分用...代替
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 25) {
        return value.slice(0,25) + '...'//0:下标,从第一个字开始显示,50:显示字数,多余用...代替
      }
      return value
    }
  }
    // GoUrl(){
    //     window.open(this.UrlAddr,"_blank"); //在新窗口打开外链接
    //     window.location.href = this.UrlAddr; //在本页面打开外部链接
    // }
}
</script>

<style>
    a{text-decoration:none}
</style>