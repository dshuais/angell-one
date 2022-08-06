const { pictureGetSelectError, addPictureError, putPictureError, } = require('../constants/err.type'),
  { getLikeDataList, manyQueryTotal, addData, updateData, } = require('../service/public.service')

// sea图片文件相关

const imgTable = 'angell_picture', fileTable = 'angell_files'
class SeaController {
  async getPrivatePictureList(ctx) { // 查询个人图片列表
    // console.log(ctx.auth.id, ctx.request.query)
    try {
      const res = await getLikeDataList(imgTable, ctx.request.query, `userid=${ctx.auth.id},status<>3`)
      const total = await manyQueryTotal(imgTable, ctx.request.query, `userid=${ctx.auth.id},status<>3`)
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
      const { id, userid, url, star, ...data } = ctx.request.body
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

}


module.exports = new SeaController()