import axios from 'axios'
import { fetchAllUnreadMessages } from './messages';

export const fetchWorkSpace = () => async (dispatch) => {
    const { data } = await axios.get('http://localhost:5000/chat/workspace/fetch-all', {withCredentials: true});
    dispatch({ type: "ALL_WORKSPACE", payload: data?.data })
}

export const selectWorkSpace = ({ workSpaceId, navigate }) => async(dispatch) => {
    const { data } = await axios.post('http://localhost:5000/chat/workspace/current', { workSpaceId }, {withCredentials: true});
    dispatch({ type: "CURRENT_WORKSPACE", payload: data?.data });
    let workSpaceName = data?.data?.workSpaceName.replaceAll(' ', '-');
    navigate && navigate(`/workspace/${workSpaceName}`);
    dispatch(fetchAllUnreadMessages({workSpaceId}))
}

export const createWorkSpace = ({ workSpaceName, userId, navigate }) => async(dispatch) => {
    const { data } = await axios.post('http://localhost:5000/chat/workspace/create', { userId, workSpaceName }, {withCredentials: true});
    dispatch({ type: "CURRENT_WORKSPACE", payload: data?.data });
    navigate('/create-workspace/setup-coworkers');
}

export const addCoworkerToWorkspace = ({workSpaceId, coworkerList, navigate}) => async (dispatch) => {
    const { data } = await axios.patch('http://localhost:5000/chat/workspace/add-user', { workSpaceId, coworkerList }, {withCredentials: true});
    dispatch({ type: "CURRENT_WORKSPACE", payload: data?.data });
    navigate('/create-workspace/setup-channel');
}

export const createFirstChannel = ({ workSpaceId, channelName, userId, users, navigate, workSpaceName }) => async(dispatch) => {
    const { data } = await axios.post('http://localhost:5000/chat/channel/create', { workSpaceId, userId, channelName, users }, {withCredentials: true})
    dispatch({ type: "SETUP_CHANNEL", payload: data?.data });
    navigate(`/workspace/${workSpaceName}`);
}

export const createGroupChannel = ({ workSpaceId, channelName, userId, users }) => async(dispatch) => {
    const { data } = await axios.post('http://localhost:5000/chat/channel/create', { workSpaceId, userId, channelName, users }, {withCredentials: true})
    dispatch({ type: "SETUP_CHANNEL", payload: data?.data });
}

export const createDirectChannel = ({ workSpaceId, channelName, userId, users }) => async(dispatch) => {
    const { data } = await axios.post('http://localhost:5000/chat/channel/create-direct', { workSpaceId, userId, channelName, users }, {withCredentials: true})
    dispatch({ type: "SETUP_CHANNEL", payload: data?.data });
}

export const updateGroupChannel = ({ workSpaceId, channelId, channelName, users, userId }) => async (dispatch) => {
    const { data } = await axios.post('http://localhost:5000/chat/channel/update', { channelId, userId, channelName, users }, {withCredentials: true})
    if(data.status === "SUCCESS"){   
        dispatch(selectWorkSpace({ workSpaceId }));
    }
}