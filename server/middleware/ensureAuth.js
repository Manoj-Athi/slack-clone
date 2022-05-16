const ensureAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    res.status(401).json({
        status: 'ERROR',
        message: 'Please login to complete the action!'
    })
}

export default ensureAuth