import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
// import cookieParser from 'cookie-parser'

import connectDB from './config/connectDB.js'
import googlePassportConfig from './config/googlePassportConfig.js'
import magicPassportConfig from './config/magicPassportConfig.js'
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'
import userRoutes from './routes/user.js'
import User from './models/User.js'

// Configure .env
dotenv.config({ path: "./config/config.env" })

// Connect Database
connectDB()

// Iniatilse express app
const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// initialize cors
app.use(cors({ origin: 'http://localhost:3000' , credentials: true }));

// Iniatialize morgan
if( process.env.NODE_ENV === 'development' ){
    app.use(morgan('dev'))
}

// Initialize session
// app.use(cookieParser('test'))
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
        maxAge: 60 * 60 * 2 * 1000,
    }
}))

// initialze passport
app.use(passport.initialize())
app.use(passport.session())

// Call passport config
googlePassportConfig(passport)
magicPassportConfig(passport)

// serialize and deserialize
passport.serializeUser((user, done) => {
    // console.log('user in serial',user)
    done(null, user._id)
})
passport.deserializeUser((id, done) => {
    // console.log('user in deserial',id)
    User.findById(id, (err, user) => done(err, user))
})

// Routes
app.use('/auth', authRoutes)
app.use('/chat', chatRoutes)
app.use('/user', userRoutes)

// Declare PORT
const PORT = process.env.PORT || 5001

// Start the server
app.listen(
    PORT, 
    console.log(`Server running with ${process.env.NODE_ENV} on port ${PORT}`)
)