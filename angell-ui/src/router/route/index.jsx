import React, { useEffect } from 'react'
import { Routes, Navigate, useLocation, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from '..'
import { getToken, removeToken } from '../../utils/auth'
import { local } from '../../utils/cache'
import { DS_REACT_USERINFO } from '../../settings'

function currPath(routes, lastRoute = false) {
  const routess = JSON.parse(JSON.stringify(routes))
  let children = []
  routess.forEach(route => {
    if (route.children && route.children.length) {
      route.children.forEach(r => {
        r.path = route.path + '/' + r.path
        if (r.children && r.children.length) return children = children.concat(currPath(r.children, r))
        children.push(r)
      })
      return
    }
    if (lastRoute) {
      route.path = lastRoute.path + '/' + route.path
    }
    children = children.concat(route)
  })
  return children
}

function MainRouter({ children, menu }) {
  const whiteRoute = ['/login', '/register'], { pathname } = useLocation(),
    // currentRoute = currPath(routes).find(route => route.path === pathname)
    currentRoute = currPath(routes).find(route => route.path === pathname) // 当前全部路由是否存在
  // console.log(currPath(routes))
  const permissionRoute = menu.find(route => route.path === pathname.slice(1)) // 当前动态路由是否存在
  // console.log('有这个路由', currentRoute, '动态的', permissionRoute)
  useEffect(() => {
    // if (menu.length) console.log(menu)
    // console.log('将要在这里加载路由', menu)
    // routes[0].children = menu
  }, [menu])


  nprogress.start()

  if (getToken()) {
    if (whiteRoute.includes(pathname)) { // pathname === '/login'
      // return <Route path='/' element={<Navigate to='/' />} />
      nprogress.done()
      return <Navigate to='/' />
    } else {
      if (['/', '/404'].includes(pathname)) {
        nprogress.done()
        return children
      } else if (currentRoute && permissionRoute) { //  && permissionRoute
        nprogress.done()
        return children
      } else {
        nprogress.done()
        // return <Navigate to={currentRoute.path} />
        // return <Route path={pathname} element={currentRoute.element} />
        return <Navigate to='/404' />
        // return <Route path='/login' element={<Navigate to='/login' />} />
      }
    }
  } else {
    if (currentRoute) {
      if (whiteRoute.includes(pathname)) {
        nprogress.done()
        return children
      }
      // return <Navigate to={currentRoute.path} />
      // return <Route path={pathname} element={currentRoute.element} />
      else {
        nprogress.done()
        removeToken()
        local.remove(DS_REACT_USERINFO)
        return <Navigate to='/login' />
      }
      // return <Route path='/login' element={<Navigate to='/login' />} />
    }
    nprogress.done()
    // return <Route path='/login' element={<Navigate to='/login' />} />
    return <Navigate to='/login' />
  }
}

function MR(props) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <MainRouter routes={routes} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

// 在router鉴权组件内使用redux
export default connect(
  state => ({ menu: state.permission })
)(MainRouter)
