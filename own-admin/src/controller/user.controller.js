const jwt = require('jsonwebtoken')
const { createUser, getUserInfo, userinfo, updateById } = require('../service/user.service')
const { userRegisterError, userLoginError, userGetUserInfoError, userNotError, userChangePwdError, } = require('../constants/err.type')
// const { TOKEN_SECRETKEY } = require('../config/config.default')
const { TOKEN_SECRETKEY } = process.env,
  { getDataInfo } = require('../service/public.service')

// 处理路由接口的方法
class userController {
  async register(ctx) { // 新用户注册
    // console.log(ctx.request.body);
    const { username, password } = ctx.request.body
    try {
      const { id, username: name } = await createUser(username, password)
      ctx.body = {
        code: 200, msg: '注册成功',
        data: { id, name }
      }
    } catch (err) {
      console.error('数据库插入用户失败', err)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx) { // 用户登录
    // const { username } = ctx.request.body
    try {
      // const { password, ...res } = await getUserInfo({ username })
      const { password, ...res } = ctx.userinfo
      const token = jwt.sign(res, TOKEN_SECRETKEY, { expiresIn: '10h' }) // 生成token
      ctx.body = { code: 200, msg: '登陆成功', token }
    } catch (err) {
      console.error('用户登录失败', err)
      ctx.app.emit('error', userLoginError, ctx)
    }
  }

  async changePwd(ctx) { // 修改密码
    const { password } = ctx.request.body
    try {
      const res = await updateById({ id: ctx.auth.id, password })
      if (res) return ctx.body = { code: 200, msg: '修改成功' }
    } catch (err) {
      console.error('修改密码失败', err)
      ctx.app.emit('error', userChangePwdError, ctx)
    }
  }

  async resetPassword(ctx) { // 重置密码
    const { id, password } = ctx.request.body
    try {
      const res = await updateById({ id, password })
      if (res) return ctx.body = { code: 200, msg: '重置成功' }
    } catch (err) {
      console.error('重置密码失败', err)
      ctx.app.emit('error', userChangePwdError, ctx)
    }
  }

  async userinfo(ctx) { // 用db sql的方式获取用户详情 - 没有意义 直接拿数据的 只为测试db+sql
    try {
      const res = await userinfo(ctx.request.body.username)
      if (!res) return ctx.app.emit('error', userNotError, ctx)
      const { password, ...data } = res // 剔除密码
      ctx.body = { code: 200, msg: '获取成功', data }
    } catch (err) {
      console.error('获取失败', err)
      ctx.app.emit('error', userGetUserInfoError, ctx)
    }
  }

  async getUserInfo(ctx) { // 获取用户信息
    const { id, username } = ctx.auth
    try {
      const res = await getDataInfo('koa_users', `id=${id},username='${username}'`)
      if (!res || res[0].length <= 0) return ctx.app.emit('error', userNotError, ctx)
      const { password, ...data } = res[0][0] // 剔除密码
      ctx.body = { code: 200, msg: '获取用户信息成功', data }
    } catch (err) {
      console.error('获取用户信息失败', err)
      ctx.app.emit('error', userGetUserInfoError, ctx)
    }
  }
}

module.exports = new userController()
