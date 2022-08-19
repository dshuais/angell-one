import React, { useState, useEffect, } from 'react'
import copy from 'copy-to-clipboard'
import { Space, Table, Button, Input, Form, Image, Select, Radio, Modal, message, Upload, Tag, Tooltip, } from 'antd'
import {
  SearchOutlined, ReloadOutlined, PlusOutlined, CopyrightOutlined, EditOutlined, DeleteOutlined,

} from '@ant-design/icons'
import { bytesToSize } from '../../utils'
import '../MaterialPool/index.less'

import { GetUserPictureList, putPicture, AddPictureSea, } from '../../api/sea'

const { TextArea } = Input


export default function List() {
  const [searchForm] = Form.useForm(), [addPictureForm] = Form.useForm()
  const [data, setData] = useState([]),
    [pagin, setPagin] = useState({ pageNum: 1, pageSize: 10 }), // 分页
    [total, setTotal] = useState(100), // 总条数
    [iconSpin, setIconSpin] = useState(false), // 重置按钮的旋转状态
    [search, setSearch] = useState({ name: void 0, status: -1, tag: void 0 }),
    [isAddModalShow, setIsAddModalShow] = useState(false), // 添加图片的弹框的状态
    [addPictureInitia, setAddPictureInitia] = useState({ name: void 0, url: '', tag: void 0, status: 0, sea: 1, remark: void 0 }),
    [isShowPicture, setIsShowPicture] = useState(false), // 预览图的单独弹框
    [previewImage, setPreviewImage] = useState(''), // 当前的预览图
    [addBtnLoading, setAddBtnLoading] = useState(false), // 添加按钮的loading
    [uploadImg, setUploadImg] = useState([]), // 已上传的文件列表
    [updatePicId, setUpdatePicId] = useState(0) // 当前是否是修改数据

  const columns = [
    {
      title: 'Material name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Picture',
      dataIndex: 'url',
      align: 'center',
      width: '100px',
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
      width: '80px',
    },
    {
      title: 'Status',
      dataIndex: 'status', // 0正常 1隐藏
      align: 'center',
      width: '100px',
      render: status => (
        <Tag color={status == 0 ? 'green' : 'red'}>{status == 0 ? 'public' : 'private'}</Tag>
      )
    },
    {
      title: 'Star push',
      dataIndex: 'sea', // 0公海 1私人
      align: 'center',
      width: '100px',
      render: sea => (
        <Tag color={sea == 0 ? 'green' : 'red'}>{sea == 0 ? 'push' : 'not'}</Tag>
      )
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
      width: '150px',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.size - b.size,
      render: size => bytesToSize(size)
    },
    {
      title: 'Upload Time',
      dataIndex: 'create_time',
      align: 'center',
      width: '170px',
      // render: text => <p>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</p>
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center', // <CopyrightOutlined />
      width: '175px',
      render: (text, obj) => (
        <Space size="middle">
          <Tooltip title="copy url" color='pink'>
            <Button type='text' size='small' className='c-hpink' onClick={_ => {
              copy(obj.url)
              message.success('Copied 🎉') // 😊😀🎉
            }}><CopyrightOutlined /></Button>
          </Tooltip>
          <Tooltip title="edit picture" color='blue'>
            <Button type='link' size='small' onClick={_ => pictureEdit(text)}><EditOutlined /></Button>
          </Tooltip>
          <Tooltip title="delete picture" color='red'>
            <Button type='text' className='c-err' size='small' onClick={_ => removePicture(text.id)}><DeleteOutlined /></Button>
          </Tooltip>

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

  // 添加
  const addPictureFinish = async values => {
    // console.log(values)
    setAddBtnLoading(true)
    try {
      if (!updatePicId) {
        const { remark, sea, status, tag, url: [{ response: { data: [{ name, url, size }] } }] } = values
        let dd = {
          name: values.name || name.split('.')[0],
          url, size, remark, sea, status, tag
        }
        await AddPictureSea(dd)
      } else {
        const { name } = uploadImg[0], { url, ...data } = values
        data.name ||= name
        await putPicture({ ...data, id: updatePicId })
      }
      setIsAddModalShow(false)
      addPictureForm.resetFields()
      setAddBtnLoading(false)
      setUploadImg([])
      dataInit()
      message.success(updatePicId ? 'Successfully modified' : 'Uploaded successfully')
    } catch {
      setAddBtnLoading(false)
    }
  }

  // 修改
  const pictureEdit = item => {
    // console.log(item)
    const { id, url, name, size } = item
    setUpdatePicId(id)
    setUploadImg([{ url, name, size }])
    // setAddPictureInitia(item)
    addPictureForm.setFieldsValue(item)
    setIsAddModalShow(true)
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

  // 文件上传的回调
  const handleChange = ({ fileList }) => { // :[{response:{data:[file]}}]
    setUploadImg(fileList)

    // 下面代码是处理图片列表fileList的 暂时不用 如果需要就可以用
    // fileList.forEach(item => {
    //   if (item.status == 'done') {
    //     // console.log('上传成功', fileList)
    //     const lastFile = fileList.splice(-1, 1), file = lastFile[0].response.data[0]
    //     // console.log('最成功的file', file)
    //     setUploadImg(files => [...files, file])
    //   }
    // })
  }

  // 上传图片的上传图标 当上传数量足够就隐藏所以拆出来写
  const uploadButton = (
    <PlusOutlined />
  )

  return (
    <div className='container material-pool'>
      <Form className='flex-a' initialValues={search} size='small' form={searchForm} onFinish={values => setSearch(values)}>
        <Form.Item label="Material name" name='name'>
          <Input placeholder="please enter name" allowClear />
        </Form.Item>
        <Form.Item label="Tag" name='tag'>
          <Select placeholder='please select Tag' allowClear>
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
              searchForm.setFieldsValue({ name: void 0, tag: void 0, status: -1 })
              // searchForm.resetFields()
              setTimeout(() => {
                setIconSpin(false)
                setSearch(search => ({ name: void 0, tag: void 0, status: -1 }))
                // setPagin(pagin => ({ pageNum: 1, pageSize: 10 }))
              }, 1000)
            }} />
        </Form.Item>
      </Form>

      <Button type="primary" className='float-r mb20' size='small' onClick={_ => setIsAddModalShow(true)}>Add Picture</Button>

      <Table size='small' className='mt20' rowKey='id' columns={columns} dataSource={data} pagination={{ ...pagin, total }}
        onChange={({ current: pageNum, pageSize }) => setPagin({ pageNum, pageSize })} />

      <Modal title={updatePicId ? 'Edit Picture' : 'Add Picture'} visible={isAddModalShow} onOk={_ => addPictureForm.submit()} onCancel={_ => {
        setIsAddModalShow(false)
        addPictureForm.resetFields()
        setUploadImg([])
        setUpdatePicId(0)
      }}
        confirmLoading={addBtnLoading}>
        <Form
          form={addPictureForm}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 15 }}
          onFinish={addPictureFinish}
          autoComplete="off"
          initialValues={addPictureInitia}
        >
          <Form.Item label="Name" name="name">
            <Input allowClear placeholder='please enter name' />
          </Form.Item>
          <Form.Item label="Picture" name='url'
            rules={[{ required: true, message: 'Please upload picture!', }]}
            getValueFromEvent={
              e => {
                if (Array.isArray(e)) return e
                return e?.fileList
              }}>
            {/* fileList={true ? [] : [{ url: addPictureInitia.url }]} */}
            <Upload fileList={uploadImg} action={process.env.REACT_APP_BASE_API + '/api/upload/picture'} listType="picture-card"
              maxCount={1} onPreview={({ url }) => {
                setPreviewImage(url)
                setIsShowPicture(true)
              }} onChange={handleChange} disabled={updatePicId}>
              {/* <PlusOutlined /> */}
              {uploadImg.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="Tag" name='tag'>
            <Select placeholder='please select Tag' allowClear>
              <Select.Option value="1">test</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name='status'>
            <Radio.Group>
              <Radio value={0}> Show </Radio>
              <Radio value={1}> Hide </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Star push" name='sea'>
            <Radio.Group>
              <Radio value={0}> Push </Radio>
              <Radio value={1}> Not </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Remark" name='remark'>
            <TextArea rows={3} placeholder='Two sentences, separated by commas' />
          </Form.Item>
        </Form>
      </Modal>

      <Modal visible={isShowPicture} title='预览' footer={null} onCancel={_ => setIsShowPicture(false)}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>

    </div>
  )
}
