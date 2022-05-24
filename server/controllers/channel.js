import Channel from "../models/Channel.js"

import customException from "../config/customException.js"

// ------------ create general, random, self channels ------------- //
export const createDefaultChannels = async (newWorkSpace, user) => {
    const generalChannel = await Channel.create({ 
        channelName: "general",
        isGroupChannel: true,
        workSpaceId : newWorkSpace._id
    })
    const randomChannel = await Channel.create({ 
        channelName: "random",
        isGroupChannel: true,
        workSpaceId : newWorkSpace._id
    })
    const selfChannel = await Channel.create({ 
        channelName: user?.name || user?.email.split('@')[0],
        isGroupChannel: false,
        receiver: user?._id,
        workSpaceId : newWorkSpace._id
    })
    if( !generalChannel || !randomChannel || !selfChannel){
        throw new customException(400, 'Unable to create default channels')
    }
    return [ generalChannel, randomChannel, selfChannel ]
}

// ------------ fetch all channels ------------- //
export const fetchCurrentChannels = async (workSpaceId) => {
    const currentChannels = await Channel.find({ workSpaceId: { $eq: workSpaceId } })
    if( !currentChannels ){
        throw new customException(400, 'Unable to fetch channels')
    }
    return currentChannels
}

// ------------ create new channel ------------- //
export const createNewChannel = async (req, res) => {
    const { workSpaceId, channelName, userId } = req.body;
    // console.log(workSpaceId)
    try {
        if(userId !== req.user._id.toString()){
            throw new customException(401, 'Unauthorized user')
        }
        const newChannel = await Channel.create({ 
            channelName: channelName,
            isGroupChannel: true,
            workSpaceId : workSpaceId
        })
        if( !newChannel ){
            throw new customException(400, 'Unable to fetch channels')
        }
        // console.log(newChannel);
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