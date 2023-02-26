import React, {useRef, useEffect} from 'react'
import moment from 'moment';

import sliders from '../images/sliders-solid.svg'
import emoji from '../images/face-smile-solid.svg'
import send from '../images/share-solid.svg'
import attach from '../images/paperclip-solid.svg'
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";

const Chat = ({ loading, allMessages, currentChat, message, setMessage,handleTyping, handleSendMessage, userProfile, isOthersTyping, handleTypingCancel, usersTyping }) => {
    // console.log(userProfile)
    // console.log(allMessages)
    
    const lastMessageRef = useRef(null)

    const isLastMsg = (message, index, allMessages) => {
        return (index < allMessages.length && message.sender._id !== allMessages[index+1]?.sender._id)
    }

    const isSender = (msg) => {
        return msg.sender._id !== userProfile?._id
    }

    const isSendByUser = (msg) => {
        return msg.sender._id === userProfile?._id
    } 

    const isFirstMsgOfDate = (msg, index, allMessages) => {
        return index===0 || moment(msg.createdAt).format('ll') !== moment(allMessages[index-1].createdAt).format('ll')
    }

    const isReadByAll = (msg) => {
        return typeof msg.isRead === "object" && msg.channel.users.length === msg.isRead.length
    }

    useEffect(()=>{
        lastMessageRef.current?.scrollIntoView()
    }, [allMessages, usersTyping])

  return (
    <div>
        { 
            loading ? 
            <div className='h-[calc(100vh_-_110px)] w-full flex items-center justify-center'>
                <ClipLoader color="#000000" />
            </div>
            : 
            <div className='flex flex-col rounded-2xl bg-white h-[calc(100vh_-_106px)] p-4 overflow-x-hidden'>
                <div className='flex items-center justify-between px-5 pb-2 border-b-2'>
                    <h1 className="font-bold text-2xl capitalize">
                        { currentChat?.channelName }
                    </h1>
                    <button className='hover:bg-gray-300 p-3 rounded-full transition'>
                        <img src={sliders} alt="" className='text-gray-400 h-4 w-4'/>
                    </button>
                </div>
                <div className='px-5 py-4  h-[calc(100vh_-_250px)] flex flex-col overflow-y-scroll scroll-smooth'>
                    {
                        allMessages && allMessages.filter((messages) => messages?.channel?._id === currentChat._id).map((m, index) => (
                            <div key={m?._id}>
                                {
                                    isFirstMsgOfDate(m, index, allMessages) && (
                                        <div className='flex justify-start items-center my-2'>
                                            <hr className='grow'/>
                                            <p className='mx-2 flex'>{moment(m?.createdAt).format('ll')}</p>
                                            <hr className='grow'/>
                                        </div>
                                    )
                                }
                                <div className={`flex py-1 items-center ${ !isSender(m) && "flex-row-reverse" }`}>
                                    {
                                        isSender(m) && isLastMsg(m, index, allMessages) && (( m?.sender?.image.length !== 0) ? (
                                            <img src={m.sender.image} alt="" className='rounded-full h-10 w-10'/>
                                        ) : (
                                            <div className='px-3 py-2 bg-[#4a154be6] rounded-full'>
                                                <p className='capitalize text-white'>{m?.sender?.name[0] || m?.sender?.email[0]}</p>
                                            </div>
                                        ))
                                    }
                                    <div type="button" className={`group relative flex flex-col px-4 py-2 rounded-lg whitespace-pre-line bg-gray-200 mx-3 ${ isSender(m) && ( !isLastMsg(m, index, allMessages) ? "bg-[#f9ebfa] ml-[50px]" : "bg-[#f9ebfa]")} `}>
                                        <p>{m?.content}</p>
                                        <div className='text-xs flex justify-end'>
                                            <p>{moment(m?.createdAt).format('LT').toLocaleLowerCase()}</p>
                                        </div>
                                        {
                                            isSendByUser(m) && (
                                                <span class="absolute top-[-35px] left-0 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                                                    seen by {typeof m.isRead === "object" && m.isRead.length}
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className='mt-1'>
                        {
                            usersTyping.length !== 0 && usersTyping.map((user) => (
                                <div key={user._id} className="flex py-1 items-center">
                                    {(user?.image.length !== 0) ? (
                                        <img src={user.image} alt="" className='rounded-full h-10 w-10'/>
                                    ) : (
                                        <div className='px-3 py-2 bg-[#4a154be6] rounded-full'>
                                            <p className='capitalize text-white'>{user.name[0] || user.email[0]}</p>
                                        </div>
                                    )}
                                    <div className='ml-[20px]'>
                                        <BeatLoader color="#000000" size={10}/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div ref={lastMessageRef}></div>
                </div>
                <div className='flex items-center md:w-[calc(100vw_-_310px)] w-[calc(100vw_-_90px)] bg-gray-200 sm:px-3 py-2 rounded-[10px] justify-between absolute bottom-[40px] '>
                    <button className='hover:bg-gray-300 sm:p-3 p-1 mx-1 ml-2 rounded-full transition'>
                        <img src={attach} alt="" className='w-5 h-5'/>
                    </button>
                    <button className='hover:bg-gray-300 sm:p-3 p-1 mr-2 rounded-full transition'>
                        <img src={emoji} alt="" className='w-5 h-5'/>
                    </button>
                    <textarea className="w-full h-10 p-2 resize-none" type="text" placeholder='message' value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleTyping}/>
                    <button className='hover:bg-gray-300 sm:p-3 p-1 mx-1 mr-2 rounded-full transition' onClick={handleSendMessage}>
                        <img src={send} alt="" className='w-5 h-5'/>
                    </button>
                </div>
            </div> 
        }
    </div>
  )
}

export default Chat