const db = require('../db/db')

const getCartList = async (userid, ids) => { // 查询将要生成订单的购物车列表 联表查金额
  let sql = `select a.*, b.goods_price from koa_cart a inner join koa_goods b on a.goods_id = b.id where a.user_id = ${userid}`, where = ''
  ids && ids.forEach(id => {
    where += ` a.id=${id} or`
  })
  sql += ` and (${where.slice(0, where.lastIndexOf(' or'))})`
  return await db.query(sql)
}

const getCartsInfo = async (userid, ids) => { // 查询用户订单内的对应购物车里面的对应的商品
  let sql = `select b.*, a.number from koa_cart a inner join koa_goods b on a.goods_id = b.id where a.user_id = ${userid}`, where = ''
  ids && ids.forEach(id => {
    where += ` a.id=${id} or`
  })
  sql += ` and (${where.slice(0, where.lastIndexOf(' or'))})`
  return await db.query(sql)
}


module.exports = {
  getCartList, getCartsInfo,
}