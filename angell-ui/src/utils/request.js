import axios from "axios"
import ReactDom from 'react-dom/client'
import { message, notification, Modal, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { saveAs } from 'file-saver'
import dayjs from 'dayjs'
import { getToken, removeToken } from '../utils/auth'
import { local } from '../utils/cache'
import { DS_REACT_USERINFO } from '../redux/constant'

let requestCount = 0 // 请求数 用来控制global-loading

// global-loading的创建与展示
function showLoading(tip = '加载中') {
  if (requestCount == 0) {
    let dom = document.createElement('div')
    dom.setAttribute('id', 'global-loading')
    document.body.appendChild(dom)
    const loading = ReactDom.createRoot(dom)
    loading.render(<Spin tip={tip} size="large" />)
  }
  requestCount++
}

// global-loading的销毁
function hideLoading() {
  requestCount--
  if (requestCount == 0) {
    document.body.removeChild(document.getElementById('global-loading'))
  }
}

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
    return Promise.reject(new Error(msg))
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

/**
 * 全局下载方法 使用file-saver下载
 * @param {
 *    url 请求路径
 *    params 请求参数
 *    filename 下载名，下载名包含扩展名（down_name.exe） 不传默认下载zip压缩包
 * }
*/
export function download(url, params, filename = 'angell_angellone.zip') {
  showLoading('下载中...')
  return service.post(url, params, {
    responseType: 'blob',
  }).then(async data => {
    const isBlob = await blobValidate(data)
    if (isBlob) {
      const blob = new Blob([data])
      saveAs(blob, processDownName(filename))
      message.success('download successful，please wait 🎉')
    } else {
      message.error('download failed')
    }
    hideLoading()
  }).catch(err => {
    hideLoading()
    console.error('download failed', err)
    message.error('download failed, Please contact the administrator')
  })
}

/**
 * 验证是否为blob格式
 * @param data 下载的blob格式文件
*/
async function blobValidate(data) {
  try {
    const text = await data.text()
    JSON.parse(text)
    return false
  } catch (error) {
    return true
  }
}

/**
 * 处理下载文件名
 * @param name 文件下载名 从下载名中提取文件名和扩展名
*/
function processDownName(name) {
  if (!name) return
  return dayjs().format('MMDDHHmmss') + name.match(/_(\S*)/)[0]
}


export default service
