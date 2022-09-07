import request from '../utils/request'


// 查询反馈列表
export const getFeedbackList = params => {
  return request({
    method: 'get',
    url: '/api/feedback/list',
    params
  })
}