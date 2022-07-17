module.exports = (err, ctx) => {
  let status = 500
  switch (err.code) {
    case '10004': case '10006': case 400:
      status = 200
      break
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