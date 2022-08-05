const path = require('path'), fs = require('fs'), send = require('koa-send')
const { APP_HOST, APP_PORT } = process.env
const { uploadsFileError, uploadTypeError, downloadError, } = require('../constants/err.type'),
  dayjs = require('dayjs'), archiver = require('archiver')

// 商品相关的路由的处理函数
class UploadController {

  async uploadImg(ctx) { // 图片上传
    const files = ctx.request.files, fileType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'] // 可上传的文件类型
    // console.log('file', ctx.request.files)
    /**
     * files 对象内数据
     * mimetype/type文件类型(image/gif) originalFilename用户上传时文件的名字 size文件大小 newFilename上传后的新文件名
     * filepath上传后的新文件名 + 文件所在目录
    */
    if (files) {
      let data = []
      filesConcat(files).forEach(file => {
        if (!fileType.includes(file.mimetype)) { // 判断上传文件类型
          return ctx.app.emit('error', uploadTypeError, ctx)
        }
        data.push({
          name: file.name,
          url: `${APP_HOST}/img/${file.filepath.replace(/(\S*)img\\/, '')}` // 新的按照图片和文件区分的路径
        })
      })
      // const url = `${APP_HOST}:${APP_PORT}/${path.basename(file.filepath)}`
      // const url = `${APP_HOST}/img/${path.basename(file.filepath)}` // 配置了域名就不需要添加端口了 path.basename获取文件名
      // const url = `${APP_HOST}/img/${file.filepath.replace(/(\S*)img\\/, '')}` // 新的按照图片和文件区分的路径
      ctx.body = { code: 200, msg: '上传成功', data }
    } else {
      return ctx.app.emit('error', uploadsFileError, ctx)
    }
  }


  async uploadFile(ctx) { // 文件上传
    // console.log(ctx.request.files);
    const files = ctx.request.files, fileType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    // console.log('files', files)
    if (files) {
      let data = []
      filesConcat(files).forEach(file => {
        const { name, filepath } = file, // 获取上传的单个文件
          downName = filepath.replace(/(\S*)file\\/, '')
        // if (!fileType.includes(file.mimetype)) { // 判断上传文件类型
        //   return ctx.app.emit('error', uploadTypeError, ctx)
        // }
        data.push({
          name,
          url: `${APP_HOST}/file/${downName}`, // 新的按照图片和文件区分的路径
          downName // 上传文件的下载名
        })
        // const dirName = dayjs().format('YYYYMMDD'), // 文件夹内按照日期存放图片
        //   dir = path.join(__dirname, `../../../uploads/file/${dirName}`)
        // if (!fs.existsSync(dir)) fs.mkdirSync(dir)
        // const filename = file.originalFilename.replaceAll(' ', '_').replace(/[`~!@#$%^&*()|\-=?;:'",<>\{\}\\\/]/gi, '_')
        // file.name = filename
        // file.filepath = `${dir}/${filename}`

        // const render = fs.createReadStream(file.filepath), // 创建可读流
        // ext = file.name.split('.').pop(), // 获取文件扩展名  path.join(__dirname, `../../../uploads/file/${dirName}`)
        // upStream = fs.createWriteStream(path.join(__dirname, `../../../uploads/file/${file.filepath.replace(/(\S*)file\\/, '')}`)) // 创建可写流
        // upStream = fs.createWriteStream(`/uploads/file/${file.filepath.replace(/(\S*)file\\/, '')}`) // 创建可写流
        // upStream = fs.createWriteStream(path.join(__dirname, `../../../uploads/file/${file.name}`)) // 创建可写流
        // console.log(render.pipe(upStream))
        // console.log('可读流', render)
        // console.log('可写流', upStream)
        // render.pipe(upStream) // 可读流通过管道 写入可写流
      })
      ctx.body = { code: 200, msg: '上传成功', data }
    } else {
      ctx.app.emit('error', uploadsFileError, ctx)
    }
  }


  async downloadFile(ctx) { // 文件下载 `upload/file/${downName}`
    const { downName } = ctx.request.body
    try {
      // ctx.attachment(pat)
      ctx.attachment(decodeURI(downName))
      await send(ctx, downName, { root: path.join(__dirname, `../../../angellone.uploads/file/`) }) // { root: path.join(__dirname, `../../../uploads/file`) }
      // ctx.body = { code: 200, msg: '下载成功' }
    } catch (err) {
      console.error('下载失败', err)
      ctx.app.emit('error', downloadError, ctx)
    }
  }

  async downloadFileAll(ctx) { // 文件批量下载 打包为zip压缩包
    ctx.request.body.downList.push('angellone.txt')
    try {
      const { downList } = ctx.request.body, zipName = `${dayjs().format('MMDD')}_${dayjs().format('hhmmss')}_angellone.zip`,
        root = path.join(__dirname, '../../../angellone.uploads/zip/'),
        readPath = path.join(__dirname, '../../../angellone.uploads/file/'),
        zipStream = fs.createWriteStream(root + zipName), zip = archiver('zip')
      zip.pipe(zipStream)
      downList.forEach(name => {
        zip.append(fs.createReadStream(readPath + name), { name: name.split('/').at(-1) })
      })
      await zip.finalize()
      ctx.attachment(zipName)
      await send(ctx, zipName, { root })
      // ctx.body = { code: 200, msg: '下载成功' }
    } catch (err) {
      console.error('下载失败', err)
      ctx.app.emit('error', downloadError, ctx)
    }
  }


}


// 处理上传接收到的files数据 形式为{a:[],b:{}} 多选上传就为数组
function filesConcat(files) {
  let filess = []
  for (let ff in files) {
    const f = files[ff]
    if (Array.isArray(f)) filess = filess.concat(f)
    else filess.push(f)
  }
  return filess
}

module.exports = new UploadController()