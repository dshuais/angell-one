const bcrypt = require('bcryptjs')

// 加密密码
const bcryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10) // 加盐加密
  const hash = bcrypt.hashSync(password, salt) // 加密后的密码
  ctx.request.body.password = hash // 把加密后的密码覆盖明文密码
  await next()
}


module.exports = {
  bcryptPassword
}