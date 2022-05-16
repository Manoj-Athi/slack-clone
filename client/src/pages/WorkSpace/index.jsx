import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const WorkSpace = () => {

  const navigate = useNavigate();
  const currentWorkSpace = useSelector((state) => state.CurrentWorkSpaceReducer);

  const handleLogout = async () => {
    const { data } = await axios.get('http://localhost:5000/auth/logout', { withCredentials: true})
    if(data?.status === 'SUCCESS'){
      navigate('/')
    }
  }

  return (
    <div>
      <h1>{currentWorkSpace?.data?.workSpaceName}</h1>
      <button type='button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default WorkSpace