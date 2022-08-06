const Router = require('koa-router'), router = new Router(),
  { auth } = require('../middleware/auth.middleware'),
  { getPrivatePictureList, addImgPicture, updatePicture, } = require('../controller/sea.con'),
  { addPictureValid, updatePictureValid, } = require('../middleware/sea.midd')

// 海池相关接口

// 查询图片池 ----------- 私人的图片池 （公开的精选在selected内）
router.get('/privatePicture', auth, getPrivatePictureList)
// 添加到图片池
router.post('/addPicture', auth, addPictureValid, addImgPicture)
// 修改图片文件 -- 不能修改图片
router.put('/putPicture', auth, updatePictureValid, updatePicture)


module.exports = router