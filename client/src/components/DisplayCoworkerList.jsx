import React from 'react'
import xmark from '../images/xmark-solid.svg'

const DisplayCoworkerList = ({ userId, userList, handleDelete }) => {
  return (
      <div>
        <h4>
            {
                userList.filter(user => user._id === userId)[0]?.name
            }
        </h4>
        <button onClick={() => handleDelete(userId)}>
            <img src={xmark} alt="close" width="10"/>
        </button>
      </div>
  )
}

export default DisplayCoworkerList