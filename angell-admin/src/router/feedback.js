const Router = require('koa-router'), router = new Router()
const { auth } = require('../middleware/auth.middleware'),
  { addFeedback, getFeedbackList, updateFeedback, deleteFeedback, } = require('../controller/feedback.con'),
  { addFeedbackValid, updateFeedbackvalid } = require('../middleware/feedback.midd')

// 意见反馈
// 添加反馈信息
router.post('/add', auth, addFeedbackValid, addFeedback)
// 查询反馈数据
router.get('/list', auth, getFeedbackList)
// 修改反馈数据
router.put('/update', auth, updateFeedbackvalid, updateFeedback)
// 删除数据
router.delete('/delete/:id', auth, deleteFeedback)

module.exports = router