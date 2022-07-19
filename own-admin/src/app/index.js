const path = require('path')
const Koa = require('koa') // 引入koa
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static') // 引入暴露默认资源的插件
const parameter = require('koa-parameter') // 引入进行表单验证的插件
const error = require('koa-json-error')
const cors = require('koa2-cors')
const { historyApiFallback } = require('koa2-connect-history-api-fallback') // 解决history模式下刷寻not found的问题
const Koa_session = require('koa-session') // 导入session缓存
const { sessionConfig } = require('../config/config') // 引入session的配置
const router = require('../router/')
const errHandler = require('./errHandler')
const app = new Koa() // new一个实例对象
// const db = require('../db/seq')


// 有问题 在处理路由方法内 try时无法抛出异常 会提示not found
// app.use(error({ // 统一处理错误的中间件 koa-json-error插件的用法
//   format: err => { // 开发环境
//     return { code: err.status, msg: err.message }
//   },
//   postFormat: (err, obj) => { // 生成环境
//     return obj
//   }
// }))

/**
app.use(cors({ // node内解决跨域
  origin: function (ctx) { //设置允许来自指定域名请求
    return '*'
    const whiteList = ['http://ds.dshuais.com', 'https://dshuais.com']; // 可跨域白名单
    // let url = ctx.header.referer.substr(0, ctx.header.referer.length - 1) // 取当前发送请求的url默认ctx.header.referer为http://localhost:9529/ 截取不要/
    // let url = ctx.header.referer.substr(0, ctx.header.referer.lastIndexOf('/')) || 'http://ds.dshuais.com' // referer拿到的请求会带上参数和路径 用最后一个/来分隔
    let url = ctx.header.referer.substr(0, ctx.header.referer.lastIndexOf('/')) // referer拿到的请求会带上参数和路径 用最后一个/来分隔
    console.log(url)
    if (whiteList.includes(url)) {
      return url // 注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
    }
    return 'http://localhost:9555' // 默认允许本地请求3000端口可跨域
  },
  maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
  // allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
}))
*/


// session实例化
app.keys = ['some secret hurr']
const session = Koa_session(sessionConfig, app)
app.use(session)

app.use(KoaBody()) // 解析传参body的中间件 这个中间件可开启上传
// app.use(KoaBody({
//   multipart: true, // 开启上传
//   formidable: {
//     // uploadDir不能使用相对路径 因为他相对于process.cwd() 并不是相对于当前文件夹
//     uploadDir: path.join(__dirname, '../uploads'),
//     keepExtensions: true, // 保留扩展名
//   }
// }))

app.use(historyApiFallback({ whiteList: ['/api'] })) // 必须挂载在暴露静态资源的前面 whiteList白名单 让带了前缀的get请求都不要指向index.html
app.use(KoaStatic(path.join(__dirname, '../../../uploads'))) // 默认暴露的静态资源
app.use(KoaStatic(path.join(__dirname, '../../../own.dshuais.com'))) // 默认暴露的静态资源 前端项目
app.use(parameter(app)) // 挂载parameter 表单验证中间件 他会向ctx上添加一个ctx.verifyParams()的方法 在里面进行校验

app.use(router.routes()).use(router.allowedMethods()) // 统一加载接口路由

app.on('error', errHandler) // 统一对错误进行处理

module.exports = app
