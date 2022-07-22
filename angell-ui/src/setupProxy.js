const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware(process.env.REACT_APP_BASE_API, {
      target: 'http://127.0.0.1:9529',
      // target: 'http://ds.dshuais.com',
      changeOrigin: true,
      pathRewrite: {
        ['^' + process.env.REACT_APP_BASE_API]: ''
        // '^/dev-api': ''
      }
    })
  )
}