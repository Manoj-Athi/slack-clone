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
  const navigate = useNavigate();
  const currentWorkSpace = useSelector((state) => state.CurrentWorkSpaceReducer);
  const user = useSelector((state) => state.UserReducer);
  const [slideIn, setSlideIn] = useState(() => "-100%")
  const dispatch = useDispatch()

  const [ ModalState, setModalState ] = useReducer(modalReducer, { show: false });
  
  const handleLogout = async () => {
    const { data } = await axios.get('http://localhost:5000/auth/logout', { withCredentials: true})
    if(data?.status === 'SUCCESS'){
      navigate('/')
    }
  }
  
  useEffect(() => {
    dispatch(selectWorkSpace({ workSpaceId: currentWorkSpace?.data?._id }))
  }, [currentWorkSpace?.data?._id, dispatch])

  return (
    <ModalContext.Provider value={ { ModalState, setModalState } }>
      <div className="min-h-screen w-full bg-gray-100 text-gray-700" x-data="layout">
        <ModalForm {...ModalState} setModalState={setModalState} usersList={currentWorkSpace?.data?.users} workSpaceId={currentWorkSpace?.data?._id} cur={user?.data}/>
        <Navbar workSpaceName={currentWorkSpace?.data?.workSpaceName} setSlideIn={setSlideIn} userProfile={user?.data} handleLogout={handleLogout}/>
        <div className='flex'>
          <Sidebar workSpace={currentWorkSpace?.data} setCurrentChat={setCurrentChat} slideIn={slideIn} />
          <ChatContainer currentChat={currentChat} userProfile={user?.data}/>
        </div>
      </div>
    </ModalContext.Provider>
  )
}

export default WorkSpace