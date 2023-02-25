import React, {useState, useReducer} from 'react'
import { useDispatch } from 'react-redux'

import DisplayCoworkerList from './DisplayCoworkerList'
import DisplayUserList from './DisplayUserList'
import { createGroupChannel, createDirectChannel } from '../action/workspace'

const reducer = (state, action) => {
  switch(action.type){
      case "ADD_USER":
          return [...state.filter(s => s._id !== action.payload._id), action.payload]
      case "DELETE_USER":
          return state.filter((user) => user?._id !== action.payload);
      case "EMPTY_USERS":
          return []
      default :
          return state
  }
}

const ModalForm = ({show, title, isGroupChannel, setModalState, usersList, cur, workSpaceId}) => {
  
  const [newUserList, setNewUserList] = useState([]);
  const [ users, setUsers ] = useReducer(reducer, []);
  const [ channelName, setChannelName] = useState('');
  const dispatch = useDispatch()
  
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

  return (
    <div className='h-full w-full py-12 bg-[#000000ba] transition duration-200 z-20 absolute top-0 right-0 bottom-0 left-0'>
      <div className='container mx-auto w-11/12 md:w-2/3 max-w-lg'>
        <form className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400' onSubmit={ isGroupChannel ? handleSubmit : handleDirectSubmit}>
            <h1 className='font-bold text-3xl py-3'>{title}</h1>
            { isGroupChannel && <p className=' py-3'>Name</p> }
            { isGroupChannel && <input className='w-full p-2 border' type="text" value={channelName} onChange={(e) => setChannelName(() => e.target.value)}/> }
            <p className=' py-3'>{ isGroupChannel ? "Add 2 or more members" : "Search user:"}</p>
            <input className='w-full p-2 border' type="text" onChange={(e) => handleSearch(e.target.value)}/>
            <input className='my-4 py-2 px-4 text-white bg-[#4a154be6] cursor-pointer rounded' type="submit" value="Create"/>
            <button className='mx-4 my-4 py-2 px-4 text-white bg-[#4a154be6] rounded' type="button" onClick={handleCancel}>Cancel</button>
            <div className='flex flex-wrap my-3'>
              {
                users.length !==0 && users.map(user => (
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

      </div>
    </div> 
  )
}

export default ModalForm