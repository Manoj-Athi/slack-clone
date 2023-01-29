import Message from '../models/Message.js'
import customException from "../config/customException.js"
import Channel from '../models/Channel.js'
import User from '../models/User.js'

export const sendMessage = async (req, res) => {
    const { messageContent, channelId, workSpaceId } = req.body;

    if(!messageContent || !channelId || !workSpaceId){
        throw new customException(400, 'Provide a valid message');
    }

    try {
        let message = await Message.create({
            sender : req.user._id,
            content: messageContent,
            channel: channelId,
            workspace: workSpaceId,
        });

        message = await message.populate("sender", "name image");
        message = await message.populate("channel");
        // message = await message.populate("workspace");
        // message = await User.populate(message, {
        //     path: "workspace.users",
        //     select: "name email image"
        // })
        
        await Channel.findByIdAndUpdate( req.body.channelId, {
            latestMessage: message
        })
        // console.log(c)
        res.status(200).json({
            status: 'SUCCESS',
            message: 'message sent.',
            data: message
        })
    } catch (error) {
        return res.status(parseInt(error.code) || 400).json({
            status: 'ERROR',
            message: error.message
        })
    }
}

export const fetchMessages = async (req, res) => {
    try {
        const messages = await Message.find({ workspace: req.query.workspaceId, channel: req.query.channelId })
            .populate("sender", "name email image")
            .populate("channel")
            .populate("workspace")

        res.status(200).json({
            status: 'SUCCESS',
            message: 'messages fetched.',
            data: messages
        })
    } catch (error) {
        return res.status(parseInt(error.code) || 400).json({
            status: 'ERROR',
            message: error.message
        })
    }
}