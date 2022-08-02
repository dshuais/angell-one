const Router = require('koa-router'), router = new Router(),
  { getTodaySelected, getTodayGuide, getTodaySwiper, getStarMaxUserinfo, getPictureList, selectedPicStar,
  } = require('../controller/selected.con'),
  { getListValidator } = require('../middleware/selected.midd')



// 每日精选接口 用于登录页
router.get('/', getTodaySelected)

// 每周查询不同的引导页
router.get('/guide/:week', getTodayGuide)

// 查询首页轮播图
router.get('/swiper', getTodaySwiper)

// 查询star值最高的图片的用户
router.get('/staruser', getStarMaxUserinfo)

/**
 * 精选图片 相关
*/
// 精选列表
router.post('/list', getListValidator, getPictureList)
// 精选图片赞👍
router.post('/star/:id', selectedPicStar)



module.exports = router
