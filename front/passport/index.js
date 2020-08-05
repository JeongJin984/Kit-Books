const passport = require('passport')
const google = require('./google')
const axios = require('axios')

module.exports = () => {
	passport.serializeUser((user, done) => {
		console.log('/serialize called')
		done(null, user.id)
	})
	passport.deserializeUser(async (id, done) => {
		try {
			const user = await axios.post(`/user/google/${id}`)
			done(null, user.data)
		} catch (error) {
			console.error(error)
			done(error)
		}
	})
	google()
}