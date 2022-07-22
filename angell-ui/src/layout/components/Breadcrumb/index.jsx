import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

export default function Bread() {
  const { pathname } = useLocation(), [pathlist, setPathlist] = useState([])

  useEffect(() => {
    setPathlist((pathname.slice(1)).split('/'))
  }, [pathname])


  return (
    <Breadcrumb>
      <Breadcrumb.Item href='/'>
        <HomeOutlined />
      </Breadcrumb.Item>
      {
        (pathlist.slice(0, pathlist.length - 1)).map(path =>
        (<Breadcrumb.Item key={path} href={`/${path}`}>
          <span>{path}</span>
        </Breadcrumb.Item>)
        )
      }
      <Breadcrumb.Item>{pathlist.at(-1)}</Breadcrumb.Item>
    </Breadcrumb>
  )
}
