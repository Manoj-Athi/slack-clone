import mongoose from 'mongoose'

const workSpaceSchema = mongoose.Schema({
    workSpaceName: {
        type: String,
        trim: true,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    workSpaceAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // channels: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Channel"
    // }]
},{
    timestamps: true
})

export default mongoose.model('Workspace', workSpaceSchema)