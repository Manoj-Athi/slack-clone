import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ChatContainer from '../../components/ChatContainer';
import { selectWorkSpace } from '../../action/workspace';
import ModalForm from '../../components/ModalForm';
import { ModalContext } from '../../Contexts/ModalContext';

const modalReducer = (state, action) => {
  switch(action.type){
    case "SET_MODAL_DATA":
      return action.payload
    default:
      return state
  }
}

const WorkSpace = () => {
	const [ currentChat, setCurrentChat ] = useState();
  const [slideIn, setSlideIn] = useState(false)
  const [ ModalState, setModalState ] = useReducer(modalReducer, { show: false,  });
  
  const currentWorkSpace = useSelector((state) => state.CurrentWorkSpaceReducer);
  const user = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const { data } = await axios.get('http://localhost:5000/auth/logout', { withCredentials: true})
    if(data?.status === 'SUCCESS'){
      navigate('/')
    }
  }

  const handleSlideIn = () => {
    setSlideIn( (state) => !state )
  }
  
  useEffect(() => {
    dispatch(selectWorkSpace({ workSpaceId: currentWorkSpace?.data?._id }))
  }, [currentWorkSpace?.data?._id, dispatch])

  return (
    <ModalContext.Provider value={ { ModalState, setModalState } }>
      <div className="min-h-screen w-full bg-gray-100 text-gray-700" x-data="layout">
        <ModalForm {...ModalState} setModalState={setModalState} usersList={currentWorkSpace?.data?.users} workSpaceId={currentWorkSpace?.data?._id} cur={user?.data} setCurrentChat={setCurrentChat}/>
        <Navbar workSpaceName={currentWorkSpace?.data?.workSpaceName} handleSlideIn={handleSlideIn} userProfile={user?.data} handleLogout={handleLogout} setCurrentChat={setCurrentChat}/>
        <div className='flex'>
          <Sidebar workSpace={currentWorkSpace?.data} setCurrentChat={setCurrentChat} slideIn={slideIn} />
          <ChatContainer currentChat={currentChat} userProfile={user?.data}/>
        </div>
      </div>
    </ModalContext.Provider>
  )
}

export default WorkSpace