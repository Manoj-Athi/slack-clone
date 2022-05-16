import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {

  const navigate = useNavigate()
  // const user = useSelector((state) => state.UserReducer);
  // console.log(user?.data)
  const handleLogout = async () => {
    const { data } = await axios.get('http://localhost:5000/auth/logout', { withCredentials: true})
    if(data?.status === 'SUCCESS'){
      navigate('/')
    }
    // console.log(data?.message)
  }

  return (
    <div>
      <h1>Home</h1>
      <button type='button' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
