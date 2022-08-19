import React, { useState } from 'react'
import {
  Button, Form, Input, Select, Radio, Table, Space, Tooltip, message, Modal, Upload, Tag, Avatar, Image,
  Switch,
} from 'antd'
import { SearchOutlined, ReloadOutlined, EditOutlined, } from '@ant-design/icons'
import { getUserList } from '../../api/user'

export default function UserManage() {
  const [searchForm] = Form.useForm()
  const [search, setSearch] = useState({ username: void 0, phonenumber: void 0, gender: void 0, status: void 0 }),
    [iconSpin, setIconSpin] = useState(false),
    [list, setList] = useState([
      {
        username: 'dushuai', nikeName: '杜帅dafagasdgsdgds', phonenumber: '12345678911', gender: 0, status: 0, role: 'admin',
        avatar: 'http://ds.dshuais.com/7b14c71afe0004078e4e09100.gif', signature: '个性签名', id: 1
      }
    ]),
    [total, setTotal] = useState(0),
    [pagin, setPagin] = useState({ pageNum: 1, pageSize: 10 })

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
      title: 'NikeName',
      dataIndex: 'nikeName',
      align: 'center',
      // width: '150px',
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
      width: '120px',
      render: gender => <Tag color={gender === 1 ? 'pink' : gender === 0 ? 'lime' : 'purple'}>{gender === 1 ? 'Female' : gender === 0 ? 'Male' : 'Alien'}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: '120px',
      render: status => <Switch defaultChecked={!status} size="small" />
    },
    {
      title: 'Signature',
      dataIndex: 'signature',
      align: 'center',
      ellipsis: true
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: '150px',
      render: (_, record) => (
        <Space>
          <Tooltip title="edit info" color='blue'>
            <Button type='link' size='small'><EditOutlined /></Button>
          </Tooltip>
          <Tooltip title="reset Password" color='blue'>
            <Button type='link' size='small'><EditOutlined /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];


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
                searchForm.setFieldsValue({ name: void 0, tag: void 0, status: -1 })
                // setPagin(pagin => ({ ...pagin, pageNum: 1 }))
                setTimeout(() => {
                  setIconSpin(false)
                }, 1000)
              }} />
          </Form.Item>
        </div>
      </Form>

      <Table bordered size='small' columns={columns} dataSource={list} rowKey='id' />

    </div>
  )
}
