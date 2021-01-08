import moment from '@/assets/js/moment.js'
export default {
  placeholder(value) {
    return value || '无'
  },
  dateFormat(dataStr, pattern = 'YYYY.MM.DD') {
    return dataStr ? moment(dataStr, 'YYYYMMDDHHmmss').format(pattern) : ''
  },
}
