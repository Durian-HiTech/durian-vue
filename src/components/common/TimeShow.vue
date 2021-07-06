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
        timeString(){
            return this.$props.time;
        }
    }
})
</script>
