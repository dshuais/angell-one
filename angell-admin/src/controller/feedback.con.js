const { addFeedbackError, getFeedbackError, updateFeedbackError, deleteFeedbackError, } = require('../constants/err.type'),
  { addData, getLikeDataList, manyQueryTotal, updateData, removeData2, } = require('../service/public.service')


const tablename = 'angell_feedback'
// 意见反馈相关
class FeedbackController {

  async addFeedback(ctx) { // 添加反馈
    try {
      const [res] = await addData(tablename, { ...ctx.request.body, userid: ctx.auth.id })
      if (res.affectedRows == 1) ctx.body = { code: 200, msg: '添加成功' }
    } catch (err) {
      console.error('添加反馈失败', err)
      ctx.app.emit('error', addFeedbackError, ctx)
    }
  }

  async getFeedbackList(ctx) { // 查询反馈列表
    let { status, ...dd } = ctx.request.query, where = ''
    if (status || status == 0) where = `status=${status}`
    try {
      const [data] = await getLikeDataList(tablename, dd, where),
        [[{ total }]] = await manyQueryTotal(tablename, dd, where)
      ctx.body = { code: 200, msg: '查询成功', data, total }
    } catch (err) {
      console.error('查询反馈列表失败', err)
      ctx.app.emit('error', getFeedbackError, ctx)
    }
  }

  async updateFeedback(ctx) { // 修改反馈数据
    const { id, ...dd } = ctx.request.body
    try {
      const [res] = await updateData(tablename, dd, `id=${id}`)
      if (res.affectedRows == 1) ctx.body = { code: 200, msg: '修改成功', }
    } catch (err) {
      console.error('修改反馈数据失败', err)
      ctx.app.emit('error', updateFeedbackError, ctx)
    }
  }

  async deleteFeedback(ctx) { // 删除反馈数据 真删除
    const { id } = ctx.request.params
    try {
      const [res] = await removeData2(tablename, { id })
      if (res.affectedRows == 1) ctx.body = { code: 200, msg: '删除成功', }
    } catch (err) {
      console.error('删除反馈数据失败', err)
      ctx.app.emit('error', deleteFeedbackError, ctx)
    }
  }


}

module.exports = new FeedbackController()