import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import axios from 'axios';
import Chat from './Chat'

const ENDPOINT = "http://localhost:5000"

// import { sendMessage } from '../action/messages';
// import { fetchAllMessages } from '../action/messages';

const ChatContainer = ({ currentChat, userProfile }) => {
  
  const socket = useRef(null)
  const selectedChat = useRef(null)
  const [ message, setMessage ] = useState('');
  const [ allMessages, setAllMessages ] = useState('');
  const [ socketConnected, setSocketConnected] = useState(false)
  const [ typing, setTyping] = useState(false)
  const [usersTyping, setUsersTyping] = useState([])
  // console.log(allMessages)
  const [ loading, setLoading ] = useState('');
  const workspace = useSelector((state) => (state.CurrentWorkSpaceReducer))
  // const dispatch = useDispatch();
  // console.log(workspace)
  // const messages = useSelector((state) => state.MessagesReducer)
  // console.log(currentChat)
  
  useEffect(() => {
    socket.current = io(ENDPOINT)
    socket.current.emit("setup", userProfile)
    socket.current.on("connected", () => setSocketConnected(true))
    socket.current.on("typing", (user) => {
      if(user._id !== userProfile?._id){
        setUsersTyping((state) => !state.find(element => element._id === user._id) ? [...state, user] : [...state])
      } 
    })
    socket.current.on("stop typing", (user)=> {
      setUsersTyping(usersTyping.filter(u => u?._id === user._id))
    })
  }, [])
  
  const fetchAllMessages = async () => {
    if(!currentChat) return
    setLoading(true)
    try {
      const { data } = await axios.get(`http://localhost:5000/chat/message?workspaceId=${workspace?.data?._id}&channelId=${currentChat._id}`, {withCredentials: true})
      setAllMessages(data?.data)
      setLoading(false)
      socket.current.emit("join chat", currentChat._id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllMessages()
    selectedChat.current = currentChat;
  }, [currentChat])

  useEffect(() => {
    socket.current.on("message received", (newMessage) => {
      if(!selectedChat.current || selectedChat.current?._id !== newMessage?.channel?._id){
        // @TODO: handle notifications
      }else{
        setAllMessages([...allMessages, newMessage])
      }
    })
  })

  const handleSendMessage = async () => {
    // setMessage(e.target.value)
    // console.log(message)
    if(!currentChat) return
    setTyping(false)
    socket.current.emit("stop typing", { room: currentChat?._id, user: userProfile})
    try {
      if(message){
        const { data } = await axios.post('http://localhost:5000/chat/message', { messageContent: message, channelId: currentChat._id, workSpaceId: workspace?.data?._id }, {withCredentials: true})
        // console.log(data?.data)
        setAllMessages([...allMessages, data?.data])
        setMessage("")
        socket.current.emit("new message", data?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleTyping = (e) => {
    // setMessage(e.target.value)
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