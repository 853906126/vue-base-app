export default {
  /**
   * 调用原生SDK能力
   *
   * @param params 参数
   * @param callback 回调函数
   * @param name 接口名
   */
  callNative(params, callback = () => {}, name = 'callNative') {
    console.log(params)
    const dsBridge = require('dsbridge')
    dsBridge.call(name, params, callback)
  },
  /**
   * 原生拍照能力调用接口
   *
   * @param {function} callback 回调函数
   * @param {Object} extend 其他参数
   */
  getPhoto(callback, extend = null) {
    let params = {
      dataType: 'GetPhoto',
      photoSourceType: '0',
      size: '200',
    }
    params = Object.assign(params, extend)
    this.callNative(params, callback)
  },
  /**
   * 获取本地相册照片原生能力调用接口
   *
   * @param {function} callback 回调函数
   * @param {Object} extend 其他参数
   */
  getLocalPhoto(callback, extend = {}) {
    extend.photoSourceType = '1'
    this.getPhoto(callback, extend)
  },
  /**
   * 获取GPS信息
   *
   * @param {function} callback 回调函数
   */
  getLocation(callback) {
    const params = {
      dataType: 'GetLocation',
      continue: '0',
    }
    this.callNative(params,callback)
  },
  getLocationContinuously(callback) {
    const params = {
      dataType: 'GetLocation',
      continue: '1',
    }
    this.callNative(params,callback)
  },
  stopLocation(callback) {
    const params = {
      dataType: 'StopLocation',
    }
    this.callNative(params,callback)
  },
  /**
   * 关闭当前H5页面
   *
   * @param {function} callback 回调函数
   */
  closeWeb(callback = () => {}) {
    const param = {
      dataType: 'CloseWeb',
    }
    this.callNative(param, callback)
  },
  newWeb(url, extend = {}, callback = () => {}) {
    let params = {
      dataType: 'NewWeb',
      url: url,
      isTitlebar: '0',
    }
    params = Object.assign(params, extend)
    this.callNative(params, callback)
  },
  getGlobalVal(key, appCode, callback) {
    let params = {
      dataType: 'GetGlobalVal',
      appCode,
      key,
    }
    this.callNative(params, callback)
  },
  setGlobalVal(key, value, appCode, callback = () => {}) {
    let params = {
      dataType: 'SetGlobalVal',
      appCode,
      key,
      value,
    }
    this.callNative(params, callback)
  },
  userRecheck(crmNum, mobilePhone, serverUrl, callback) {
    let params = {
      dataType: 'UserRecheck',
      clientID: 'CTFJGCV20200724_APP',
      crmNum,
      mobilePhone,
      serverUrl,
    }
    this.callNative(params, callback, 'WorkAssistant.callInSideNative')
  },
  getAddressBook() {
    return new Promise(resolve => {
      const params = {
        dataType: 'GetAddressBook',
      }
      this.callNative(params, resolve)
    })
  },
  getDeviceInfo() {
    return new Promise(resolve => {
      const params = {
        dataType: 'GetDeviceInfo',
      }
      this.callNative(params, resolve)
    })
  },
  getNetworkType() {
    return new Promise(resolve => {
      const params = {
        dataType: 'GetNetworkType',
      }
      this.callNative(params, resolve)
    })
  },
  getMobileOperators() {
    return new Promise(resolve => {
      const params = {
        dataType: 'GetMobileOperators',
      }
      this.callNative(params, resolve)
    })
  },
  getCompleteDeviceInfo: async function () {
    const deviceInfo = await this.getDeviceInfo()
    console.log('deviceInfo', deviceInfo)
    const networkType = await this.getNetworkType()
    console.log('networkType', networkType)
    const operator = await this.getMobileOperators()
    console.log('operator', operator)

    const deviceInfoData = deviceInfo?.data
    const networkTypeData = networkType?.data
    const operatorData = operator?.data

    if (!deviceInfoData) {
      throw new Error('设备信息获取失败')
    }

    Object.assign(deviceInfoData, networkTypeData, operatorData)
    return deviceInfo
  },
  isAndroid() {
    return navigator.userAgent.includes('Android') || navigator.userAgent.includes('Adr')
  },
  isIOs() {
    return navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  },
  readIdCardByBluetooth() {
    return new Promise(resolve => {
      const params = {
        dataType: 'IDCardRecognition',
      }
      this.callNative(params, resolve)
    })
  },
  readIdCardByNFC() {
    return new Promise(resolve => {
      const params = {
        dataType: 'IDCardByNFC',
      }
      this.callNative(params, resolve)
    })
  },
}
