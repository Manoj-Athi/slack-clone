const initialState = {
    data: null
}

const WorkSpaceReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ALL_WORKSPACE':
            return { ...state, data: action?.payload }

        default:
            return state;
    }
}

export default WorkSpaceReducer;