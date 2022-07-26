const db = require('../db/db')

// 查询每日精选的图片 picture表上传人userid关联users表的id
const getTodaySelect = async (tablename, jointable, sort) => {
  let sql = `select a.*,b.openid user_openid,b.nickName user_nickName,b.gender user_gender,b.status user_status,b.city,
    b.province from ${tablename} a inner join ${jointable} b on a.userid = b.id where a.status = 0 order by ${sort} desc limit 1`
  return await db.query(sql)
}

/**
 * 查询当前最新的5张轮播图
 * @param limit 展示的张数
 * @param tag 图片库内状态 目前9为轮播图
*/
const getNewestSwiper = async (tablename, limit, tag = 9) => {
  let sql = `SELECT id,url,userid,tag,star FROM ${tablename} where tag = ${tag} ORDER BY update_time DESC limit ${limit}`
  return await db.query(sql)
}

/**
 * 查询star图片最高的用户信息
*/
const getStarUserinfo = async _ => {
  let sql = `SELECT a.star, b.* FROM angell_picture a INNER JOIN angell_users b on a.userid = b.id where b.status = 0 ORDER BY a.star desc limit 1`
  return db.query(sql)
}

module.exports = {
  getTodaySelect, getNewestSwiper, getStarUserinfo,
}
