<template>
  <v-card
    v-touch="{
      left: () => swipe(1),
      right: () => swipe(-1)
      }"
  >
    <v-toolbar
      fixed
      :style="style"
      dark
      tabs
      flat
    >
      <v-toolbar-title >{{ nowDate | dateConvert}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon @click="setTheme">
        <v-icon v-if="sunmode">wb_sunny</v-icon>
        <v-icon v-else>brightness_3</v-icon>
      </v-btn>
      <UserLogin/>
      <Settings/>

      <template v-slot:extension>
        <v-tabs
          v-model="active"
          centered
          color="transparent"
          slider-color="white"
        >
          <v-tab class="subheading" v-for="item in headerItems">{{ item.title }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card flat>
        <v-img
          :src="headerItems[active].imgUrl"
          gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
        >
          <v-layout pa-2 column fill-height class="lightbox white--text">
            <v-spacer></v-spacer>
            <v-flex shrink>
              <div class="caption">{{headerItems[active].imgDesc}}</div>
            </v-flex>
          </v-layout>
        </v-img>

          <v-list
            two-line
            subheader
            v-for="(item1, index) in dataItems[active]" :key="item1.title"
          >
            <v-subheader inset>{{item1.title}}</v-subheader>
            <v-list-tile v-for="item2 in item1.list" :key="item2.title" avatar @click="goToDetail(item2.title)">
              <v-list-tile-avatar>
                <v-icon :class="[item2.iconClass]">{{ item2.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title>{{ item2.subtitle }}</v-list-tile-sub-title>
                <v-list-tile-title>{{ item2.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index < dataItems[active].length - 1"></v-divider>
          </v-list>

        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  import UserLogin from "../components/UserLogin"
  import Settings from "../components/Settings"

  export default {
    components: {
      UserLogin,
      Settings,
    },
    data () {
      return {

        nowDate: new Date(),
        sunmode: true,
        active: 0,
        style: {background: `rgba(30,144,255, 0)`},
        opacity: 1,
        text: 'Lommodo consequat.',
        headerItems: [
          {
            title: '中国' ,
            imgUrl: require('../assets/img/tabheader/greatwall2.jpg'),
            imgDesc: '中国，又称为中华、华夏、九州，因古代中国人认为天圆地方，中国位于正中，故而得名。中国是世界文明最早的发源地之一，长期是个独立的文明世界的中心，中华文化的传播，对周边国家产生了深远的影响。'
          },
          {
            title: '古埃及',
            imgUrl: require('../assets/img/tabheader/egypt2.jpg'),
            imgDesc: '古埃及是四大文明古国之一，位于非洲东北部尼罗河中下游地区。古埃及文明形成于公元前4000年左右，古埃及前王朝开始于公元前3100年左右时美尼斯统一上下埃及建立第一王朝，终止于公元前30年罗马征服埃及托勒密王朝。'
          },
          {
            title: '古罗马' ,
            imgUrl: require('../assets/img/tabheader/roma.jpg'),
            imgDesc: '古罗马指从公元前9世纪初在意大利半岛中部兴起的文明,先后经历罗马王政时代、罗马共和国、罗马帝国三个阶段。始于公元前754年左右，结束于东罗马帝国（即拜占庭帝国）在1453年被奥斯曼帝国所灭。'
          },
          {
            title: '古希腊',
            imgUrl: require('../assets/img/tabheader/greece4.jpg'),
            imgDesc: '古希腊是指古代巴尔干半岛南部、爱琴海诸岛和小亚细亚沿岸的总称，是西方文明的源头之一。古希腊文明持续了约650年，是西方文明最重要和直接的渊源，时间从公元前8世纪的古风时期至公元前146年被罗马共和国征服为止。'
          },
        ],
        dataItems: [
          [
            { title: '史前文明',
              list: [
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '旧石器时代', subtitle: '距今约260万年或250万年至1.2万年前' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '中时期时代', subtitle: '约前1万至前7千年间' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '新石器时代', subtitle: '前1万2千至前' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '青铜器时代', subtitle: 'Jan 17, 2014' }
              ],
            },
            { title: '传说时代',
              list: [
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '三皇五帝', subtitle: '距今约260万年或250万年至1.2万年前' }
              ],
            },
          ],
          [
            { title: '古王朝',
              list: [
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '旧石器时代', subtitle: '距今约260万年或250万年至1.2万年前' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '中时期时代', subtitle: '约前1万至前7千年间' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '新石器时代', subtitle: '前1万2千至前' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '青铜器时代', subtitle: 'Jan 17, 2014' }
              ],
            },
            { title: '中王朝',
              list: [
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '三皇五帝', subtitle: '距今约260万年或250万年至1.2万年前' }
              ],
            },
            { title: '前王朝',
              list: [
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '三皇五帝', subtitle: '距今约260万年或250万年至1.2万年前' }
              ],
            },
          ],
          [
            { title: '罗马王政时代',
              list: [
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '旧石器时代', subtitle: '距今约260万年或250万年至1.2万年前' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '中时期时代', subtitle: '约前1万至前7千年间' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '新石器时代', subtitle: '前1万2千至前' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '青铜器时代', subtitle: 'Jan 17, 2014' }
              ],
            },
            { title: '罗马共和国',
              list: [
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '三皇五帝', subtitle: '距今约260万年或250万年至1.2万年前' }
              ],
            },
            { title: '罗马帝国',
              list: [
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '三皇五帝', subtitle: '距今约260万年或250万年至1.2万年前' }
              ],
            },
          ],
          [
            { title: '希腊I时代',
              list: [
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '旧石器时代', subtitle: '距今约260万年或250万年至1.2万年前' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '中时期时代', subtitle: '约前1万至前7千年间' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '新石器时代', subtitle: '前1万2千至前' },
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '青铜器时代', subtitle: 'Jan 17, 2014' }
              ],
            },
            { title: '希腊II共和国',
              list: [
                { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: '三皇五帝', subtitle: '距今约260万年或250万年至1.2万年前' }
              ],
            }
          ]
        ],
      }
    },

    mounted () {
      // 给window添加一个滚动滚动监听事件
      window.addEventListener('scroll', this.handleScroll.bind(this))
    },

    methods: {
      swipe (direction) {
        if (this.active + direction < this.headerItems.length && this.active + direction >= 0)
          this.active = this.active + direction;
      },
      // 改变头部的渐变颜色
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop <= 200) {
          this.opacity = scrollTop / 200;
          this.style = {background: `rgba(30,144,255, ${this.opacity})`};
        } else {
          this.style = {background: `rgba(30,144,255)`};
        }
      },
      setTheme () {
        this.sunmode = !this.sunmode;
        this.$store.dispatch('setTheme', !this.sunmode);
      },
      goToDetail (target) {
        this.$router.push('/detail');
      }
    },

    filters: {
      // 状态标题转换为中文
      dateConvert: (now) => {
        let mm = now.getMonth() + 1;
        let dd = now.getDate();
        return mm + '月' + dd + '日';
      }
    },

    destroyed () {
      // 离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', this.handleScroll)
    },
  }
</script>
