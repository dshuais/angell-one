import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FrownOutlined,
  EditOutlined,
  ReadOutlined,
  HomeOutlined
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
    getItem('Article List', 'list', <ReadOutlined />),
    getItem('Article Edit', 'edit', <EditOutlined />),
    getItem('Modify Data', 'means', <FrownOutlined />),
  ]

  const { pathname } = useLocation(), navigate = useNavigate(), { collapsed, toggleCollapsed } = props

  useEffect(() => {
    // console.log(pathname.replace('/', ''))
  }, [pathname])

  const onClickMenu = ({ key }) => {
    navigate(key)
  }


  return (
    <div>
      <div className='logo flex'>
        <img src={logo} alt="" />
      </div>

      <Menu
        defaultSelectedKeys={[pathname.replace('/', '')]}
        onClick={onClickMenu}
        mode="inline"
        theme="light"
        items={items}
      />
    </div>
  )
}
