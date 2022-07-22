const User = require('../modal/user.modal')
const db = require('../db/db')

// 用户相关的数据库操作
class UserService {
  async createUser(username, password) { // 注册用户
    const res = await User.create({ username, password }) // User.create是sequelize的快捷INSERT方法
    // console.log(res);
    /**
     * 返回的数据格式 对象内第一条为dataValues的对象 当前插入的用户数据
     * 其他的数据不考虑
    */
    return res.dataValues
  }

  async getUserInfo({ id, username, password, role }) { // 查询用户详情
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    username && Object.assign(whereOpt, { username })
    password && Object.assign(whereOpt, { password })
    role && Object.assign(whereOpt, { role })
    const res = await User.findOne({
      attributes: ['id', 'username', 'password', 'role'], // 特定的属性 传入数组 内的对象为最后查询后返回的字段
      where: whereOpt // 查询的参数
    })
    return res ? res.dataValues : null
  }

  async updateById({ id, username, password, role }) { // 修改用户信息
    const where = { id }
    const newUser = {}
    username && Object.assign(newUser, { username })
    password && Object.assign(newUser, { password })
    role && Object.assign(newUser, { role })

    const res = await User.update(newUser, { where })
    // console.log(res) // [ 1 ] || [ 0 ]
    return [false, true][res[0]]
  }

  async userinfo(username) { // 用db sql的方式获取用户详情 - 没有意义 直接拿数据的 只为测试db+sql
    const sql = 'select * from koa_users where username = ?'
    const [res] = await db.query(sql, username) // 取返回对象的第一位 返回数据是一个大数组 第一位数组是res 第二位不知道
    // const { password, ...data } = res[0] // 剔除密码
    // return res ? data : void 0
    return res.length > 0 ? res[0] : void 0
  }

}

module.exports = new UserService()