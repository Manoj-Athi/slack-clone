import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { sendMessage } from '../action/messages';
import { fetchAllMessages } from '../action/messages';

const ChatContainer = ({ currentChat }) => {

  const [ message, setMessage ] = useState('');
  const dispatch = useDispatch();
  const workspace = useSelector((state) => (state.CurrentWorkSpaceReducer))
  // console.log(workspace)
  const messages = useSelector((state) => state.MessagesReducer)
  // console.log(messages)
  
  const handleSendMessage = (e) => {
    setMessage(e.target.value)
    if(e.key === "Enter" && message){
      dispatch(sendMessage({ messageContent: message, channelId: currentChat._id, workSpaceId: workspace?.data?._id }))
      setMessage("")
    }
  }

  useEffect(() => {
    dispatch(fetchAllMessages({ workSpaceId: workspace?.data?._id }))
  }, [dispatch])

  return (
    <>
      {
        currentChat ? (
          <div>
            <h1>
              { currentChat?.channelName }
            </h1>
            <div>
              {
                messages && messages.filter((message) => message?.channel?._id === currentChat._id).map((message) => (
                  <div key={message?._id}>
                    <p>{message?.sender?.name || message?.sender?.email}</p>
                    <p>{message?.content}</p>
                  </div>
                ))
              }
            </div>
            <input type="text" placeholder='message' value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleSendMessage}/>
          </div>
        ) : (
          <h1>No chats</h1>
        )
      }
    </>
  )
}

export default ChatContainer