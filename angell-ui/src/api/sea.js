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

// 查询文件列表
export const getFilesList = params => {
  return request({
    method: 'get',
    url: '/api/sea/files',
    params
  })
}

// 添加到文件池
export const addFilesSea = data => {
  return request({
    method: 'post',
    url: '/api/sea/addFile',
    data
  })
}

// 修改私人文件
export const editPrivateFile = data => {
  return request({
    method: 'put',
    url: '/api/sea/updateFile',
    data
  })
}

// 删除文件
export const removeFile = id => {
  return request({
    method: 'delete',
    url: `/api/sea/removeFile/${id}`
  })
}