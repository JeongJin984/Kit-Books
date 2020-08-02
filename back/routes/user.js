const express = require('express') 
const { User, College } = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

const router = express.Router()

router.get('/', async (req, res) => {
	try {
		if(req.user) {
			const user = await User.findOne({
				where: { id: req.user.id },
				attributes: {
					exclude: [ 'password', 'collegeId', 'createdAt', 'updatedAt' ],
				},
				include: [
					{ 
						model: College,
						attributes: ['name']
					}
				]
			})

			res.status(200).json(user)	
		} else {
			res.status(200).json(null)
		}
	} catch (error) {
		console.error(error),
		next(error)
	}
})

router.post('/logIn', (req, res, next) => {
	console.log('passport linked!!!!!!000000000')
	passport.authenticate('local', (error, user, info) => {
		console.log('passport linked!!!!!!1111111')
		if(error) {
			console.error(error)
			return next(error)
		}
		if(info) {
			return res.status(401).send(info.reason)
		}
		return req.login(user, async (loginError) => {
			if(loginError) {
				console.log(loginError)
				return next(loginError)
			}
			console.log('passport linked!!!!!2222222222')
			return res.json(user)
		})
	})(req, res, next)
})

router.post('/google', (req, res) => {
	res.redirect('google/')
})

router.get('/logout', (req,res) => {
	req.logOut()
	req.session.destroy()
	res.send('ok')
}) 

router.post('/signIn', isNotLoggedIn, async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 12)

	await User.create({
		email: req.body.email,
		name: req.body.nickname,
		password: hashedPassword,
		jender: req.body.jender,
		phonenum: req.body.phoneNum,
		collegeId: req.body.college,
		grade: parseInt(req.body.grade, 10),
		birth: req.body.birth,
	}).catch((error) => res.error=error)
	res.send(' ')
})

module.exports = router