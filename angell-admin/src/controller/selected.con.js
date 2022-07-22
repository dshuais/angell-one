

const tablename = 'angell_picture'

class SelectedController {

  async getTodaySelected(ctx) { // 查询每日精选
    ctx.body = { code: 200, msg: '查询成功' }
  }

}

module.exports = new SelectedController()