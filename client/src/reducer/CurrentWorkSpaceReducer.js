const initialState = {
    data: null
}

const CurrentWorkSpaceReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CURRENT_WORKSPACE':
            return { data: action?.payload }
        case 'SETUP_CHANNEL':
            const newState = state?.data
            if(newState.channels){
                newState.channels = [...newState.channels, action?.payload]
            }
            else{
                newState.channels = [ action?.payload]
            }
            return { data: newState };
        default:
            return state;
    }
}

export default CurrentWorkSpaceReducer;