const bcrypt = require('bcryptjs'), { validator } = require('../constants/validator')
const { getUserInfo, userinfo, updateById, } = require('../service/user.service'),
  { getDataInfo2 } = require('../service/public.service')
const { userFormateError, userAlreadyExited, userRegisterError,
  userNotError, userLoginError, userPasswordError, userGetUserNameError, userOldNewPwdError, changePwdError,
  userChangePwdError, userAuthError, userStatusError, equalPwdError, } = require('../constants/err.type')
const { DEFAULT_PASSWORD } = process.env

const tablename = 'own_users'

// user 用户接口使用的中间件验证
const userValidator = async (ctx, next) => { // 验证用户输入用户名和密码
  // const { username, password } = ctx.request.body
  // if (!username || !password) {
  //   console.error('用户名或密码为空', ctx.request.body) // 错误日志
  //   ctx.app.emit('error', userFormateError, ctx)
  //   return
  // }
  const vali = [{ username: ['string'] }, { password: ['string'] }], vv = await validator(ctx, vali)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

const verifyLogin = async (ctx, next) => { // 用户登陆的验证中间件
  const { username, password } = ctx.request.body
  let res
  try {
    res = await getDataInfo2(tablename, { username }, 'id,username,status,role,password') // 查询当前登陆的用户 有的话就判断密码 没有就报错
    if (!res[0].length) return ctx.app.emit('error', userNotError, ctx)
    // if (!res) return ctx.body = userNotError
  } catch (err) {
    console.error('查询用户失败', err)
    return ctx.app.emit('error', userLoginError, ctx)
  }
  if (!bcrypt.compareSync(password, res[0][0].password)) return ctx.app.emit('error', userPasswordError, ctx) // 判断密码是否正确
  // if (!bcrypt.compareSync(password, res.password)) return ctx.body = userPasswordError // 判断密码是否正确
  if (res[0][0].status === 1) return ctx.app.emit('error', userStatusError, ctx)
  ctx.userinfo = res[0][0] // 如果都能成功 进入next之前 把用户信息挂在ctx上
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
    const res = await getDataInfo2(tablename, { username })
    if (res[0].length) return ctx.app.emit('error', userAlreadyExited, ctx)
  } catch (err) {
    console.error('查询用户信息失败', err)
    return ctx.app.emit('error', userRegisterError, ctx)
  }
  await next()
}


const pwdValidator = async (ctx, next) => { // 修改密码的表单验证
  const vali = [{ oldPwd: ['string'] }, { password: ['string'] }], vv = await validator(ctx, vali)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

const verifyOldNewPwd = async (ctx, next) => { // 验证密码 old ！= new
  const { oldPwd, password } = ctx.request.body
  let res
  try {
    res = await getDataInfo2(tablename, { username: ctx.auth.username }) // 查询当前登陆的用户 有的话就判断密码 没有就报错
    if (res[0].length !== 1) return ctx.app.emit('error', userNotError, ctx)
  } catch (err) {
    console.error('查询用户失败', err)
    return ctx.app.emit('error', userChangePwdError, ctx)
  }
  if (!bcrypt.compareSync(oldPwd, res[0][0].password)) return ctx.app.emit('error', changePwdError, ctx)
  if (bcrypt.compareSync(password, res[0][0].password)) return ctx.app.emit('error', equalPwdError, ctx)
  await next()
}

const verifyResetPwd = async (ctx, next) => { // 重置密码验证
  const vali = [{ id: ['number'] }], vv = await validator(ctx, vali)
  if (vv) return ctx.app.emit('error', vv, ctx)
  ctx.request.body.password = DEFAULT_PASSWORD // 默认密码
  await next()
}






module.exports = {
  userValidator, verifyUser, verifyLogin, userinfoDBSQL, verifyOldNewPwd,
  verifyResetPwd, pwdValidator,
}
