module.exports = {
  // public
  publicHandleError: {
    code: '10000',
    msg: '操作失败'
  },
  publicQueryError: {
    code: 400,
    msg: '参数不符合规范'
  },

  // 用户相关
  userFormateError: {
    code: 400,
    msg: '用户名或密码为空'
  },
  userAlreadyExited: {
    code: 400,
    msg: '用户已存在'
  },
  userRegisterError: {
    code: '10003',
    msg: '注册失败'
  },
  userNotError: {
    code: 400,
    msg: '用户不存在'
  },
  userLoginError: {
    code: '10005',
    msg: '登陆失败'
  },
  userPasswordError: {
    code: 400,
    msg: '密码错误'
  },
  userGetUserInfoError: {
    code: '10007',
    msg: '获取用户信息失败'
  },
  userGetUserNameError: {
    code: 400,
    msg: '用户名为空'
  },
  userOldNewPwdError: {
    code: 400,
    msg: '旧密码或新密码为空'
  },
  userChangePwdError: {
    code: '10012',
    msg: '修改失败'
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



  // 上传相关
  uploadsFileError: {
    code: 500,
    msg: '上传失败'
  },
  uploadTypeError: {
    code: 400,
    msg: '文件类型不符合规范'
  },

  // 权限相关
  userAuthError: {
    code: '10100',
    msg: '没有权限'
  },
  tokenOverError: {
    code: '10101',
    msg: 'token已过期'
  },
  tokenInvalidError: {
    code: '10102',
    msg: '无效的token'
  }
}