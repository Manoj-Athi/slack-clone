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
        <div>
            <Link to="/create-workspace/setup-workspace">Create Workspace</Link>
            {
                workspaces?.data && workspaces?.data.length !== 0 && <h1>Select Workspace</h1>
            }
            { workspaces?.data && workspaces?.data.length !== 0 && workspaces?.data.map((workspace) => (
                <button key={workspace._id} onClick={handleSelectWorkSpace} value={workspace._id}>{workspace?.workSpaceName}</button>
            ))}
        </div>
    )
}

export default SelectWorkspace