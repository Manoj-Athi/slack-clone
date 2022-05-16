import React from 'react'

const DisplayUserList = ({ user, coworkerList, setCoworkerList }) => {

    const handleAddUser = () => {
        setCoworkerList([ ...coworkerList, user?._id])
        console.log(coworkerList)
    }

  return (
    <button type="button" onClick={handleAddUser}>
        <h3>{user?.name || user?.email}</h3>
    </button>
  )
}

export default DisplayUserList