import request from '../utils/request'

// 获取文章列表
export const getArticleList = params => {
  return request({
    method: 'get',
    url: '/article',
    params
  })
}

export const removeArticle = data => {
  return request({
    method: 'post',
    url: '/article/remove',
    data
  })
}