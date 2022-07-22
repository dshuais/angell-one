const { addCartGoodError, getGoodError, addCartGoodNumError, removeCartGoodError, publicHandleError,
  getCartGoodsError, updateCartGoodsError, removeCartsError, getCartsGoodsError, } = require('../constants/err.type')
const { getDataInfo, getDataInfo2, addData, updateData, removeData, removeData2, } = require('../service/public.service')
const { getCartGoods, getCartGoodsTotal, } = require('../service/cart.service')

// 购物车相关的接口方法
const tablename = 'koa_cart'

class CartController {

  async addCartGoods(ctx) { // 加入购物车 num正数为加加 负数为减减
    const { id: user_id } = ctx.auth
    const { number: nn, goods_id } = ctx.request.body
    try {
      const good = await getDataInfo('koa_goods', `id=${goods_id}`)
      if (good[0].length <= 0) return ctx.app.emit('error', getGoodError, ctx)
      const info = await getDataInfo2(tablename, { goods_id, user_id })
      if (info[0].length <= 0 && nn <= 0) return ctx.app.emit('error', addCartGoodNumError, ctx)
      // const user = await getDataInfo('koa_users', `id=${user_id}`)
      // if (user[0].length <= 0) return ctx.app.emit('error', userNotError, ctx)
      let res
      if (info[0].length === 0) {
        res = await addData(tablename, Object.assign(ctx.request.body, { user_id }))
      } else {
        const { id, number: n } = info[0][0]
        const number = nn + n
        if (number < 1) return ctx.app.emit('error', addCartGoodNumError, ctx)
        res = await updateData(tablename, { number }, `id=${id}`, false)
      }
      if (res[0].affectedRows === 1) ctx.body = { code: 200, msg: '加入购物车成功' }
    } catch (err) {
      console.error('加入购物车失败', err)
      ctx.app.emit('error', addCartGoodError, ctx)
    }
  }

  async removeCartGood(ctx) { // 移出购物车 可单删和多删 多删传参方式a,b,c字符串数组
    const { id: goods_id } = ctx.request.params, { id: user_id } = ctx.auth,
      goodlist = goods_id.split(',')
    let where = `user_id=${user_id},`, where2 = '', idlist = ''
    goodlist.forEach(good => {
      where2 += `goods_id=${good} or `
    })
    where2 = where2.slice(0, where2.lastIndexOf(' or '))
    where += `(${where2})`
    try {
      const info = await getDataInfo(tablename, where), ids = info[0].map(({ id }) => id)
      if (info[0].length <= 0) return ctx.app.emit('error', getGoodError, ctx)
      ids.forEach(id => {
        idlist += `id=${id} or `
      })
      await removeData(tablename, idlist.slice(0, idlist.lastIndexOf(' or ')))
      ctx.body = { code: 200, msg: '移出购物车成功' }
    } catch (err) {
      console.error('移出购物车失败', err)
      ctx.app.emit('error', removeCartGoodError, ctx)
    }
  }

  async goodsSelectAll(ctx) { // 购物车全选 取消全选
    const { id: user_id } = ctx.auth
    const { selected } = ctx.request.params
    if (selected > 1 || selected < 0) return ctx.app.emit('error', updateCartGoodsError, ctx)
    try {
      const goods = await getDataInfo2(tablename, { user_id })
      if (goods[0].length <= 0) return ctx.app.emit('error', getCartGoodsError, ctx)
      await updateData(tablename, ctx.request.params, `user_id=${user_id}`, false)
      ctx.body = { code: 200, msg: '操作成功' }
    } catch (err) {
      console.error('全选and不选购物车失败', err)
      ctx.app.emit('error', publicHandleError, ctx)
    }
  }

  async removeCartGoods(ctx) { // 清空购物车
    const { id: user_id } = ctx.auth
    try {
      const goods = await getDataInfo2(tablename, { user_id })
      if (goods[0].length <= 0) return ctx.app.emit('error', getCartGoodsError, ctx)
      await removeData2(tablename, { user_id })
      ctx.body = { code: 200, msg: '购物车清除成功' }
    } catch (err) {
      console.error('清空购物车失败', err)
      ctx.app.emit('error', removeCartsError, ctx)
    }
  }

  async getCartGoodsList(ctx) { // 查询购物车列表
    const { id } = ctx.auth, { pageNum, pageSize, goods_name } = ctx.request.query, num = (pageNum - 1) * pageSize || void 0
    try {
      const res = await getCartGoods(tablename, 'koa_goods', id, goods_name, pageSize, num),
        total = await getCartGoodsTotal(tablename, 'koa_goods', id, goods_name)
      ctx.body = { code: 200, msg: '查询购物车列表成功', data: res[0], ...total[0][0] }
    } catch (err) {
      console.error('查询购物车失败')
      ctx.app.emit('error', getCartsGoodsError, ctx)
    }
  }

}


module.exports = new CartController()