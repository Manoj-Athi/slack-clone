const initialState = []

const MessagesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_ALL_MESSAGES':
            console.log(action.payload)
            return  action.payload;
        case 'ADD_NEW_MESSAGES':
            return [ ...state, action.payload ];       
        default:
            return state;
    }
}

export default MessagesReducer;