import React from 'react'
import xmark from '../images/xmark-solid.svg'

const DisplayCoworkerList = ({ user,  setMainCoworkerList }) => {
  return (
      <div className='flex bg-[#4a154be6] m-1 text-white rounded-[5px] px-3 py-1'>
        <h4>
            {user?.name}
        </h4>
        <button onClick={() => setMainCoworkerList({ type:"DELETE_USER", payload:user?._id })} className="ml-2">
            <img src={xmark} alt="close" width="10"/>
        </button>
      </div>
  )
}

export default DisplayCoworkerList