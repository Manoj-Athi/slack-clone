import axios from 'axios'

export const fetchUser = (navigate) => async (dispatch) => {
    const { data } = await axios.get('http://localhost:5000/auth/user', {withCredentials: true})
    // if(!data){
    //     navigate('/');
    // }else{
        // console.log(data)
        dispatch({ type: "USER", payload: data });
    // }
}