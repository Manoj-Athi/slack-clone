import axios from 'axios'

export const sendMessage = ({ messageContent, channelId, workSpaceId, socket }) => async (dispatch) => {
    try {
        const { data } = await axios.post('http://localhost:5000/chat/message', { messageContent, channelId, workSpaceId }, {withCredentials: true})
        socket.current.emit("new message", data?.data)
        dispatch({ type: "ADD_NEW_MESSAGES", payload: data?.data });
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllMessages = ({ workSpaceId, channelId }) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/chat/message?workspaceId=${workSpaceId}&channelId=${channelId}`, {withCredentials: true})
        dispatch({ type: 'FETCH_ALL_MESSAGES', payload: data?.data });
    } catch (error) {
        console.log(error);
    }
}

export const fetchAllUnreadMessages = ({ workSpaceId }) => async(dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/chat/unread-message?workspaceId=${workSpaceId}`, {withCredentials: true})
        dispatch({ type: 'FETCH_ALL_UNREAD_MESSAGES', payload: data?.data });
    } catch (error) {
        console.log(error);
    }
}

export const setMessageRead = ({ messageId }) => async (dispatch) => {
    try {
        const { data } = await axios.post(`http://localhost:5000/chat/read`, {messageId}, {withCredentials: true})
    } catch (error) {
        console.log(error)
    }
}