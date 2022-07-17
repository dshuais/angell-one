import React, { useEffect } from 'react'
import { Routes, Navigate, useLocation, BrowserRouter } from 'react-router-dom'
import routes from '..'
import { getToken, removeToken } from '../../utils/auth'
import { local } from '../../utils/cache'
import { DS_REACT_USERINFO } from '../../redux/constant'

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
    // console.log('return', currentRoute, getToken())
  }, [pathname])

  if (getToken()) {
    if (pathname === '/login') {
      // return <Route path='/' element={<Navigate to='/' />} />
      return <Navigate to='/' />
    } else {
      if (currentRoute) return children
      // return <Navigate to={currentRoute.path} />
      // return <Route path={pathname} element={currentRoute.element} />
      else return <Navigate to='/404' />
      // return <Route path='/login' element={<Navigate to='/login' />} />
    }
  } else {
    if (currentRoute) {
      if (whiteRoute.includes(pathname)) return children
      // return <Navigate to={currentRoute.path} />
      // return <Route path={pathname} element={currentRoute.element} />
      else {
        removeToken()
        local.remove(DS_REACT_USERINFO)
        return <Navigate to='/login' />
      }
      // return <Route path='/login' element={<Navigate to='/login' />} />
    }
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
