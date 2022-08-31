import { local } from '../../utils/cache'
import { ANGELLONE_MENU } from '../../settings'
import { SET_MENU, REMOVE_MENU } from "../constant"

// 动态的路由权限
const initState = local.getJSON(ANGELLONE_MENU) || []
export default function menuReducers(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case SET_MENU:
      local.setJSON(ANGELLONE_MENU, data)
      return data
    case REMOVE_MENU:
      local.remove(ANGELLONE_MENU)
      return []
    default:
      return preState
  }
}