import Layout from '../layout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import MaterialList from '../pages/MaterialList'
import MaterialPool from '../pages/MaterialPool'
import Files from '../pages/Files'
import Users from '../pages/Users'
import UserInfo from '../pages/UserInfo'
import SystemTools from '../pages/SystemTools'
import Feedback from '../pages/Feedback'

import NotFound from '../pages/404'
import MainRouter from './route'

function definRouter(route) {
  return (
    <MainRouter>
      {route}
    </MainRouter>
  )
}

const routes = [
  {
    path: '', element: <Layout />,
    children: [
      // { path: '', element: definRouter(<Home />) },
      { path: '', element: <Home /> },
      { path: 'materialPool', element: <MaterialPool /> },
      { path: 'materialList', element: <MaterialList /> },
      { path: 'fileManage', element: <Files /> },
      { path: 'userManage', element: <Users /> },
      { path: 'systemTools', element: <SystemTools /> },
      { path: 'userInfo', element: <UserInfo /> },
      { path: 'feedback', element: <Feedback /> },
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/404', element: <NotFound /> },
]




export default routes