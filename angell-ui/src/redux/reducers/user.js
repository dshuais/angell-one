import { local } from '../../utils/cache'
import { UPDATE_USERINFO, DS_REACT_USERINFO, REMOVE_USERINFO } from '../constant'

const initState = local.getJSON(DS_REACT_USERINFO) || {}
export default function userReducers(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case UPDATE_USERINFO:
      local.setJSON(DS_REACT_USERINFO, data)
      return data
    case REMOVE_USERINFO:
      local.remove(DS_REACT_USERINFO)
      return preState // 必须返回不然会报错 哪怕是默认值{}
    default:
      return preState
  }
}
