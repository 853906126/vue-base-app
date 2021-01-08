import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const syncRequest = axios.create({
  timeout: 300000,
})

const asyncRequest = axios.create({
  timeout: 300000,
})

//同步请求拦截
syncRequest.interceptors.request.use(
  (config) => {
    // 显示加载中遮罩
    // $loading.show();
    store.dispatch('app/setLoading', true)
    afterRequest(config)
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

//同步响应拦截
syncRequest.interceptors.response.use(
  (response) => {
    store.dispatch('app/setLoading', false)
    return responseCheck(response)
  },
  (error) => {
    store.dispatch('app/setLoading', false)
    afterResponseError(error)
    return Promise.reject(error)
  }
)

//异步请求拦截
asyncRequest.interceptors.request.use(
  (config) => {
    afterRequest(config)
    return config
  },
  function(error) {
    afterResponseError(error)
    return Promise.reject(error)
  }
)

//异步响应拦截
asyncRequest.interceptors.response.use(
  (response) => {
    return responseCheck(response)
  },
  (error) => {
    if (error?.message !== '路由跳转取消请求') {
      afterResponseError(error)
    }
    return Promise.reject(error)
  }
)

function showMessage(str) {
  Toast.fail(str)
}

function responseCheck(response) {
  const token = response?.headers?.token
  if (token) {
    sessionStorage.setItem('token', token)
  }

  const res = response.data
  if (response.status !== 200) {
    showMessage(res.message || '接口请求失败：状态码不等于200')
    return Promise.reject(res)
  } else {
    if (Object.prototype.hasOwnProperty.call(res, 'result')) {
      if (res.result) {
        // axios config增加参数needConfig，true报文返回配置,false返回data
        return response.config.needConfig ? response : res
      } else {
        let messageStr = res.detailMsg
        if (
          Object.prototype.hasOwnProperty.call(res, 'exceptions') &&
          res.exceptions &&
          res.exceptions.length > 0
        ) {
          messageStr = res.exceptions[0].message
        }

        showMessage(messageStr || '接口请求失败：result为false')
        return Promise.reject(messageStr)
      }
    } else {
      return response.config.needConfig ? response : res
    }
  }
}

const afterRequest = (config) => {
  // 带入token查询
  if (sessionStorage.getItem('token')) {
    config.headers['token'] = sessionStorage.getItem('token')
  }
  config.cancelToken = new axios.CancelToken(function(cancel) {
    store.dispatch('app/pushReqToken', { cancelToken: cancel })
  })
}

const afterResponseError = (error) => {
  if (error.response) {
    if (error.response.detailMsg) {
      showMessage(error.response.detailMsg || 'error')
    } else if (error.response.data.message) {
      showMessage(error.response.data.message || 'error')
    }
  } else {
    if (error.message != '路由跳转取消请求') {
      showMessage(error.message || 'error')
    }
  }
}

const $sync = {
  post(api, param = {}) {
    return syncRequest.post(api, param)
  },

  get(api, param = {}) {
    let params = { params: param }
    return syncRequest.get(api, params)
  },

  delete(api, param = {}) {
    let params = { params: param }
    return syncRequest.delete(api, params)
  },

  put(api, param = {}) {
    return syncRequest.put(api, param)
  },

  patch(api, param = {}) {
    return syncRequest.patch(api, param)
  },

  download(api, param = {}, isPost) {
    if (isPost) {
      let config = {
        responseType: 'blob',
        needConfig: true,
      }
      return syncRequest.post(api, param, config)
    } else {
      let config = {
        method: 'get',
        url: api,
        params: param,
        responseType: 'blob',
        needConfig: true,
      }
      return syncRequest.get(api, config)
    }
  },

  upload(api, param = {}) {
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
    return syncRequest.post(api, param, config)
  },
}

const $async = {
  post(api, param = {}) {
    return asyncRequest.post(api, param)
  },

  get(api, param = {}) {
    let params = { params: param }
    return asyncRequest.get(api, params)
  },

  getNeedConfig(api, param = {}) {
    let config = {
      method: 'get',
      url: api,
      params: param,
      needConfig: true,
    }
    return asyncRequest.get(api, config)
  },

  delete(api, param = {}) {
    let params = { params: param }
    return asyncRequest.delete(api, params)
  },

  put(api, param = {}) {
    return asyncRequest.put(api, param)
  },

  patch(api, param = {}) {
    return asyncRequest.patch(api, param)
  },

  download(api, param = {}, isPost) {
    if (isPost) {
      let config = {
        responseType: 'blob',
        needConfig: true,
      }
      return asyncRequest.post(api, param, config)
    } else {
      let config = {
        method: 'get',
        url: api,
        params: param,
        responseType: 'blob',
        needConfig: true,
      }
      return asyncRequest.get(api, config)
    }
  },

  upload(api, param = {}) {
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
    return asyncRequest.post(api, param, config)
  },
}

export { $sync, $async }
