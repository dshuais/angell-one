import React from 'react'
import { Tabs } from 'antd'
import PublicFiles from './components/PublicFiles'
import PrivateFiles from './components/PrivateFiles'
import '../../assets/css/pagesCss.less'

const { TabPane } = Tabs

export default function Files() {
  return (
    <div className='container files'>
      <Tabs defaultActiveKey="publicFiles" size='small'>
        <TabPane tab="Public Files" key="publicFiles">
          <PublicFiles />
        </TabPane>
        <TabPane tab="Private Files" key="privateFiles">
          <PrivateFiles />
        </TabPane>
      </Tabs>
    </div>
  )
}
