import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  // 利用vue-router自带的滚动行为解决页面切换后scroll滚动距离一直存在，没有回到顶部问题
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./views/Detail.vue')
    },
    {
      path: '/qrcodescan',
      name: 'qrcodescan',
      component: () => import('./views/QrcodeScan.vue')
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: () => import('./views/Qrcode.vue')
    }
  ]
})
