<template>
    <div>
        <span>{{timeString}}</span>
    </div>
</template>
<script>
export default({
    name:"TimeShow",
    props:{
        time:{
            type:String,
            required:true
        }
    },
    computed:{
        timeString(){// 转化时间格式
            return this.$props.time;
        }
    }
})
</script>
