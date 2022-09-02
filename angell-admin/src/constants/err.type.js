module.exports = {
  // public
  publicHandleError: { code: 500, msg: '操作失败' },
  publicQueryError: { code: 400, msg: '参数不符合规范' },
  // 权限相关
  userAuthError: { code: 404, msg: '没有权限' },
  tokenOverError: { code: 401, msg: 'token已过期' },
  tokenInvalidError: { code: 401, msg: '无效的token' },
  permissionError: { code: 500, msg: '权限验证失败' },
  // 用户相关
  captchaError: { code: 400, msg: '验证码不正确' },
  userNotError: { code: 400, msg: '用户不存在' },
  userLoginError: { code: 500, msg: '登陆失败' },
  userLoginCodeError: { code: 400, msg: '无效的code' },
  userPasswordError: { code: 400, msg: '密码错误' },
  userAlreadyExited: { code: 400, msg: '用户已存在' },
  userRegisterError: { code: 500, msg: '注册失败' },
  userStatusError: { code: 400, msg: '当前用户已被禁用' },
  userGetUserInfoError: { code: 500, msg: '获取用户信息失败' },
  userChangePwdError: { code: 500, msg: '修改失败' },
  changePwdError: { code: 400, msg: '旧密码错误' },
  equalPwdError: { code: 400, msg: '新密码与旧密码相同' },
  userUpdateError: { code: 500, msg: '修改用户信息失败' },
  getUserListError: { code: 500, msg: '查询用户列表失败' },
  getMenuListError: { code: 500, msg: '查询路由失败' },
  // 图片池相关
  pictureGetSelectError: { code: 500, msg: '查询失败' },
  pictureNotError: { code: 400, msg: '无效的图片id' },
  pictureStarError: { code: 500, msg: 'star失败' },
  addPictureError: { code: 500, msg: '添加picture失败' },
  addFileError: { code: 500, msg: '添加file失败' },
  putPictureError: { code: 500, msg: '修改picture失败' },
  putFileError: { code: 500, msg: '修改file失败' },
  removeFileError: { code: 500, msg: '删除file失败' },
  // 上传相关
  uploadsFileError: { code: 500, msg: '上传失败' },
  uploadTypeError: { code: 400, msg: '文件类型不符合规范' },
  downloadError: { code: 500, msg: '下载失败' },
  // 反馈信息
  addFeedbackError: { code: 500, msg: '反馈失败' },
  getFeedbackError: { code: 500, msg: '查询反馈列表失败' },
  updateFeedbackError: { code: 500, msg: '修改反馈数据失败' },
  deleteFeedbackError: { code: 500, msg: '删除反馈数据失败' },




  userFormateError: {
    code: 400,
    msg: '用户名或密码为空'
  },
  userGetUserNameError: {
    code: 400,
    msg: '用户名为空'
  },
  userOldNewPwdError: {
    code: 400,
    msg: '旧密码或新密码为空'
  },


  // 商品相关
  createGoodError: {
    code: '10300',
    msg: '新增商品失败'
  },
  getGoodsListError: {
    code: '10301',
    msg: '查询商品列表失败'
  },
  getGoodError: {
    code: 400,
    msg: '商品不存在'
  },
  removeGoodError: {
    code: '10303',
    msg: '删除商品失败'
  },
  updateGoodError: {
    code: '10304',
    msg: '修改商品失败'
  },


  // 购物车模块
  addCartGoodError: {
    code: '10401',
    msg: '加入购物车失败'
  },
  addCartGoodNumError: {
    code: 400,
    msg: '商品数量最小为1哦'
  },
  removeCartGoodError: {
    code: '10403',
    msg: '移出购物车失败'
  },
  getCartGoodsError: {
    code: 400,
    msg: '购物车数量为空'
  },
  updateCartGoodsError: {
    code: 400,
    msg: '商品状态不合法'
  },
  removeCartsError: {
    code: '10406',
    msg: '清空购物车失败'
  },
  getCartsGoodsError: {
    code: '10407',
    msg: '查询购物车列表失败'
  },

  addAddressError: {
    code: '10501',
    msg: '添加收货地址失败'
  },
  removeAddressError: {
    code: '10502',
    msg: '删除收货地址失败'
  },
  getAddressinfoError: {
    code: 400,
    msg: '收货地址不存在'
  },
  updateAddressError: {
    code: '10504',
    msg: '修改收货地址失败'
  },
  defaultAddressError: {
    code: '10505',
    msg: '设置默认地址失败'
  },
  getAddressListError: {
    code: '10506',
    msg: '查询收获地址失败'
  },


  createOrderError: {
    code: '10601',
    msg: '订单生成失败'
  },
  getOrderListError: {
    code: '10602',
    msg: '查询订单列表失败'
  },
  removeOrderError: {
    code: '10603',
    msg: '删除订单失败'
  },
  getOrderError: {
    code: 400,
    msg: '订单不存在'
  },
  updateOrderStaError: {
    code: '10605',
    msg: '修改订单状态失败'
  },






}