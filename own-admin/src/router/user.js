const Router = require('koa-router')
const router = new Router() // new Router({prefix: '/user'}) 也可以在这里添加请求头
const { register, login, userinfo, changePwd, resetPassword, getUserInfo, } = require('../controller/user.controller')
const { userValidator, verifyUser, bcryptPassword, verifyLogin, userinfoDBSQL, verifyOldNewPwd,
  verifyResetPwd, } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')

// 注册
router.post('/register', userValidator, verifyUser, bcryptPassword, register)
// 登陆
router.post('/login', userValidator, verifyLogin, login)
// 获取用户信息
router.get('/info', auth, getUserInfo)
// 修改密码
router.patch('/changepwd', auth, verifyOldNewPwd, bcryptPassword, changePwd)
// 重置密码
router.post('/resetpwd', auth, verifyResetPwd, bcryptPassword, resetPassword)
// 获取用户信息 db+sql
router.post('/userinfo', userinfoDBSQL, userinfo)


module.exports = router
