const { APP_PORT, APP_HOST } = require('./config/config.default')
const app = require('./app/')


app.listen(APP_PORT, _ => { // 起服务
  // console.log(`http server running at http://127.0.0.1:${APP_PORT}`)
  console.log(`http server running at ${APP_HOST}`)
})
