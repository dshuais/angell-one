
/**
 * 自定义封装简单的验证规则 成功返回undefined 失败返回错误信息对象
 * @param ctx 把中间件ctx传过来 且可以使用里面的方法
 * @param data 验证的数据 格式：[{字段名:[类型,必填,最大值,最小值]},{字段名:[类型,必填,最大值,最小值]}]
 * {type: 类型, required: true}
*/
const validator = async (ctx, data) => {
  let list = {}
  data.forEach(dd => {
    for (let d in dd) {
      const val = dd[d]
      list[d] = {
        type: val[0],
        required: val[1] ?? true,
        max: val[2] && (val[0] != 'enum') ? val[2] : void 0,
        min: val[3] && (val[0] != 'enum') ? val[3] : void 0
      }
      if (val[0] == 'enum') list[d].values = val[2]
    }
  })
  // console.log(list)
  try {
    ctx.verifyParams(list)
    return void 0
  } catch (err) {
    const error = err.errors[0]
    return { code: 400, msg: error.field + ' is ' + error.message }
  }
}

module.exports = {
  validator
}