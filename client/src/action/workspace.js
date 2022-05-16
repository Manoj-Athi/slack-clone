import axios from 'axios'

export const fetchWorkSpace = () => async (dispatch) => {
    const { data } = await axios.get('http://localhost:5000/chat/workspace/fetch-all', {withCredentials: true});
    // console.log(data);
    dispatch({ type: "ALL_WORKSPACE", payload: data?.data })
}

export const selectWorkSpace = ({ workSpaceId, navigate }) => async(dispatch) => {
    const { data } = await axios.post('http://localhost:5000/chat/workspace/current', { workSpaceId }, {withCredentials: true});
    // console.log(data);
    dispatch({ type: "CURRENT_WORKSPACE", payload: data?.data });
    let workSpaceName = data?.data?.workSpaceName.replaceAll(' ', '-');
    navigate(`/workspace/${workSpaceName}`);
}

export const createWorkSpace = ({ workSpaceName, userId, navigate }) => async(dispatch) => {
    const { data } = await axios.post('http://localhost:5000/chat/workspace/create', { userId, workSpaceName }, {withCredentials: true});
    // console.log(data);
    dispatch({ type: "CURRENT_WORKSPACE", payload: data?.data });
    navigate('/create-workspace/setup-channel');
}

export const createChannel = ({ workSpaceId, channelName, userId, navigate }) => async(dispatch) => {
    const { data } = await axios.post('http://localhost:5000/chat/channel/create', { workSpaceId, userId, channelName }, {withCredentials: true});
    console.log(data);
    dispatch({ type: "SETUP_CHANNEL", payload: data?.data });
    navigate('/create-workspace/setup-coworkers');
}

export const addCoworkerToWorkspace = ({workSpaceId, coworkerList, navigate}) => async (dispatch) => {
    // console.log(workSpaceId, coworkerList)
    const { data } = await axios.patch('http://localhost:5000/chat/workspace/add-user', { workSpaceId, coworkerList }, {withCredentials: true});
    dispatch({ type: "CURRENT_WORKSPACE", payload: data?.data });
    let workSpaceName = data?.data?.workSpaceName.replaceAll(' ', '-');
    navigate(`/workspace/${workSpaceName}`);
}