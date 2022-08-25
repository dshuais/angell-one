import React, { useEffect } from 'react'
import { Routes, Navigate, useLocation, BrowserRouter } from 'react-router-dom'
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

export default function MainRouter({ children }) {
  const whiteRoute = ['/login', '/register'], { pathname } = useLocation(),
    currentRoute = currPath(routes).find(route => route.path === pathname)

  useEffect(() => {
    // console.log('将要在这里加载路由')
  }, [])

  nprogress.start()

  if (getToken()) {
    if (pathname === '/login') {
      // return <Route path='/' element={<Navigate to='/' />} />
      nprogress.done()
      return <Navigate to='/' />
    } else {
      if (currentRoute) {
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
