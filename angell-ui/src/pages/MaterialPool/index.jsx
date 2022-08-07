import React, { useState, useEffect } from 'react'
import { Space, Table, Button, Input, Form, Radio, Select, Image } from 'antd'
import dayjs from 'dayjs'
import { getPictureList } from '../../api/sea'
import { bytesToSize } from '../../utils'
import './index.less'

export default function List() {
  const [data, setData] = useState([
    { key: 1, id: 1, name: '测试名称', size: 100000, url: 'http://ds.dshuais.com/425708edd0ca6e4610de25b1d.jpg', tag: 1, createTime: '2022-7-16 21:14:30' },
    { key: 2, id: 2, name: '测试名称3', size: 150000, url: 'http://ds.dshuais.com/425708edd0ca6e4610de25b1d.jpg', tag: 1, createTime: '2022-7-16 21:14:30' },
  ]),
    [pagin, setPagin] = useState({ total: 1000, pageNum: 1, pageSize: 10 }),
    [search, setSearch] = useState({ name: void 0, order: 'star', tag: void 0 })

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
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
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
      dataIndex: 'create_time',
      align: 'center',
      // render: text => <p>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</p>
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, obj) => (
        <Space size="middle">
          {/* <Button type='link' size='small' onClick={_ => articleEdit(text)}>Edit</Button> */}
          <Button type='text' className='c-red' size='small' onClick={_ => SelectStar(text.id)}>👍</Button>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    dataInit()
  }, [])

  // 表格数据 和搜索的事件
  const dataInit = async (d, pageNum, pageSize) => {
    setSearch(d)
    let dd = {
      pageNum: pageNum ?? pagin.pageNum,
      pageSize: pageSize ?? pagin.pageSize,
      ...search
    }
    const { data } = await getPictureList(dd)
    setData(data)
    setPagin({ pageNum: dd.pageNum, pageSize: dd.pageSize, total: 100 })
  }

  // star
  const SelectStar = async id => {
    console.log(id)
  }

  // 分页查询
  const handlePagin = ({ current: pageNum, pageSize }) => {
    // console.log({ ...pagin, pageNum, pageSize })
    // setPagin({ ...pagin, pageNum, pageSize })
    dataInit({}, pageNum, pageSize)
    // console.log(pagin)
  }


  return (
    <div className='container'>
      <Form className='flex-a' size='small' onFinish={dataInit} autoComplete="off" initialValues={search}>
        <Form.Item label="Material name" name='name'>
          <Input placeholder="please enter name" className='w-200' allowClear />
        </Form.Item>
        <Form.Item label="Rinking" name='order'>
          <Radio.Group>
            <Radio value="star"> Hot </Radio>
            <Radio value="update_time"> New </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tag" name='tag'>
          <Select placeholder='please enter Tag' allowClear>
            <Select.Option value="test">test</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className='submit-btn' type="primary" htmlType="submit" block size='small'>
            Search
          </Button>
        </Form.Item>
      </Form>

      <Button type="primary" className='float-r mb20' size='small'>Add Picture</Button>

      <Table className='mt20' columns={columns} rowKey='id' dataSource={data} pagination={pagin} onChange={handlePagin} />

    </div>
  )
}
