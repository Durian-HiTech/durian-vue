<template>
<v-app >
    <h1>{{title}}</h1>
    <p style="color:grey;">共{{total}}条提问</p>
    <div
        style="margin: 30px"
        v-for="question in question_list.slice((this.currentPage - 1) * this.eachPage,
            this.currentPage * this.eachPage)"
        v-bind:key="question.question_id"
    >
        <QuestionCard v-bind:title="question.question_title" :link="'question/'+question.question_id" :content="question.question_content"/>
    </div>
    <v-pagination
        style="margin-top: 30px;"
        v-model="currentPage"
        :length="Math.ceil(total / eachPage)"
        circle
        color="cyan"
    ></v-pagination>

</v-app>
</template>


<script>
import api from '../commonApi.js'
import QuestionCard from './common/QuestionCard.vue'
import moment from "moment"

export default {
    name:"NewsList",
    data(){
        return {
            question_list: [],
            currentPage: 1,
            eachPage: 5,
            total: 0,
        }
    },
    props: ['title'],
    components: {
        QuestionCard
    },    
    methods:{
        getAllQuestions() {
        let formData = new FormData();
        let config = {
            headers: {"Content-Type": "multipart/form-data",},
        };
        var _this = this;
        this.$axios.get(
            api.baseApi+"/notice/list_all_questions",
            formData,
            config
        )
            .then(function (response) {
                console.log(response)
                console.log(response.status)
                if (response.status == 200) {
                console.log((response))
                _this.question_list = response.data.data
                for (var i = 0; i < _this.question_list.length; i++) {
                    _this.question_list[i].question_time = moment(_this.question_list[i].question_time).startOf('day').fromNow();
                }
                _this.total = _this.question_list.length
                } else {
                console.log("请求失败");
                // console.log(response.data);
                // _this.fail()
                }
            });
        },
    },
    mounted : function(){
        this.getAllQuestions ()
    },
}
</script>

<style scoped>

</style>