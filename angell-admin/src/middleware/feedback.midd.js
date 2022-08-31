const { validator } = require('../constants/validator')



const addFeedbackValid = async (ctx, next) => { // 添加意见反馈的中间件
  const list = [{ content: ['string'] }], vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

const updateFeedbackvalid = async (ctx, next) => { // 修改意见反馈的中间件
  const list = [{ id: ['number'] }], vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}



module.exports = {
  addFeedbackValid, updateFeedbackvalid
}