const svgCaptcha = require('svg-captcha'), { svgCaptchaConfig } = require('../config/config'),
  { publicHandleError } = require('../constants/err.type')

// 关于验证码的方法
class captchaController {

  async getCaptcha(ctx) { // 获取图片验证码
    try {
      const captcha = svgCaptcha.create(svgCaptchaConfig)
      // ctx.set('Content-Type', 'image/svg+xml')
      let img = new Buffer.from(captcha.data).toString('base64')
      let captchaImg = 'data:image/svg+xml;base64,' + img // 把验证码转换成base64格式 默认是svg格式在移动端会有问题
      ctx.session.captcha = captcha.text.toLowerCase() // 把验证码数字存到缓存 忽略大小写
      ctx.body = { code: 200, msg: '生成成功', data: { captchaImg } }
    } catch (err) {
      console.error('生成验证码失败', err)
      ctx.app.emit('error', publicHandleError, ctx)
    }
  }

}


module.exports = new captchaController()