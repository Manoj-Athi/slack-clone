import React from 'react'

const SetupForm = ({ title, para, ph, changeInputVal, handleSubmit}) => {

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="">
            <h1>{title}</h1>
            <p>{para}</p>
        </label>
        <input type="text" placeholder={ph} onChange={(e) => changeInputVal(e.target.value) }/>
        <input type="submit" value="Next"/>
    </form>
  )
}

export default SetupForm