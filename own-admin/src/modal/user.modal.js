const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

/**
 * 创建users表的实例 可直接对他进行操作
 * 
*/

// define内的第一个参数为自动创建的表名 自动加s 现在为user 会自动创建users的表
const User = seq.define('koa_users', {
  // 在这里定义模型属性 就是表内的字段 不用写id 会自动维护id
  username: {
    type: DataTypes.STRING, // string = VARCHAR(255)
    allowNull: false, // 是否可以为空
    unique: true, // 是否唯一
    comment: '用户名,唯一' // 字段注释
  },
  password: {
    type: DataTypes.CHAR(64), // 长度64位 用来定义密码
    allowNull: false,
    comment: '密码'
  },
  status: {
    type: DataTypes.BOOLEAN, // TINYINT(1)
    allowNull: false,
    defaultValue: 0,
    comment: '帐号状态0正常1禁用'
  },
  role: {
    type: DataTypes.STRING,
    // allowNull: true, // m默认就为true
    comment: '账号身份 管理员为admin'
  }
}, {
  tableName: 'koa_users', // 这个属性设置 创建的表不会自动加s 按照用户写的名字来创建
  // timestamps: false // 创建表时自动添加createAt和updateAt 可以通过这个来禁用(创建和更新时间)
})

// 同步数据库
// User.sync() // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) // 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) // 这将检查数据库中表的当前状态(字段和数据类型),然后在表中进行必要的更改以使其与模型匹配

module.exports = User
