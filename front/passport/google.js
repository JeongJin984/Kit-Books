const passport = require('passport')
const dotenv = require('dotenv')
const axios = require('axios')
const { callbackURL } = require('../config/config')

dotenv.config()

var { Strategy: GoogleStrategy } = require('passport-google-oauth20')

module.exports = () => {
	passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: callbackURL
  },
  async (accessToken, refreshToken, profile, done) => {
		console.log('/passport called')
		try {
			const user = await axios.post(`/user/google/logIn`, { profile: profile })
			const User = user.data
			console.log(User)
			if(user) {
				done(null, User)
			} 
		} catch (error) {
			console.log("error1"+error)
			return done(error)
		}
	}))
} 
