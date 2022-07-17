const db = require('../db/db')
const Goods = require('../modal/goods.modal')

/**
 * 商品相关的数据库操作
*/
class GoodsService {
  async createGood(goods) { // 添加商品
    // const res = await Goods.create(goods)
    // return res.dataValues
    const sql = 'insert into koa_goods set ?'
    return await db.query(sql, goods)
  }


}

module.exports = new GoodsService()
