<template>
  <v-card>
    <!--顶层菜单区-->
    <v-toolbar
      absolute
      fixed
      :style="toolbarStyle"
      dark
      flat
    >
      <UserLogin/>
      <v-toolbar-title >{{ nowDate | dateConvert}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="setTheme">
        <v-icon v-if="sunmode">wb_sunny</v-icon>
        <v-icon v-else>brightness_3</v-icon>
      </v-btn>
      <v-btn icon @click="goToQrcodeScan" >
        <v-icon>crop_free</v-icon>
      </v-btn>
      <Settings/>

      <!--频道栏标题-->
      <template v-slot:extension>
        <v-tabs
          v-model="active"
          centered
          background-color="transparent"
          slider-color="white"
          grow
        >
          <v-tab
            class="subheading"
            v-for="item in headerItems"
          >
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <!--展示返回顶部按钮-->
    <v-btn
      v-show="!hidden"
      :style="totopStyle"
      absolute
      dark
      fixed
      right
      style="bottom:20px;"
      fab
      small
      v-on:click="toTop"
    >
      <v-icon>arrow_upward</v-icon>
    </v-btn>

    <!--内容显示区-->
    <v-layout row>
      <v-flex xs12>
        <v-card flat>
          <v-img
            :src="headerItems[active].imgUrl"
            height="300px"
            gradient="to top, rgba(0,0,0,.33), rgba(0,0,0,.33)"
          >
            <!--图片注释区-->
            <v-layout pa-2 ma-2 column fill-height class="lightbox white--text">
              <v-spacer></v-spacer>
              <v-flex shrink>
                <div class="caption">{{headerItems[active].imgDesc}}</div>
              </v-flex>
            </v-layout>
          </v-img>

          <!--轮播资讯展示区-->
          <Info/>
          <v-divider></v-divider>

          <!--内容展示区-->
          <v-list
            subheader
            :style="cardStyle"
            v-for="(item1, index1) in dataItems[active]" :key="item1.title"
          >
            <v-subheader class="subheading">{{item1.title}}</v-subheader>
              <v-container
                fluid
                grid-list-md
              >
                <v-layout row wrap>
                  <v-flex
                    v-for="(item2, index2) in item1.list"
                    :key="item2.title"
                    xs6
                  >
                    <v-card @click="goToDetail(active, index1, index2)">
                      <v-img
                        :src="item2.imgUrl"
                        height="150px"
                      >
                      </v-img>
                      <v-card-title primary-title>
                        <div>
                          <span class="body-2">{{ item2.title }}</span>
                          <div class="grey--text caption font-weight-light">{{ item2.subtitle }}</div>
                        </div>
                      </v-card-title>
<!--                        <v-card-actions>-->
<!--                          <span class="pl-2 grey&#45;&#45;text text&#45;&#45;darken-2 font-weight-light caption">{{reviews}} reviews</span>-->
<!--                        </v-card-actions>-->
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            <v-divider v-if="index1 < dataItems[active].length-1"></v-divider>
          </v-list>

          <!--底线提示-->
          <BottomLine/>

        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>

export default {
  components: {
    UserLogin: () => import('../components/UserLogin'),
    Settings: () => import('../components/Settings'),
    Info: () => import('../components/Info'),
    BottomLine: () => import('../components/BottomLine')
  },
  data () {
    return {
      nowDate: new Date(),
      sunmode: !this.$store.state.themeMode,
      active: 0,
      toolbarStyle: { background: 'rgba(30,144,255, 0)' },
      totopStyle: { background: 'rgba(0,0,0, 0.3)' },
      cardStyle: { background: 'rgba(0,0,0, 0.08)' },
      opacity: 1,
      reviews: 16580,
      hidden: true,
      headerItems: [
        {
          title: '中国',
          imgUrl: require('../assets/img/tabheader/greatwall2.jpg'),
          imgDesc: '中国，又称为中华、华夏、九州，因古代中国人认为天圆地方，中国位于正中，故而得名。中国是世界文明最早的发源地之一，长期是个独立的文明世界的中心，中华文化的传播，对周边国家产生了深远的影响。（背景：万里长城）'
        },
        {
          title: '古埃及',
          imgUrl: require('../assets/img/tabheader/egypt2.png'),
          imgDesc: '古埃及是四大文明古国之一，位于非洲东北部尼罗河中下游地区。古埃及文明形成于公元前4000年左右，古埃及前王朝开始于公元前3100年左右时美尼斯统一上下埃及建立第一王朝，终止于公元前30年罗马征服埃及托勒密王朝。（背景：金字塔）'
        },
        {
          title: '古罗马',
          imgUrl: require('../assets/img/tabheader/roma.png'),
          imgDesc: '古罗马指从公元前9世纪初在意大利半岛中部兴起的文明,先后经历罗马王政时代、罗马共和国、罗马帝国三个阶段。始于公元前754年左右，结束于东罗马帝国（即拜占庭帝国）在1453年被奥斯曼帝国所灭。（背景：罗马斗兽场）'
        },
        {
          title: '古希腊',
          imgUrl: require('../assets/img/tabheader/greece4.jpg'),
          imgDesc: '古希腊是指古代巴尔干半岛南部、爱琴海诸岛和小亚细亚沿岸的总称，是西方文明的源头之一。古希腊文明持续了约650年，是西方文明最重要和直接的渊源，时间从公元前8世纪的古风时期至公元前146年被罗马共和国征服为止。（背景：帕特农神庙）'
        }
      ],
      dataItems: [
        [
          { title: '史前时期',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '旧石器时代',
                subtitle: '225/226万年前～1.2万年前',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '新石器时代',
                subtitle: '1.2万年前～7000年前',
                desc: ''
              }
            ]
          },
          { title: '传说時代',
            list: [
              {
                imgUrl: require('../assets/img/tablist/三皇五帝.jpeg'),
                title: '原地起源说',
                subtitle: '年代不详',
                desc: ''
              },
              { imgUrl: require('../assets/img/tablist/中亚起源说.jpg'),
                title: '外来说',
                subtitle: '年代不详',
                desc: ''
              }
            ]
          },
          { title: '夏朝',
            list: [
              { imgUrl: require('../assets/img/tablist/夏朝.jpeg'),
                title: '',
                subtitle: '约公元前2070年/2030年～公元前1600年',
                desc: ''
              }
            ]
          },
          { title: '商朝',
            list: [
              { imgUrl: require('../assets/img/tablist/商纣王.png'),
                title: '',
                subtitle: '约公元前1600年～公元前1046年',
                desc: ''
              }
            ]
          },
          { title: '周朝',
            list: [
              {
                imgUrl: require('../assets/img/tablist/武王伐纣.jpeg'),
                title: '西周',
                subtitle: '约前1122年与前1046年之间～前771年',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/春秋2.jpeg'),
                title: '东周-春秋',
                subtitle: '公元前770年～公元前476年/公元前403年',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/战国.jpg'),
                title: '东周-战国',
                subtitle: '公元前475年或公元前402年—公元前221年',
                desc: ''
              }
            ]
          },
          { title: '秦朝',
            list: [
              {
                imgUrl: require('../assets/img/tablist/秦始皇兵马俑.jpeg'),
                title: '秦朝',
                subtitle: '公元前221年～公元前206年',
                desc: ''
              }
            ]
          },
          { title: '汉朝',
            list: [
              {
                imgUrl: require('../assets/img/tablist/西汉卫青.jpeg'),
                title: '西汉',
                subtitle: '前221年-前206年',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/秦国统一六国.jpg'),
                title: '东汉',
                subtitle: '前221年-前206年',
                desc: ''
              }
            ]
          },
          { title: '三国',
            list: [
              {
                imgUrl: require('../assets/img/tablist/曹操.jpeg'),
                title: '魏',
                subtitle: '前221年-前206年',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/刘备.jpeg'),
                title: '蜀',
                subtitle: '前221年-前206年',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/孙权2.jpeg'),
                title: '吴',
                subtitle: '前221年-前206年',
                desc: ''
              }
            ]
          },
          { title: '晋朝',
            list: [
              {
                imgUrl: require('../assets/img/tablist/秦国统一六国.jpg'),
                title: '西晋',
                subtitle: '266年-316年',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/秦国统一六国.jpg'),
                title: '东晋',
                subtitle: '317年-420年',
                desc: ''
              }
            ]
          },
          { title: '南北朝',
            list: [
              {
                imgUrl: require('../assets/img/tablist/秦国统一六国.jpg'),
                title: '南梁',
                subtitle: '前221年-前206年',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/秦国统一六国.jpg'),
                title: '北齐',
                subtitle: '前221年-前206年',
                desc: ''
              }
            ]
          },
          { title: '隋朝',
            list: [
              {
                imgUrl: require('../assets/img/tablist/秦国统一六国.jpg'),
                title: '隋朝',
                subtitle: '前221年-前206年',
                desc: ''
              }
            ]
          },
          { title: '唐朝',
            list: [
              {
                imgUrl: require('../assets/img/tablist/秦国统一六国.jpg'),
                title: '唐朝',
                subtitle: '前221年-前206年',
                desc: ''
              }
            ]
          },
          { title: '五代十国',
            list: [
              {
                imgUrl: require('../assets/img/tablist/秦国统一六国.jpg'),
                title: '',
                subtitle: '前221年-前206年',
                desc: ''
              }
            ]
          },
          { title: '宋朝',
            list: [
              {
                imgUrl: require('../assets/img/tablist/秦国统一六国.jpg'),
                title: '北宋',
                subtitle: '前221年-前206年',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/秦国统一六国.jpg'),
                title: '南宋',
                subtitle: '前221年-前206年',
                desc: ''
              }
            ]
          },
          { title: '元朝',
            list: [
              {
                imgUrl: require('../assets/img/tablist/元朝1.jpeg'),
                title: '元朝',
                subtitle: '前221年-前206年',
                desc: ''
              }
            ]
          },
          { title: '明朝',
            list: [
              {
                imgUrl: require('../assets/img/tablist/秦国统一六国.jpg'),
                title: '明朝',
                subtitle: '前221年-前206年',
                desc: ''
              }
            ]
          },
          { title: '清朝',
            list: [
              {
                imgUrl: require('../assets/img/tablist/清-王国来朝.jpg'),
                title: '清朝',
                subtitle: '前221年-前206年',
                desc: ''
              }
            ]
          },
          { title: '中华民国',
            list: [
              {
                imgUrl: require('../assets/img/tablist/孙中山.jpg'),
                title: '',
                subtitle: '1912年-1949年',
                desc: ''
              }
            ]
          },
          { title: '中华人民共和国',
            list: [
              {
                imgUrl: require('../assets/img/tablist/中国人民共和国开国大典.jpg'),
                title: '',
                subtitle: '1949年至今',
                desc: ''
              }
            ]
          }
        ],
        [
          { title: '前王朝时期',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '阿姆拉特时期',
                subtitle: '公元前4000年到3500年',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '格尔津文化',
                subtitle: '约公元前3400年至公元前3100年前后',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '奈加代三期文化',
                subtitle: '约公元前3200年至3000年',
                desc: ''
              }
            ]
          },
          { title: '早王朝时期',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '三皇五帝',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          },
          { title: '古王国时期',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '三皇五帝',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          },
          { title: '第一中间期',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '三皇五帝',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          },
          { title: '中王国时期',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '三皇五帝',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          },
          { title: '第二中间期',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '三皇五帝',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          },
          { title: '新王国时期',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '三皇五帝',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          },
          { title: '第三中间期',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '三皇五帝',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          },
          { title: '古埃及后期',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '三皇五帝',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          }
        ],
        [
          { title: '罗马王政时代',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '旧石器时代',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          },
          { title: '罗马共和国',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '三皇五帝',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          },
          { title: '罗马帝国',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '三皇五帝',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          }
        ],
        [
          { title: '希腊I时代',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '旧石器时代',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              },
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '中时期时代',
                subtitle: '约前1万至前7千年间',
                desc: ''
              }
            ]
          },
          { title: '希腊II共和国',
            list: [
              {
                imgUrl: require('../assets/img/tablist/old-stone1.jpg'),
                title: '三皇五帝',
                subtitle: '距今约260万年或250万年至1.2万年前',
                desc: ''
              }
            ]
          }
        ]
      ]
    }
  },

  mounted () {
    // 给window添加一个滚动滚动监听事件
    window.addEventListener('scroll', this.handleScroll.bind(this))
  },

  methods: {
    swipe (direction) {
      if (this.active + direction < this.headerItems.length && this.active + direction >= 0) { this.active = this.active + direction }
    },
    // 改变头部的渐变颜色、是否显示“返回顶端”按钮
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log('scrollTop=' + scrollTop)
      this.hidden = scrollTop < 60
      if (scrollTop <= 200) {
        this.opacity = scrollTop / 200
        this.toolbarStyle = { background: `rgba(30,144,255, ${this.opacity})` }
      } else {
        this.toolbarStyle = { background: 'rgba(30,144,255)' }
      }
    },
    setTheme () {
      this.sunmode = !this.sunmode
      this.$store.dispatch('setTheme', !this.sunmode)
    },
    goToDetail (tab, index1, index2) {
      this.$router.push({ path: '/detail', query: { tab: tab, index1: index1, index2: index2 } })
    },
    goToQrcodeScan () {
      this.$router.push({ path: '/qrcodescan' })
    },
    toTop () {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  },

  filters: {
    // 状态标题转换为中文
    dateConvert: (now) => {
      let mm = now.getMonth() + 1
      let dd = now.getDate()
      return mm + '月' + dd + '日'
    }
  },

  destroyed () {
    // 离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
