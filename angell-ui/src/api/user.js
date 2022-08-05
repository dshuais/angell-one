import request from '../utils/request'

// 注册
export const userRegister = data => {
  return request({
    method: 'post',
    url: '/api/user/register',
    data
  })
}

// 登陆
export const userLogin = data => {
  return request({
    method: 'post',
    url: '/api/user/login',
    data
  })
}

// 获取用户信息
export const getUserinfo = () => {
  return request({
    method: 'get',
    url: 'api/user/info',
  })
}

// 下载文件
export const download = data => {
  return request({
    method: 'post',
    url: 'api/upload/download',
    data,
    responseType: 'blob'
  })
}
// 批量下载
export const downloadAll = data => {
  return request({
    method: 'post',
    url: 'api/upload/downloadAll',
    responseType: 'blob',
    data
  })
}