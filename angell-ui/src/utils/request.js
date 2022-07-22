import axios from "axios"
import { message, notification, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { getToken, removeToken } from '../utils/auth'
import { local } from '../utils/cache'
import { DS_REACT_USERINFO } from '../redux/constant'

axios.defaults.headers['Conntent-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use(config => {
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
}, err => {
  return Promise.reject(err)
})

service.interceptors.response.use(response => {
  const code = response.data.code || 200
  const msg = response.data.msg || '系统未知错误'
  // 二进制数据则直接返回
  if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
    return response.data
  }

  if (code === 401) {
    Modal.confirm({
      title: 'Confirm logout',
      icon: <ExclamationCircleOutlined />,
      content: 'You have been logged out, you can cancel to stay on this page, or log in again',
      okText: 'Re-Login',
      cancelText: 'Cancel',
      onOk() {
        removeToken()
        local.remove(DS_REACT_USERINFO)
        window.location.reload()
      },
      onCancel() { }
    })
    return Promise.reject(new Error(msg || 'Error'))
  } else if ([400, 500].includes(code)) {
    message.error(msg)
  } else if (code !== 200) {
    notification.error({ message: msg })
    return Promise.reject('error')
  } else {
    return response.data
  }
},
  err => {
    let { message: msg } = err
    if (msg === 'Network Error') {
      msg = "后端接口连接异常"
    } else if (msg.includes('timeout')) {
      msg = "系统接口请求超时"
    } else if (msg.includes('Request failed with status code')) {
      msg = "系统接口" + msg.substr(msg.length - 3) + "异常"
    }
    message.error(msg, 5)
    return Promise.reject(err)
  })


export default service
