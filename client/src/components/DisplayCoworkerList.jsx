import React from 'react'
import xmark from '../images/xmark-solid.svg'
import userIcon from '../images/image-solid.svg'

const DisplayCoworkerList = ({ user,  setMainCoworkerList }) => {
  return (
      <div className='flex p-2 rounded bg-blue-100 border border-blue-500 items-center cursor-pointer'>
        <img src={ user.image.length !==0 ? user.image : userIcon } alt="user" className="h-6 w-6 rounded-full " />
        <p className='ml-1 text-blue-800 text-sm'>{user?.name}</p>
        <button onClick={() => setMainCoworkerList({ type:"DELETE_USER", payload:user?._id })} className="ml-2">
            <img src={xmark} alt="close" width="10"/>
        </button>
      </div>
  )
}

export default DisplayCoworkerList