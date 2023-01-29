import React from 'react'

const SetupForm = ({ title, changeInputVal, handleSubmit}) => {

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[500px]">
        <label htmlFor="">
            <h1 className="text-2xl font-bold md:text-4xl my-2">{title}</h1>
        </label>
        <input type="text" onChange={(e) => changeInputVal(e.target.value) }
          className="border border-[#4a154be6] rounded-[5px] my-2 p-2 w-full"/>
        <br/>
        <input type="submit" value="Next"
          className='bg-[#4a154be6] py-2 px-6 text-white rounded-[5px] my-2 cursor-pointer'/>
    </form>
  ) 
}

export default SetupForm