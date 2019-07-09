<template>
  <v-card min-height="100%">

    <!--顶层菜单-->
    <v-toolbar
      fixed
      dark
      tabs
      flat
      :style="style"
    >
      <v-btn icon @click="goToHome">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon v-if="convertCamera" @click="switchCamera">
        <v-icon>swap_vertical_circle</v-icon>
      </v-btn>
      <v-btn icon @click="imgClick">
        <v-icon>photo_album</v-icon>
      </v-btn>
    </v-toolbar>

<!--    <v-card-text>-->
<!--      <p class="decode-result">Last result: <b>{{ result }}</b></p>-->
<!--    <input v-if="false" type="file" id='uploadFile'  accept="image/*"  v-on:change="readLocalFile()">-->

<!--    <qrcode-drop-zone @decode="onDecode" @init="logErrors">-->
      <qrcode-stream :key="_uid" :track="selected.value" :camera="camera" @decode="onDecode" @init="onInit">
<!--      <qrcode-stream :key="_uid" :track="repaint" :camera="camera" @decode="onDecode" @init="onInit">-->
        <div v-if="validationSuccess" class="validation-success">
          二维码有效，处理中...
        </div>

        <div v-if="validationFailure" class="validation-failure">
          {{ result }}，这不是一个合法有效的二维码，请检查!
        </div>

        <div v-if="validationPending" class="validation-pending">
          {{ result }}，二维码验证过程中，请稍后...
        </div>
      </qrcode-stream>
<!--    </qrcode-drop-zone>-->

<!--    <div>-->
<!--      <p class="decode-result">Last result: <b>{{ result }}</b></p>-->
<!--      <div style=" width: 100px; height: 100px; background-color: #ccc; border:1px solid #ccc; float: left;  margin: 10px ;" v-on:click="imgClick()"></div>-->
<!--      <input v-show="imgShow" type="file" id='uploadFile'  accept="image/*"  v-on:change="readLocalFile()">-->
<!--    <qrcode-capture @detect="onDetect" />-->
<!--    </div>-->

    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
    >
      <v-btn
        value="scan"
        :style="style"
      >
        <span>扫码</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn
        value="VR"
        :style="style"
      >
        <span>VR</span>
        <v-icon>favorite</v-icon>
      </v-btn>
    </v-bottom-nav>

  </v-card>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
const axios = require('axios')

export default {
  name: 'QrcodeScan',
  components: { QrcodeStream, QrcodeDropZone, QrcodeCapture },

  data () {
    const options = [
      { text: 'None', value: false },
      { text: 'Red square (default)', value: true },
      { text: 'Green text', value: this.paintGreenText },
      { text: 'Blue dots', value: this.paintBlueDots }
    ]

    const selected = options[2]

    return {
      style: { background: 'rgba(0,0,0, 0.6)' },
      // result: '',
      bottomNav: 'scan',
      error: '',
      camera: 'rear',
      isValid: undefined,
      noRearCamera: false,
      noFrontCamera: false,
      convertCamera: false,
      selected,
      options,
      result: null,
      inputView: false
    }
  },

  computed: {
    paintBlueDots (location, ctx) {
      const {
        topLeftFinderPattern,
        topRightFinderPattern,
        bottomLeftFinderPattern
      } = location

      const pointArray = [
        topLeftFinderPattern,
        topRightFinderPattern,
        bottomLeftFinderPattern
      ]

      ctx.fillStyle = '#007bff'

      pointArray.forEach(({ x, y }) => {
        ctx.fillRect(x - 5, y - 5, 10, 10)
      })
    },

    paintGreenText (location, ctx) {
      const {
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner
      } = location

      const pointArray = [
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner
      ]

      const centerX = pointArray.reduce((sum, { x }) => x + sum, 0) / 4
      const centerY = pointArray.reduce((sum, { y }) => y + sum, 0) / 4

      ctx.font = 'bold 24px sans-serif'
      ctx.textAlign = 'center'

      ctx.lineWidth = 3
      ctx.strokeStyle = '#35495e'
      ctx.strokeText(this.result, centerX, centerY)

      ctx.fillStyle = '#5cb984'
      ctx.fillText(this.result, centerX, centerY)
    },

    validationPending () {
      return this.isValid === undefined &&
        this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    }
  },

  methods: {
    // onDecode (result) {
    //   this.result = result
    // },

    switchCamera () {
      switch (this.camera) {
        case 'front':
          this.camera = 'rear'
          break
        case 'rear':
          this.camera = 'front'
          break
      }
    },

    logErrors (promise) {
      promise.catch(console.error)
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'StreamApiNotSupportedError') {
          this.noStreamApiSupport = true
        }

        const triedFrontCamera = this.camera === 'front'
        const triedRearCamera = this.camera === 'rear'
        const cameraMissingError = error.name === 'OverconstrainedError'

        if (triedRearCamera && cameraMissingError) {
          this.noRearCamera = true
        }

        if (triedFrontCamera && cameraMissingError) {
          this.noFrontCamera = true
        }

        // 只有前置、后置摄像头都有时才在顶部菜单区显示转换摄像头按钮
        if (this.noRearCamera || this.noFrontCamera) {
          this.convertCamera = false
        } else {
          this.convertCamera = true
        }

        console.error(error)
      }
    },

    repaint (location, ctx) {
      const {
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner
        // topLeftFinderPattern,
        // topRightFinderPattern,
        // bottomLeftFinderPattern
      } = location

      ctx.strokeStyle = 'blue' // instead of red

      ctx.beginPath()
      ctx.moveTo(topLeftCorner.x, topLeftCorner.y)
      ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y)
      ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y)
      ctx.lineTo(topRightCorner.x, topRightCorner.y)
      ctx.lineTo(topLeftCorner.x, topLeftCorner.y)
      ctx.closePath()

      ctx.stroke()
    },

    // 检测选择的图片文件
    async onDetect (promise) {
      try {
        const {
          imageData, // raw image data of image/frame
          content, // decoded String or null
          location // QR code coordinates or null
        } = await promise

        if (content === null) {
          // decoded nothing
          console.log('decoded nothing')
        } else {
          // ...
          console.log('decoded image! content:' + content)
        }
      } catch (error) {
        // ...
      }
    },

    async onDecode (content) {
      this.result = content
      this.turnCameraOff()

      // pretend it's taking really long
      await this.timeout(2000)

      // 简单验证是否为URL连接
      this.isValid = content.startsWith('http')

      // some more delay, so users have time to read the message
      await this.timeout(2000)

      if (this.isValid) {
        console.log('Scan url is:' + content)
        this.goToLink(content)
      }

      // 一次解析成功后，应该关闭摄像头
      // this.turnCameraOn()
    },

    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    },

    // async onInit (promise) {
    //   try {
    //     await promise
    //   } catch (error) {
    //     if (error.name === 'NotAllowedError') {
    //       this.error = 'ERROR: you need to grant camera access permisson'
    //     } else if (error.name === 'NotFoundError') {
    //       this.error = 'ERROR: no camera on this device'
    //     } else if (error.name === 'NotSupportedError') {
    //       this.error = 'ERROR: secure context required (HTTPS, localhost)'
    //     } else if (error.name === 'NotReadableError') {
    //       this.error = 'ERROR: is the camera already in use?'
    //     } else if (error.name === 'OverconstrainedError') {
    //       this.error = 'ERROR: installed cameras are not suitable'
    //     } else if (error.name === 'StreamApiNotSupportedError') {
    //       this.error = 'ERROR: Stream API is not supported in this browser'
    //     }
    //   }
    // },

    // 图片click
    imgClick () {
      document.getElementById('uploadFile').click()
    },

    // 点击选中图片
    readLocalFile () {
      var localFile = document.getElementById('uploadFile').files[0]
      var reader = new FileReader()
      var content
      // var current = this
      reader.onload = function (event) {
        content = event.target.result
        // current.imgs.push(content) // 获取图片base64代码
      }
      reader.onerror = function (event) {
        alert('error')
      }
      content = reader.readAsDataURL(localFile, 'UTF-8')
      this.result = content
      var sss = document.getElementById('uploadFile').value
      console.log(sss)
    },

    goToLink (url) {
      axios.get(url).then((response) => {
        if (response.data === 0) {
          console.log('goToLink failure, no data return!')
        } else {
          console.log('goToLink eturn:' + response)
        }
      }).catch(error => {
        console.log('goToLink error:' + error)
      })
    },

    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  /*.error {*/
  /*  font-weight: bold;*/
  /*  color: red;*/
  /*}*/
  .validation-success,
  .validation-failure,
  .validation-pending {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba(255, 255, 255, .8);
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    padding: 10px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
  .validation-success {
    color: green;
  }
  .validation-failure {
    color: red;
  }
</style>
