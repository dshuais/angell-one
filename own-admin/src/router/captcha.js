const Router = require('koa-router'), router = new Router()
const { getCaptcha } = require('../controller/captcha.con')


// 生成图片验证码
router.get('/', getCaptcha)

module.exports = router