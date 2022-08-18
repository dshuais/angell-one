import React, { useState } from 'react'
import { Input, Button, Tooltip, message } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import ImageUpload from '../../../components/ImageUpload'

export default function PictureBed() {
  const [filesUrl, setFilesUrl] = useState(void 0), // 当前上传文件的url
    [isClear, setIsClear] = useState(false) // 是否清空文件列表

  // 输入框value变化时的回调
  const handleChangeInput = ({ target: { value } }) => {
    if (!value) setIsClear(true)
    setFilesUrl(value)
  }

  return (
    <div className='flex'>
      <div style={{ width: '80%' }}>
        {/* uploadUrl 函数 接收子组件返回的所有上传文件的url 并展示 */}
        <ImageUpload isShowTip={true} fileType={'png/jpg/jpeg/gif'} isClear={isClear} uploadUrl={urls => {
          setFilesUrl(urls)
          setIsClear(false)
        }} />

        <Input.Group compact className='mt20'>
          <Input style={{ width: 'calc(100% - 100px)' }} placeholder='It is best not to modify the url' value={filesUrl}
            allowClear onChange={handleChangeInput} />
          <Tooltip title="copy url" color='blue'>
            <Button className='w-100' type="primary" onClick={_ => {
              if (!filesUrl) return
              copy(filesUrl)
              message.success('Copied 🎉')
            }}><CopyrightOutlined /></Button>
          </Tooltip>
        </Input.Group>
      </div>
    </div>
  )
}
