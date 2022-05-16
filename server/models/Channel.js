import mongoose from 'mongoose'

const ChannelSchema = mongoose.Schema({
    channelName : {
        type: String,
        trim: true
    },
    isGroupChannel: {
        type: Boolean,
        default: false
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    workSpaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace"
    }
},{
    timestamps: true
})

export default mongoose.model('Channel', ChannelSchema)