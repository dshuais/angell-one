import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

export default function Bread() {
  const { pathname } = useLocation(), [pathlist, setPathlist] = useState([])

  useEffect(() => {
    setPathlist((pathname.slice(1)).split('/'))
  }, [pathname])


  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        {/* <HomeOutlined /> */}
        <Link to='/'><HomeOutlined /></Link>
      </Breadcrumb.Item>
      {
        (pathlist.slice(0, pathlist.length - 1)).map(path =>
        (<Breadcrumb.Item key={path}>
          {/* <span>{path}</span>     href={`/${path}`} */}
          <Link to={`/${path}`}>{path}</Link>
        </Breadcrumb.Item>)
        )
      }
      <Breadcrumb.Item>{pathlist.at(-1)}</Breadcrumb.Item>
    </Breadcrumb>
  )
}
