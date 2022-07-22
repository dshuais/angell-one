import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'
import './assets/css/index.less'
import MainRouter from './router/route'

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