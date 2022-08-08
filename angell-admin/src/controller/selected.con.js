const { getTodaySelect, getNewestSwiper, getStarUserinfo, getPictureList, updateStarIncrease, } = require('../service/selected.service'),
  { pictureGetSelectError, pictureNotError, pictureStarError, } = require('../constants/err.type'),
  { getDataInfo3, manyQueryTotal, } = require('../service/public.service')

const tablename = 'angell_picture', tableGuide = 'angell_guide'
class SelectedController {
  async getTodaySelected(ctx) { // 查询每日精选
    try {
      const res = await getTodaySelect(tablename, 'angell_users', 'star')
      ctx.body = { code: 200, msg: '查询成功', data: res[0] }
    } catch (err) {
      console.error('查询每日精选失败', err)
      ctx.app.emit('error', pictureGetSelectError, ctx)
    }
  }

  async getTodayGuide(ctx) { // 查询每天的引导页
    const { week } = ctx.request.params
    try {
      const res = await getDataInfo3(tableGuide, { week, status: 0 })
      ctx.body = { code: 200, msg: '查询成功', data: res[0] }
    } catch (err) {
      console.error('查询今天的引导页失败', err);
      ctx.app.emit('error', pictureGetSelectError, ctx)
    }
  }

  async getTodaySwiper(ctx) { // 查询最新的轮播图
    try {
      const img = await getNewestSwiper(tablename, 5)
      ctx.body = { code: 200, msg: '查询成功', data: img[0] }
    } catch (err) {
      console.error('查询最新轮播图失败', err)
      ctx.app.emit('error', pictureGetSelectError, ctx)
    }
  }

  async getStarMaxUserinfo(ctx) { // 查询当前图片star最高的用户
    try {
      const userinfo = await getStarUserinfo(), { password, ...data } = userinfo[0][0] || {}
      ctx.body = { code: 200, msg: '查询成功', data }
    } catch (err) {
      console.error('查询star用户失败', err)
      ctx.app.emit('error', pictureGetSelectError, ctx)
    }
  }



  async getPictureList(ctx) { // 查询精选的图片列表
    const { order, ...data } = ctx.request.body
    try {
      const res = await getPictureList(data, order),
        total = await manyQueryTotal(tablename, data, 'status = 0,sea = 0')
      ctx.body = { code: 200, msg: '查询成功', data: res[0], total: total[0][0].total }
    } catch (err) {
      console.error('查询精选列表失败', err)
      ctx.app.emit('error', pictureGetSelectError, ctx)
    }
  }

  async selectedPicStar(ctx) { // 给图片点star👍
    const { id } = ctx.request.params
    try {
      const res = await getDataInfo3(tablename, { id, status: 0 })
      if (!res[0].length) return ctx.app.emit('error', pictureNotError, ctx)
      await updateStarIncrease(id)
      ctx.body = { code: 200, msg: 'star成功' }
    } catch (err) {
      console.error('图片star失败', err)
      ctx.app.emit('error', pictureStarError, ctx)
    }
  }


}

module.exports = new SelectedController()