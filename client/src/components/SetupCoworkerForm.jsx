import React from 'react'
import DisplayUserList from './DisplayUserList'
import DisplayCoworkerList from './DisplayCoworkerList'

const SetupCoworkerForm = ({ addCoworkers, mainCoworkerList, setMainCoworkerList, handleSkip, userList, handleSearch }) => {
  return (
    <form onSubmit={addCoworkers} className="mx-auto w-full max-w-[500px]">
        <label htmlFor="">
            <h1 className='text-2xl font-bold md:text-4xl my-2'>Who do you email most?</h1>
        </label>
        <input type="text" onChange={(e) => handleSearch(e.target.value) }
          className="border border-[#4a154be6] rounded-[5px] my-2 p-2 w-full"/>
        <input type="submit" value="Add Teammates"
          className='bg-[#4a154be6] py-2 px-6 text-white rounded-[5px] my-2 cursor-pointer'/>
        <button type="button" onClick={handleSkip} className="mx-4 text-[#4a154be6] border-b-2 border-white hover:border-[#4a154be6] transition">
          Skip for now
        </button>
        <div className='flex flex-wrap my-3'>
          {
            mainCoworkerList.length !==0 && mainCoworkerList.map(user => (
              <DisplayCoworkerList key={user?._id} user={user} setMainCoworkerList={setMainCoworkerList}/>
            ))
          }
        </div>
        <div className='py-3'>
          {
            userList.length !==0 && userList.map(user => (
              <DisplayUserList key={user._id} user={user} setMainCoworkerList={setMainCoworkerList}/>
            ))
          }
        </div>
    </form>
  )
}

export default SetupCoworkerForm