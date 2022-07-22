const Router = require('koa-router'), router = new Router(),
  { getTodaySelected } = require('../controller/selected.con')



// 每日精选接口
router.get('/', getTodaySelected)


module.exports = router
