const { validator } = require('../constants/validator'),

  createOrderVali = async (ctx, next) => { // 生成订单的参数验证
    const list = [{ address_id: ['number'], cart_info: ['string'] }],
      vv = await validator(ctx, list)
    if (vv) return ctx.app.emit('error', vv, ctx)
    await next()
  },

  updateOrderStaVali = async (ctx, next) => { // 生成订单的参数验证
    const list = [{ status: ['number', true, 4, 0] }],
      vv = await validator(ctx, list)
    if (vv) return ctx.app.emit('error', vv, ctx)
    await next()
  }

module.exports = {
  createOrderVali, updateOrderStaVali,
}