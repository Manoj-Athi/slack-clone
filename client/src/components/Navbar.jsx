import React, {useState} from 'react'
import userIcon from '../images/user-solid.svg';
import hamburgerIcon from '../images/bars-solid.svg'

const Navbar = ({ workSpaceName, userProfile, handleLogout, handleSlideIn }) => {

  const [show, setShow] = useState(() => false)

  return (
    <nav className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white px-4 py-2 ">
      <div className='flex items-center space-x-2'>
        <button onClick={handleSlideIn}>
          <img src={ hamburgerIcon } alt="hamburger icon" className="md:hidden h-5 w-5 cursor-pointer"/>
        </button>
        <h1 className='font-bold text-2xl text-[#4a154be6]'>Chat App</h1>
      </div>
      <div>
        <button type="button" onClick={()=>setShow((state) => !state)}>
          <img src={ userProfile.image.length !==0 ? userProfile?.image : userIcon } alt="user" className="h-9 w-9 rounded-full"/>
        </button>
        {
          show && (
            <div className="absolute right-2 mt-1 max-w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md">
              <div className="flex items-center space-x-2 p-2">
                  <img src={ userProfile.image.length !==0 ? userProfile.image : userIcon } alt="user" className="h-9 w-9 rounded-full" />
                  <div className="font-medium">{userProfile?.name}</div>
              </div>
              <div className="flex flex-col">
                <p className='cursor-pointer transition hover:bg-[#f9ebfa] hover:border-[#4a154be6] hover:text-[#4a154be6] p-2'>Profile</p>
                <p className='cursor-pointer transition hover:bg-[#f9ebfa] hover:border-[#4a154be6] hover:text-[#4a154be6] p-2' onClick={handleLogout}>Logout</p>
              </div>
            </div>
          )
        }
      </div>
    </nav> 
  )
}

export default Navbar