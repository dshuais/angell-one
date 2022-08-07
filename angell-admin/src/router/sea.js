const Router = require('koa-router'), router = new Router(),
  { auth } = require('../middleware/auth.middleware'),
  { getPrivatePictureList, addImgPicture, updatePicture, addFile, removeFile, updateFile,
    getFiles, } = require('../controller/sea.con'),
  { addPictureValid, updatePictureValid, addFileValid, getFileValid, } = require('../middleware/sea.midd')

// 海池相关接口

// 查询图片池 ----------- 私人的图片池 （公开的精选在selected内）
router.get('/privatePicture', auth, getPrivatePictureList)
// 添加到图片池
router.post('/addPicture', auth, addPictureValid, addImgPicture)
// 修改图片文件 -- 不能修改图片
router.put('/putPicture', auth, updatePictureValid, updatePicture)


/**
 * 文件池相关
*/
// 添加文件池文件
router.post('/addFile', auth, addFileValid, addFile)
// 删除文件
router.delete('/removeFile/:id', auth, removeFile)
// 修改文件
router.put('/updateFile', auth, updateFile)
// 查询文件列表
router.get('/files', auth, getFileValid, getFiles)


module.exports = router