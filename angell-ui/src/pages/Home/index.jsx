import React from 'react'
// import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux'

function Home(props) {
  const { user: { username, nickName } } = props
  // console.log(useLocation())

  return (
    <div className='container'>
      nickName: {nickName}
    </div>
  )
}

export default connect(
  state => ({ user: state.user })
)(Home)
