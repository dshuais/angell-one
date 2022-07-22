import React from 'react'
// import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux'

function Home(props) {
  const { user: { username } } = props
  // console.log(useLocation())

  return (
    <div className='container'>
      name: {username}
    </div>
  )
}

export default connect(
  state => ({ user: state.user })
)(Home)
