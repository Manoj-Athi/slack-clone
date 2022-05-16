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
    Channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel"
    }
},{
    timestamps: true
})

export default mongoose.model('Message', MessageSchema)