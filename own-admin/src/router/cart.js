const Router = require('koa-router')
const router = new Router()
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { addCartGood } = require('../middleware/cart.middleware')
const { addCartGoods, removeCartGood, goodsSelectAll, removeCartGoods, getCartGoodsList, } = require('../controller/cart.controller')

// 购物车相关的路由接口

// 添加减少商品至购物车
router.post('/add', auth, addCartGood, addCartGoods)
// 购物车内移除商品
router.delete('/good/:id', auth, removeCartGood)
// 商品全选与全不选
router.put('/selectall/:selected', auth, goodsSelectAll)
// 清空购物车
router.delete('/remove', auth, removeCartGoods)
// 获取商品列表
router.get('/goods', auth, getCartGoodsList)

module.exports = router