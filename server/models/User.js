import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    name: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    verifiedUser: {
        type: Boolean,
        required: true,
        default: false
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
})

export default mongoose.model("user", UserSchema)