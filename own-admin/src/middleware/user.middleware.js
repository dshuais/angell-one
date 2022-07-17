const bcrypt = require('bcryptjs')
const { getUserInfo, userinfo, updateById, } = require('../service/user.service')
const { userFormateError, userAlreadyExited, userRegisterError,
  userNotError, userLoginError, userPasswordError, userGetUserNameError, userOldNewPwdError,
  userChangePwdError, userAuthError, } = require('../constants/err.type')

// user 用户接口使用的中间件验证

const userValidator = async (ctx, next) => { // 验证用户输入用户名和密码
  const { username, password } = ctx.request.body
  if (!username || !password) {
    console.error('用户名或密码为空', ctx.request.body) // 错误日志
    ctx.app.emit('error', userFormateError, ctx)
    return
  }
  await next()
}

const userinfoDBSQL = async (ctx, next) => { // 通过用户名查userinfo 验证用户名是否为空
  const { username } = ctx.request.body
  if (!username) return ctx.app.emit('error', userGetUserNameError, ctx)
  await next()
}

const verifyUser = async (ctx, next) => { // 验证库中是否已有数据
  const { username } = ctx.request.body
  try {
    const res = await getUserInfo({ username })
    if (res) return ctx.app.emit('error', userAlreadyExited, ctx)
  } catch (err) {
    console.error('查询用户信息失败', err)
    return ctx.app.emit('error', userRegisterError, ctx)
  }
  await next()
}

const bcryptPassword = async (ctx, next) => { // 加密密码
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10) // 加盐加密
  const hash = bcrypt.hashSync(password, salt) // 加密后的密码
  ctx.request.body.password = hash // 把加密后的密码覆盖明文密码
  await next()
}

const verifyLogin = async (ctx, next) => { // 用户登陆的验证中间件
  const { username, password } = ctx.request.body
  let res
  try {
    res = await getUserInfo({ username }) // 查询当前登陆的用户 有的话就判断密码 没有就报错
    if (!res) return ctx.app.emit('error', userNotError, ctx)
    // if (!res) return ctx.body = userNotError
  } catch (err) {
    console.error('查询用户失败', err)
    return ctx.app.emit('error', userLoginError, ctx)
  }
  if (!bcrypt.compareSync(password, res.password)) return ctx.app.emit('error', userPasswordError, ctx) // 判断密码是否正确
  // if (!bcrypt.compareSync(password, res.password)) return ctx.body = userPasswordError // 判断密码是否正确
  ctx.userinfo = res // 如果都能成功 进入next之前 把用户信息挂在ctx上
  await next()
}

const verifyOldNewPwd = async (ctx, next) => { // 验证密码 old ！= new
  const { oldPwd, password } = ctx.request.body
  if (!oldPwd || !password) {
    console.error('新或旧密码为空', ctx.request.body) // 错误日志
    return ctx.app.emit('error', userOldNewPwdError, ctx)
  }
  let res
  try {
    res = await userinfo(ctx.auth.username) // 查询当前登陆的用户 有的话就判断密码 没有就报错
    if (!res) return ctx.app.emit('error', userNotError, ctx)
  } catch (err) {
    console.error('查询用户失败', err)
    return ctx.app.emit('error', userChangePwdError, ctx)
  }
  if (!bcrypt.compareSync(oldPwd, res.password)) return ctx.app.emit('error', { code: '10010', msg: '旧密码错误' }, ctx)
  if (bcrypt.compareSync(password, res.password)) return ctx.app.emit('error', { code: '10011', msg: '新密码与旧密码相同' }, ctx)
  await next()
}

const verifyResetPwd = async (ctx, next) => {
  const { id } = ctx.request.body
  if (!id) return ctx.app.emit('error', { code: '10013', msg: '请输入用户ID' }, ctx)
  const res = await userinfo(ctx.auth?.username) // 查询当前登陆的用户 拿到他的roles
  if (res && res.role != 'admin') return ctx.app.emit('error', userAuthError, ctx)
  ctx.request.body.password = '123456' // 向body上挂默认密码
  await next()
}

module.exports = {
  userValidator, verifyUser, bcryptPassword, verifyLogin, userinfoDBSQL, verifyOldNewPwd,
  verifyResetPwd,
}
