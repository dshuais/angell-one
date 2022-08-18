import React from 'react'
import { Tabs } from 'antd'
import PictureBed from './components/PictureBed'
import '../../assets/css/pagesCss.less'

const { TabPane } = Tabs

export default function SystemTools() {
  return (
    <div className='container files'>
      <Tabs defaultActiveKey="pictureBed" size='small'>
        <TabPane tab="Picture Bed" key="pictureBed">
          <PictureBed />
        </TabPane>
      </Tabs>
    </div>
  )
}
