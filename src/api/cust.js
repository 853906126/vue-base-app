import { $async, $sync } from '@/utils/http'

let baseUrl = process.env.VUE_APP_CUST_API
let custUrl = baseUrl + 'cust/'

export default {
  // 获取统一认证访问令牌
  getAccessToken: (param) => $async.get(custUrl + 'sso/getAccessToken', param),
  // 获取SSO Token
  getSsoToken: (param) => $async.get(custUrl + 'sso/getSsoToken', param),
  // 获取统一认证EAM登陆地址
  getEamUrl: () => $async.get(custUrl + 'sso/getEamUrl'),
  // 登录
  loginInfo: (ssoToken) => $sync.get(custUrl + 'sso/login', { ssoToken }),
  // 返回角色信息
  getRoleInfo: () => $sync.get(custUrl + 'sso/getUserInfo'),
}
