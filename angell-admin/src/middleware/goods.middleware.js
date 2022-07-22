
const { validator } = require('../constants/validator')
// 商品相关的中间件

// 发布商品 字段验证
const addGoodValidator = async (ctx, next) => {
  const list = [{ goods_name: ['string'] }, { goods_price: ['number'] }, { goods_num: ['number'] }, { goods_img: ['string'] }]
  const vv = await validator(ctx, list)
  // console.log(vv)
  if (vv) {
    return ctx.app.emit('error', vv, ctx)
  }
  await next()
}

// 修改商品状态 字段验证
const updateGoodStatus = async (ctx, next) => {
  const list = [{ status: ['string'] }]
  const vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

module.exports = {
  addGoodValidator, updateGoodStatus
}