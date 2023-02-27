import React, {useState, useReducer, useEffect} from 'react'
import { useDispatch } from 'react-redux'

import DisplayCoworkerList from './DisplayCoworkerList'
import DisplayUserList from './DisplayUserList'
import { createGroupChannel, createDirectChannel } from '../action/workspace'
import xmark from '../images/xmark-solid.svg'
import { updateGroupChannel } from '../action/workspace'

const reducer = (state, action) => {
  switch(action.type){
      case "SET_USERS":
          return action.payload;
      case "ADD_USER":
        if(state && state.length!==0){
          return [...state.filter(s => s._id !== action.payload._id), action.payload]
        }else{
          return [action.payload]
        }
      case "DELETE_USER":
          return state.filter((user) => user?._id !== action.payload);
      case "EMPTY_USERS":
          return []
      default :
          return state
  }
}

const ModalForm = ({show, title, isGroupChannel, currentChat, setCurrentChat, setModalState, usersList, cur, workSpaceId}) => {
  
  const [newUserList, setNewUserList] = useState([]);
  const [ users, setUsers ] = useReducer(reducer, [] );
  // console.log(users)
  console.log(currentChat)
  const [ channelName, setChannelName] = useState('');
  const dispatch = useDispatch()
  
  useEffect(() => {
      setUsers({ type: "SET_USERS", payload: currentChat?.users })
      setChannelName(currentChat?.channelName)
  }, [currentChat?.users, currentChat?.channelName])
  
  if(!show){
    return null
  }

  const handleCancel = () => {
    setChannelName('')
    setUsers({type:"EMPTY_USERS"})
    setNewUserList([])
    setModalState(
      { 
        type: "SET_MODAL_DATA", 
        payload: {
           show:false,
        }
      })
    
  }

  const handleSearch = (val) => {
    setNewUserList([])
    if(!val) {
        return;
    }
    try {
      var result = []
      var nameRe = new RegExp(val, "i");
      for(var i = 0; i < usersList.length; i++){
        if(usersList[i]?.name.match(nameRe) && usersList[i]?._id !== cur._id){
          result.push(usersList[i]);
        }
      }
      setNewUserList(result);
    } catch (error) {
        console.log(error);
    }

  }  

  const handleSubmit = (e) => {
    e.preventDefault()
    const members = users.map(user => user._id)
    if(!channelName || members.length<2) return
    dispatch(createGroupChannel({ workSpaceId, channelName, users: members, userId:cur?._id}))
    setChannelName('')
    setUsers({type:"EMPTY_USERS"})
    setNewUserList([])
    setModalState(
      { 
        type: "SET_MODAL_DATA", 
        payload: {
           show:false,
        }
      })
  }

  const handleDirectSubmit = (e) => {
    e.preventDefault()
    const members = users.map(user => user._id)
    if(members.length !== 1) return
    dispatch(createDirectChannel({ workSpaceId, channelName: users[0]?.name, users: members, userId:cur?._id }))
    setUsers({type:"EMPTY_USERS"})
    setNewUserList([])
    setModalState(
      { 
        type: "SET_MODAL_DATA", 
        payload: {
           show:false,
        }
      })
  }

  const handleEditChannel = (e) => {
    e.preventDefault();
    const members = users.map(user => user._id)
    if(!channelName || members.length<2) return
    dispatch(updateGroupChannel({ workSpaceId, channelId: currentChat?._id , channelName, users: members, userId:cur?._id}))
    setChannelName('')
    setUsers({type:"EMPTY_USERS"})
    setNewUserList([])
    setModalState(
      { 
        type: "SET_MODAL_DATA", 
        payload: {
           show:false,
        }
      })
    let latestCurChat = currentChat
    latestCurChat.channelName=channelName
    latestCurChat.users=users
    setCurrentChat(latestCurChat)
  }

  return (
    <div className='h-full w-full py-12 bg-[#000000ba] transition duration-1000 delay-100 ease-in z-40 absolute top-0 right-0 bottom-0 left-0'>
      <div className='container mx-auto w-11/12 md:w-2/3 max-w-lg'>
        <form className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 transition duration-1000 delay-100 ease-in' onSubmit={currentChat ? handleEditChannel : (isGroupChannel ? handleSubmit : handleDirectSubmit)}>
            <div className='flex justify-between'>
              <h1 className='font-bold text-3xl py-3'>{title}</h1>
              <img src={xmark} onClick={handleCancel} alt="close" className='h-6 w-6 cursor-pointer'/>
            </div>
            { isGroupChannel && <p className=' py-3'>Name</p> }
            { isGroupChannel && <input className='w-full p-2 border' type="text" value={channelName} onChange={(e) => setChannelName(() => e.target.value)}/> }
            <p className=' py-3'>{ currentChat ? "Add more members:" : (isGroupChannel ? "Add 2 or more members" : "Search user:")}</p>
            <input className='w-full p-2 border' type="text" onChange={(e) => handleSearch(e.target.value)}/>
            <input className='my-3 py-2 px-4 border border-green-800 bg-green-100 text-green-800 cursor-pointer rounded' type="submit" value={currentChat ? "Edit" : "Create"}/>
            <div className='flex flex-wrap gap-1 my-2'>
              {
                users && users.length !==0 && users.map(user => (
                  <DisplayCoworkerList key={user?._id} user={user} setMainCoworkerList={setUsers}/>
                ))
              }
            </div>
            <div className='py-2'>
              {
                newUserList && newUserList.length !==0 && newUserList.map(user => (
                  <DisplayUserList key={user._id} user={user} setMainCoworkerList={setUsers} />
                ))
              }
            </div>
        </form>

      </div>
    </div> 
  )
}

export default ModalForm