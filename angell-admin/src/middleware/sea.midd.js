

// 文件图片海的中间件

const getPictureValid = async (ctx, next) => { // 验证查询图片的中间件

  await next()
}


module.exports = {
  getPictureValid,
}