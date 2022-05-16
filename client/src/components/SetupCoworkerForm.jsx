import React from 'react'
import DisplayUserList from './DisplayUserList'
import DisplayCoworkerList from './DisplayCoworkerList'

const SetupCoworkerForm = ({ title, para, ph, addCoworkers, coworkerList, setCoworkerList, submitVal, skip, handleSkip, userList, handleSearch, handleDelete }) => {
  return (
    <form onSubmit={addCoworkers}>
        <label htmlFor="">
            <h1>{title}</h1>
            <p>{para}</p>
        </label>
        <input type="text" placeholder={ph} onChange={(e) => handleSearch(e.target.value) }/>
        <input type="submit" value={submitVal || "Next"}/>
        {
          skip && <button type="button" onClick={handleSkip}>Skip for now</button>
        }
        {
          coworkerList && coworkerList.map(user => (
            <DisplayCoworkerList key={user} userId={user} userList={userList} handleDelete={handleDelete}/>
          ))
        }
        {
          userList && userList.map(user => (
            <DisplayUserList key={user._id} user={user} coworkerList={coworkerList} setCoworkerList={setCoworkerList}/>
          ))
        }
    </form>
  )
}

export default SetupCoworkerForm