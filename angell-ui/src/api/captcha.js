import request from '../utils/request'

// 获取验证码
export const getCaptcha = _ => {
  return request({
    method: 'get',
    url: '/api/captcha'
  })
}
