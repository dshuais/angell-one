const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

/**
 * 创建goods表的实例
*/
const Goods = seq.define('koa_goods', {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名称'
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2), // 金额
    allowNull: false,
    comment: '商品价格'
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品数量'
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片'
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: '状态(0上架1下架)'
  }
}, {
  tableName: 'koa_goods',
  timestamps: false
})



module.exports = Goods