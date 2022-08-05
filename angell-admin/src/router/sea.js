const Router = require('koa-router'), router = new Router(),
  { auth } = require('../middleware/auth.middleware')

// 海池相关接口

// 查询图片池 ----------- 私人的图片池 （公开的精选在selected内）
router.get('/privatePicture', auth,)



module.exports = router