const { validator } = require('../constants/validator')

const addCartGood = async (ctx, next) => { // 验证添加购物车
  const list = [{ goods_id: ['number'], number: ['number'] }]
  const vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}



module.exports = {
  addCartGood,
}