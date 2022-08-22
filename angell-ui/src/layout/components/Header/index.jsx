import React, { Fragment, useState, } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Image, Dropdown, Menu, Space, message, Button, Tooltip } from 'antd'
import {
  CaretDownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, GithubOutlined, ChromeOutlined,
  FullscreenOutlined, FullscreenExitOutlined
} from '@ant-design/icons'
import screenfull from 'screenfull'
import { removeToken } from '../../../utils/auth'
import Bread from '../Breadcrumb'
import { codeGitUrl, onLineUrl } from '../../../settings'


export default function Header(props) {
  const navigate = useNavigate(), [screen, setScreen] = useState(false),
    { user: { username, avatar, nickName }, removeInfoAction, collapsed, toggleCollapsed } = props


  // menu的回调
  const onClickMenu = ({ key }) => {
    switch (key) {
      case 'update':
        navigate('/userInfo')
        break
      case 'remove':
        message.success('exit successful')
        removeToken()
        removeInfoAction()
        navigate('/login', { replace: true })
        break
      default:
        break
    }
  }

  // 全屏和取消全屏
  const handleFullScreen = () => {
    if (!screenfull.isEnabled) return message.warning('Your browser does not support full screen')
    screenfull.toggle()
    setScreen(screen => !screen)
  }

  // menu列表
  const menu = (
    <Menu
      onClick={onClickMenu}
      items={[
        { key: 'update', label: '修改资料' },
        { key: 'remove', label: '退出登录' }
      ]}
    />
  )

  // git地址和线上地址
  const tarList = [
    { id: 1, title: 'source Adress', icon: <GithubOutlined />, href: codeGitUrl },
    { id: 2, title: 'online Demo', icon: <ChromeOutlined />, href: onLineUrl },
  ]

  return (
    <Fragment>
      <div className='flex'>
        <Button
          type="text"
          onClick={toggleCollapsed}
          className='flex fons-20 mr10'
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Bread />
      </div>

      <div className='flex'>
        {
          tarList.map(tar => (
            <Tooltip title={tar.title} key={tar.id}>
              <a className='c-333 fons-20 mr10' target='_blank' rel='noreferrer' href={tar.href}>{tar.icon}</a>
            </Tooltip>
          ))
        }
        <Tooltip title={screen ? 'cancel full screen' : 'full screen'}>
          <a className='c-333 fons-20 mr10' onClick={handleFullScreen}>
            {screen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </a>
        </Tooltip>

        <Image
          width={40} height={40} preview={false} className='avater ml5'
          src={avatar}
        />
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']} arrow className='ml10'>
          <a className='c-333 ml20' href='/'>
            <Space>
              {nickName}
              <CaretDownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Fragment>
  )
}
