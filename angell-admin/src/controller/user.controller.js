const jwt = require('jsonwebtoken')
const { createUser, getUserInfo, userinfo, updateById } = require('../service/user.service')
const { userRegisterError, userLoginError, userGetUserInfoError, userNotError, userChangePwdError,
  userUpdateError, } = require('../constants/err.type')
// const { TOKEN_SECRETKEY } = require('../config/config.default')
const { TOKEN_SECRETKEY } = process.env,
  { getDataInfo2, addData, updateData, getDataInfo3 } = require('../service/public.service'),
  { pinyin } = require('pinyin-pro')



const tablename = 'angell_users'

// 处理路由接口的方法
class userController {
  async register(ctx) { // 新用户注册
    // console.log(ctx.request.body);
    // const { username, password } = ctx.request.body
    try {
      const res = await addData(tablename, ctx.request.body)
      if (res[0].affectedRows === 1) ctx.body = { code: 200, msg: '注册成功' }
    } catch (err) {
      console.error('注册用户失败', err)
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
      const res = await updateData(tablename, { password }, `id=${ctx.auth.id}`)
      if (res) return ctx.body = { code: 200, msg: '修改成功' }
    } catch (err) {
      console.error('修改密码失败', err)
      ctx.app.emit('error', userChangePwdError, ctx)
    }
  }

  async resetPassword(ctx) { // 重置密码
    const { id, password } = ctx.request.body
    try {
      const res = await updateData(tablename, { password }, `id=${id}`)
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
      const res = await getDataInfo2(tablename, { id, username })
      if (!res || res[0].length <= 0) return ctx.app.emit('error', userNotError, ctx)
      const { password, ...data } = res[0][0] // 剔除密码
      ctx.body = { code: 200, msg: '获取用户信息成功', data }
    } catch (err) {
      console.error('获取用户信息失败', err)
      ctx.app.emit('error', userGetUserInfoError, ctx)
    }
  }

  async updateUserInfo(ctx) { // 修改用户信息
    // console.log(ctx.request.body, ctx.auth)
    const { status, role, ...data } = ctx.request.body
    for (let d in data) {
      if (!data[d]) delete data[d]
    }
    try {
      const res = await updateData(tablename, data, `id=${ctx.auth.id}`)
      if (res[0].affectedRows === 1) return ctx.body = { code: 200, msg: '更新成功' }
    } catch (err) {
      console.error('修改用户信息失败', err)
      if (err.message.includes('Duplicate entry'))
        return ctx.app.emit('error', { code: 400, msg: `${err.message.split("'").at(-2)}不可重复` }, ctx)
      ctx.app.emit('error', userUpdateError, ctx)
    }
  }


  // 微信登陆
  async wxLogin(ctx) {
    const { password, isLogin } = ctx.request.body
    let { userinfo } = ctx.request.body
    try {
      let tokeninfo = {}
      if (isLogin) {
        const { id, openid, username, status, role } = userinfo
        tokeninfo = { id, openid, username, status, role }
      } else {
        let nick = userinfo.nickName, reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/g, flag = reg.test(nick)
        if (!flag) nick = 'angellone'
        else nick = nick.slice(0, 2)
        const name = pinyin(nick, { toneType: 'none', v: true }).replace(/\s+/g, '') + (Date.now() + '').slice(-5),
          res = await addData(tablename, { ...userinfo, username: name, password })
        if (res[0].affectedRows != 1) return ctx.app.emit('error', userLoginError, ctx)
        const info = await getDataInfo3(tablename, { openid: userinfo.openid })
        userinfo = info[0][0]
        const { id, openid, username, status, role } = userinfo
        tokeninfo = { id, openid, username, status, role }
      }
      const token = jwt.sign(tokeninfo, TOKEN_SECRETKEY, { expiresIn: '10h' }), // 生成token
        { password: a, ...data } = userinfo // 去除密码
      ctx.body = { code: 200, msg: '登陆成功', data, token }
    } catch (err) {
      console.error('创建用户失败', err)
      ctx.app.emit('error', userLoginError, ctx)
    }
  }

  async updateAvatar(ctx) { // 修改用户头像
    ctx.body = { code: 200, msg: '修改成功' }
  }

}

module.exports = new userController()
