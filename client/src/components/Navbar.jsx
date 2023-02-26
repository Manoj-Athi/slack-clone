import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Badge from '@uiw/react-badge';
import moment from 'moment'

import userIcon from '../images/user-solid.svg';
import hamburgerIcon from '../images/bars-solid.svg';
import bellIcon from '../images/bell-solid.svg';
import { setMessageRead } from '../action/messages'

const Navbar = ({ workSpaceName, userProfile, handleLogout, handleSlideIn, setCurrentChat }) => {

  const [profileShow, setProfileShow] = useState(() => false)
  const [notifyShow, setNotifyShow] = useState(() => false)
  const notification = useSelector((state) => state.NotificationReducer)
  const dispatch = useDispatch();

  const handleNotification = (msg) => {
    setCurrentChat(msg?.channel)
    setNotifyShow(false)
    dispatch({ type: "REMOVE_NOTIFICATION", payload: msg?._id })
    dispatch(setMessageRead({ messageId: msg?._id }))
  }

  // console.log(notification)

  return (
    <nav className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white px-4 py-2 ">
      <div className='flex items-center space-x-2'>
        <button onClick={handleSlideIn}>
          <img src={ hamburgerIcon } alt="hamburger icon" className="md:hidden h-5 w-5 cursor-pointer"/>
        </button>
        <h1 className='font-bold text-2xl text-[#4a154be6]'>Chat App</h1>
      </div>
      <div className='flex items-center'>
        <Badge count={notification.length} onClick={()=>setNotifyShow((state) => (!state))}>
          <img src={bellIcon} alt="Bell" className='h-5 w-5 cursor-pointer'/>
        </Badge>
        {
          notifyShow && (
            <div className="absolute z-30 right-16 top-12 mt-1 max-w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md">
              {
                notification.length === 0 ? (
                  <div className="flex flex-col">
                    <p className='p-2'>No Notifications</p>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between divide-y divide-gray-200">
                    {
                      notification?.slice(0, notification.length>5? 5 : notification.length ).map((n) => (
                        <div onClick={() => handleNotification(n)} key={n?._id} className='cursor-pointer transition hover:bg-[#f9ebfa] hover:border-[#4a154be6] hover:text-[#4a154be6] p-2 flex flex-col'>
                          <p>{n?.content.length>20 ? n?.content.substring(0, 20)+"..." : n?.content }</p>
                          <div className='flex justify-between items-center text-xs'>
                            <p >
                              {n?.sender?.name || n?.sender?.email} {n?.channel?.isGroupChannel && " * " + n?.channel?.channelName}
                            </p>
                            <p className='ml-1 text-xs'>
                              {moment(n?.createdAt).fromNow()}
                            </p>
                          </div>
                        </div>
                      ))
                    }
                    {
                      notification.length>5 && (
                        <p className='space-x-2 p-2 text-center'>
                          and {notification.length-5} more notifications.
                        </p>
                      )
                    }
                  </div>
                )
              }
            </div>
          )
        } 
        <button type="button" onClick={()=>setProfileShow((state) => !state)} className="ml-5">
          <img src={ userProfile.image.length !==0 ? userProfile?.image : userIcon } alt="user" className="h-9 w-9 rounded-full"/>
        </button>
        {
          profileShow && (
            <div className="absolute z-30 right-2 top-12 mt-1 max-w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md">
              <div className="flex items-center space-x-2 p-2">
                  <img src={ userProfile.image.length !==0 ? userProfile.image : userIcon } alt="user" className="h-9 w-9 rounded-full" />
                  <div className="font-medium">{userProfile?.name}</div>
              </div>
              <div className="flex flex-col">
                <p className='cursor-pointer transition hover:bg-[#f9ebfa] hover:border-[#4a154be6] hover:text-[#4a154be6] p-2'>Profile</p>
                <p className='cursor-pointer transition hover:bg-[#f9ebfa] hover:border-[#4a154be6] hover:text-[#4a154be6] p-2' onClick={handleLogout}>Logout</p>
              </div>
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar