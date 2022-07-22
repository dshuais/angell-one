const { validator } = require('../constants/validator')

const addRessAddVali = async (ctx, next) => { // 添加修改收货地址
  const list = [{ consignee: ['string'], phone: ['number'], address: ['string'] }]
  const vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

const setDefaultAddress = async (ctx, next) => { // 设置默认地址
  const list = [{ is_default: ['number', true, 2, 1] }]
  const vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

module.exports = {
  addRessAddVali, setDefaultAddress,
}
