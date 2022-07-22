module.exports = (err, ctx) => {
  let status = 500
  switch (err.code) {
    /**
     * code统一用400和500就好
     * 状态码就让他走200 前端好处理
    */
    case 400: case 500:
      status = 200
      break
    // 下面的不用了 前端不好统一处理
    case '10001': case '10008': case '10100': case '10101': case '10102': case '10013':
    case '10701': case '10200': case '10302': case '10402': case '10503': case '10604':
      status = 400
      break
    case '10002':
      status = 409
      break
    default:
      status = 500
  }
  ctx.status = status
  ctx.body = err
}