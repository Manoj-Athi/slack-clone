import React from 'react'
import moment from 'moment'

import userIcon from '../images/user-solid.svg';
import xmark from '../images/xmark-solid.svg';

const ChannelDesc = ({currentChat, setShowViewDesc, setShowDelete, setShowEdit}) => {

  const handleEdit = () => {
    setShowViewDesc(state => !state)
    setShowEdit(state => !state)
  }

  const handleDelete = () => {
    setShowViewDesc(state => !state)
    setShowDelete(state => !state)
  }

  return (
    <div className='h-full w-full py-12 bg-[#000000ba] transition duration-1000 delay-100 ease-in z-40 absolute top-0 right-0 bottom-0 left-0'>
      <div className='container mx-auto w-11/12 md:w-2/3 max-w-lg relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 transition duration-1000 delay-100 ease-in'>
        <div className='flex justify-between'>
          <h1 className='text-2xl'>{currentChat?.channelName.toUpperCase()}</h1>
          <img src={xmark} onClick={() => setShowViewDesc((state) => !state)} alt="close" className='h-6 w-6 cursor-pointer'/>
        </div>
        <p>Created on: {moment(currentChat?.createdAt).format('ll')}</p>
        <div className='my-2'>
          <p>Description: </p>
          <p>{currentChat?.desc ? currentChat?.desc : "No description"}</p>
        </div>  
        <div className='mb-3'>
          <p>Users: </p>
          <div className='flex flex-wrap gap-1'>
            {
              currentChat?.users.map(u => (
                <div className='flex p-2 rounded-full bg-blue-100 border border-blue-500 items-center  cursor-pointer'>
                  <img src={ u.image.length !==0 ? u.image : userIcon } alt="user" className="h-6 w-6 rounded-full " />
                  <p className='ml-1 text-blue-800 text-sm'>{u?.name}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className='my-2'>
          <button type='button' onClick={() => handleEdit()} className='p-2 px-3 border border-green-800 bg-green-100 text-green-800 rounded-md'>Edit</button>
          <button type='button' onClick={() => handleDelete()} className='p-2 px-3 mx-2 border border-red-800 bg-red-100 text-red-800 rounded-md'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ChannelDesc