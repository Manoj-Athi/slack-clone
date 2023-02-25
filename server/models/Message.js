import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    content: {
        type: String,
        trim: true
    },
    isRead: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel"
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace"
    }
},{
    timestamps: true
})

export default mongoose.model('Message', MessageSchema)