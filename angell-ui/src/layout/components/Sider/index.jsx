import React, { useEffect, } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FrownOutlined, CoffeeOutlined, StarOutlined, HomeOutlined, UsergroupAddOutlined, FileDoneOutlined,
  RobotOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd';
import logo from '../../../assets/image/umilogo.png'


export default function Aside(props) {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('Home', '', <HomeOutlined />),
    getItem('Material Pool', 'materialPool', <StarOutlined />),
    getItem('Material List', 'materialList', <CoffeeOutlined />),
    getItem('File Manage', 'fileManage', <FileDoneOutlined />),
    getItem('System Tools', 'systemTools', <RobotOutlined />),
    getItem('User Manage', 'userManage', <UsergroupAddOutlined />),
    getItem('User Info', 'userInfo', <FrownOutlined />),
  ]

  const { pathname } = useLocation(), navigate = useNavigate(), { collapsed, toggleCollapsed } = props

  useEffect(() => {
  }, [pathname])

  const onClickMenu = ({ key }) => {
    navigate(key)
  }


  return (
    <div>
      <div className='logo flex' onClick={_ => navigate('/')}>
        <img src={logo} alt="" />
      </div>

      <Menu
        // defaultSelectedKeys={[curSelected]}
        selectedKeys={[pathname.replace('/', '')]}
        onClick={onClickMenu}
        mode="inline"
        theme="light"
        items={items}
      />
    </div>
  )
}
