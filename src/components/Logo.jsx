import React from 'react'

function Logo({width = '50px'}) {
  return (
    <div >
      <img className='rounded-full' style={{width: width}} src="https://th.bing.com/th/id/OIP.kCNJsP5GAmatdo-w0MXA4QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3" alt="" />
    </div>
  )
}

export default Logo