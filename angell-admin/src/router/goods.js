const Router = require('koa-router')
const { addGoodCon, getGoodsList, putGood, removeGood, putGoodStatus } = require('../controller/goods.controller')
const { addGoodValidator, updateGoodStatus, } = require('../middleware/goods.middleware')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const router = new Router()

// 商品相关模块路由
// 查询所有商品
router.get('/list', auth, hadAdminPermission, getGoodsList)
// 发布商品
router.post('/add', auth, hadAdminPermission, addGoodValidator, addGoodCon)
// 修改商品信息
router.put('/good/:id', auth, hadAdminPermission, addGoodValidator, putGood)
// 删除商品 - 真删除
router.delete('/good/:id', auth, hadAdminPermission, removeGood)
// 商品上架下架
router.put('/goodsta/:id', auth, hadAdminPermission, updateGoodStatus, putGoodStatus)

module.exports = router
