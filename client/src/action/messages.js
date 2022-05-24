import axios from 'axios'

export const sendMessage = ({ messageContent, channelId, workSpaceId }) => async (dispatch) => {
    try {
        const { data } = await axios.post('http://localhost:5000/chat/message', { messageContent, channelId, workSpaceId }, {withCredentials: true})
        console.log(data)
        dispatch({ type: "ADD_NEW_MESSAGES", payload: data?.data });
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllMessages = ({ workSpaceId }) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/chat/message?workspaceId=${workSpaceId}`, {withCredentials: true})
        dispatch({ type: 'FETCH_ALL_MESSAGES', payload: data?.data });
    } catch (error) {
        console.log(error);
    }
}