const { validator } = require('../constants/validator')

// 文件图片海的中间件

const addPictureValid = async (ctx, next) => { // 验证添加图片的中间件
  const list = [{ url: ['string'] }, { sea: ['enum', true, [0, 1]] }, { status: ['enum', false, [0, 1]] }],
    vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

const updatePictureValid = async (ctx, next) => { // 修改图片文件的验证
  const list = [{ id: ['number'] }, { sea: ['enum', false, [0, 1]] }, { status: ['enum', false, [0, 1, 2]] }],
    vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

const addFileValid = async (ctx, next) => { // 添加文件的参数验证
  const list = [{ name: ['string'] }, { downUrl: ['string'] }, { sea: ['enum', true, [0, 1]] }, { status: ['enum', false, [0, 1]] }],
    vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

const getFileValid = async (ctx, next) => { // 查询文件列表时 限制sea和statas只能传0 1
  const list = [{ sea: ['enum', false, [0, 1]] }, { status: ['enum', false, [0, 1]] }],
    vv = await validator(ctx, list)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}



module.exports = {
  addPictureValid, updatePictureValid, addFileValid, getFileValid
}