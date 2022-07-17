const Router = require('koa-router')
const router = new Router()
const { auth } = require('../middleware/auth.middleware')
const { addRessAddVali, setDefaultAddress, } = require('../middleware/address.middleware')
const { addAddRess, removeAddress, updateAddress, defaultAddress, getAddress } = require('../controller/address.controller')

// 添加收货地址
router.post('/add', auth, addRessAddVali, addAddRess)
// 删除收货地址
router.delete('/:id', auth, removeAddress)
// 修改收货地址
router.put('/:id', auth, addRessAddVali, updateAddress)
// 设置收货地址为默认
router.patch('/:id', auth, setDefaultAddress, defaultAddress)
// 查询收货地址列表
router.get('/', auth, getAddress)

module.exports = router