<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-card
      dark
      flat
    >
      <v-btn
        absolute
        bottom
        color="primary"
        right
        fab
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-card-title class="pa-2 primary">
        <v-btn icon v-on:click="goToAbout">
          <v-icon>arrow_back_ios</v-icon>
        </v-btn>
        <h3 class="title font-weight-light text-xs-center grow">中国历史</h3>
        <UserLogin/>
      </v-card-title>
      <v-img
        :src="imgUrl"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
      >
        <v-container fill-height>
          <v-layout align-center>
            <strong class="display-4 font-weight-regular mr-4">{{ today }}</strong>
            <v-layout column justify-end>
              <div class="headline font-weight-light">{{ week }}</div>
              <div class="text-uppercase font-weight-light">{{ month }}</div>
            </v-layout>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <v-card-text class="py-0">

      <v-timeline>
        <v-timeline-item
          v-for="(year, i) in years"
          :key="i"
          :color="year.color"
          small
        >
          <template v-slot:opposite>
            <span
              :class="`headline font-weight-bold ${year.color}--text`"
              v-text="year.year"
            ></span>
          </template>
          <div class="py-3">
            <h2 :class="`headline font-weight-light mb-3 ${year.color}--text`">中华人民共和国成立</h2>
            <div>
              10月1日，毛泽东在北京天安门城楼上向全世界庄严宣告：中华人民共和国中央人民政府今天成立了。
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
  import UserLogin from "../components/UserLogin"

  export default {
    components: {
      UserLogin
    },
    data() {
      return {
        now: new Date(),
        imgUrl: require('../assets/img/tabheader/greatwall.png'),
        years: [
          {
            color: 'cyan',
            year: '1949'
          },
          {
            color: 'green',
            year: '1970'
          },
          {
            color: 'pink',
            year: '1980'
          },
          {
            color: 'amber',
            year: '1990'
          },
          {
            color: 'orange',
            year: '2000'
          }
        ]
      }
    },
    computed: {
      today() {
        return this.now.getDate();
      },
      week() {
        let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return weekday[this.now.getDay()];
      },
      month() {
        let year = this.now.getFullYear();
        let month = this.now.getMonth();
        let monthname = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        return monthname[month] + '  ' + year;
      }
    },
    methods: {
      goToAbout: function() {
        this.$router.push('/about')
      }
    }
  }
</script>
