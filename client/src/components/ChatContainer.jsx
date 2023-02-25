import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client'

import Chat from './Chat'
import { fetchAllMessages, setMessageRead, sendMessage, fetchAllUnreadMessages } from '../action/messages';

const ENDPOINT = "http://localhost:5000"

const ChatContainer = ({ currentChat, userProfile }) => {
  
  const dispatch = useDispatch();
  const socket = useRef(null)
  // const selectedChat = useRef(null)
  const [ message, setMessage ] = useState('');
  const [ socketConnected, setSocketConnected] = useState(false)
  const [ typing, setTyping] = useState(false)
  const [usersTyping, setUsersTyping] = useState([])
  const [ loading, setLoading ] = useState('');
  const workspace = useSelector((state) => (state.CurrentWorkSpaceReducer))
  const allMessages = useSelector((state) => (state.MessagesReducer))
  const notification = useSelector((state) => state.NotificationReducer)

  useEffect(() => {
    socket.current = io(ENDPOINT)
    socket.current.emit("setup", userProfile)
    socket.current.on("connected", () => setSocketConnected(true))

    const typingHandler = (user) => {
      if(user._id !== userProfile?._id){
        setUsersTyping((state) => !state.find(element => element._id === user._id) ? [...state, user] : [...state])
      } 
    }

    const stopTypingHandler = (user)=> {
      setUsersTyping(usersTyping.filter(u => u?._id === user._id))
    }

    socket.current.on("typing", typingHandler)
    socket.current.on("stop typing", stopTypingHandler)
    return () => {
      socket.current.off("connected",  () => setSocketConnected(true))
      socket.current.off("typing", typingHandler)
      socket.current.off("stop typing", stopTypingHandler)
    }
  }, [userProfile, usersTyping])

  
  useEffect(() => {

    const getAllMessages = async () => {
      if(!currentChat) return
      setLoading(true)
      dispatch(fetchAllMessages({ workSpaceId: workspace?.data?._id, channelId: currentChat._id }))
      setLoading(false)
      socket.current.emit("join chat", currentChat._id)
    }
    
    const markRead = async () => {
      for(let m of allMessages){
        if(typeof m.isRead === "object" && m.sender._id!==userProfile?._id  && !m.isRead.find(i => i===userProfile?._id)){
          dispatch(setMessageRead({ messageId: m?._id }))
        }
      }
    }

    getAllMessages()
    markRead()
    dispatch(fetchAllUnreadMessages({ workSpaceId: workspace?.data?._id }));
    // selectedChat.current = currentChat;
  }, [currentChat,workspace?.data?._id, dispatch])

  useEffect(() => {
    const handler = (newMessage) => {
      if(!currentChat || currentChat?._id !== newMessage?.channel?._id){
        if(!notification.find(element => element._id === newMessage._id)){
          dispatch({ type: "ADD_NOTIFICATION", payload: newMessage })
        }
      }else{
        dispatch({ type: "ADD_NEW_MESSAGES", payload: newMessage })
      }
    }
    socket.current.on("message received", handler)
    return () => socket.current.off("message received", handler)
  })

  const handleSendMessage = async () => {
    if(!currentChat) return
    setTyping(false)
    socket.current.emit("stop typing", { room: currentChat?._id, user: userProfile})
    if(message){
      dispatch(sendMessage({ messageContent: message, channelId: currentChat._id, workSpaceId: workspace?.data?._id, socket }))
      setMessage("")
    }
  }

  const handleTyping = (e) => {
    if(!socketConnected) return
    if(!typing){
      setTyping(true)
      socket.current.emit("typing", { room: currentChat._id, user:userProfile })
    }
    var lastTyping = new Date().getTime()
    var timeout = 10000;
    setTimeout(()=>{
      var timeNow = new Date().getTime()
      var timeDiff = timeNow - lastTyping
      if(timeDiff >= timeout && typing){
        socket.current.emit("stop typing", { room: currentChat._id, user:userProfile })
        setTyping(false)
      }
    }, timeout)
  }

  return (
    <div className='flex flex-col flex-auto h-full p-6'>
      {
        currentChat ? (
          <Chat userProfile={userProfile} loading={loading} allMessages={allMessages} currentChat={currentChat} 
          message={message} setMessage={setMessage} handleTyping={handleTyping} handleSendMessage={handleSendMessage} 
          usersTyping={usersTyping}/>
        ) : (
          <div></div>
        )
      }
    </div>
  )
}

export default ChatContainer