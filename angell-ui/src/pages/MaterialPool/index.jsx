import React, { useState, useEffect } from 'react'
import { Space, Table, Button, Input, Form, Radio, Select, Image, Modal, message, Upload, Tooltip } from 'antd'
import { SearchOutlined, ReloadOutlined, PlusOutlined, CopyrightOutlined, } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import { getPictureList, checkPictureStar, AddPictureSea, } from '../../api/sea'
import { bytesToSize } from '../../utils'
import './index.less'
const { TextArea } = Input

export default function List() {
  const [searchForm] = Form.useForm(), // 搜索的表单
    [addPictureForm] = Form.useForm(), // 添加picture的表单
    [data, setData] = useState([]),
    [pagin, setPagin] = useState({ pageNum: 1, pageSize: 10 }),
    [total, setTotal] = useState(0), // total跟分页参数分开写 不然会死循环
    [search, setSearch] = useState({ name: void 0, order: 'star', tag: void 0 }),
    [iconSpin, setIconSpin] = useState(false), // 重置表单的旋转效果
    [isModalVisible, setIsModalVisible] = useState(false),
    [btnLoading, setBtnLoading] = useState(false), // 确认按钮的loading
    [previewImage, setPreviewImage] = useState(''), // 当前预览的图片
    [isShowPicture, setIsShowPicture] = useState(false) // 预览图片model的状态


  const columns = [
    {
      title: 'Material name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: true
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
      title: 'Star⭐',
      dataIndex: 'star',
      align: 'center',
      sorter: (a, b) => a.star - b.star,
      render: star => (
        <>
          {star} ⭐
        </>
      )
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
      ellipsis: true
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
          <Tooltip title="copy url" color='pink'>
            <Button type='text' size='small' className='c-hpink' onClick={_ => {
              copy(obj.url)
              message.success('Copied 🎉') // 😊
            }}><CopyrightOutlined /></Button>
          </Tooltip>
          {/* <Button type='link' size='small' onClick={_ => articleEdit(text)}>Edit</Button> */}
          <Button type='text' className='c-red' size='small' onClick={_ => SelectStar(text.id)}>👍</Button>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    dataInit()
  }, [pagin, search])

  // 表格数据 和搜索的事件
  const dataInit = async _ => {
    let dd = {
      ...pagin,
      ...search
    }
    // console.log('准备查询', dd)
    const { data, total } = await getPictureList(dd)
    setData(data)
    setTotal(total)
  }

  // star
  const SelectStar = id => {
    Modal.confirm({
      title: 'star reminder',
      content: (
        <>Are you sure you want to give it a star👍?</>
      ),
      async onOk() {
        await checkPictureStar(id)
        message.success('star success')
        dataInit()
      }
    })
  }

  // 上传图片的状态展示 -- 弃用 直接用表单里的值
  const handleUploadChange = (fileList) => {
    return
    console.log(fileList)
    let list = []
    fileList.forEach(({ status, response }) => {
      if (status == 'done') {
        list.push(...response.data)
      }
    })
    // console.log(list)
  }

  // 上传的图片预览
  const handlePreview = ({ response: { data } }) => {
    console.log(data)
    setPreviewImage(data[0].url)
    setIsShowPicture(true)
  }

  // 确认提交表单
  const addPictureFinish = async values => {
    // console.log(values)
    setBtnLoading(true)
    const { url: [{ response: { data: [{ name, url, size }] } }] } = values
    let dd = {
      ...values,
      name: values.name || name.split('.')[0],
      url,
      size,
      sea: 0, status: 0,
    }
    // console.log(dd)
    await AddPictureSea(dd)
    setIsModalVisible(false)
    setBtnLoading(false)
    addPictureForm.resetFields()
    dataInit()
    message.success('Uploaded successfully')
  }

  // 确认添加selected
  const handleAddSectedOk = () => {
    addPictureForm.submit()
    return
    setBtnLoading(true)
    console.log('确认')
    setTimeout(() => {
      setBtnLoading(false)
      setIsModalVisible(false)
    }, 1000)
  }

  return (
    <div className='container material-pool'>
      <Form className='flex-a' size='small' onFinish={values => setSearch(values)} autoComplete="off"
        initialValues={search} form={searchForm}>
        <Form.Item label="Material name" name='name'>
          <Input placeholder="please enter name" className='w-200' allowClear />
        </Form.Item>
        <Form.Item label="Tag" name='tag'>
          <Select placeholder='please enter Tag' allowClear>
            <Select.Option value="test">test</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Rinking" name='order'>
          <Radio.Group>
            <Radio value="star"> Hot </Radio>
            <Radio value="update_time"> New </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button className='submit-btn' type="primary" shape="circle" htmlType="submit" block size='small' icon={<SearchOutlined />}>
            {/* Search */}
          </Button>
          <Button shape="circle" icon={<ReloadOutlined spin={iconSpin} />} onClick={
            _ => {
              setIconSpin(true)
              searchForm.setFieldsValue({ name: void 0, tag: void 0, order: 'star' })
              // searchForm.resetFields()
              setTimeout(() => {
                setIconSpin(false)
                setSearch(search => ({ name: void 0, order: 'star', tag: void 0 }))
                // setPagin(pagin => ({ pageNum: 1, pageSize: 10 }))
              }, 1000)
            }} />
        </Form.Item>
      </Form>

      <Button type="primary" className='float-r mb20' size='small' onClick={_ => setIsModalVisible(true)}>Add Picture</Button>

      <Table size='small' className='mt20' columns={columns} rowKey='id' dataSource={data} pagination={{ ...pagin, total }}
        onChange={({ current: pageNum, pageSize }) => setPagin({ pageNum, pageSize })} />

      <Modal title="Add featured" visible={isModalVisible} onOk={handleAddSectedOk} onCancel={_ => setIsModalVisible(false)}
        confirmLoading={btnLoading} width='650px'>
        <Form
          form={addPictureForm}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 15 }}
          onFinish={addPictureFinish}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name"
          // rules={[{ required: true, message: 'Please input your name!', }]}
          >
            <Input allowClear placeholder='please enter name' />
          </Form.Item>

          <Form.Item label="Picture" valuePropName="fileList" name='url'
            rules={[{ required: true, message: 'Please upload picture!', }]} getValueFromEvent={
              e => {
                if (Array.isArray(e)) return e
                return e?.fileList
              }}>
            <Upload action={process.env.REACT_APP_BASE_API + '/api/upload/picture'} listType="picture-card"
              onChange={handleUploadChange} onPreview={handlePreview} maxCount={1}>
              <PlusOutlined />
            </Upload>
          </Form.Item>

          <Form.Item label="Tag" name='tag'>
            <Select placeholder='please enter Tag' allowClear>
              <Select.Option value="1">test</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Remark" name='remark'>
            <TextArea rows={3} placeholder='Two sentences, separated by commas' />
          </Form.Item>

          {/* <Form.Item>
            <Button type="primary" htmlType="submit" loading={btnLoading}>
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>

      <Modal visible={isShowPicture} title='预览' footer={null} onCancel={_ => setIsShowPicture(false)}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>

    </div>
  )
}
