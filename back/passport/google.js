const passport = require('passport')
const dotenv = require('dotenv')
const { User } = require('../models')

dotenv.config()

var { Strategy: GoogleStrategy } = require('passport-google-oauth20')

module.exports = () => {
	passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: "https://api.webworks.kr/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
		console.log("Linked and working!!!!")
		console.log(profile)
		try {
			const user = await User.findOne({ 
				where: { email: profile.emails[0].value }
			})
			if(user) {
				console.log('success')
				done(null, user)
			} 
		} catch (error) {
			console.log(error)
			return done(error)
		}
	}))
} 


