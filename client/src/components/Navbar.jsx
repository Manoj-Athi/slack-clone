import React from 'react'
import userIcon from '../images/user-solid.svg';

const Navbar = ({ workSpaceName, userProfile }) => {
  return (
    <nav>
      <h1>{ workSpaceName }</h1>
      {/* { console.log(userProfile) } */}
      <button type="button">
        <img src={ userProfile?.image ? userProfile?.image : userIcon } alt="user profile" width="30"/>
      </button>
    </nav> 
  )
}

export default Navbar