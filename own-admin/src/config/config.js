const { randomColor } = require('../constants/utils'), { SESSION_COOKIE_KEY } = process.env

// koa-session的配置
const sessionConfig = {
  key: SESSION_COOKIE_KEY, // cookie的key
  maxAge: 1000 * 60 * 60 * 12, // session的过期时间12小时
  autoCommit: true, // 自动提交到响应头 默认就是ture
  overwrite: true, // 是否允许重写
  httpOnly: false, // cookie是否只有服务的可以访问
  signed: true, // 是否签名 默认就是true
  rolling: true, // 是否每次响应式重写刷新session的有效期
  renew: false, // 是否在session快过期时刷新session的有效期 默认就是false
}

// svg-captcha生成图片验证码的配置
const svgCaptchaConfig = {
  size: 4, // 验证码长度
  width: 120, // 宽度
  height: 40, // 高度
  fontSize: 45, // 字体大小
  ignoreChars: 'Oo01ilI', // 验证码字符中排除Oo01ilI
  noise: 4, // 干扰线的条数
  color: true, // 验证码字符是否有颜色 默认没有，但如果设置了背景 默认有
  background: randomColor(200, 250), // 验证码的背景颜色
}


module.exports = {
  svgCaptchaConfig, sessionConfig,
}
