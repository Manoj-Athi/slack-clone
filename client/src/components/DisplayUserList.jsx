import React from 'react'

const DisplayUserList = ({ user, setMainCoworkerList }) => {

    const handleAddUser = () => {
        setMainCoworkerList({ type: "ADD_USER", payload: user })
    }

  return (
    <button type="button" onClick={handleAddUser} 
      className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-[#f9ebfa] hover:border-[#4a154be6] hover:text-[#4a154be6] focus:outline-none focus:bg-[#4a154be6] focus:text-white cursor-pointer transition"
    >
        <h3>{user?.name}</h3>
        <h3>{user?.email}</h3>
    </button>
  )
}

export default DisplayUserList