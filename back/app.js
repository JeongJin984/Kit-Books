const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./models')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require("passport")
const passportConfig = require('./passport')
const dotenv = require('dotenv')
const userRouter = require('./routes/user')
const chatRouter = require('./routes/chat')
const helmet = require('helmet')
const hpp = require('hpp')
const fs = require('fs')

const app = express()
const prod = process.env.NODE_ENV === 'production'
const port = prod ? 3065 : 3090;
const option = {
	key: fs.readFileSync('./etc/letsencrypt/live/api.webworks.kr/fullchain.pem'),
	cert: fs.readFileSync('./etc/letsencrypt/live/api.webworks.kr/privkey.pem')
}

passportConfig()
dotenv.config()
db.sequelize.sync()
	.then(() => {
		console.log("DB LINK SUCCESS!!!")
	})
	.catch(() => {
		console.error("DB LINK FAILED!!!")
	})

if(prod) {
	app.set('trust proxy', 1)
	app.use(morgan('combined'))
	app.use(hpp())
	app.use(helmet())
	app.use(cors({
		origin: 'https://webworks.kr',
		credentials: true
	}))
	app.use(cookieParser(process.env.COOKIE_SECRET))
	app.use(session({
		saveUninitialized: false,
		resave: false,
		secret: process.env.COOKIE_SECRET,
		proxy: true,
		cookie: {
			httpOnly: true,
			secure: true,
			domain: prod && '.webworks.kr'
		}
	}))
} else {
	app.use(morgan('dev'))
	app.use(cors({
		origin: true,
		credentials: true
	}))
	app.use(cookieParser(process.env.COOKIE_SECRET))
	app.use(session({
		saveUninitialized: false,
		resave: false,
		secret: process.env.COOKIE_SECRET,
		cookie: {
			httpOnly: true,
			secure: false,
			domain: prod && '.webworks.kr'
		}
	}))
}

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended: true }))

app.use('/user', userRouter)
app.use('/chat', chatRouter)

app.get('/', (req, res) => {
	res.send('hello express')
})

let server

if(prod) {
	server = require('https').createServer(option, app)
} else {
	server = require('http').createServer(app)
}

require('./server')(server)

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

