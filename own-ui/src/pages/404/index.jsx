import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './index.less'
import notfound from '../../assets/image/notfound.gif'

export default function NotFound() {
  const navigate = useNavigate(), [time, setTime] = useState(5)

  useEffect(() => {
    let timerr = setInterval(() => {
      setTime(time => time -= 1)
    }, 1000)
    let timer = setTimeout(() => {
      navigate('/')
    }, 5000)
    return () => {
      clearTimeout(timer)
      clearInterval(timerr)
    }
  }, [])

  return (
    <div className='not-found'>
      <img src={notfound} alt="" />
      <div className='not-mask'>
        <p className='fons-18'>您访问的页面在火星~</p>
        <p>{time}秒后自动 <Link to='/'>返回</Link> 地球</p>
      </div>
    </div>
  )
}
