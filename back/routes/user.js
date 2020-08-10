const express = require('express') 
const { User, College, ChatRoom } = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

const router = express.Router()

function makeid(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		 result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

router.get('/', async (req, res) => {
	try {
		if(req.user) {
			const user = await User.findOne({
				where: { id: req.user.id },
				attributes: {
					exclude: [ 'password', 'collegeId', 'createdAt', 'updatedAt' ],
				},
				include: [{ 
						model: College,
						attributes: ['name']
					}, {
						model: ChatRoom,
						as: 'ChatRooms',
						attributes: ['id'],
						include: {
							model: User,
							as: "Participants",
							attributes: ['name']
						}, 
					}, {
						model: User,
						as: 'Followings',
						attributes: ['id', 'name'],
					}, {
						model: User,
						as: 'Followers',
						attributes: ['id', 'name'],
					}]
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
	passport.authenticate('local', (error, user, info) => {
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
			return res.json(user)
		})
	})(req, res, next)
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
		userCode: req.body.userCode,
		jender: req.body.jender,
		phonenum: req.body.phoneNum,
		collegeId: req.body.college,
		grade: parseInt(req.body.grade, 10),
		birth: req.body.birth,
	}).catch((error) => res.error=error)
	res.send(' ')
})

router.post('/google/logIn/', async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.profile.displayName, 12)
	const hashedCode = await bcrypt.hash(req.body.profile.displayName, 5)
	try {
		const user = await User.findOne({
			where: { email: req.body.profile.emails[0].value },
			attributes: {
				exclude: [ 'password', 'collegeId', 'createdAt', 'updatedAt' ],
			},
			include: [{ 
					model: College,
					attributes: ['name']
				}, {
					model: ChatRoom,
					as: 'ChatRooms',
					attributes: ['id'],
					include: {
						model: User,
						as: "Participants",
						attributes: ['name']
					}
				}]
		})
		if(!user) {
			await User.create({
				email: req.body.profile.emails[0].value,
				name: req.body.profile.displayName,
				password: hashedPassword,
				userCode: makeid(10),
				jender: "NULL",
				phonenum: "NULL",
				collegeId: 1,
				grade: 0,
				birth: "2000-01-11 15:00:00",
			})
			const createduser = await User.findOne({
				where: { email: req.body.profile.emails[0].value },
				attributes: {
					exclude: [ 'password', 'collegeId', 'createdAt', 'updatedAt' ],
				},
				include: [{ 
						model: College,
						attributes: ['name']
					},{
						model: ChatRoom,
						as: 'ChatRooms',
						attributes: ['id'],
						include: {
							model: User,
							as: "Participants",
							attributes: ['name']
						}
					}]
			})
			return res.status(200).json(createduser)
		}
		return res.status(200).json(user)
	} catch (error) {
		res.status(200).json(null)
	}
})

router.post('/follow/:id', async (req, res, next) => {
	try {
		const list = req.body
		var user = {}
		for(userCode of list){
			user = await User.findOne({ where: { userCode: userCode } })
			if(!user) return res.status(403).send('No Such Person')
			user.addFollowers(req.params.id)
		}
		res.status(200).send('Success')
	} catch (error) {
		console.error(error)
		res.status(400).send('ServerError')
		next(error)
	}
})

router.post('/google/:id', async (req, res) => {
	try {
		const user = await User.findOne({
			where: { id: req.params.id },
			attributes: {
				exclude: [ 'password', 'collegeId', 'createdAt', 'updatedAt' ],
			},
			include: [{ 
					model: College,
					attributes: ['name']
				},{
					model: ChatRoom,
					as: 'ChatRooms',
					attributes: ['id'],
					include: {
						model: User,
						as: "Participants",
						attributes: ['name']
					}
				}, {
          model: User,
          as: 'Followings',
          attributes: ['id', 'name'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id', 'name'],
        }]
		})
		res.status(200).json(user)
	} catch (error) {
		res.status(200).json(null)
	}
})

router.post('/chatroom/:id', async (req,res) => {
	const roomList = req.body
	const chatRoom = await ChatRoom.create({})
	for(participant of roomList) {
		chatRoom.addParticipants(participant)
	}
	chatRoom.addParticipants(req.params.id)
})

module.exports = router