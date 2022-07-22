const bcrypt = require('bcryptjs'), { validator } = require('../constants/validator')
const { getUserInfo, userinfo, updateById, } = require('../service/user.service'),
  { getDataInfo2, getDataInfo3 } = require('../service/public.service')
const { userFormateError, userAlreadyExited, userRegisterError,
  userNotError, userLoginError, userPasswordError, userGetUserNameError, userOldNewPwdError, changePwdError,
  userChangePwdError, userAuthError, userStatusError, equalPwdError, captchaError, userLoginCodeError,
} = require('../constants/err.type')
const { DEFAULT_PASSWORD } = process.env, { http } = require('../constants/utils'),
  { wx } = require('../config/config'), WXBizDataCrypt = require('../config/WXBizDataCrypt')

const tablename = 'angell_users'

// user 用户接口使用的中间件验证
const userValidator = async (ctx, next) => { // 验证用户输入用户名和密码
  // const { username, password } = ctx.request.body
  // if (!username || !password) {
  //   console.error('用户名或密码为空', ctx.request.body) // 错误日志
  //   ctx.app.emit('error', userFormateError, ctx)
  //   return
  // }
  const vali = [{ username: ['string'] }, { password: ['string'] }, { captcha: ['string'] }], vv = await validator(ctx, vali)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

const verifyLogin = async (ctx, next) => { // 用户登陆的验证中间件
  const { username, password, captcha } = ctx.request.body
  if (captcha != ctx.session.captcha) return ctx.app.emit('error', captchaError, ctx)
  let res
  try {
    res = await getDataInfo2(tablename, { username }, 'id,openid,username,status,role,password') // 查询当前登陆的用户 有的话就判断密码 没有就报错
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

const wxloginValidator = async (ctx, next) => { // 微信登陆字段验证
  const vali = [{ code: ['string'] }, { iv: ['string'] }, { encryptedData: ['string'] }], vv = await validator(ctx, vali)
  if (vv) return ctx.app.emit('error', vv, ctx)
  await next()
}

const wxSessionKey = async (ctx, next) => { // 微信登陆 解析用户session_key和openid的中间件
  const { code } = ctx.request.body
  try {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wx.APP_ID}&secret=${wx.APP_SECRET}&js_code=${code}&grant_type=authorization_code`
    const { session_key, openid } = await http.request(url, 'get', {})
    if (!session_key || !openid) return ctx.app.emit('error', userLoginCodeError, ctx)
    ctx.request.key = { session_key, openid } // 把session和openid放在中间件key上 下一个中间件使用
  } catch (err) {
    console.error('解析失败', err)
    return ctx.app.emit('error', userLoginError, ctx)
  }
  await next()
}

const wxGetuserinfo = async (ctx, next) => { // 通过openid查询表中是否有该用户
  const { session_key, openid } = ctx.request.key, { iv, encryptedData } = ctx.request.body
  try {
    const user = await getDataInfo3(tablename, { openid })
    if (user[0].length) {
      ctx.request.body.isLogin = true
      ctx.request.body.userinfo = user[0][0]
    } else {
      const pc = new WXBizDataCrypt(wx.APP_ID, session_key),
        data = pc.decryptData(encryptedData, iv)
      data.avatar = data.avatarUrl
      data.openid = openid
      const { watermark, language, avatarUrl, ...info } = data
      ctx.request.body.userinfo = info
    }
    ctx.request.body.password = DEFAULT_PASSWORD // 默认密码(不管有没有该用户 都加上 以防报错)
  } catch (err) {
    console.error('通过openid查用户失败', err)
    return ctx.app.emit('error', userLoginError, ctx)
  }
  await next()
}




module.exports = {
  userValidator, verifyUser, verifyLogin, userinfoDBSQL, verifyOldNewPwd,
  verifyResetPwd, pwdValidator, wxloginValidator, wxSessionKey, wxGetuserinfo,
}
