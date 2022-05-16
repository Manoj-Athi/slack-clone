import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../models/User.js'

const googlePassportConfig = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId : profile.id,
            name: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            verifiedUser: true
        }

        try {
            let user = await User.findOne( { googleId: profile.id } )
            // console.log('user from db ', user)
            if(user){
                done(null, user)
            }else{
                user = await User.create(newUser)
                done(null, user)
            }
            
        } catch (error) {
            console.log(error)
        }
    }))


}

export default googlePassportConfig