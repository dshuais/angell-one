import React, { Fragment, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeInfoAction, getUserInfo } from '../redux/actions/user'
import { getMenuAction, removeMenuAction } from '../redux/actions/permission'
import { Layout } from 'antd'
import Footer from './components/Footer'
import Header from './components/Header'
import Aside from './components/Sider'
import './index.less'

const { Sider, Content } = Layout

function Layout2(props) {
  const { user, removeInfoAction, getUserInfo, getMenuAction, removeMenuAction, menu } = props

  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    // console.log('将要在这里加载路由 layout页面', menu)
    getUserInfo() // 每次刷新 从新render就从新拉取userinfo
    getMenuAction() // 获取路由信息
  }, [])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Fragment>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Aside menu={menu} />
        </Sider>
        <Layout>
          <header className='flex'>
            <Header user={user} removeInfoAction={removeInfoAction} collapsed={collapsed} toggleCollapsed={toggleCollapsed}
              removeMenuAction={removeMenuAction} />
          </header>
          <Content>
            <Outlet />
          </Content>
          <footer className='flex'><Footer /></footer>
        </Layout>
      </Layout>
    </Fragment >
  )
}

export default connect(
  state => ({ user: state.user, menu: state.permission }),
  {
    removeInfoAction,
    getUserInfo,
    getMenuAction,
    removeMenuAction
  }
)(Layout2)

