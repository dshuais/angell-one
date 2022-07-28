const { validator } = require('../constants/validator')


const getListValidator = async (ctx, next) => { // 验证必须传入分页参数
  // const vali = [{ pageNum: ['number'] }, { pageSize: ['number'] }], vv = await validator(ctx, vali)
  // if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}


module.exports = {
  getListValidator,
}