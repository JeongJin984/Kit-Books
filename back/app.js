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
const googleAuthor = require('./routes/google')

const app = express()
const port = 3090
passportConfig()
dotenv.config()
db.sequelize.sync()
	.then(() => {
		console.log("DB LINK SUCCESS!!!")
	})
	.catch(() => {
		console.error("DB LINK FAILED!!!")
	})

app.use(morgan('dev'))
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true
}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
	saveUninitialized: false,
	resave: false,
	secret: process.env.COOKIE_SECRET
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended: true }))

app.use('/user', userRouter)
app.use('/google', googleAuthor)

app.get('/failed', (req, res) => {
	res.send('you Failed to Login')
})

app.get('/good', (req, res) => {
	res.send(`Welcome ${req.user.name}`)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

