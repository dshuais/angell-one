import React, { useState, useEffect } from 'react'
import {
  Button, Form, Input, Select, Radio, Table, Space, Tooltip, message, Modal, Upload, Tag, Avatar, Image,
  Switch,
} from 'antd'
import { SearchOutlined, ReloadOutlined, EditOutlined, UnlockOutlined, } from '@ant-design/icons'
import { getUserList, editUserInfo, resetUserPassword } from '../../api/user'


export default function UserManage() {
  const [searchForm] = Form.useForm(), [userForm] = Form.useForm()
  const [search, setSearch] = useState({ username: void 0, phonenumber: void 0, gender: void 0, status: void 0 }),
    [iconSpin, setIconSpin] = useState(false), // 重置icon的旋转状态
    [list, setList] = useState([]),
    [total, setTotal] = useState(0),
    [pagin, setPagin] = useState({ pageNum: 1, pageSize: 10 }),
    [isEditUserModal, setEditModal] = useState(false), // 修改用户信息的弹框状态
    [userInfo, setUserInfo] = useState({}), // 当前修改的用户的头像
    [editUserBtnLoad, setEditBtnLoad] = useState(false)

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      align: 'center',
      width: '80px',
      render: avatar =>
        <Avatar src={<Image src={avatar} style={{ height: 32 }} />} />,
    },
    {
      title: 'UserName',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
      width: '150px',
      render: username => <>{username}</>,
    },
    {
      title: 'NickName',
      dataIndex: 'nickName',
      align: 'center',
      width: '40%',
      ellipsis: true
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
      align: 'center',
      width: '150px',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      align: 'center',
      width: '110px',
      render: gender => <Tag color={gender === 1 ? 'pink' : gender === 0 ? 'lime' : 'purple'}>{gender === 1 ? 'Female' : gender === 0 ? 'Male' : 'Alien'}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: '110px',
      render: (status, obj) => <Switch defaultChecked={!status} size="small" unCheckedChildren='ban' checkedChildren='start'
        onChange={async check => {
          await editUserInfo({ id: obj.id, status: check ? 0 : 1 })
          message.success('Account status changed successfully 🎉')
          dataInit()
        }} />
    },
    {
      title: 'City',
      dataIndex: 'city',
      align: 'center',
      width: '80px'
    },
    {
      title: 'Signature',
      dataIndex: 'signature',
      align: 'center',
      width: '60%',
      ellipsis: true
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: '150px',
      render: (_, obj) => (
        <Space>
          <Tooltip title="edit info" color='blue'>
            <Button type='link' size='small' onClick={_ => {
              setUserInfo(obj)
              setEditModal(true)
              userForm.setFieldsValue(obj)
            }}><EditOutlined /></Button>
          </Tooltip>
          <Tooltip title="reset Password" color='pink'>
            <Button className='c-hpink' type='text' size='small' onClick={_ => handleResetPassword(obj.id)}><UnlockOutlined /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  useEffect(_ => {
    dataInit()
  }, [pagin, search])

  // 查询主数据
  const dataInit = async _ => {
    const { data, total } = await getUserList({ ...pagin, ...search })
    setList(data)
    setTotal(total)
  }

  // 确认修改用户信息
  const handleEditUserInfo = async values => {
    setEditBtnLoad(true)
    try {
      await editUserInfo({ ...values, id: userInfo.id })
      setEditModal(false)
      message.success('update completed 🌈')
      dataInit()
    } catch {
      setEditModal(false)
    }
  }

  // 重置密码
  const handleResetPassword = id => {
    Modal.confirm({
      title: 'reset reminder',
      icon: <UnlockOutlined />,
      content: "Are you sure to reset the user's login password ?",
      async onOk() {
        await resetUserPassword({ id })
        message.success('Password reset successful 🎉')
        dataInit()
      }
    })
  }


  return (
    <div className='container users'>
      <Form name="form" size='small' autoComplete="off" form={searchForm} onFinish={values => setSearch(values)}
        initialValues={search}>
        <div className='flex-a'>
          <Form.Item label="Username" name="username">
            <Input placeholder='Please enter username' allowClear />
          </Form.Item>
          <Form.Item label="PhoneNumber" name="phonenumber">
            <Input placeholder='Please enter phonenumber' allowClear />
          </Form.Item>
          <Form.Item label="Gender" name='gender'>
            <Select placeholder='Please select gender' allowClear>
              <Select.Option value={0}>Male</Select.Option>
              <Select.Option value={1}>Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Status' name='status'>
            <Radio.Group>
              <Radio value={void 0}>All</Radio>
              <Radio value={0}>Show</Radio>
              <Radio value={1}>Hide</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div>
          <Form.Item>
            <Button shape="circle" type="primary" htmlType="submit" icon={<SearchOutlined />} />
            <Button className='ml10' shape="circle" htmlType="submit" icon={<ReloadOutlined spin={iconSpin} />}
              onClick={_ => {
                setIconSpin(true)
                searchForm.setFieldsValue({ username: void 0, phonenumber: void 0, gender: void 0, status: void 0 })
                setTimeout(() => {
                  setIconSpin(false)
                }, 1000)
              }} />
          </Form.Item>
        </div>
      </Form>

      <Table bordered size='small' columns={columns} dataSource={list} rowKey='id' pagination={{ ...pagin, total }}
        onChange={({ current: pageNum, pageSize }) => setPagin({ pageNum, pageSize })} />

      <Modal title="Edit User Info" visible={isEditUserModal} onOk={_ => userForm.submit()} onCancel={_ => {
        setEditModal(false)
        userForm.resetFields()
        setUserInfo({})
      }} confirmLoading={editUserBtnLoad}>
        <Form name="form" size='small' autoComplete="off" form={userForm} labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }} initialValues={{ status: 0, sea: 1 }} onFinish={handleEditUserInfo}>
          <Form.Item wrapperCol={{ span: 24 }} className='text-c'>
            <Avatar size={60} src={userInfo.avatar} />
          </Form.Item>
          {/* <Form.Item label="UserName" name="username">
            <Input placeholder='please enter username' allowClear />
          </Form.Item> */}
          <Form.Item label="NickName" name="nickName">
            <Input placeholder='please enter NickName' allowClear />
          </Form.Item>
          <Form.Item label="PhoneNumber" name="phonenumber">
            <Input placeholder='please enter PhoneNumber	' allowClear />
          </Form.Item>
          <Form.Item label='Gender' name='gender'>
            <Radio.Group>
              <Radio value={0}>Male</Radio>
              <Radio value={1}>Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Signature" name='signature'>
            <Input.TextArea rows={3} placeholder='Please enter signature' />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  )
}
