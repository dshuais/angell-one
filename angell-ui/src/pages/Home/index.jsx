import React from 'react'
// import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux'

function Home(props) {
  const { user: { username, nickName } } = props
  // console.log(useLocation())

  return (
    <div className='container'>
      <span className='fonw-bold fons-20'>{nickName}</span>，welcome to angellone
    </div>
  )
}

export default connect(
  state => ({ user: state.user })
)(Home)
