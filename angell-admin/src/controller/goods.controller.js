const { createGood, } = require('../service/goods.service')
const { createGoodError, getGoodsListError, getGoodError, removeGoodError, updateGoodError, } = require('../constants/err.type')

const { getDataList, getTotal, getDataLike, addData, removeData, updateData, getLikeDataList, manyQueryTotal, } = require('../service/public.service')

// 商品相关的路由的处理函数
class GoodsController {
  async addGoodCon(ctx) { // 添加商品
    try {
      const res = await addData('koa_goods', ctx.request.body)
      // const res = await createGood(ctx.request.body)
      if (res[0].affectedRows === 1) return ctx.body = { code: 200, msg: '新增商品成功' }
    } catch (err) {
      console.error('新增商品失败', err)
      return ctx.app.emit('error', createGoodError, ctx)
    }
  }

  async getGoodsList(ctx) { // 获取商品列表
    const { pageNum, pageSize } = ctx.request.query
    try {
      // const res = await getGoods()
      const table = 'koa_goods'
      // const a = await getLikeDataList(table, ctx.request.query)
      const a = await getLikeDataList(table, ctx.request.query)
      // console.log('模糊查询结果', a[0])
      const b = await manyQueryTotal(table, ctx.request.query)
      // console.log('模糊查询结果total', b[0][0])
      // const res = await getDataList(table, { pageNum, pageSize })
      // const total = await getTotal(table)
      ctx.body = { code: 200, msg: '请求成功', data: a[0], ...b[0][0] }
    } catch (err) {
      console.error('查询商品列表失败', err)
      return ctx.app.emit('error', getGoodsListError, ctx)
    }
  }

  async removeGood(ctx) { // 删除商品 -- 真删除
    const { id } = ctx.request.params
    try {
      const res = await removeData('koa_goods', `id=${id}`)
      if (!res) return ctx.app.emit('error', getGoodError, ctx)
      ctx.body = { code: 200, msg: '删除成功' }
    } catch (err) {
      console.log('失败了', err)
      ctx.app.emit('error', removeGoodError, ctx)
    }
  }

  async putGood(ctx) { // 修改商品
    const { id } = ctx.request.params
    try {
      const res = await updateData('koa_goods', ctx.request.body, `id=${id}`)
      if (!res) return ctx.app.emit('error', getGoodError, ctx)
      ctx.body = { code: 200, msg: '修改成功' }
    } catch (err) {
      console.log('失败了', err)
      ctx.app.emit('error', updateGoodError, ctx)
    }
  }

  async putGoodStatus(ctx) { // 修改商品状态 上架下架
    const { id } = ctx.request.params
    const { status } = ctx.request.body
    try {
      const res = await updateData('koa_goods', { status }, `id=${id}`, false)
      if (res[0].affectedRows == 1) ctx.body = { code: 200, msg: '修改成功' }
    } catch (err) {
      console.error('上下架失败', err)
      ctx.app.emit('error', updateGoodError, ctx)
    }
  }
}

module.exports = new GoodsController()