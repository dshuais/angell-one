import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Space, Table, Button, Input, Form, } from 'antd'
import { getArticleList, removeArticle } from '../../api/article'
import dayjs from 'dayjs';

export default function List() {
  const [data, setData] = useState([{ key: 1, title: '姓名', subTitle: '杜帅', date: '2022-7-16 21:14:30' },]),
    [pagin, setPagin] = useState({ total: 0, current: 1, pageSize: 10 })
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      align: 'center',
      width: '55%',
      render: (text, obj) => (
        <>
          <Link className='c-333' to=''>{text}</Link>
          <span className='c-999 block'>{obj.subTitle}</span>
        </>)
    },
    {
      title: 'Date',
      dataIndex: 'date',
      align: 'center',
      render: text => <p>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</p>
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: text => (
        <Space size="middle">
          <Button type='primary' size='small' onClick={_ => articleEdit(text.id)}>Edit</Button>
          <Button type='danger' size='small' onClick={_ => articleDelete(text.id)}>Delete</Button>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    dataInit()
  }, [])

  const dataInit = async (num = 1, count = 10) => {
    // const { data } = await getArticleList({
    //   num, count
    // })
    // data.arr.map(dd => dd.key = dd.id)
    // setData(data.arr)
    // setPagin({ ...pagin, total: 100 })
  }

  const handlePagin = ({ current, pageSize }) => {
    setPagin({ ...pagin, current, pageSize })
    dataInit(current, pageSize)
  }

  const articleEdit = id => {
    console.log(id)
  }

  const articleDelete = async id => {
    const res = await removeArticle({ id })
    console.log(res)
  }


  return (
    <div className='container'>
      <Form>
        <Form.Item label="Username">
          <Input placeholder="Basic usage" className='w-200' />
        </Form.Item>
      </Form>

      <Table className='mt20' columns={columns} dataSource={data} pagination={pagin} onChange={handlePagin} />

    </div>
  )
}
