import React, { useState, useEffect } from 'react'
import {
  Button, Form, Input, Select, Radio, Table, Space, Tooltip, message, Modal, Upload, Tag, Avatar, Image,
  Switch,
} from 'antd'
import { SearchOutlined, ReloadOutlined, EditOutlined, UnlockOutlined, } from '@ant-design/icons'
import { getFeedbackList } from '../../api/feedback'


export default function UserManage() {
  const [searchForm] = Form.useForm(), [userForm] = Form.useForm()
  const [search, setSearch] = useState({ username: void 0, phonenumber: void 0, gender: void 0, status: void 0 }),
    [iconSpin, setIconSpin] = useState(false), // 重置icon的旋转状态
    [list, setList] = useState([]),
    [total, setTotal] = useState(0),
    [pagin, setPagin] = useState({ pageNum: 1, pageSize: 10 })

  const columns = [
    // {
    //   title: 'Avatar',
    //   dataIndex: 'avatar',
    //   align: 'center',
    //   width: '80px',
    //   render: avatar =>
    //     <Avatar src={<Image src={avatar} style={{ height: 32 }} />} />,
    // },
    // {
    //   title: 'UserName',
    //   dataIndex: 'username',
    //   key: 'username',
    //   align: 'center',
    //   width: '150px',
    //   render: username => <>{username}</>,
    // },
    {
      title: 'Content',
      dataIndex: 'content',
      align: 'center',
      width: '40%',
      ellipsis: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      width: '230px',
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      width: '150px',
    },
    {
      title: 'WeChat',
      dataIndex: 'wechat',
      align: 'center',
      width: '150px',
    },
    {
      title: 'QQ',
      dataIndex: 'qq',
      align: 'center',
      width: '130px',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: '110px',
    },
  ]

  useEffect(_ => {
    dataInit()
  }, [pagin, search])

  // 查询主数据
  const dataInit = async _ => {
    const { data, total } = await getFeedbackList({ ...pagin, ...search })
    setList(data)
    setTotal(total)
  }



  return (
    <div className='container feedback'>
      <Form name="form" size='small' autoComplete="off" form={searchForm} onFinish={values => setSearch(values)}
        initialValues={search}>
        <div className='flex-a'>
          <Form.Item label="Content" name="content">
            <Input placeholder='Please enter content' allowClear />
          </Form.Item>
          <Form.Item label='Status' name='status'>
            <Radio.Group>
              <Radio value={void 0}>All</Radio>
              <Radio value={0}>Not Closed</Radio>
              <Radio value={1}>Closure</Radio>
            </Radio.Group>
          </Form.Item>
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

    </div>
  )
}
