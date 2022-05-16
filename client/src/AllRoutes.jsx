import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Auth from './pages/Auth'
import Home from './pages/Home'
import ConfirmEmail from './pages/ConfirmEmail'
import SelectWorkspace from './pages/SelectWorkspace';
import WorkSpace from './pages/WorkSpace';
import CreateWorkSpace from './pages/CreateWorkSpace';

import { fetchUser } from './action/user'

const AllRoutes = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUser(navigate))
  }, [dispatch, navigate])

  return (
    <Routes>
      <Route exact path='/' element={<Auth />} />
      <Route path='/home' element={<Home />} />
      <Route path='/confirm-email' element={ <ConfirmEmail /> } />
      <Route path='/select-workspace' element={ <SelectWorkspace /> } />
      <Route path='/create-workspace/:id' element={ <CreateWorkSpace /> } />
      <Route path='/workspace/:id' element={ <WorkSpace /> } />
    </Routes>
  )
};

export default AllRoutes;

