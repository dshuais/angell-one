const db = require('../db/db')

/**
 * 公共sql 增删改查 
 * 业务代码嵌套过深 请自写sql
 * 有另一种方式 requelize ORM模型操作数据库的方法 自行选择使用
*/

/**
 * 新增语句 新增数据
 * @param tablename 要新增数据的表名
 * @param data 要新增数据的数据 参数类型:  {a:1,b:2}
 * @param files 要新增数据的字段 默认为'' 使用插入整张表数据的set方法
 * 返回值：一个对象 对象的第一位的 res[0].affectedRows === 1 说明插入成功
*/
const addData = async (tablename, data, files = '') => {
  let sql = `insert into ${tablename}`, datalist = ''
  // for (let dd in data) {
  //   const dat = data[dd].constructor == Number ? data[dd] : `'${data[dd]}'`
  //   files ? datalist += dat + ',' : datalist += dd + '=' + dat + ','
  // }
  // files ? sql += ` (${files}) values (${datalist.slice(0, -1)})` : sql += ` set ${datalist.slice(0, -1)}`
  // console.log('拼接的sql语句', sql)

  // 以下代码实现这个sql files ? sql += ` (${files}) values (${datalist.slice(0, -1)})` : sql += ` set ?`
  if (files) {
    for (let dd in data) {
      const dat = data[dd].constructor == Number ? data[dd] : `'${data[dd]}'`
      datalist += dat + ','
    }
    sql += ` (${files}) values (${datalist.slice(0, -1)})`
    return await db.query(sql)
  } else {
    sql += ` set ?`
    return await db.query(sql, data)
  }
}



/**
 * 删除语句 删除数据
 * @param tablename 要删除数据的表名
 * @param where 删除条件
 * 返回值：getSuccess ? 一个对象 对象的第一位的 res[0].affectedRows === 1 说明删除成功 : undefined
*/
const removeData = async (tablename, where) => {
  // const res = await getDataInfo(tablename, where) // 在删除之前先查询一下是否有该数据
  // console.log('查询', res)
  // if (res[0].length <= 0) return void 0
  let sql = `delete from ${tablename}`, wherelist = '', where2 = where.split(',')
  where2.forEach(ww => {
    wherelist += ww + ' and '
  })
  sql += ` where ${wherelist.slice(0, wherelist.lastIndexOf(' and '))}`
  return await db.query(sql)
}
// where is object as {a:1,b:2}
const removeData2 = async (tablename, where) => {
  let sql = `delete from ${tablename}`, wherelist = ''
  for (let ww in where) {
    const dat = where[ww].constructor == Number ? where[ww] : `'${where[ww]}'`
    wherelist += ` ${ww} = ${dat} and`
  }
  sql += ` where${wherelist.slice(0, wherelist.lastIndexOf(' and'))}`
  return await db.query(sql)
}



/**
 * 修改语句 修改数据
 * @param tablename 修改的表名
 * @param data 将要修改的数据 data为对象{a:1,b:2}
 * @param where 查询的条件语句 - 这个修改条件 只能单一修改 批量修改请自写sql
 * @param all 表示是否为全部修改 是的话走上面 set方法 不是的话走下面拼接方法
*/
const updateData = async (tablename, data, where, all = true) => {
  // const res = await getDataInfo(tablename, where)
  // if (res[0].length <= 0) return void 0
  let sql = `update ${tablename} set`, datalist = ''
  if (all) {
    sql += ` ? where ${where}`
    return await db.query(sql, data)
  } else {
    for (let dd in data) {
      const dat = data[dd].constructor == Number ? data[dd] : `'${data[dd]}'`
      datalist += dd + '=' + dat + ','
    }
    sql += ` ${datalist.slice(0, -1)} where ${where}`
    return await db.query(sql)
  }
}



/**
 * 查询语句 查询某条数据详情 || 是否存在
 * @param tablename 表名
 * @param where 查询的条件语句
 * @param files 查询的字段
*/
const getDataInfo = async (tablename, where, files = '*') => {
  let sql = `select ${files} from ${tablename}`, whereList = ''
  if (where) {
    list = where.split(',')
    list.forEach(ii => {
      whereList += ` ${ii} and`
    })
  }
  where ? sql += ` where ${whereList.slice(0, whereList.lastIndexOf(' and'))}` : void 0
  return await db.query(sql)
}
// where 为对象{a:1,b:2} 便捷方法
const getDataInfo2 = async (tablename, where, files = '*') => {
  let sql = `select ${files} from ${tablename}`, whereList = ''
  if (where) {
    for (let ww in where) {
      whereList += ` ${ww} = '${where[ww]}' and`
    }
  }
  where ? sql += ` where ${whereList.slice(0, whereList.lastIndexOf(' and'))}` : void 0
  return await db.query(sql)
}


/**
 * 查询语句 查询数据列表 -- 不再维护
 * @param tablename 查询的表名
 * @param limit 分页的数据 对象 {pageNum, pageSize}
 * @param where 查询的条件语句 'a=1,b=2'
 * @param file 查询的字段 虽然limit有默认值 但是要传where时必传limit为{}
*/
const getDataList = async (tablename, limit = {}, where, file = '*') => {
  const { pageNum: num, pageSize: size } = limit
  let sql = `select ${file} from ${tablename}`, whereList = ''
  if (where) {
    list = where.split(',')
    list.forEach(ii => {
      whereList += ` ${ii} and`
    })
  }
  where ? sql += ` where${whereList.slice(0, whereList.lastIndexOf(' and'))}` : void 0
  sql += ' order by id asc'
  limit?.pageNum ? sql += ` limit ${size} offset ${(num - 1) * size}` : void 0
  return await db.query(sql)
}
/**
 * 查询语句 查询总条数 -- 不再维护
 * @param tablename 查询的表名
 * @param where 查询的条件语句
*/
const getTotal = async (tablename, where) => {
  let sql = `select count(*) as total from ${tablename}`, whereList = ''
  if (where) {
    list = where.split(',')
    list.forEach(ii => {
      whereList += ` ${ii} and`
    })
  }
  where ? sql += ` where ${whereList.slice(0, whereList.lastIndexOf(' and'))}` : void 0
  return await db.query(sql)
}
/**
 * 查询语句 like模糊查询数据 -- 不再维护
 * @param tablename 查询的表名
 * @param likefile 要模糊查询的字段 传参格式 'a,b,c'
 * @param where 查询的条件语句 传参格式 'a,b,c'
 * @param files 查询的字段
*/
const getDataLike = async (tablename, likefile, where, files = '*') => {
  let like = likefile.split(','), whe = where.split(','),
    sql = `select ${files} from ${tablename} where ${like[0]} like '%${whe[0]}%'`
  if (like.length > 1) {
    for (let i = 1; i < like.length; i++) {
      sql += ` and ${like[i]} like '%${whe[i]}%'`
    }
  }
  // console.log('拼接的sql语句', sql)
  return await db.query(sql)
}
/**
 * 查询语句 like模糊查询数据 富足的条件查询
 * @param tablename 查询的表名
 * @param data 查询条件 {分页，条件都在里面} 分页加字段的模糊查询
 * @param where 条件语句 万一有判断条件 比如说查询已上架的商品 某条件
 * @param files 查询的字段
 * 
 * 以下代码 实现 select * from koa_goods where id>10 and id<20 and goods_num like '%1%' and goods_name like '%快乐%' limit 10 offset 10 这种sql
 * 成功返回 [[{},{}]] res内的第一个对象是我们要的数据
*/
const getLikeDataList = async (tablename, data, where, files = '*') => {
  let { pageNum: num, pageSize: size } = data, { pageNum, pageSize, ...list } = data,
    sql = `select ${files} from ${tablename}`, whereList = ''
  if (where) {
    let list = where?.split(',')
    list.forEach(ii => {
      whereList += ` ${ii} and`
    })
    sql += ' where' + whereList
  }
  if (Object.keys(list).length !== 0) {
    if (!where) sql += ' where'
    for (let i in list) {
      sql += ` ${i} like '%${list[i]}%' and`
    }
  }
  Object.keys(list).length !== 0 || where ? sql = sql.slice(0, sql.lastIndexOf(' and')) : void 0
  num && (size ? sql += ` limit ${size} offset ${(num - 1) * size}` : void 0)
  // console.log('sql', sql)
  return await db.query(sql)
}
/**
 * 查询语句 like模糊查询数据的总数 富足的条件查询总数
 * @param tablename 查询的表名
 * @param data 查询条件 {分页，条件都在里面}
 * @param where 条件语句 万一有判断条件 比如说查询已上架的商品 并且可以like查询
 * 
 * 以下代码 实现 select count(*) as total from koa_goods where id>10 and id<20 and goods_num like '%1%' and goods_name like '%快乐%' limit 10 offset 0 这种sql
 * 成功返回 [[{ total: 3 }]] res内的第一个对象是我们要的数据
*/
const manyQueryTotal = async (tablename, data, where) => {
  let { pageNum: num, pageSize: size } = data, { pageNum, pageSize, ...list } = data,
    sql = `select count(*) as total from ${tablename}`, whereList = ''
  if (where) {
    let list = where?.split(',')
    list.forEach(ii => {
      whereList += ` ${ii} and`
    })
    sql += ' where' + whereList
  }
  if (Object.keys(list).length !== 0) {
    if (!where) sql += ' where'
    for (let i in list) {
      sql += ` ${i} like '%${list[i]}%' and`
    }
  }
  Object.keys(list).length !== 0 || where ? sql = sql.slice(0, sql.lastIndexOf(' and')) : void 0
  // num && size ? sql += ` limit ${size} offset ${(num - 1) * size}` : void 0 // 就算有这句也无效
  // console.log('total sql', sql)
  return await db.query(sql)
}


module.exports = {
  addData, // 增
  removeData, removeData2, // 删
  updateData,// 改
  getDataInfo, getDataInfo2, getDataList, getTotal, getDataLike, getLikeDataList, manyQueryTotal // 查
}
