import { custApi } from '@/api'
const state = {
  keepAlive: [],
  loading: false,
  token: sessionStorage.getItem('token'),
  cancelTokenArr: [],
  userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
}

const mutations = {
  SET_KEEP_ALIVE: (state, keepAlive) => {
    state.keepAlive = keepAlive
  },
  SHOW_LOADING(state, load) {
    state.loading = load
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    sessionStorage.setItem('token', token)
  },
  PUSH_REQ_TOKEN: (state, payload) => {
    state.cancelTokenArr.push(payload.cancelToken)
  },
  CLEAR_REQ_TOKEN: (state) => {
    state.cancelTokenArr.forEach((cancel) => {
      if (cancel) {
        cancel('路由跳转取消请求')
      }
    })
    state.cancelTokenArr = []
  },
  SET_USER_INFO: (state, payload) => {
    state.userInfo = payload
  },
}

const actions = {
  setKeepAlive(context, load) {
    context.commit('SET_KEEP_ALIVE', load)
  },
  setLoading(context, load) {
    context.commit('SHOW_LOADING', load)
  },
  setToken(context, token) {
    context.commit('SET_TOKEN', token)
  },
  pushReqToken(state, payload) {
    state.commit('PUSH_REQ_TOKEN', payload)
  },
  clearReqToken(state) {
    state.commit('CLEAR_REQ_TOKEN')
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', null)
      commit('SET_USER_INFO', null)
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userInfo')
      resolve()
    }).catch((error) => {
      reject(error)
    })
  },
  getSsoToken({ dispatch }, userInfo) {
    return new Promise((resolve, reject) => {
      custApi
        .getSsoToken(userInfo)
        .then((data) => {
          dispatch('login', data.token)
            .then(() => {
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  login({ commit }, ssoToken) {
    console.log(ssoToken)
    return new Promise((resolve, reject) => {
      custApi
        .loginInfo(ssoToken)
        .then((data) => {
          commit('SET_TOKEN', data)
          sessionStorage.setItem('token', data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getRoleInfo({ commit }) {
    return new Promise((resolve, reject) => {
      custApi
        .getRoleInfo()
        .then((data) => {
          console.log(33333)
          commit('SET_USER_INFO', data)
          sessionStorage.setItem('userInfo', JSON.stringify(data))
          // watermark.set(`${data.sysUserCode}_${data.staff?.staffName}`)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  // getters
}
