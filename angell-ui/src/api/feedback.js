import request from '../utils/request'


// 查询反馈列表
export const getFeedbackList = params => {
  return request({
    method: 'get',
    url: '/api/feedback/list',
    params
  })
}

// 修改反馈列表 --- 关闭反馈
export const updateFeedback = data => {
  return request({
    method: 'put',
    url: '/api/feedback/update',
    data
  })
}