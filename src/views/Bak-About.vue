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
        guoData: [
          {
            market: 'A股',
            name: '上证质数',
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
    methods: {
      goToHome: function() {
        this.$router.push('/')
      }
    }
  }
</script>

<style>
  .card--flex-toolbar {
    margin-top: -80px;
  }
</style>
