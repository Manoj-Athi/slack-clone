import { Strategy as MagicLinkStrategy } from 'passport-magic-link';
import nodemailer from 'nodemailer'

import User from '../models/User.js'

const magicPassportConfig = (passport) => {

    passport.use(new MagicLinkStrategy({
        secret: 'test',
        userFields: [ 'email' ],
        tokenField: 'token',
        verifyUserAfterToken: true
      }, function send(user, token) {
        var link = `${process.env.SERVER_URL}/auth/email/verify?token=${token}`;
        const transporter = nodemailer.createTransport({
            name: 'gmail.com',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            }
        });
        transporter.verify((error, success) => {
            if(error) console.log(error)
            else {
                console.log("ready to send mail")
                console.log(success)
            }
        })
        var mailOptions = {
          to: user.email,
          from: process.env.AUTH_EMAIL,
          subject: 'Sign in to Slack',
          text: 'Hello! Click the link below to finish signing in to Slack.\r\n\r\n' + link,
          html: '<h3>Hello!</h3><p>Click the link below to finish signing in to Slack.</p><p><a href="' + link + '">Sign in</a></p>',
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if(err) console.log(err)
          if(info){
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          }
        });

      }, function verify(user) {
        return new Promise(function(resolve, reject) {
          User.findOne({ email: user.email }, (err, doc) => {
            if(err) return reject(err)
            if(!doc){
              User.create({ email: user.email, name: user.email.split('@')[0] ,verifiedUser: true }, (err, doc) => {
                if(err) return reject(err)
                // var id = doc._id
                var obj = {
                  _id: doc._id,
                  email: user.email
                };
                return resolve(obj)
              })
            }else{
              // var id = doc._id
              var obj = {
                _id: doc._id,
                email: user.email
              };
              return resolve(obj)
            }
          })
        });
      }));
  
}


export default magicPassportConfig