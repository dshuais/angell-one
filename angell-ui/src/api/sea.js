import request from '../utils/request'

// 获取精选列表
export const getPictureList = data => {
  return request({
    method: 'post',
    url: '/api/selected/list',
    data
  })
}

// 精选图片点star
export const checkPictureStar = id => {
  return request({
    method: 'post',
    url: '/api/selected/star/' + id
  })
}

// 添加精选到图片池
export const AddPictureSea = data => {
  return request({
    method: 'post',
    url: '/api/sea/addPicture',
    data
  })
}

// 获取用户个人图片池
export const GetUserPictureList = params => {
  return request({
    method: 'get',
    url: '/api/sea/privatePicture',
    params
  })
}

// 修改picture信息 删除传status为2
export const putPicture = data => {
  return request({
    method: 'put',
    url: '/api/sea/putPicture',
    data
  })
}