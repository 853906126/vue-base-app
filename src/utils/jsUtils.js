let utils = {
  isIE() {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      return true
    } else {
      return false
    }
  },
  splitArray(strs, sp1, sp2) {
    let attr = strs.split(sp1)
    let obj = {}
    attr.forEach((item) => {
      let temp = item.split(sp2)
      let key = temp[0].replace(/\s/gi, '')
      let value = temp[1] ? temp[1].replace(/\"/g, '') : temp[1]
      obj[key] = value
    })
    return obj
  },
}

export default utils
