import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SetupForm from '../../components/SetupForm';
import SetupCoworkerForm from '../../components/SetupCoworkerForm';
import { createWorkSpace, createChannel, addCoworkerToWorkspace } from '../../action/workspace';
import axios from 'axios';

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
    const [ coworkerList , setCoworkerList ] = useState([]);
    const [ userList, setUserList ] = useState([]);
    const [ key, setKey ] = useState('');

    // console.log(currentWorkSpace);

    const handleWorkSpace = (e) => {
        e.preventDefault();
        dispatch(createWorkSpace({ workSpaceName: wsName, userId: user?.data?._id, navigate }));
    }

    const handleChannel = (e) => {
        e.preventDefault();
        dispatch(createChannel({ workSpaceId: currentWorkSpace?.data?._id ,channelName, userId: user?.data?._id, navigate }));
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

    const handleDelete = (removeUserId) => {
        let filteredArr = coworkerList.filter((userId) => userId !== removeUserId);
        setCoworkerList(filteredArr)
    }

    // console.log(coworkerList);
    const addCoworkers = (e) => {
        e.preventDefault();
        dispatch(addCoworkerToWorkspace({ workSpaceId: currentWorkSpace?.data?._id, coworkerList , navigate}))
        // let workSpaceName = currentWorkSpace?.data?.workSpaceName.replaceAll(' ', '-');
        // navigate(`/workspace/${workSpaceName}`);
    }

    const handleSkip = () => {
        let workSpaceName = currentWorkSpace?.data?.workSpaceName.replaceAll(' ', '-');
        navigate(`/workspace/${workSpaceName}`);
    } 

  return (
    <div>
        {
            id === "setup-workspace" && ( 
                <SetupForm 
                    title="What's the name of your company or team?"
                    para="This will be name of your slack workspace - chose something your team will recognise"
                    ph="Ex: Acme Marketing or Acme Co"
                    changeInputVal = {setWsName}
                    handleSubmit={handleWorkSpace}
                    skip = {false}
                />
            )
        }

        {
            id === "setup-channel" && ( 
                <SetupForm 
                    title="What's the current project your team is working on?"
                    para="This will be name of your new channel"
                    ph="Ex: Youtube Videos"
                    changeInputVal = {setChannelName}
                    handleSubmit={handleChannel}
                    skip = {false}
                />
            )
        }

        {
            id === "setup-coworkers" && ( 
                <SetupCoworkerForm 
                    title="Who do you email most?"
                    para="To give slack a spin - add a few coworkers you talk with regularly"
                    ph="Ex: Elis"
                    coworkerList = {coworkerList}
                    setCoworkerList = {setCoworkerList}
                    addCoworkers={addCoworkers}
                    submitVal="Add Teammates"
                    skip={true}
                    handleSkip={handleSkip}
                    userList={userList}
                    handleSearch={handleSearch}
                    handleDelete={handleDelete}
                />
            )
        }
    </div>
  )
}

export default CreateWorkSpace