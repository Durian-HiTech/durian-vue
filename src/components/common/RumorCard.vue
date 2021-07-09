<template>
  <div class="test">
    <v-card
        class="mx-auto"
        width="460"
    >
      <v-img
          src='../../assets/backgroundImage/question0.jpg'
          height="200px"
          v-if="showImage.a"
      ></v-img>

      <v-img
          src='../../assets/backgroundImage/question1.jpg'
          height="200px"
          v-if="showImage.b"
      ></v-img>

      <v-img
          src='../../assets/backgroundImage/question2.jpg'
          height="200px"
          v-if="showImage.c"
      ></v-img>

      <div class="test_0" v-if="rumor_type==0">
        <v-card-title>
          {{title | cutLongTitle}}
        </v-card-title>

        <v-card-subtitle style="display: flex">
          Latest Covid Q&A
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
              :color="this.color"
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
      </div>
      <div class="test_1" v-if="rumor_type==1">
        <v-card-title>
          {{title | cutLongTitle}}
        </v-card-title>

        <v-card-subtitle style="display: flex">
          Latest Covid Q&A
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
              :color="this.color"
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
      </div>
      <div class="test_2" v-if="rumor_type==2">
        <v-card-title>
          {{title | cutLongTitle}}
        </v-card-title>

        <v-card-subtitle style="display: flex">
          Latest Covid Q&A
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
              :color="this.color"
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
      </div>
      <div class="test_3" v-if="rumor_type==3">
        <v-card-title>
          {{title | cutLongTitle}}
        </v-card-title>

        <v-card-subtitle style="display: flex">
          Latest Covid Q&A
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
              :color="this.color"
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
      </div>
    </v-card>

  </div>
</template>


<script>
export default {
  name:'RumorCard',
  data () {
    return {
      show: false,
      color: "cyan",
    }
  },
  computed: {
    showImage () {
      return {
        a: (this.title.length % 5) == 0,
        b: (this.title.length % 5) == 1,
        c: (this.title.length % 5) == 2
      }
    },
  },
  props: ['title', 'link', 'content', 'rumor_type'],
  methods: {
    goToNewsPage() {
      console.log(this.link)
      this.$router.push(this.link)
    },
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

<style>
.test_0{
  background-image: url(../../static/tag0.png);
  background-repeat: no-repeat;
  background-position: right;
}
.test_1{
  background-image: url(../../static/tag1.png);
  background-repeat: no-repeat;
  background-position: right;
}
.test_2{
  background-image: url(../../static/tag2.png);
  background-repeat: no-repeat;
  background-position: right;
}
.test_3{
  background-image: url(../../static/tag3.png);
  background-repeat: no-repeat;
  background-position: right;
}
</style>
