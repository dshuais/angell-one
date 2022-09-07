import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FrownOutlined, CoffeeOutlined, StarOutlined, HomeOutlined, UsergroupAddOutlined, FileDoneOutlined,
  RobotOutlined, GlobalOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd';
import logo from '../../../assets/image/umilogo.png'


export default function Aside(props) {
  const { pathname } = useLocation(), navigate = useNavigate(), { menu } = props
  const [items, setItems] = useState([])
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  // const items = [
  // getItem('Home', '', <HomeOutlined />),
  // getItem('Material Pool', 'materialPool', <StarOutlined />),
  // getItem('Material List', 'materialList', <CoffeeOutlined />),
  // getItem('File Manage', 'fileManage', <FileDoneOutlined />),
  // getItem('System Tools', 'systemTools', <RobotOutlined />),
  // getItem('User Manage', 'userManage', <UsergroupAddOutlined />),
  // getItem('User Info', 'userInfo', <FrownOutlined />),
  // ]
  // const items = getMenuList()
  const getMenuList = _ => { // 加载侧边栏的方法
    let items = []
    menu.forEach(m => {
      if (m.hidden === 1) {
        items.push(
          getItem(m.name, m.path, icon[m.icon])
        )
      }
    })
    setItems(items)
  }
  const icon = { // 笨办法 反正自己用
    'HomeOutlined': <HomeOutlined />,
    'StarOutlined': <StarOutlined />,
    'CoffeeOutlined': <CoffeeOutlined />,
    'FileDoneOutlined': <FileDoneOutlined />,
    'RobotOutlined': <RobotOutlined />,
    'UsergroupAddOutlined': <UsergroupAddOutlined />,
    'FrownOutlined': <FrownOutlined />,
    'GlobalOutlined': <GlobalOutlined />,
  }


  useEffect(() => {
    getMenuList()
  }, [menu])

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
