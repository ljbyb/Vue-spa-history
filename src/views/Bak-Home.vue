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
          <v-icon>menu</v-icon>
        </v-btn>
        <h3 class="title font-weight-light text-xs-center grow">History</h3>
<!--        <v-avatar v-on:click="">-->
<!--          <v-img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"></v-img>-->
<!--        </v-avatar>-->
        <UserLogin/>
      </v-card-title>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
      >
        <v-container fill-height>
          <v-layout align-center>
            <strong class="display-4 font-weight-regular mr-4">{{ today }}</strong>
            <v-layout column justify-end>
              <div class="headline font-weight-light">{{ week }}</div>
              <div class="text-uppercase font-weight-light">{{ month }}</div>

<!--              <div class="foot_weather">-->
<!--                <iframe width="285" scrolling="no" height="25" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=1&color=%2300B0F0&icon=4&py=xian&wind=1&num=1&site=16"></iframe>-->
<!--                <iframe name="weather_inc"-->
<!--                        src="http://i.tianqi.com/index.php?c=code&id=7&py=xian"-->
<!--                        style="border:solid 1px #7ec8ea"-->
<!--                        width="220" height="90" frameborder="0"-->
<!--                        marginwidth="0" marginheight="0" scrolling="no">-->
<!--                </iframe>-->
<!--              </div>-->
            </v-layout>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <v-card-text class="py-0">
<!--      <v-timeline-->
<!--        align-top-->
<!--        dense-->
<!--      >-->
<!--        <v-timeline-item-->
<!--          color="pink"-->
<!--          small-->
<!--        >-->
<!--          <v-layout pt-3>-->
<!--            <v-flex xs3>-->
<!--              <strong>5pm</strong>-->
<!--            </v-flex>-->
<!--            <v-flex>-->
<!--              <strong>New Icon</strong>-->
<!--              <div class="caption">Mobile App</div>-->
<!--            </v-flex>-->
<!--          </v-layout>-->
<!--        </v-timeline-item>-->

<!--        <v-timeline-item-->
<!--          color="teal lighten-3"-->
<!--          small-->
<!--        >-->
<!--          <v-layout wrap pt-3>-->
<!--            <v-flex xs3>-->
<!--              <strong>3-4pm</strong>-->
<!--            </v-flex>-->
<!--            <v-flex>-->
<!--              <strong>Design Stand Up</strong>-->
<!--              <div class="caption mb-2">Hangouts</div>-->
<!--              <v-avatar>-->
<!--                <v-img-->
<!--                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"-->
<!--                ></v-img>-->
<!--              </v-avatar>-->
<!--              <v-avatar>-->

<!--                <v-img-->
<!--                  src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"-->
<!--                ></v-img>-->
<!--              </v-avatar>-->
<!--              <v-avatar>-->
<!--                <v-img-->
<!--                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"-->
<!--                ></v-img>-->
<!--              </v-avatar>-->
<!--            </v-flex>-->
<!--          </v-layout>-->
<!--        </v-timeline-item>-->

<!--        <v-timeline-item-->
<!--          color="pink"-->
<!--          small-->
<!--        >-->
<!--          <v-layout pt-3>-->
<!--            <v-flex xs3>-->
<!--              <strong>12pm</strong>-->
<!--            </v-flex>-->
<!--            <v-flex>-->
<!--              <strong>Lunch break</strong>-->
<!--            </v-flex>-->
<!--          </v-layout>-->
<!--        </v-timeline-item>-->

<!--        <v-timeline-item-->
<!--          color="teal lighten-3"-->
<!--          small-->
<!--        >-->
<!--          <v-layout pt-3>-->
<!--            <v-flex xs3>-->
<!--              <strong>9-11am</strong>-->
<!--            </v-flex>-->
<!--            <v-flex>-->
<!--              <strong>Finish Home Screen</strong>-->
<!--              <div class="caption">Web App</div>-->
<!--            </v-flex>-->
<!--          </v-layout>-->
<!--        </v-timeline-item>-->
<!--      </v-timeline>-->

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
            <h2 :class="`headline font-weight-light mb-3 ${year.color}--text`">Lorem ipsum</h2>
            <div>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
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
        years: [
          {
            color: 'cyan',
            year: '1960'
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
