const { createOrderError, getOrderListError, removeOrderError, getOrderError, updateOrderStaError, publicQueryError, } = require('../constants/err.type'),
  { addData, getDataInfo, getLikeDataList, manyQueryTotal, getDataInfo2, removeData2, updateData, } = require('../service/public.service'),
  { getCartList, getCartsInfo, } = require('../service/order.service'),
  myFixed = require('../constants/countmonry')


const tablename = 'koa_order'
class OrderController {
  async createOrder(ctx) { // 生成订单
    const { id: user_id } = ctx.auth, order_id = 'DS' + user_id + Date.now(),
      { cart_info, address_id } = ctx.request.body
    let total = 0
    try {
      const carts = await getCartList(user_id, cart_info.split(','))
      carts[0].forEach(cart => {
        total += cart.number * cart.goods_price
      })
      total = myFixed(total, 2) * 1
      const res = await addData(tablename, { user_id, order_id, address_id, cart_info, total })
      if (res[0].affectedRows == 1)
        ctx.body = { code: 200, msg: '订单生成成功' }
    } catch (err) {
      console.error('订单生成失败', err)
      ctx.app.emit('error', createOrderError, ctx)
    }
  }

  async getOrderList(ctx) { // 查询订单列表 可以通过order_id模糊查询
    const { id } = ctx.auth
    try {
      const res = await getLikeDataList(tablename, ctx.request.query, `user_id=${id}`)
      for (let i = 0; i < res[0].length; i++) {
        const goods = await getCartsInfo(id, res[0][i].cart_info.split(','))
        res[0][i].cart_info = goods[0]
      }
      const total = await manyQueryTotal(tablename, ctx.request.query, `user_id=${id}`)
      ctx.body = { code: 200, msg: '查询订单列表成功', data: res[0], ...total[0][0] }
    } catch (err) {
      console.error('查询订单列表失败', err)
      ctx.app.emit('error', getOrderListError, ctx)
    }
  }

  async removeOrder(ctx) { // 删除订单
    const { id: user_id } = ctx.auth, { id } = ctx.request.params
    try {
      const order = await getDataInfo2(tablename, { user_id, id })
      if (order[0].length !== 1) return ctx.app.emit('error', getOrderError, ctx)
      const res = await removeData2(tablename, { user_id, id })
      if (res[0].affectedRows == 1)
        ctx.body = { code: 200, msg: '删除订单成功' }
    } catch (err) {
      console.error('删除订单失败', err)
      ctx.app.emit('error', removeOrderError, ctx)
    }
  }

  async updateOrderStatus(ctx) { // 修改订单状态
    const { id: user_id } = ctx.auth, { status } = ctx.request.body, { id } = ctx.request.params
    if (status < 0) return ctx.app.emit('error', publicQueryError, ctx)
    try {
      const orders = await getDataInfo2(tablename, { user_id, id })
      if (orders[0].length !== 1) return ctx.app.emit('error', getOrderError, ctx)
      const res = await updateData(tablename, { status }, `id=${id}`, false)
      if (res[0].affectedRows == 1)
        ctx.body = { code: 200, msg: '修改订单状态成功' }
    } catch (err) {
      console.error('修改订单状态失败', err)
      ctx.app.emit('error', updateOrderStaError, ctx)
    }
  }


}

module.exports = new OrderController()