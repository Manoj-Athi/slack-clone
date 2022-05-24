import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ChatContainer from '../../components/ChatContainer';

const WorkSpace = () => {

	const [ currentChat, setCurrentChat ] = useState();
  const navigate = useNavigate();
  const currentWorkSpace = useSelector((state) => state.CurrentWorkSpaceReducer);
  const user = useSelector((state) => state.UserReducer);
  // console.log(currentWorkSpace)

  const handleLogout = async () => {
    const { data } = await axios.get('http://localhost:5000/auth/logout', { withCredentials: true})
    if(data?.status === 'SUCCESS'){
      navigate('/')
    }
  }

  return (
    <div>
		<Navbar workSpaceName={currentWorkSpace?.data?.workSpaceName} userProfile={user?.data} />
		<div>
			<Sidebar workSpace={currentWorkSpace?.data} setCurrentChat={setCurrentChat} />
			<ChatContainer currentChat={currentChat} />
		</div>
		<button type='button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default WorkSpace