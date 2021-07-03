<template>
    <div>
        <el-button @click="reset">世界地图</el-button>
        <main-map ref="MainMap"></main-map>
    </div>
</template>
<script>
import MainMap from './charts/MainMap.vue'

export default{
    name:"CovidMap",
    components:{
        MainMap
    },
    methods:{
        reset(){
            this.$refs.MainMap.backtoworld();
        }
    }
}
</script>
