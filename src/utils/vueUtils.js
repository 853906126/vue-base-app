import moment from '@/assets/js/moment.js'

const baseUtils = {
  getBaseUrl() {
    const href = window.location.href
    if (href.indexOf('#') > 0) {
      return href.substr(0, href.indexOf('#') + 2)
    }
    return window.location.hostname + window.location.port
  },
  isEmpty(str) {
    if (str == null || typeof str == 'undefined' || str == '') {
      return true
    } else {
      return false
    }
  },
  nullToEmpty(str) {
    return this.isEmpty(str) ? '' : str
  },
  getReqTime(date, pattern = 'YYYYMMDDHHmmss') {
    return moment(date).format(pattern)
  },
  getShowTime(date, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return date ? moment(date, 'YYYYMMDDHHmmss').format(pattern) : null
  },
  getFileSize(fileByte) {
    const fileSizeByte = fileByte
    let fileSizeMsg = ''
    let relSize = 0
    if (fileSizeByte < 1048576) {
      relSize = fileSizeByte / 1024
      fileSizeMsg = relSize.toFixed(2) + 'KB'
    } else if (fileSizeByte == 1048576) {
      fileSizeMsg = '1MB'
    } else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) {
      relSize = fileSizeByte / (1024 * 1024)
      fileSizeMsg = relSize.toFixed(2) + 'MB'
    } else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) {
      fileSizeMsg = '1GB'
    } else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) {
      relSize = fileSizeByte / (1024 * 1024 * 1024)
      fileSizeMsg = relSize.toFixed(2) + 'GB'
    } else {
      fileSizeMsg = '文件大小超过1TB'
    }
    return fileSizeMsg
  },
  getDocType(docName) {
    let strs = docName.split('.')
    if (strs && strs.length > 0) {
      return strs[strs.length - 1]
    } else {
      return 'data'
    }
  },
  colorToRgb(color) {
    let sColor = color.toLowerCase()
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = '#'
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      //处理六位的颜色值
      var sColorChange = []
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      return 'rgb(' + sColorChange.join(',') + ',0.2)'
    }
    return sColor
  },
  copyObjectValue(to, from) {
    if (from) {
      Array.from(Object.keys(to)).forEach((key) => {
        if (from[key]) {
          to[key] = from[key]
        }
      })
    }
  },
  copyObject(data) {
    return JSON.parse(JSON.stringify(data))
  },
  //四舍五入保留2位小数（若第二位小数为0，则保留一位小数）
  keepTwoDecimal(num) {
    var result = parseFloat(num)
    if (isNaN(result)) {
      return false
    }
    result = Math.round(num * 100) / 100
    return result
  },
  isIE() {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      return true
    } else {
      return false
    }
  },
  dataURLtoFile(base64, filename = 'file') {
    let arr = base64.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let suffix = mime.split('/')[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    const blob = new Blob([u8arr], {type: mime})
    blob.lastModifiedDate = new Date()
    blob.name = `${filename}.${suffix}`
    return blob
  },
  /**
   * 将Map对象存入LocalStorage
   *
   * @param key
   * @param {Map} map
   */
  saveMapToLocalStorage(key, map) {
    localStorage.setItem(key, JSON.stringify(Array.from(map.entries())))
  },
  /**
   * 从LocalStorage中获取Map对象
   *
   * @param key
   * @returns {Map}
   */
  getMapFromLocalStorage(key) {
    let mapJson = localStorage.getItem(key)
    return mapJson ? new Map(JSON.parse(mapJson)) : new Map()
  },
  /**
   * 获取近x天的格式化字符串数组
   *
   * @param x
   * @param pattern
   * @returns {[]}
   */
  getLastDaysName(x = 7, pattern = 'YYYY.MM.DD') {
    const days = []
    let dateMoment = moment().subtract(x - 1, 'days')

    for (let i = 0; i < x; i++) {
      const date = dateMoment.format(pattern)
      days.push(date)
      dateMoment.add(1, 'days')
    }
    return days
  },
  /**
   * 获取近x月的格式化字符串数组
   *
   * @param x
   * @param pattern
   * @returns {[]}
   */
  getLastMonthsName(x = 6, pattern = 'YYYY.MM') {
    const months = []
    let dateMoment = moment().startOf('month').subtract(x - 1, 'months')

    for (let i = 0; i < x; i++) {
      const month = dateMoment.format(pattern)
      months.push(month)
      dateMoment.add(1, 'months')
    }
    return months
  },
  getIp() {
    let clientIp = '127.0.0.1'
    try {
      // eslint-disable-next-line no-undef
      clientIp = returnCitySN['cip']
    } catch (e) {
      console.error(e)
    }
    return clientIp
  },
}

const install = function (Vue) {
  Vue.prototype.$utils = baseUtils
}

export default {install}
