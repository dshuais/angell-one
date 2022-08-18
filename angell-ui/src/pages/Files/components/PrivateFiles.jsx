import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Radio, Table, Space, Tooltip, message, Modal, Upload, Tag, } from 'antd'
import {
  SearchOutlined, ReloadOutlined, CloudDownloadOutlined, CopyrightOutlined, FileUnknownTwoTone, InboxOutlined,
  EditOutlined
} from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import { download } from '../../../utils/request'
import { bytesToSize } from '../../../utils'
import { getFilesList, addFilesSea, editPrivateFile } from '../../../api/sea'

const { Dragger } = Upload, { TextArea } = Input

export default function PrivateFiles() {
  const [searchForm] = Form.useForm(), [fileForm] = Form.useForm()
  const [list, setList] = useState([]),
    [iconSpin, setIconSpin] = useState(false), // 重置图标的旋转
    [pagin, setPagin] = useState({ pageNum: 1, pageSize: 10 }),
    [total, setTotal] = useState(0),
    [search, setSearch] = useState({ name: void 0, tag: void 0, status: -1 }),
    [selectedRow, setSelectedRow] = useState([]), // 多选表格的每一项下载url - 用它去批量下载
    [isAddFileModal, setIsAddFileModal] = useState(false), // 上传文件的弹框
    [filesList, setFilesList] = useState([]), // 上传文件的默认上传 public内不需要 在修改文件信息时用
    [addFileBtnLoad, setAddFileBtnLoad] = useState(false), // 上传弹框的按钮loading
    [editFileId, setEditFileId] = useState(0) // 当前再修改的文件的id

  const columns = [
    {
      title: 'File name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: true,
      render: text => (
        <><FileUnknownTwoTone className='mr5' /> {text}</>
      )
    },
    {
      title: 'Download link',
      dataIndex: 'downUrl',
      align: 'center',
      ellipsis: true
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      align: 'center',
      width: '80px',
    },
    {
      title: 'Is Public',
      dataIndex: 'sea',
      align: 'center',
      width: '80px',
      render: sea => (
        <Tag color={sea == 0 ? 'green' : 'red'}>{sea == 0 ? 'yes' : 'no'}</Tag>
      )
    },
    {
      title: 'Is Show',
      dataIndex: 'status',
      align: 'center',
      width: '80px',
      render: status => (
        <Tag color={status == 0 ? '#2db7f5' : '#f50'}>{status == 0 ? 'yes' : 'no'}</Tag>
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
      sorter: (a, b) => a.size - b.size,
      render: size => bytesToSize(size)
    },
    {
      title: 'Upload Time',
      dataIndex: 'create_time',
      align: 'center',
      width: '170px',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: '170px',
      render: (text, obj) => (
        <Space size="small">
          <Tooltip title="copy online url" color='pink'>
            <Button type='text' className='c-hpink' onClick={_ => {
              copy(obj.url)
              message.success('Copied 😀') // 😊
            }}><CopyrightOutlined /></Button>
          </Tooltip>
          <Tooltip title="edit picture" color='blue'>
            <Button type='link' size='small' onClick={_ => fileEdit(text)}><EditOutlined /></Button>
          </Tooltip>
          <Tooltip title="download file" color='blue'>
            <Button type='link' onClick={_ => {
              download('/api/upload/download', { downName: obj.downUrl }, obj.downUrl)
            }}><CloudDownloadOutlined /></Button>
          </Tooltip>
        </Space>
      )
    },
  ]
  const uploadProps = { // 拖拽上传文件的props
    name: 'file',
    // multiple: true, // 可以一次上传多个文件 这里不需要
    action: process.env.REACT_APP_BASE_API + '/api/upload/file',
    onChange({ fileList }) {
      setFilesList(fileList)
    },
  }

  useEffect(() => {
    dataInit()
  }, [pagin, search])

  const dataInit = async _ => {
    let dd = { ...pagin, ...search, sea: 1 }
    dd.status = dd.status == -1 ? void 0 : dd.status
    const { data, total } = await getFilesList(dd)
    setList(data)
    setTotal(total)
  }

  // 确认添加和修改文件
  const handleAddFiles = async values => {
    setAddFileBtnLoad(true)
    try {
      let d
      if (!editFileId) {
        const { response: { data: [file] } } = values.url[0]
        d = { ...values, ...file, name: values.name || file.name.split('.')[0] }
        await addFilesSea(d)
      } else {
        d = { ...values, id: editFileId, name: values.name || filesList[0].preName, url: void 0 }
        await editPrivateFile(d)
      }
      message.success(`${d.name} file ${editFileId ? 'modify' : 'upload'} successfully 🎉`)
      setIsAddFileModal(false)
      dataInit()
      setFilesList([])
      fileForm.resetFields()
      setAddFileBtnLoad(false)
    } catch {
      setAddFileBtnLoad(false)
    }
  }

  // 修改文件信息
  const fileEdit = item => {
    setEditFileId(item.id)
    setFilesList([{ name: item.downUrl.split('/').at(-1), preName: item.name }])
    fileForm.setFieldsValue(item)
    setIsAddFileModal(true)
  }


  // 表格多选的参数和回调
  const filesRowSelection = {
    selectedRow,
    onChange: (_, files) => setSelectedRow(files.map(({ downUrl }) => downUrl))
  }

  // 批量下载
  const handleDownFileAll = _ => {
    if (!selectedRow.length) return message.warning('Please select file 😔')
    download('/api/upload/downloadAll', { downList: selectedRow })
  }

  return (
    <div>
      <Form className='flex-a' name="form" size='small' autoComplete="off" form={searchForm} onFinish={values => setSearch(values)}
        initialValues={search}>
        <Form.Item label="Filename" name="name">
          <Input placeholder='please enter name' allowClear />
        </Form.Item>
        <Form.Item label="Tag" name='tag'>
          <Select placeholder='please enter Tag' allowClear>
            <Select.Option value={1}>test</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Status' name='status'>
          <Radio.Group>
            <Radio value={-1}>All</Radio>
            <Radio value={0}>Show</Radio>
            <Radio value={1}>Hide</Radio>
          </Radio.Group>
        </Form.Item>
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
      </Form>

      <div className='float-r mb20'>
        <Button type="primary" size='small' className='mr10' onClick={_ => setIsAddFileModal(true)}>add Public File</Button>
        <Button type="dashed" danger size='small' onClick={handleDownFileAll}>batch <CloudDownloadOutlined /></Button>
      </div>

      <Table rowSelection={filesRowSelection} size='small' rowKey='id' columns={columns} dataSource={list} pagination={{ ...pagin, total }} onChange={({ current: pageNum, pageSize }) => setPagin({ pageNum, pageSize })} />

      <Modal title="Add Public File" visible={isAddFileModal} onOk={_ => fileForm.submit()} onCancel={_ => {
        setIsAddFileModal(false)
        setFilesList([])
        setEditFileId(0)
        fileForm.resetFields()
      }} confirmLoading={addFileBtnLoad}>
        <Form name="form" size='small' autoComplete="off" form={fileForm} labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }} onFinish={handleAddFiles} initialValues={{ status: 0, sea: 1 }}>
          <Form.Item label="Name" name="name">
            <Input placeholder='please enter name' allowClear />
          </Form.Item>
          <Form.Item label="File" name="url" valuePropName="filesList" getValueFromEvent={e => {
            if (Array.isArray(e)) return e
            return e?.fileList
          }}>
            <Dragger {...uploadProps} maxCount={1} fileList={filesList} disabled={editFileId}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Only a single file can be uploaded</p>
            </Dragger>
          </Form.Item>
          <Form.Item label="Tag" name='tag'>
            <Select placeholder='please enter Tag' allowClear>
              <Select.Option value={1}>test</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Public' name='sea'>
            <Radio.Group>
              <Radio value={0}>Public</Radio>
              <Radio value={1}>Private</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Status' name='status'>
            <Radio.Group>
              <Radio value={0}>Show</Radio>
              <Radio value={1}>Hide</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Remark" name='remark'>
            <TextArea rows={3} placeholder='Please enter remark' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
