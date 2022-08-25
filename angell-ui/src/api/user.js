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

// 获取用户列表
export const getUserList = params => {
  return request({
    method: 'get',
    url: '/api/user/userList',
    params
  })
}

// 修改用户信息
export const editUserInfo = data => {
  return request({
    method: 'put',
    url: '/api/user/update',
    data
  })
}

// 重置密码
export const resetUserPassword = data => {
  return request({
    method: 'post',
    url: '/api/user/resetpwd',
    data
  })
}

// 获取用户路由信息
export const getUserMenuList = _ => {
  return request({
    method: 'get',
    url: '/api/menu/list'
  })
}