const jwt = require('jsonwebtoken')
const { createUser, getUserInfo, userinfo, updateById, userMenuList, } = require('../service/user.service')
const { userRegisterError, userLoginError, userGetUserInfoError, userNotError, userChangePwdError,
  userUpdateError, getUserListError, getMenuListError, } = require('../constants/err.type')
// const { TOKEN_SECRETKEY } = require('../config/config.default')
const { TOKEN_SECRETKEY } = process.env,
  { getDataInfo2, addData, updateData, getDataInfo3, getLikeDataList, manyQueryTotal, } = require('../service/public.service'),
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
    const { id, openid } = ctx.auth
    try {
      const res = await getDataInfo2(tablename, { id, openid })
      if (!res || res[0].length <= 0) return ctx.app.emit('error', userNotError, ctx)
      const { password, ...data } = res[0][0] // 剔除密码
      ctx.body = { code: 200, msg: '获取用户信息成功', data }
    } catch (err) {
      console.error('获取用户信息失败', err)
      ctx.app.emit('error', userGetUserInfoError, ctx)
    }
  }

  /**
   * 修改用户信息接口
   * 可分为修改头像、修改用户信息、修改用户状态接口使用
  */
  async updateUserInfo(ctx) {
    // 剔除密码、openid、role、id。因为使用set更新 以防前端误修改数据
    const { password, openid, role, id, ...data } = ctx.request.body // status也可以更改 管理员改 在前端处理吧
    for (let d in data) {
      if (!data[d] && data[d] != 0) delete data[d]
    }
    try {
      const res = await updateData(tablename, data, `id=${id}`)
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

        const [[info]] = await getDataInfo3(tablename, { openid: userinfo.openid })
        const [res2] = await addData('angell_user_role', { id: info.id, rid: 2 })
        console.log('添加的用户权限', res2)

        userinfo = info
        const { id, openid, username, status, role } = userinfo
        tokeninfo = { id, openid, username, status, role }
      }
      const token = jwt.sign(tokeninfo, TOKEN_SECRETKEY, { expiresIn: '7d' }), // 生成token
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

  async getTokenStatus(ctx) { // 用于判断当前用户的token是否有效 有效并更新用户信息
    try {
      const res = await getDataInfo3(tablename, { openid: ctx.auth.openid })
      if (!res[0].length) return ctx.app.emit('error', userNotError, ctx)
      const { password, ...data } = res[0][0], { id, openid, username, status, role } = data,
        token = jwt.sign({ id, openid, username, status, role }, TOKEN_SECRETKEY, { expiresIn: '7d' })
      ctx.body = { code: 200, msg: 'token有效', data, token }
    } catch (err) {
      console.error('更新用户信息失败', err)
      ctx.app.emit('error', tokenOverError, ctx)
    }
  }

  async getUserList(ctx) { // 查询用户列表
    const { status, gender, ...data } = ctx.request.query
    let where = ''
    try {
      if (status) where += `status=${status},`
      if (gender) where += `gender=${gender},`
      const res = await getLikeDataList(tablename, data, where.slice(0, -1), ''),
        [[{ total }]] = await manyQueryTotal(tablename, data, where.slice(0, -1))
      ctx.body = { code: 200, msg: '查询成功', data: res[0], total }
    } catch (err) {
      console.error('查询用户列表失败', err)
      ctx.app.emit('error', getUserListError, ctx)
    }
  }


  async getUserMenuList(ctx) { // 查询用户的路由权限
    try {
      const [data] = await userMenuList(ctx.auth.id)
      ctx.body = { code: 200, msg: '查询成功', data }
    } catch (err) {
      console.error('获取权限路由失败', err)
      ctx.app.emit('error', getMenuListError, ctx)
    }
  }

}

module.exports = new userController()
