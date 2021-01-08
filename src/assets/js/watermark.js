import moment from './moment'

const watermark = {
  interval: null,
  elementId: 'app_watermark_canvas',
  setWatermark(str) {
    if (document.getElementById(this.elementId) !== null) {
      document.body.removeChild(document.getElementById(this.elementId))
    }
    //创建一个画布
    let can = document.createElement('canvas')
    //设置画布的长宽
    if (window.screen.availWidth < 1700) {
      can.width = 200
    } else {
      can.width = 460
    }
    can.height = 190

    let cans = can.getContext('2d')
    //旋转角度
    cans.rotate((-15 * Math.PI) / 180)
    cans.font = '14px Vedana'
    //设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = 'rgba(200,200,200,0.31)'
    //设置文本内容的当前对齐方式
    cans.textAlign = 'center'
    //设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'middle'
    //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    cans.fillText(str, can.width / 2, can.height / 2)
    cans.fillText(
      moment(new Date()).format('YYYY.MM.DD HH:mm:ss'),
      can.width / 2,
      can.height / 2 + 20
    )

    let div = document.createElement('div')
    div.id = this.elementId
    div.style.pointerEvents = 'none'
    div.style.top = '30px'
    div.style.left = '0px'
    div.style.position = 'fixed'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth + 'px'
    div.style.height = document.documentElement.clientHeight + 'px'
    div.style.background =
      'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
  },
  set(str) {
    if (this.interval) {
      clearInterval(this.interval)
    }

    this.interval = setInterval(() => {
      this.setWatermark(str)
    }, 1000)
    window.onresize = () => {
      this.setWatermark(str)
    }
  },
  remove() {
    if (this.interval) {
      clearInterval(this.interval)
    }

    if (document.getElementById(this.elementId) !== null) {
      document.body.removeChild(document.getElementById(this.elementId))
    }
  },
}

export const watermarkInstall = function(Vue) {
  Vue.prototype.$watermark = watermark
}

export default watermark
