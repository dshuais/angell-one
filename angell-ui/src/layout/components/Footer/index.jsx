import React, { Fragment } from 'react'
import gnlogo from '../../../assets/image/gn.png'
import { giteeDs, beian, beianICP, owner } from '../../../settings'

export default function Footer() {
  return (
    <Fragment>
      <a className='icp' rel='noreferrer' target='_blank' href={giteeDs}>Made with <span className='c-red' style={{ fontSize: '16px' }}>❤</span> by {owner}</a>
      <p className='ml20'>
        <img src={gnlogo} alt="" />
        <a className='icp' rel='noreferrer' target='_blank' href={beian}>{beianICP}</a>
      </p>
    </Fragment>
  )
}
