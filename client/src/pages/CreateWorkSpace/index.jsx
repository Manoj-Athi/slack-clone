import { useState, useReducer } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SetupForm from '../../components/SetupForm';
import SetupCoworkerForm from '../../components/SetupCoworkerForm';
import { createWorkSpace, createFirstChannel, addCoworkerToWorkspace } from '../../action/workspace';
import axios from 'axios';

const reducer = (state, action) => {
    switch(action.type){
        case "ADD_USER":
            // const newState = state.filter(s => s._id === action.payload._id)
            return [...state.filter(s => s._id !== action.payload._id), action.payload]
        case "DELETE_USER":
            return state.filter((user) => user?._id !== action.payload);
        default :
            return state
    }
}

const CreateWorkSpace = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.UserReducer);
    const currentWorkSpace = useSelector((state) => state.CurrentWorkSpaceReducer);
    const dispatch = useDispatch();
    // console.log(user?.data?._id);
    const [ loading, setLoading ] = useState(false);
    const [ wsName, setWsName ] = useState('');
    const [ channelName, setChannelName ] = useState('');
    const [ userList, setUserList ] = useState([]);
    const [ mainCoworkerList, setMainCoworkerList ] = useReducer(reducer, []);

    const [ key, setKey ] = useState('');

    // console.log(currentWorkSpace);

    const handleWorkSpace = (e) => {
        e.preventDefault();
        dispatch(createWorkSpace({ workSpaceName: wsName, userId: user?.data?._id, navigate }));
    }

    const handleChannel = (e) => {
        e.preventDefault();
        const users = currentWorkSpace?.data?.users?.map(user => user?._id)
        const workSpaceName = currentWorkSpace?.data?.workSpaceName.replaceAll(' ', '-')
        dispatch(createFirstChannel({ workSpaceId: currentWorkSpace?.data?._id ,channelName, userId: user?.data?._id, users, navigate, workSpaceName }));
        // navigate(`/workspace/${workSpaceName}`);
    }

    const handleSearch = async (val) => {
        setKey(val);
        if(!val) {
            setKey('')
            return;
        }
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:5000/user?search=${key}`, {withCredentials: true})
            // console.log(data);
            setUserList(data?.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }

    } 

    const addCoworkers = (e) => {
        e.preventDefault();
        const coworkerList = mainCoworkerList.map(co => co._id)
        dispatch(addCoworkerToWorkspace({ workSpaceId: currentWorkSpace?.data?._id, coworkerList , navigate}))
    }

    const handleSkip = () => {
        let workSpaceName = currentWorkSpace?.data?.workSpaceName.replaceAll(' ', '-');
        navigate(`/workspace/${workSpaceName}`);
    } 

  return (
    <div className='flex flex-col items-center justify-center p-12'>
        {
            id === "setup-workspace" && ( 
                <SetupForm 
                    title="Enter new work space name: "
                    changeInputVal = {setWsName}
                    handleSubmit={handleWorkSpace}
                />
            )
        }

        {
            id === "setup-channel" && ( 
                <SetupForm 
                    title="Create a new channel: "
                    changeInputVal = {setChannelName}
                    handleSubmit={handleChannel}
                />
            )
        }

        {
            id === "setup-coworkers" && ( 
                <SetupCoworkerForm 
                    mainCoworkerList = {mainCoworkerList}
                    setMainCoworkerList = {setMainCoworkerList}
                    addCoworkers={addCoworkers}
                    handleSkip={handleSkip}
                    userList={userList}
                    handleSearch={handleSearch}
                    loading={loading}
                />
            )
        }
    </div>
  )
}

export default CreateWorkSpace