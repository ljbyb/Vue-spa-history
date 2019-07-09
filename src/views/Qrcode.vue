<template>
  <v-card min-height="100%"  :style="cardStyle">

    <!--顶层菜单-->
    <v-toolbar
      fixed
      dark
      tabs
      flat
      :style="toolbarStyle"
    >
      <v-btn :style="style" icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>我的二维码名片</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :style="style" icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12>
            <v-card class="card--flex-toolbar">
              <v-card-title primary-title>
                <v-avatar>
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  >
                </v-avatar>
                <div>
                  <div class="headline">{{ username }}</div>
                  <span class="grey--text">{{ location }}</span>
                </div>
              </v-card-title>

              <v-layout align-center justify-center>
                <qriously
                  background="white"
                  :backgroundAlpha="0.8"
                  foreground="green"
                  :foregroundAlpha="0.8"
                  level="H"
                  :padding="20"
                  :size="300"
                  value="https://u.wechat.com/EJM-RDg6FCe7Lyz4EnVfKDY"
                />
              </v-layout>

              <v-layout align-center justify-center>
              <v-card-title>
                <div>
                  <div class="text-truncate">扫一扫上面的二维码，添加为好友</div>
                </div>
              </v-card-title>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-card>
</template>

<script>

export default {
  name: 'Qrcode',
  data () {
    return {
      style: { background: 'rgba(0,0,0, 0.3)' },
      toolbarStyle: { background: 'rgba(30,144,255, 1)' },
      cardStyle: { background: 'rgba(0,0,0, 0.08)' },
      username: '阿波',
      location: '中国北京'
    }
  }
  // created () {
  //   var qr = new QRious()
  //   qr.set({
  //     background: 'green',
  //     backgroundAlpha: 0.8,
  //     foreground: 'blue',
  //     foregroundAlpha: 0.8,
  //     level: 'H',
  //     padding: 25,
  //     size: 500,
  //     value: 'https://github.com/neocotic/qrious'
  //   })
  // }
}
</script>

<style scoped>
  .card--flex-toolbar {
    margin-top: 120px;
  }
</style>
