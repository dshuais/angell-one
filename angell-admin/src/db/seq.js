const { Sequelize } = require('sequelize')
const { MYSQL_HOST, MYSQL_PROT, MYSQL_USER, MYSQL_PWD, MYSQL_DB, MYSQL_TYPE } = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  port: MYSQL_PROT,
  dialect: MYSQL_TYPE,
  timezone: '+08:00' // 设置时间为北京东八区时间 在数据库自动维护的创建和更新时间内使用
})


// seq.authenticate() // 测试是否连接成功
//   .then(_ => {
//     console.log('成功');
//   })
//   .catch(err => {
//     console.log('失败', err);
//   })

module.exports = seq