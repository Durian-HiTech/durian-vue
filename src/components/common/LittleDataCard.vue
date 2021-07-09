<template>
    <div class="showcardroot">
        <div class="nownum"><span :style="'color:'+this.color">{{nownum}}</span></div>
        <div class="type">{{type}}</div>
        <div class="newnum"> 较上日 <span class="newNumVal" :style="'color:' + this.color">  {{newnumShow}} </span> </div>
    </div>
</template>
<script>
export default({
    name:"LittleDataCard",
    props: ['nownum', 'type', 'newnum', 'color'],
    computed:{
        newnumShow(){
            if(this.$props.newnum>0){
                return "+"+this.$props.newnum.toString();
            }else return this.$props.newnum;
        }
    }
})

</script>

<style scoped>
.showcardroot {
    margin: 10px;
    margin-left:15px; 
    margin-right:15px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.nownum {
    font-family: "Gill Sans", sans-serif;
    font-size: 35px;
    font-weight: 600;
}
.newnum {
    color: rgb(104, 105, 106);
    font-size: 25px;
    font-weight: 500;
}
.newNumVal {
	color: #AC3500;
	font-weight: 900;
}
.type {
  white-space: nowrap;
  text-align: center;

  font-size: 20px;
  font-weight: 500;

  background-color:rgba(20, 20, 20, 0.3);
  color: white;

  border-radius: 30px;

  padding: 5px 15px 5px 15px;
  margin: 3px;
}
</style>
