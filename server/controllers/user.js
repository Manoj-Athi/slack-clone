import customException from "../config/customException.js";
import User from "../models/User.js";

export const searchUser = async (req, res) => {
    try {
        const searchKey = req.query.search ?
        {
            $or : [
                { name: { $regex:  req.query.search, $options: "i" } },
                { email: { $regex:  req.query.search, $options: "i" } }
            ]
        } : {};
        const users = await User.find(searchKey).find({ _id: { $ne: req.user._id }});
        if(!users){
            throw new customException(404, 'No user found...')
        }
        res.status(200).json({
            status: 'SUCCESS',
            message: 'Searched user',
            data: users
        })
    } catch (error) {
        return res.status(parseInt(error.code) || 400).json({
            status: 'ERROR',
            message: error.message
        })
    }
}