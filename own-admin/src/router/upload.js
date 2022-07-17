const path = require('path')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const { upload } = require('../controller/upload.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { startUpload } = require('../middleware/upload.middleware')
const router = new Router()

// 商品相关模块路由
// 上传商品图片
router.post('/file', auth, hadAdminPermission, KoaBody({ // 把开启上传中间件放在路由上 解决挂载全局全部接口都可上传的问题
  multipart: true, // 开启上传
  formidable: {
    // uploadDir不能使用相对路径 因为他相对于process.cwd() 并不是相对于当前文件夹
    uploadDir: path.join(__dirname, '../../../uploads'),
    keepExtensions: true, // 保留扩展名
  }
}), upload)

module.exports = router
