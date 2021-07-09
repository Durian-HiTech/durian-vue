<template>
    <div class="s_table_root">
    <v-app>
        <v-card class="s_table">
            <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                color='#00ACA5'
            ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="detailed"
            :search="search"
            :footer-props="{
                disableItemsPerPage: true,
                itemsPerPageOptions: [10],
            }"
            color='#00ACA5'
            >

                <template v-slot:[`item.nowcases`]="{ item }">
                    <v-chip
                        :color="getColor(item.nowcases)"
                        dark
                    >
                        {{ item.nowcases }}
                    </v-chip>
                </template>
            
            </v-data-table>
        </v-card>
    </v-app>
    </div>
</template>

<script>
var countryen2zh = require('../../data/utils/countryen2zh.json')
export default {
    name: 'StatisticTable',
    props:{
      type:{
        type:String,
        required:true
      },
      tableData:{
        type:Array,
        required:true
      }
    },
    mounted(){
      if(this.$props.type == "China"){
        this.headers[0].text = "省份";
      } else{
        this.headers[0].text = "国家";
      }
      this.detailed = this.$props.tableData;
      for(var i in this.detailed){
        for(var item in countryen2zh){
          if(countryen2zh[item]["value"] == this.detailed[i]["name"]){
            this.detailed[i]["zhname"] = countryen2zh[item]["label"];
            break;
          }
        }
      }
    },
    data () {
      return {
        search: '',
        headers: [
          {
            text: '省份',
            align: 'start',
            sortable: false,
            value: 'zhname',
          },
          { text: '现有确诊', value: 'nowcases' },
          { text: '累积确诊', value: 'cases' },
          { text: '累积治愈', value: 'recovered' },
          { text: '累积死亡', value: 'deaths' },
          { text: '疫苗接种', value: 'vaccine' },
        ],
        detailed: [
        ],
      }
    },
    methods: {
        getColor (nowcases) {
        if (nowcases > 100000) return 'red'
        else if (nowcases > 1000) return 'orange'
        else return 'green'
      },
    },
}
</script>

<style>
.s_table_root {
    padding: 10px;
    height: 670px;
	overflow: hidden;
}
.s_table th {
    font-size: 18px !important;
    white-space: nowrap !important;
}
.s_table td {
    font-size: 18px !important;
}
</style>