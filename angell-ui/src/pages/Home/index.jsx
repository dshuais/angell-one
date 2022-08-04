import React from 'react'
// import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux'
import { download } from '../../api/user'

function Home(props) {
  const { user: { username } } = props
  // console.log(useLocation())

  const handelDownload = async () => {
    const res = await download({ downName: '20220804/贝卡问题.docx' })
    console.log(res)
  }

  return (
    <div className='container'>
      name: {username}
      <div>
        <button onClick={handelDownload}>download</button>
      </div>
    </div>
  )
}

export default connect(
  state => ({ user: state.user })
)(Home)
