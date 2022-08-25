const Router = require('koa-router'), router = new Router()
const { auth } = require('../middleware/auth.middleware'),
  { getUserMenuList } = require('../controller/user.controller')

// 获取权限路由相关的接口
// 获取权限路由
router.get('/list', auth, getUserMenuList)

module.exports = router

