const jwt = require('jsonwebtoken')
const { TOKEN_SECRETKEY } = process.env
const { tokenOverError, tokenInvalidError, userAuthError, } = require('../constants/err.type')

// 解析token
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
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
    }
  }

  await next()
}

// 是否有admin权限
const hadAdminPermission = async (ctx, next) => {
  const { role } = ctx.auth
  if (role !== 'admin') return ctx.app.emit('error', userAuthError, ctx)
  await next()
}


module.exports = {
  auth, hadAdminPermission
}