const initialState = []

const NotificationReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_ALL_UNREAD_MESSAGES':
            return action.payload;
        case 'ADD_NOTIFICATION':
            return [ action.payload, ...state ];
        case 'REMOVE_NOTIFICATION':
            return state.filter((m) => m._id !== action.payload);
        default:
            return state;
    }
}

export default NotificationReducer;