const initialState = {
    data: null
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER':
            return { data: action?.payload?.user };
        
        case 'LOGOUT':
            return { data: null };
        
        default:
            return state;
    }
}

export default UserReducer;