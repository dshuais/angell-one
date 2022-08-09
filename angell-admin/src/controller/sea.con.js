const { pictureGetSelectError, addPictureError, putPictureError, addFileError, putFileError, removeFileError,
} = require('../constants/err.type'),
  { getLikeDataList, manyQueryTotal, addData, updateData, removeData2, } = require('../service/public.service')

// sea图片文件相关

const imgTable = 'angell_picture', fileTable = 'angell_files'
class SeaController {
  async getPrivatePictureList(ctx) { // 查询个人图片列表
    // console.log(ctx.auth.id, ctx.request.query)
    try {
      const res = await getLikeDataList(imgTable, ctx.request.query, `userid=${ctx.auth.id},status<>3`, 'update_time'),
        total = await manyQueryTotal(imgTable, ctx.request.query, `userid=${ctx.auth.id},status<>3`)
      ctx.body = { code: 200, msg: '查询成功', data: res[0], total: total[0][0].total }
    } catch (err) {
      console.error('查询个人图片列表失败', err)
      ctx.app.emit('error', pictureGetSelectError, ctx)
    }
  }

  async addImgPicture(ctx) { // 添加图片文件到图片库
    ctx.request.body.userid = ctx.auth.id
    try {
      const { id, star, ...data } = ctx.request.body, res = await addData(imgTable, data)
      if (res[0].affectedRows != 1) return ctx.app.emit('error', addPictureError, ctx)
      ctx.body = { code: 200, msg: '添加成功' }
    } catch (err) {
      console.error('添加picture失败', err)
      ctx.app.emit('error', addPictureError, ctx)
    }
  }

  async updatePicture(ctx) { // 修改图片文件
    try {
      const { id, userid, url, size, star, ...data } = ctx.request.body
      for (let d in data) {
        if (['', null, undefined].includes(data[d])) delete data[d]
      }
      const res = await updateData(imgTable, data, `id=${id}`)
      if (res[0].affectedRows != 1) return ctx.app.emit('error', putPictureError, ctx)
      ctx.body = { code: 200, msg: '修改成功' }
    } catch (err) {
      console.error('修改picture失败', err)
      ctx.app.emit('error', putPictureError, ctx)
    }
  }

  async addFile(ctx) { // 添加文件到文件池
    try {
      const res = await addData(fileTable, { ...ctx.request.body, userid: ctx.auth.id })
      if (res[0].affectedRows != 1) return ctx.app.emit('error', addFileError, ctx)
      ctx.body = { code: 200, msg: '添加成功' }
    } catch (err) {
      console.error('添加file失败', err)
      ctx.app.emit('error', addFileError, ctx)
    }
  }

  async removeFile(ctx) { // 删除文件池文件
    try {
      const res = await removeData2(fileTable, ctx.request.params)
      if (res[0].affectedRows != 1) return ctx.app.emit('error', removeFileError, ctx)
      ctx.body = { code: 200, msg: '删除成功' }
    } catch (err) {
      console.error('删除file失败', err)
      ctx.app.emit('error', removeFileError, ctx)
    }
  }

  async updateFile(ctx) { // 修改file
    try {
      const { id, downUrl, size, userid, ...data } = ctx.request.body
      for (let d in data) {
        if (['', null, undefined].includes(data[d])) delete data[d]
      }
      const res = await updateData(fileTable, data, `id=${id}`)
      if (res[0].affectedRows != 1) return ctx.app.emit('error', putFileError, ctx)
      ctx.body = { code: 200, msg: '修改成功' }
    } catch (err) {
      console.error('修改file失败', err)
      ctx.app.emit('error', putFileError, ctx)
    }
  }

  async getFiles(ctx) { // 查询文件列表
    try {
      let sql = ''
      const { status, sea, ...data } = ctx.request.query, { id } = ctx.auth
      if (sea == 0) sql = 'sea=0'
      else if (sea == 1) sql = `userid=${id},status=${status}`
      const res = await getLikeDataList(fileTable, data, sql),
        total = await manyQueryTotal(fileTable, data, sql)
      ctx.body = { code: 200, msg: '查询成功', data: res[0], total: total[0][0].total }
    } catch (err) {
      console.error('查询files失败', err)
      ctx.app.emit('error', pictureGetSelectError, ctx)
    }
  }

}


module.exports = new SeaController()