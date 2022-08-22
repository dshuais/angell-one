import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import {
  Button, Form, Input, Select, Radio, Table, Space, Tooltip, message, Modal, Upload, Tag, Avatar, Image,
  Switch, DatePicker,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { editUserInfo } from '../../api/user'
import { getUserInfo } from '../../redux/actions/user'

function UserInfo(props) {
  const [userForm] = Form.useForm(),
    [fileList, setFileList] = useState([]),
    [previewImage, setPreviewImage] = useState(void 0), // 当前预览的图片url
    [previewVisible, setPreviewVisible] = useState(false) // 点击预览上传的图片
  const { user, getUserInfo } = props, navigate = useNavigate()

  useEffect(() => {
    setFileList([
      { url: user.avatar }
    ])
  }, [])

  // 确认修改个人信息
  const handleEditUserInfo = async values => {
    // if (!fileList[0]) return message.warning('Please upload Avatar 😔')
    let data = {
      ...values,
      birthday: values.birthday?.format('YYYY-MM-DD'),
      id: user.id,
      avatar: fileList[0]?.url || user.avatar
    }
    await editUserInfo(data)
    message.success('Successfully modified 🎉')
    getUserInfo()
  }

  // 文件上传的回调
  const handleChange = ({ fileList }) => { // :[{response:{data:[file]}}]
    setFileList(fileList)
    // 下面代码是处理图片列表fileList的 暂时不用 如果需要就可以用
    fileList.forEach(item => {
      if (item.status == 'done') {
        // console.log('上传成功', fileList)
        const lastFile = fileList.splice(-1, 1), file = lastFile[0].response.data[0]
        // console.log('最成功的file', file)
        setFileList(files => [...files, file])
      }
    })
  }

  // 上传图片的节点
  const uploadButton = (
    <PlusOutlined />
  )

  return (
    <div className='container'>
      <Form name="form" size='small' autoComplete="off" form={userForm} labelCol={{ span: 2 }}
        wrapperCol={{ span: 10 }} initialValues={{
          ...user,
          birthday: user.birthday ? moment(user.birthday, 'YYYY-MM-DD') : null
        }} onFinish={handleEditUserInfo} >
        <Form.Item wrapperCol={{ span: 12 }} className='text-c' name='avatar'
        // getValueFromEvent={
        //   e => {
        //     if (Array.isArray(e)) return e
        //     return e?.fileList
        //   }}
        // rules={[{ required: true, message: 'Please upload Avatar!', }]}
        >
          {/* <Avatar size={80} src={user.avatar} /> */}
          <Upload
            className='flex'
            action={process.env.REACT_APP_BASE_API + '/api/upload/picture'}
            listType="picture-card"
            fileList={fileList}
            onPreview={({ url }) => {
              setPreviewImage(url)
              setPreviewVisible(true)
            }}
            onChange={handleChange}
            maxCount={1}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label="UserName" name="username">
          <Input placeholder='please enter username' allowClear />
        </Form.Item>
        <Form.Item label="NickName" name="nickName">
          <Input placeholder='please enter NickName' allowClear />
        </Form.Item>
        <Form.Item label="PhoneNumber" name="phonenumber">
          <Input placeholder='please enter PhoneNumber' allowClear />
        </Form.Item>
        <Form.Item label='Gender' name='gender'>
          <Radio.Group>
            <Radio value={0}>Male</Radio>
            <Radio value={1}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Birthday" name="birthday">
          <DatePicker className='w-250' placeholder='Please select a birthday' />
        </Form.Item>
        <Form.Item label="Signature" name='signature'>
          <Input.TextArea rows={3} placeholder='Please enter signature' allowClear />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12 }} className='text-c'>
          <Button size='middle' type="dashed" className='mr20' onClick={_ => navigate(-1)}>Cancle</Button>
          <Button size='middle' type="primary" htmlType="submit">Confirm</Button>
        </Form.Item>
      </Form>

      <Modal visible={previewVisible} title='Avatar Preview' footer={null} onCancel={_ => setPreviewVisible(false)}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  )
}

export default connect(
  state => ({ user: state.user }),
  {
    getUserInfo
  }
)(UserInfo)
