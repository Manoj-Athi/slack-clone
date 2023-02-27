import React, { useState } from 'react'

import DisplayCoworkerList from './DisplayCoworkerList';

const ChannelEdit = ({ currentChat }) => {

  const [channelName, setChannelName] = useState(currentChat?.channelName);

  const handleSubmit = () => {
    console.log("s")
  }

  const handleSearch = () => {
    console.log("s")
  }

  return (
    <div className='h-full w-full py-12 bg-[#000000ba] transition duration-1000 delay-100 ease-in z-40 absolute top-0 right-0 bottom-0 left-0'>
      {/* <div className='container mx-auto w-11/12 md:w-2/3 max-w-lg'>
        <form className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 transition duration-1000 delay-100 ease-in' onSubmit={ handleSubmit }>
            <h1 className='font-bold text-3xl py-3'>Edit Channel</h1>
            <p className=' py-3'>Name</p>
            <input className='w-full p-2 border' type="text" value={channelName} onChange={(e) => setChannelName(() => e.target.value)}/>
            <p className=' py-3'>Add users</p>
            <input className='w-full p-2 border' type="text" onChange={(e) => handleSearch(e.target.value)}/>
            <input className='my-4 py-2 px-4 text-white bg-[#4a154be6] cursor-pointer rounded' type="submit" value="Edit"/>
            <div className='flex flex-wrap my-3'>
              {
                currentChat?.users.length !==0 && currentChat?.users.map(user => (
                  <DisplayCoworkerList key={user?._id} user={user} setMainCoworkerList={setUsers}/>
                ))
              }
            </div>
            <div className='py-2'>
              {
                newUserList.length !==0 && newUserList.map(user => (
                  <DisplayUserList key={user._id} user={user} setMainCoworkerList={setUsers} />
                ))
              }
            </div>
        </form>

      </div> */}
    </div> 
  )
}

export default ChannelEdit