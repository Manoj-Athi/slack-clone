import express from 'express'
import passport from 'passport'
import ensureAuth from '../middleware/ensureAuth.js'

const router = express.Router();

// google signin
router.get(
    '/google', 
    passport.authenticate('google', { 
        scope: ['profile', 'email'] 
    } )
)

// google callback signin
router.get(
    '/google/callback',
    passport.authenticate('google', { 
        successRedirect: 'http://localhost:3000/select-workspace',
        failureRedirect: 'http://localhost:3000' 
    } )
)

// send mail
router.post(
    '/email', 
    passport.authenticate('magiclink', {
        action: 'requestToken',
        failureRedirect: 'http://localhost:3000/',
        failureMessage: true
    }), (req, res, next) => {
        res.status(200).json({
            status: "SUCCESS",
            message: "Email has been sent, Check your mailbox"
        })
    }
);

// verify token 
router.get(
    '/email/verify', 
    passport.authenticate('magiclink', {
        successReturnToOrRedirect: 'http://localhost:3000/select-workspace',
        failureRedirect: 'http://localhost:3000/',
        failureMessage: true
    }), 
    (req, res) => {
        // console.log(req.)
        res.status(200).json({
            status: "SUCCESS",
            message: "Logged in successfully"
        })
    });


// handle Logout
router.get('/logout', ensureAuth, (req, res) => {
    req.logout()
    res.status(200).json({
        status: "SUCCESS",
        message: "Logged out successfully"
    })
});

// Get User
router.get('/user', (req, res) => {
    // console.log(req.isAuthenticated())
    // console.log(req.user)
    // console.log(req.session.passport)
    res.status(200).json({
        user: req.user 
    })
})

export default router;