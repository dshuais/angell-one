import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import '../Login/index.less'
import logo from '../../assets/image/umilogo.png'

import { userRegister } from '../../api/user';

export default function Register() {

  const navigate = useNavigate()

  const onFinish = async values => {
    return message.warning('Registration is closed')
    const { username, password } = values
    await userRegister({ username, password })
    message.success('注册成功,3秒后跳转登陆', () => {
      navigate('/login', {
        state: { username, password }
      })
    })
  }

  return (
    <div className='container-app'>
      <div className='con-login'>
        <img className='logo' src={logo} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input placeholder="请输入用户名" prefix={<UserOutlined />} size='large' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} size='large' />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入确认密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('您输入的两个密码不匹配!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请输入确认密码" prefix={<LockOutlined />} size='large' />
          </Form.Item>

          <Form.Item>
            <Link to='/login'>已有账号？前往登陆</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size='large'>
              立即注册(提示：不再支持通过注册功能 创建后台账户！)
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
