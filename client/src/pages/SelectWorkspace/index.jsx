import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { fetchWorkSpace, selectWorkSpace } from '../../action/workspace'

const SelectWorkspace = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchWorkSpace())
    },[dispatch])

    const workspaces = useSelector((state) => state.WorkSpaceReducer)
    // console.log(workspaces?.data)

    const handleSelectWorkSpace = (e) => {
        dispatch(selectWorkSpace({ workSpaceId: e.target.value, navigate }));
    }

    return (
        <div className='flex flex-col items-center justify-center p-12'>
            <div className="mx-auto w-full max-w-[400px]">
                <button className='w-full mt-3 mb-3 hover:shadow-form rounded-md bg-[#4a154be6] py-3 px-8 text-base font-semibold text-white outline-none hover:shadow-lg transition'>
                    <Link to="/create-workspace/setup-workspace">Create Workspace</Link>
                </button>
                {
                    workspaces?.data && workspaces?.data.length !== 0 && (
                        <>
                            <div className='flex items-center mt-1 mb-1'>
                                <hr className='w-[200px] border-[#ddd]'/>
                                <p className='text-semibold text-xl ml-2 mr-2'>or</p>
                                <hr className='w-[200px] border-[#ddd]'/>
                            </div>
                            <h1 className='text-bold text-3xl m-3'>Select Workspace</h1>
                            <div className='flex flex-col text-m font-medium"'>
                                {workspaces?.data.map((workspace) => (
                                    <button key={workspace._id} onClick={handleSelectWorkSpace} value={workspace._id}
                                    className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-[#f9ebfa] hover:border-[#4a154be6] hover:text-[#4a154be6] focus:outline-none focus:bg-[#4a154be6] focus:text-white cursor-pointer transition">
                                        {workspace?.workSpaceName}
                                    </button>
                                ))}
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default SelectWorkspace