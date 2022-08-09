import React, { useState, useEffect } from 'react'
import { Space, Table, Button, Input, Form, Image, Select, Radio, Modal, message, } from 'antd'
import { SearchOutlined, ReloadOutlined, } from '@ant-design/icons'
import { bytesToSize } from '../../utils'
import '../MaterialPool/index.less'

import { GetUserPictureList, putPicture, } from '../../api/sea'

export default function List() {
  const [searchForm] = Form.useForm()
  const [data, setData] = useState([
    { key: 1, id: 1, name: '测试名称', size: 100000, status: 0, url: 'http://ds.dshuais.com/425708edd0ca6e4610de25b1d.jpg', tag: 1, createTime: '2022-7-16 21:14:30' },
    { key: 2, id: 2, name: '测试名称3', size: 150000, status: 0, url: 'http://ds.dshuais.com/425708edd0ca6e4610de25b1d.jpg', tag: 1, createTime: '2022-7-16 21:14:30' },
  ]),
    [pagin, setPagin] = useState({ pageNum: 1, pageSize: 10 }), // 分页
    [total, setTotal] = useState(100), // 总条数
    [iconSpin, setIconSpin] = useState(false), // 重置按钮的旋转状态
    [search, setSearch] = useState({ name: void 0, status: -1, tag: void 0 })

  const columns = [
    {
      title: 'Material name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Picture',
      dataIndex: 'url',
      align: 'center',
      // width: '55%',
      render: (text, obj) => (
        <>
          <Image width={40} height={40} src={text} />
        </>)
    },
    {
      title: 'Star',
      dataIndex: 'star',
      align: 'center',
      sorter: (a, b) => a.star - b.star,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status', // 0正常 1隐藏
      align: 'center',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      align: 'center',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      align: 'center',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.size - b.size,
      render: size => bytesToSize(size)
    },
    {
      title: 'Upload Time',
      dataIndex: 'update_time',
      align: 'center',
      // render: text => <p>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</p>
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, obj) => (
        <Space size="middle">
          <Button type='link' size='small' onClick={_ => pictureEdit(text)}>Edit</Button>
          <Button type='text' className='c-red' size='small' onClick={_ => removePicture(text.id)}>Delete</Button>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    dataInit()
  }, [pagin, search])

  // datainit
  const dataInit = async _ => {
    let dd = {
      ...pagin,
      ...search
    }
    if (dd.status == -1) delete dd.status
    const { data, total } = await GetUserPictureList(dd)
    // console.log(data)
    setData(data)
    setTotal(total)
  }

  // search
  const handleSearch = (values) => {
    // console.log(values)
    setSearch(values)
  }

  // 分页
  const handlePagin = ({ current: pageNum, pageSize }) => {
    setPagin({ pageNum, pageSize })
  }

  // 修改
  const pictureEdit = item => {
    console.log(item)
  }
  // 删除
  const removePicture = id => {
    // console.log(id)
    Modal.confirm({
      title: 'delete reminder',
      content: (
        <>ok to delete this picture?</>
      ),
      async onOk() {
        await putPicture({ id, status: 2 })
        dataInit()
        message.success('delete success')
      }
    })
  }

  return (
    <div className='container material-pool'>
      <Form className='flex-a' initialValues={search} size='small' form={searchForm} onFinish={handleSearch}>
        <Form.Item label="Material name" name='name'>
          <Input placeholder="please enter name" />
        </Form.Item>
        <Form.Item label="Tag" name='tag'>
          <Select placeholder='please enter Tag' allowClear>
            <Select.Option value="test">test</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Status" name='status'>
          <Radio.Group>
            <Radio value={-1}> All </Radio>
            <Radio value={0}> Show </Radio>
            <Radio value={1}> Hide </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button className='submit-btn' type="primary" shape="circle" htmlType="submit" block size='small' icon={<SearchOutlined />}>
            {/* Search */}
          </Button>
          <Button shape="circle" icon={<ReloadOutlined spin={iconSpin} />} onClick={
            _ => {
              setIconSpin(true)
              searchForm.resetFields()
              setTimeout(() => {
                setIconSpin(false)
                setSearch(search => ({ name: void 0, tag: void 0, status: -1 }))
                // setPagin(pagin => ({ pageNum: 1, pageSize: 10 }))
              }, 1000)
            }} />
        </Form.Item>
      </Form>

      <Button type="primary" className='float-r mb20' size='small'>Add Picture</Button>

      <Table className='mt20' rowKey='id' columns={columns} dataSource={data} pagination={{ ...pagin, total }} onChange={handlePagin} />

    </div>
  )
}
