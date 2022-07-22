const path = require('path')
const { APP_HOST, APP_PORT } = process.env
const { uploadsFileError, uploadTypeError, } = require('../constants/err.type')

// 商品相关的路由的处理函数
class UploadController {
  async upload(ctx) {
    const { file } = ctx.request.files || []
    /**
     * file 对象内数据
     * mimetype/type文件类型(image/gif) originalFilename用户上传时文件的名字 size文件大小 newFilename上传后的新文件名
     * filepath上传后的新文件名 + 文件所在目录
    */
    // console.log(file)
    const fileType = ['image/jpeg', 'image/png', 'image/gif'] // 可上传的文件类型
    if (file) {
      // if (!fileType.includes(file.mimetype)) {
      //   return ctx.app.emit('error', uploadTypeError, ctx)
      // }
      // const url = `${APP_HOST}:${APP_PORT}/${path.basename(file.filepath)}`
      const url = `${APP_HOST}/${path.basename(file.filepath)}` // 配置了域名就不需要添加端口了
      ctx.body = {
        code: 200, msg: '上传成功', data: { url }
      }
    } else {
      return ctx.app.emit('error', uploadsFileError, ctx)
    }
  }
}

module.exports = new UploadController()