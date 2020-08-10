const express = require('express')
const session = require('express-session')
const next = require('next')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const path = require('path')
const dev = process.env.NODE_ENV !== 'production'
const passport = require('passport')
const hpp = require('hpp')
const helmet = require('helmet')
const passportConfig = require('./passport')

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
	.then(() => {
		const server = express()
		dotenv.config()
		passportConfig()

		if (dev) {
			server.use(morgan('dev'))
			server.use(cookieParser(process.env.COOKIE_SECRET))
			server.use(session({
				resave: false,
				saveUninitialized: false,
				secret: process.env.COOKIE_SECRET
			}))	
		} else {
			console.log('uququququququququ')
			server.set('trust proxy', 1)
			server.use(morgan('combined'))
			server.use(hpp())
			server.use(helmet())
			server.use(helmet.contentSecurityPolicy({
				directives: {
					defaultSrc: ["'unsafe-inline'", "'self"],
					scriptSrc: ["'self'", "webworks.kr"],
					objectSrc: ["'none'"],
					connectSrc: ["webworks.kr", "api.webworks.kr"],
					upgradeInsecureRequests: []
				}
			}))
			server.use(cookieParser(process.env.COOKIE_SECRET))
			server.use(session({
				saveUninitialized: false,
				resave: false,
				secret: process.env.COOKIE_SECRET,
				proxy: true,
				cookie: {
					httpOnly: true,
					secure: true,
					domain: '.webworks.kr'
				}
			}))
		}

		server.use(passport.initialize())
		server.use(passport.session())

		server.use(express.json())
		server.use(express.urlencoded({extended: true }))

		server.get('/google/', async (req, res, next) => {
			console.log('/google called')
			passport.authenticate('google', { 
				scope: [
					'https://www.googleapis.com/auth/userinfo.profile',
					'https://www.googleapis.com/auth/userinfo.email'
				] 
			}, (err, user) => {
				console.log('/result called')
				if(err) {
					console.log(err)
					return res.redirect('/good')
				}
				if(!user) {
					console.log('user did not permit')
					return res.redirect('/good')
				}
				return req.login(user, (error) => {
					if(error) {
						console.log(error)
						return next(error)
					}
					return res.redirect('/good')
				})
			})(req, res, next)
		})

		server.get('/google/callback', (req, res, next) => {
			console.log('/callback called')
			passport.authenticate('google', (err, user) => {
				if(err) {
					console.log(err)
					return res.redirect('/failed')
				}
				if(!user) {
					console.log('user did not permit')
					return res.redirect('/failed')
				}
				console.log(user)
				return req.login(user, (error) => {
					if(error) {
						console.log(error)
						return next(error)
					}
					return res.redirect('/good')
				})
			})(req, res, next)
		});

		server.get('/good', (req, res) => {
			console.log('success called')
			res.redirect('/')
		})

		server.get('/failed', (req, res) => {
			res.send('failed')
		})

		server.get('/user', (req,res) => {
			res.json(req.user)
		})

		server.get('/user/logout', (req, res) => {
			req.logOut()
			req.session.destroy()
			res.send('ok')
		})
		
		server.use('/', express.static(path.join(__dirname, 'public')))

		server.all('*', (req,res) => {
			return handle(req, res)
		})

		server.listen(process.env.PORT, () => {
			console.log(`next express port: ${process.env.PORT}
			`)
		})
	})