const initialState = {
    data: null
}

const CurrentWorkSpaceReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CURRENT_WORKSPACE':
            return { data: action?.payload }
        case "SETUP_CHANNEL":
            state?.data?.channels.push( action?.payload );
            return state;
        default:
            return state;
    }
}

export default CurrentWorkSpaceReducer;