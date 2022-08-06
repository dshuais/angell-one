const { validator } = require('../constants/validator')



const dowValid = async (ctx, next) => { // 验证下载文件时文件名
  const list = [{ downName: ['string'] }], vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

const dowValidList = async (ctx, next) => { // 验证批量下载
  const list = [{ downList: ['array'] }], vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

module.exports = {
  dowValid, dowValidList,
}
