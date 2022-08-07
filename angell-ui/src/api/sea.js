import request from '../utils/request'

// 获取精选列表
export const getPictureList = data => {
  return request({
    method: 'post',
    url: '/api/selected/list',
    data
  })
}