const mysql = require('mysql2')
const { MYSQL_HOST, MYSQL_PROT, MYSQL_USER, MYSQL_PWD, MYSQL_DB, MYSQL_TYPE } = process.env

const db = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PROT,
  user: MYSQL_USER,
  password: MYSQL_PWD,
  database: MYSQL_DB,
  waitForConnections: true, // 等待连接
  connectionLimit: 10, // 连接限制
  queueLimit: 0, // 队列限制
  timezone: "+08:00", // 设置时间为北京东八区时间 在数据库自动维护的创建和更新时间内使用
  dateStrings: true // 强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回
}).promise()
// const promisedb = db.promise()

module.exports = db
