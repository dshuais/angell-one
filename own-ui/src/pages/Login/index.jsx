import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { userInfoAction, getUserInfo } from '../../redux/actions/user';
import { setToken } from '../../utils/auth';
import './index.less'
import logo from '../../assets/image/umilogo.png'
import { userLogin } from '../../api/user'

function Login(props) {

  const navigate = useNavigate(), { state: user } = useLocation()

  // const [user, setUser] = useState({ username: 'dushuai', password: '123456' })

  const onFinish = async values => {
    try {
      const { token } = await userLogin(values)
      // if (code === 1) return message.error(msg)
      setToken(token)
      message.success('login successful')
      props.getUserInfo()
      // setToken(data['cms-token'])
      // props.userInfoAction(data)
      navigate('/')
    } catch {
      console.error('login error')
    }
  }


  return (
    <div className='container-app'>
      <div className='con-login'>
        <img src={logo} alt="" />
        <Form
          name="basic"
          initialValues={user}
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

          <Form.Item>
            <Link to='/register'>还没账号？立即注册</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size='large'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default connect(
  state => ({ user: state.user }),
  {
    userInfoAction, getUserInfo
  }
)(Login)
