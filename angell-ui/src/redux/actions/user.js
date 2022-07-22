import { getUserinfo } from '../../api/user'
import { UPDATE_USERINFO, REMOVE_USERINFO } from "../constant"


// 更新和存储用户信息
export const userInfoAction = data => ({ type: UPDATE_USERINFO, data })
// 清除用户信息
export const removeInfoAction = _ => ({ type: REMOVE_USERINFO })
// 异步获取用户信息
export const getUserInfo = _ => {
  return async dispatch => {
    const { data } = await getUserinfo()
    dispatch(userInfoAction(data))
  }
}
