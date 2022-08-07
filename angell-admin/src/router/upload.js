const path = require('path'), fs = require('fs')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const { uploadImg, uploadFile, downloadFile, downloadFileAll, } = require('../controller/upload.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { dowValid, dowValidList, } = require('../middleware/upload.middleware')
const router = new Router(), dayjs = require('dayjs'), dirName = dayjs().format('YYYYMMDD'), curTime = dayjs().format('hhmmss')


// 商品相关模块路由
// 上传商品图片  auth,
router.post('/picture', KoaBody({ // 把开启上传中间件放在路由上 解决挂载全局全部接口都可上传的问题
  multipart: true, // 开启上传 可多个文件上传
  formidable: {
    // uploadDir不能使用相对路径 因为他相对于process.cwd() 并不是相对于当前文件夹
    uploadDir: path.join(__dirname, '../../../angellone.uploads/img/'),
    keepExtensions: true, // 保留扩展名
    onFileBegin: (name, file) => {
      // console.log('进入了重命名', name)
      // console.log('进入了重命名2', file)
      // const dirName = dayjs().format('YYYYMMDD') // 文件夹内按照日期存放图片
      const dir = path.join(__dirname, `../../../angellone.uploads/img/${dirName}`)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir)
      //  + '_' + (Date.now() + '').slice(-6)
      const filename = file.originalFilename.replaceAll(' ', '_').replace(/[`~!@#$%^&*()|\-=?;:'",<>\{\}\\\/]/gi, '_')
      file.name = filename
      file.filepath = `${dir}/${(Date.now() + '').slice(-6) + '_' + filename}`
      // console.log('上传', file)
    },
  }
}), uploadImg)

// 上传文件
router.post('/file', KoaBody({
  multipart: true, // 开启上传 可多个文件上传
  formidable: {
    maxFileSize: 200 * 1024 * 1024,
    //   // uploadDir不能使用相对路径 因为他相对于process.cwd() 并不是相对于当前文件夹
    uploadDir: path.join(__dirname, '../../../angellone.uploads/file/'),
    keepExtensions: true, // 保留扩展名
    onFileBegin: (name, file) => {
      // console.log('进入了重命名', name)
      // console.log('进入了重命名2', file)
      // const dirName = dayjs().format('YYYYMMDD') // 文件夹内按照日期存放图片
      const dir = path.join(__dirname, `../../../angellone.uploads/file/${dirName}`)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir)
      const filename = file.originalFilename.replaceAll(' ', '_').replace(/[`~!@#$%^&*()|\-=?;:'",<>\{\}\\\/]/gi, '_')
      file.name = filename
      file.filepath = `${dir}/${(Date.now() + '').slice(-6) + '_' + filename}`
      // console.log('上传', file)
      // file.newDirFilePath = `${dir}/${filename}`
    },
  }
}), uploadFile)


// 文件下载
router.post('/download', dowValid, downloadFile)
// 文件批量下载
router.post('/downloadAll', dowValidList, downloadFileAll)

module.exports = router
