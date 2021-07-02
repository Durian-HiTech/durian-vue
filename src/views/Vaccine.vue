<template>
  <b>{{this.name}}</b>
</template>

<script>
import axios from "axios";

export default{
    data() {
        return {
            name: "复兴组"
        };
    },
    mounted() {
        this.getChinaVaccine();
    },
    methods: {
        getChinaVaccine() {
            console.log(1);
            let formData = new FormData();
            // formData.append("author_id", this.authorId);
            let config = {
                headers: {"Content-Type": "multipart/form-data",},
            };
            var _this = this;
            axios.get(
                "https://disease.sh/v3/covid-19/historical/China?lastdays=30",
                formData,
                config
                )   
                .then(function (response) {
                    console.log(response)
                    console.log(response.status)
                if (response.status == 200) {
                    _this.name = response.data.timeline
                    // _this.relatedloaded = true;
                } else {
                    // console.log("请求失败");
                    // console.log(response.data);
                    // _this.fail()
                }
                });
        },
    },
};
</script>