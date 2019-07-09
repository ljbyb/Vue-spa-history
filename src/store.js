import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const STORAGE_USERKEY = 'user'
const state = {
  user: JSON.parse(localStorage.getItem(STORAGE_USERKEY)),
  themeMode: false
}

const mutations = {
  // 处理登录用户名
  setUser (state, user) {
    state.user = user
  },
  // 处理主题颜色改变
  setTheme (state, mode) {
    state.themeMode = mode
  }
}

const actions = {
  // 处理登录用户名
  setUser ({ commit }, user) {
    if (user.length > 0) {
      commit('setUser', user)
    }
  },
  // 处理主题颜色改变
  setTheme ({ commit }, mode) {
    commit('setTheme', mode)
  }
}

// 定义插件函数，可以在每次mutations处理过程中，添加额外处理，如下面的同步到缓存中。
const plugins = [(store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type.toString().indexOf('User') !== -1) {
      window.localStorage.setItem(STORAGE_USERKEY, JSON.stringify(state.user))
    }
  })
}]

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins
})
