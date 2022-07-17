import Layout from '../layout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import List from '../pages/List'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import Home from '../pages/Home'
import MainRouter from './route'
import NotFound from '../pages/404'

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
      { path: 'list', element: <List /> },
      { path: 'edit', element: <Edit /> },
      { path: 'means', element: <Means /> }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/404', element: <NotFound /> },
]




export default routes