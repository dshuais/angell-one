
const startUpload = async (ctx, next) => {
  console.log(ctx.request.files)
  // await next()
}

module.exports = {
  startUpload
}
