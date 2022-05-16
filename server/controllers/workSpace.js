import Workspace from "../models/Workspace.js";
import customException from "../config/customException.js";
import { createDefaultChannels, fetchCurrentChannels } from './channel.js'
import User from "../models/User.js";

// ------------ create workspace ------------- //
export const createWorkSpace = async (req, res) => {
    const { userId, workSpaceName } = req.body;
    // console.log(userId, workSpaceName)
    try {
        if(userId !== req.user._id.toString()){
            throw new customException(401, 'Unauthorized user')
        }
        const newWorkSpace = await Workspace.create({ workSpaceName, users: [ userId ], workSpaceAdmin: userId })
        if(!newWorkSpace){
            throw new customException(400, 'Unable to create workspace, try again later.')
        }
        //const user = await User.findById({ _id: userId })
        const channels = await createDefaultChannels(newWorkSpace, req.user)
        res.status(200).json({
            status: 'SUCCESS',
            message: 'Workspace created.',
            data: { ...newWorkSpace._doc, channels: channels }
        })
    } catch (error) {
        return res.status(parseInt(error.code) || 400).json({
            status: 'ERROR',
            message: error.message
        })
    }
}

// ------------ fetch workspace ------------- //
export const fetchWorkSpace = async (req, res) => {
    const userId = req.user._id
    try {
        const allWorkspace = await Workspace.find({ users : { $eq: userId } })
        if(!allWorkspace){
            throw new customException(400, 'Unable to fetch workspace, try again later.')
        }
        // console.log(allWorkspace)
        res.status(200).json({
            status: 'SUCCESS',
            message: 'Workspaces Fetched',
            data: allWorkspace
        })
    } catch (error) {
        return res.status(parseInt(error.code) || 400).json({
            status: 'ERROR',
            message: error.message
        })
    }
}

// ------------ select workspace ------------- //
export const selectWorkSpace = async (req, res) => {
    const { workSpaceId } = req.body;
    // console.log(workSpaceId)
    try {
        const currentWorkSpace = await Workspace.findOne({ _id: workSpaceId }).populate('users').populate('workSpaceAdmin')
        //console.log(currentWorkSpace)
        if(!currentWorkSpace){
            throw new customException(404, 'Unable to fetch workspace, try again later.')
        }
        const channels = await fetchCurrentChannels(workSpaceId)
        // console.log({ ...currentWorkSpace._doc, channels })
        res.status(200).json({
            status: 'SUCCESS',
            message: 'Workspaces Fetched',
            data: { ...currentWorkSpace._doc, channels: channels }
        })
    } catch (error) {
        return res.status(parseInt(error.code) || 400).json({
            status: 'ERROR',
            message: error.message
        })
    }
}

export const addUserToWorkspace = async (req, res) => {
    const { coworkerList, workSpaceId } = req.body;
    try {
        await Workspace.updateOne(
            { _id: workSpaceId, workSpaceAdmin: req.user._id }, 
            { $push: { users: { $each: coworkerList } } },
        )
        const workSpace = await Workspace.findOne({ _id: workSpaceId}).populate('users').populate('workSpaceAdmin');
        if(!workSpace){
            throw new customException(400, 'Unable to add user to workspace');
        }
        const channels = await fetchCurrentChannels(workSpaceId)
        // let newWorkSpace = Object.assign(workSpace, channels);
        // workSpace.channels = channels;
        res.status(200).json({
            status: 'SUCCESS',
            message: 'Added user to workspace',
            data: { ...workSpace._doc, channels: channels }
        })
    } catch (error) {
        return res.status(parseInt(error.code) || 400).json({
            status: 'ERROR',
            message: error.message
        })
    } 
}