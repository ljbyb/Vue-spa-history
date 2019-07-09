<template>
  <v-card flat>
    <v-toolbar
      color="orange darken-4"
      dark
      extended
      flat
      height="80px"
    >
      <!--      <v-toolbar-side-icon></v-toolbar-side-icon>-->

      <v-btn icon v-on:click="goToHome">
        <v-icon>arrow_back_ios</v-icon>
      </v-btn>
      <v-toolbar-title class="body-3 white--text">首页</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>

    <v-layout row pb-2>
      <v-flex xs10 offset-xs1>
        <v-card class="card--flex-toolbar">
          <!--          <v-toolbar card prominent>-->
          <!--            <v-toolbar-title class="body-2 grey&#45;&#45;text">Title</v-toolbar-title>-->

          <!--            <v-spacer></v-spacer>-->

          <!--            <v-btn icon>-->
          <!--              <v-icon>more_vert</v-icon>-->
          <!--            </v-btn>-->
          <!--          </v-toolbar>-->

          <!--          <v-flex xs3>-->
          <!--            <v-btn icon>-->
          <!--              <span>运动</span>-->
          <!--              <v-icon>apps</v-icon>-->
          <!--            </v-btn>-->
          <!--          </v-flex>-->
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs3 sm3 md3 order-md4 order-sm1 >
                <v-card dark tile flat color="red darken-2">
                  <v-card-text align="center">
                    <v-icon>wb_sunny</v-icon>
                    <div>大盘晴雨</div>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs3 sm3 md3 order-md3 order-sm2>
                <v-card dark tile flat color="deep-orange lighten-1">
                  <v-card-text align="center">
                    <v-icon>book</v-icon>
                    <div>今日必读</div>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs3 sm3 md3 order-md2 order-sm3>
                <v-card dark tile flat color="deep-orange darken-3">
                  <v-card-text align="center">
                    <v-icon>check_circle</v-icon>
                    <div>选股策略</div>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs3 sm3 md3 order-md1 order-sm4>
                <v-card dark tile flat color="deep-orange">
                  <v-card-text align="center">
                    <v-icon>insert_chart_outlined</v-icon>
                    <div>模拟炒股</div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>

          <v-divider></v-divider>

          <v-card-text style="height: 40px;">
<!--            <div class="vueBox">-->
<!--              <div class="marquee">-->
<!--                <div class="marquee_title">-->
<!--                  <span>最新战报</span>-->
<!--                </div>-->
<!--                <div class="marquee_box">-->
<!--                  <ul class="marquee_list" :class="{marquee_top:animate}">-->
<!--                    <li v-for="(item, index) in marketData">-->
<!--                      <span>{{item.name}}</span>-->
<!--                      <span>在</span>-->
<!--                      <span class="red"> {{item.city}}</span>-->
<!--                      <span>杀敌</span>-->
<!--                      <span class="red"> {{item.amount}}</span>-->
<!--                      <span>万</span>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-for="item in marketData">-->
<!--              {{item.market}} {{item.name}} {{item.score}} {{item.change}} {{item.rate}} {{item.state}}-->
<!--            </div>-->
            <div>
              {{marketData[0].market}}
              {{marketData[0].name}}
              {{marketData[0].score}}
              {{marketData[0].change}}
              {{marketData[0].rate}}
              {{marketData[0].state}}
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>

  export default {
    data() {
      return {
        animate: false,
        marketData: [
          {
            market: 'A股',
            name: '上证指数',
            score: 2822.09,
            change: -73.02,
            rate: -0.0248,
            state: '闭市'
          },
          {
            market: '美股',
            name: '道琼斯',
            score: 25764.00,
            change: -98.68,
            rate: -0.0038,
            state: '闭市'
          },
          {
            market: '港股',
            name: '恒生指数',
            score: 22946.46,
            change: -328.61,
            rate: -0.0116,
            state: '闭市'
          },
        ]
      }
    },

    created() {
      setInterval (this.showMarquee, 2000)
    },

    methods: {
      goToHome: function() {
        this.$router.push('/')
      },
      showMarquee: function () {
        this.animate = true;

        setTimeout (() => {
          this.marketData.push (this.marketData[0]);
          this.marketData.shift ();
          this.animate = false;
        }, 500);

      }
    }
  }
</script>

<style>
  .card--flex-toolbar {
    margin-top: -80px;
  }
  /*div, ul, li, span, img {*/
  /*  margin: 0;*/
  /*  padding: 0;*/
  /*  display: flex;*/
  /*  box-sizing: border-box;*/
  /*}*/

  /*.marquee {*/
  /*  width: 100%;*/
  /*  height: 50px;*/
  /*  align-items: center;*/
  /*  color: #3A3A3A;*/
  /*  background-color: #b3effe;*/
  /*  display: flex;*/
  /*  box-sizing: border-box;*/
  /*}*/

  /*.marquee_title {*/
  /*  padding: 0 20px;*/
  /*  height: 30px;*/
  /*  font-size: 14px;*/
  /*  border-right: 1px solid #d8d8d8;*/
  /*  align-items: center;*/
  /*}*/

  /*.marquee_box {*/
  /*  display: block;*/
  /*  position: relative;*/
  /*  width: 60%;*/
  /*  height: 30px;*/
  /*  overflow: hidden;*/
  /*}*/

  /*.marquee_list {*/
  /*  display: block;*/
  /*  position: absolute;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*}*/

  /*.marquee_top {*/
  /*  transition: all 0.5s;*/
  /*  margin-top: -30px*/
  /*}*/

  /*.marquee_list li {*/
  /*  height: 30px;*/
  /*  line-height: 30px;*/
  /*  font-size: 14px;*/
  /*  padding-left: 20px;*/
  /*}*/

  /*.marquee_list li span {*/
  /*  padding: 0 2px;*/
  /*}*/

  .red {
    color: #FF0101;
  }
</style>
