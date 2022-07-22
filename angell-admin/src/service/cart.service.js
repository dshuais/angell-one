const db = require('../db/db')

// 获取购物车内商品
const getCartGoods = async (tablename, tablename2, id, name, size, num) => {
  let sql = `select a.*,goods_name,goods_price,goods_img from ${tablename} a inner join ${tablename2} b on a.goods_id = b.id where user_id = ${id}`
  name ? sql += ` and goods_name like '%${name}%'` : void 0
  size && num ? sql += ` limit ${size} offset ${num}` : void 0
  return await db.query(sql)
}
// 获取购物车内商品总数 条件 同上
const getCartGoodsTotal = async (tablename, tablename2, id, name) => {
  let sql = `select count(*) as total from ${tablename} a inner join ${tablename2} b on a.goods_id = b.id where user_id = ${id}`
  name ? sql += ` and goods_name like '%${name}%'` : void 0
  return await db.query(sql)
}


module.exports = {
  getCartGoods, getCartGoodsTotal
}