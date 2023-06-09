const Router = require('koa-router')
const router = new Router() // new Router({prefix: '/user'}) 也可以在这里添加请求头
const { register, login, userinfo, changePwd, resetPassword, getUserInfo, updateUserInfo, wxLogin,
  updateAvatar, getTokenStatus, getUserList, } = require('../controller/user.controller')
const { userValidator, verifyUser, verifyLogin, userinfoDBSQL, verifyOldNewPwd, pwdValidator,
  verifyResetPwd, wxloginValidator, wxSessionKey, wxGetuserinfo, } = require('../middleware/user.middleware'),
  { auth, hadAdminPermission } = require('../middleware/auth.middleware'),
  { bcryptPassword } = require('../middleware/bcrypt')

// 注册 -- 弃用 不在提供注册
router.post('/register', userValidator, verifyUser, bcryptPassword, register)
// 登陆
router.post('/login', userValidator, verifyLogin, login)
// 获取用户信息
router.get('/info', auth, getUserInfo)
// 修改密码
router.patch('/changepwd', auth, pwdValidator, verifyOldNewPwd, bcryptPassword, changePwd)
// 修改用户信息
router.put('/update', auth, updateUserInfo)
// 重置密码
router.post('/resetpwd', auth, hadAdminPermission, verifyResetPwd, bcryptPassword, resetPassword)


// 获取用户信息 db+sql -- 弃用 不用管
router.post('/userinfo', userinfoDBSQL, userinfo)


// 微信登陆
router.post('/wxlogin', wxloginValidator, wxSessionKey, wxGetuserinfo, bcryptPassword, wxLogin)
// 获取token状态
router.get('/status', auth, getTokenStatus)
// 修改头像
router.post('/avatar', updateAvatar)


// 获取用户列表
router.get('/userList', auth, hadAdminPermission, getUserList)


module.exports = router
