import { SET_MENU, REMOVE_MENU } from "../constant"


const initState = []
export default function menuReducers(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case SET_MENU:
      return data
    case REMOVE_MENU:
      return []
    default:
      return preState
  }
}