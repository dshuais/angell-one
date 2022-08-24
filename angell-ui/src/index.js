import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux' // Provider 用它包裹着app并传入store 可使每个页面都能使用redux
import store from './redux/store'
import App from './App'
import './assets/css/index.less'
import MainRouter from './router/route' // 路由鉴权的组件 用它包裹着App

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MainRouter>
          <App />
        </MainRouter>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)