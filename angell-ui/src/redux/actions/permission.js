import routes from '../../router'
import { getUserMenuList } from '../../api/user'
import { SET_MENU, REMOVE_MENU } from '../constant'

// 设置路由
export const setMenuAction = data => ({ type: SET_MENU, data })
// 清除路由
export const removeMenuAction = _ => ({ type: REMOVE_MENU })

// 获取路由
export const getMenuAction = _ => {
  return async dispatch => {
    const { data } = await getUserMenuList()
    // routes[0].children = data
    dispatch(setMenuAction(data))
    return
    data.forEach(dd => {
      const View = loadView(dd.element)
      dd.element = <View />
    })
    console.log('请求到的路由', data)
    console.log('本地的路由', routes)
  }
}

/**
 * 路由懒加载
 * @param {view} 路由的页面路径element
*/
export const loadView = view => {
  // return resolve => require([`../../pages/${view}`], resolve)
  return require(`../../pages/${view}`)
}