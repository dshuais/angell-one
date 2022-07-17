import React, { Fragment, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeInfoAction } from '../redux/actions/user'
import { Layout } from 'antd'
import Footer from './components/Footer'
import Header from './components/Header'
import Aside from './components/Sider'
import './index.less'

const { Sider, Content } = Layout

function Layout2(props) {
  const { user, removeInfoAction } = props

  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Fragment>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}><Aside collapsed={collapsed} toggleCollapsed={toggleCollapsed} /></Sider>
        <Layout>
          <header className='flex'><Header user={user} removeInfoAction={removeInfoAction} collapsed={collapsed} toggleCollapsed={toggleCollapsed} /></header>
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
  state => ({ user: state.user }),
  {
    removeInfoAction
  }
)(Layout2)

