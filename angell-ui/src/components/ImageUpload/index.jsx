import React, { useState, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'

export default function ImageUpload(props) {
  const { isShowTip, fileType, uploadUrl, isClear } = props
  const [fileList, setFileList] = useState([]),
    [previewVisible, setPreviewVisible] = useState(false), // 点击预览上传的图片
    [previewTitle, setPreviewTitle] = useState(''), // 预览图片时的弹框标题
    [previewImage, setPreviewImage] = useState(void 0) // 当前预览的图片url
  // console.log('父传', props)

  useEffect(() => {
    if (isClear) setFileList([])
  }, [isClear])

  // 图片上传的钩子 上传中成功失败都走这里
  // 定义了上传列表fileList后必须早onchange内setFilelist插入进去 不然上传无法进行下一步 上传中->上传->成功
  const handleChangeUpload = ({ file, fileList }) => {
    setFileList(fileList)
    let files = ''
    if (file.status == 'done') {
      fileList.forEach(file => {
        const { response: { data: [ff] } } = file
        files += ff.url + ','
      })
      uploadUrl(files.slice(0, -1))
    }
  }


  // 上传下方的文字提醒
  const textTip = (
    <div className='text-c'>
      <p className='mb5'>Uploadable Type: <span className='c-err'>{fileType}</span></p>
      <p className='mb5'>Upload up to five pictures, Can multiple choice</p>
      {/* <p className='mb5'>Upload up to five pictures, Multiple choice, up to two choices</p> */}
    </div>
  )
  // 上传图片的节点
  const uploadButton = (
    <PlusOutlined />
  )

  return (
    <div>
      <div className='flex flex-c'>
        <Upload
          className='flex'
          action={process.env.REACT_APP_BASE_API + '/api/upload/picture'}
          listType="picture-card"
          fileList={fileList}
          onPreview={({ response: { data: [file] } }) => {
            setPreviewTitle(file.name)
            setPreviewImage(file.url)
            setPreviewVisible(true)
          }}
          onChange={handleChangeUpload}
          maxCount={5}
          multiple
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        {isShowTip ? textTip : void 0}
      </div>

      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={_ => setPreviewVisible(false)}>
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
