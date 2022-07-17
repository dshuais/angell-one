const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware(process.env.REACT_APP_BASE_API, {
      // target: 'http://47.93.114.103:6688/manage',
      target: 'http://ds.dshuais.com',
      changeOrigin: true,
      pathRewrite: {
        ['^' + process.env.REACT_APP_BASE_API]: ''
        // '^/dev-api': ''
      }
    })
  )
}