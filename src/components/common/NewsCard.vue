<template>
  <v-card
    class="mx-auto"
    width="344"
  >
    <!-- <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img> -->

    <v-card-title>
      {{title | cutLongTitle}}
    </v-card-title>

    <v-card-subtitle style="display: flex">
      Latest Covid News
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        @click="goToNewsPage()"
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{content | cutLongText}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>


<script>
export default {
    name:'NewsCard',
    data () {
        return {
            show: false
        }
    },
    props: ['title', 'link', 'content'],
    methods: {
      goToNewsPage() {
        this.$router.push(this.link)
      }
    },
    filters: {
      cutLongText: function (value) {
        let maxLenth = 200
        if (value.length > maxLenth) {
          return value.slice(0, maxLenth) + '...'
        }
        return value
      },
      cutLongTitle: function (value) {
        let maxLenth = 50
        if (value.length > maxLenth) {
          return value.slice(0, maxLenth) + '...'
        }
        return value
      }
    },
}
</script>
