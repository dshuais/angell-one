const fs = require('fs')
const Router = require('koa-router')
// const userRouter = require('./user')
// const goodsRouter = require('./goods')
const router = new Router({prefix: '/api'})

router.get('/', async (ctx) => {
  ctx.render('index')
})

// 所有module router统一挂载处理
// router.use('/user', userRouter.routes(), userRouter.allowedMethods()) // 用户相关路由
// router.use('/goods', goodsRouter.routes(), goodsRouter.allowedMethods()) // 商品相关路由

// node内fs模块的readdirSync方法可以拿到指定文件夹下的所有文件 再统一挂载
fs.readdirSync(__dirname).forEach(file => {
  if (file !== 'index.js') {
    let r = require('./' + file)
    router.use(`/${file.split('.')[0]}`, r.routes(), r.allowedMethods())
  }
})

module.exports = router