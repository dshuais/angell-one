import React from 'react'
// import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux'
import { download, downloadAll } from '../../api/user'

function Home(props) {
  const { user: { username } } = props
  // console.log(useLocation())

  const handelDownload = async () => {
    const res = await download({ downName: '20220804/贝卡问题.docx' })
    console.log(res)
  }

  const handelDownloadAll = async () => {
    const res = await downloadAll({ downList: ["20220804/one.txt", "20220804/贝卡问题.txt", "20220804/贝卡问题.docx"] })
    console.log(res)
  }

  return (
    <div className='container'>
      name: {username}
      <div>
        <button onClick={handelDownload}>download</button>
        <button onClick={handelDownloadAll}>download all</button>
      </div>
    </div>
  )
}

export default connect(
  state => ({ user: state.user })
)(Home)
