import Channel from "../models/Channel.js"
import customException from "../config/customException.js"

// ------------ fetch all channels ------------- //
export const fetchCurrentChannels = async (workSpaceId, userId) => {
    let currentChannels = await Channel.find({ workSpaceId: { $eq: workSpaceId }, users: { $all: [userId] } }).populate("users")
    if( !currentChannels ){
        throw new customException(400, 'Unable to fetch channels')
    }
    return currentChannels
}

// ------------ create new group channel ------------- //
export const createGroupChannel = async (req, res) => {
    const { workSpaceId, channelName, userId, users } = req.body;
    try {
        if(userId !== req.user._id.toString()){
            throw new customException(401, 'Unauthorized user')
        }
        users.push(userId)
        const newChannel = await Channel.create({ 
            channelName: channelName,
            isGroupChannel: true,
            workSpaceId : workSpaceId,
            users: users
        })
        // newChannel = await newChannel.populate('users')
        if( !newChannel ){
            throw new customException(400, 'Unable to fetch channels')
        }
        res.status(200).json({
            status: 'SUCCESS',
            message: 'Channel created',
            data: newChannel
        })
    } catch (error) {
        return res.status(parseInt(error.code) || 400).json({
            status: 'ERROR',
            message: error.message
        })
    }
}

// ------------ create new group channel ------------- //
export const createDirectChannel = async (req, res) => {
    const { workSpaceId, channelName, userId, users } = req.body;
    try {
        if(userId !== req.user._id.toString()){
            throw new customException(401, 'Unauthorized user')
        }
        users.push(userId)
        const alreadyExist = await Channel.find({ isGroupChannel: { $eq: false }, users: { $all: users } })
        if(alreadyExist){
            throw new customException(404, 'Channel already exist')
        }
        const newChannel = await Channel.create({ 
            channelName: channelName,
            isGroupChannel: false,
            workSpaceId : workSpaceId,
            users: users
        })
        // newChannel = await newChannel.populate('users')
        if( !newChannel ){
            throw new customException(400, 'Unable to fetch channels')
        }
        res.status(200).json({
            status: 'SUCCESS',
            message: 'Channel created',
            data: newChannel
        })
    } catch (error) {
        return res.status(parseInt(error.code) || 400).json({
            status: 'ERROR',
            message: error.message
        })
    }
}

export const addUsersToChannel = async (req, res) => {
    // add user to channel
}