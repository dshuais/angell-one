const { addAddressError, removeAddressError, getAddressinfoError, updateAddressError, defaultAddressError,
  getAddressListError, } = require('../constants/err.type')
const { addData, getDataInfo2, removeData, updateData, getLikeDataList, manyQueryTotal, } = require('../service/public.service')

const tablename = 'koa_address'
class AddRess {
  async addAddRess(ctx) { // 添加地址
    const { id: user_id } = ctx.auth, data = Object.assign({}, { user_id }, ctx.request.body)
    try {
      const res = await addData(tablename, data)
      if (res[0].affectedRows == 1)
        ctx.body = { code: 200, msg: '添加收货地址成功' }
    } catch (err) {
      console.error('添加收货地址失败', err)
      ctx.app.emit('error', addAddressError, ctx)
    }
  }

  async removeAddress(ctx) { // 删除收货地址
    const { id: user_id } = ctx.auth, id = ctx.request.params.id, data = { user_id, id }
    try {
      const address = await getDataInfo2(tablename, data)
      if (address[0].length !== 1) return ctx.app.emit('error', getAddressinfoError, ctx)
      const res = await removeData(tablename, `id=${address[0][0].id}`)
      if (res[0].affectedRows == 1)
        ctx.body = { code: 200, msg: '删除收货地址成功' }
    } catch (err) {
      console.error('删除收货地址失败', err)
      ctx.app.emit('error', removeAddressError, ctx)
    }
  }

  async updateAddress(ctx) { // 修改收货地址
    const { id: user_id } = ctx.auth, id = ctx.request.params.id, data = { user_id, id }
    try {
      const address = await getDataInfo2(tablename, data)
      if (address[0].length !== 1) return ctx.app.emit('error', getAddressinfoError, ctx)
      const res = await updateData(tablename, ctx.request.body, `id=${id}`)
      if (res[0].affectedRows == 1)
        ctx.body = { code: 200, msg: '修改收货地址成功' }
    } catch (err) {
      console.error('修改收货地址失败', err)
      ctx.app.emit('error', updateAddressError, ctx)
    }
  }

  async defaultAddress(ctx) { // 设置收货地址默认 1不是默认 2默认
    const { id: user_id } = ctx.auth, id = ctx.request.params.id, { is_default } = ctx.request.body,
      isdefault = { is_default: 1 }, data = { user_id, id }, data2 = { is_default: 2, user_id }
    try {
      const address = await getDataInfo2(tablename, data)
      if (address[0].length !== 1) return ctx.app.emit('error', getAddressinfoError, ctx)
      const address2 = await getDataInfo2(tablename, data2)
      if (address2[0].length > 0) await updateData(tablename, isdefault, `id=${address2[0][0].id}`, false)
      const res = await updateData(tablename, { is_default }, `id=${id}`, false)
      if (res[0].affectedRows == 1)
        ctx.body = { code: 200, msg: '设置成功' }
    } catch (err) {
      console.error('设置默认收货地址失败', err)
      ctx.app.emit('error', defaultAddressError, ctx)
    }
  }

  async getAddress(ctx) { // 查询收货地址
    const { id: user_id } = ctx.auth
    try {
      const res = await getLikeDataList(tablename, ctx.request.query, `user_id=${user_id}`)
      const total = await manyQueryTotal(tablename, ctx.request.query, `user_id=${user_id}`)
      ctx.body = { code: 200, msg: '查询收货地址成功', data: res[0], ...total[0][0] }
    } catch (err) {
      console.error('查询收货地址失败', err)
      ctx.app.emit('error', getAddressListError, ctx)
    }
  }

}

module.exports = new AddRess()