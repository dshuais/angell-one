const jwt = require('jsonwebtoken')
const { TOKEN_SECRETKEY } = process.env,
  { tokenOverError, tokenInvalidError, userAuthError, permissionError, } = require('../constants/err.type'),
  { userRole } = require('../service/user.service')

// 解析token
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  if (!authorization) return ctx.app.emit('error', tokenInvalidError, ctx)
  const token = authorization.replace('Bearer ', '')
  // console.log(token)
  try {
    const user = jwt.verify(token, TOKEN_SECRETKEY) // 包含了生成token时内的数据
    ctx.auth = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token过期', err)
        return ctx.app.emit('error', tokenOverError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', err)
        return ctx.app.emit('error', tokenInvalidError, ctx)
      default:
        console.error('token解析失败', err)
        return ctx.app.emit('error', tokenInvalidError, ctx)
    }
  }

  await next()
}

// 是否有admin权限
const hadAdminPermission = async (ctx, next) => {
  const { id } = ctx.auth
  try {
    const [[{ roleName }]] = await userRole(id)
    if (roleName !== 'admin') return ctx.app.emit('error', userAuthError, ctx)
    await next()
  } catch (err) {
    console.error('判断用户权限失败', err)
    ctx.app.emit('error', permissionError, ctx)
  }

}


module.exports = {
  auth, hadAdminPermission
}