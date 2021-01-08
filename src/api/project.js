import { $async, $sync } from '@/utils/http'
import utils from '@/utils/jsUtils'

let baseUrl = process.env.VUE_APP_PROJECT_API
let projectUrl = baseUrl + 'project/'

export default {
  // 下载文件
  downloadDocument: (param, config = {}) => {
    let url = 'document/downloadDocument/'
    if (config.url) {
      url = config.url
    }
    url = projectUrl + url
    if (!config.isPost) {
      url = url + param.docId
    }
    return new Promise((resolve, reject) => {
      let req = config.isPost
        ? $async.download(url, param, true)
        : $async.download(url)
      req
        .then((response) => {
          let fileName = null
          if (response.headers['content-disposition']) {
            let headers = utils.splitArray(
              response.headers['content-disposition'],
              ';',
              '='
            )
            if (headers) {
              //对文件名乱码转义--【Node.js】使用iconv-lite解决中文乱码
              let iconv = require('iconv-lite')
              iconv.skipDecodeWarning = true //忽略警告
              fileName = iconv.decode(headers.filename, 'utf-8')
            }
          }

          var blob = new Blob([response.data])
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) //创建下载的链接
          downloadElement.href = href
          downloadElement.download = param.docName ? param.docName : fileName //下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() //点击下载
          document.body.removeChild(downloadElement) //下载完成移除元素
          window.URL.revokeObjectURL(href) //释放掉blob对象
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
