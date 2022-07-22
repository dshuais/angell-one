const Router = require('koa-router'), router = new Router(),
  { auth } = require('../middleware/auth.middleware'),
  { createOrderVali, updateOrderStaVali, } = require('../middleware/order.middleward'),
  { createOrder, getOrderList, removeOrder, updateOrderStatus, } = require('../controller/order.controller')

// 生成订单
router.post('/', auth, createOrderVali, createOrder)
// 查询订单列表
router.get('/', auth, getOrderList)
// 删除订单
router.delete('/:id', auth, removeOrder)
// 修改订单状态
router.patch('/:id', auth, updateOrderStaVali, updateOrderStatus)

module.exports = router