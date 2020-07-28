const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./models')

const userRouter = require('./routes/user')

const app = express()
const port = 3090

db.sequelize.sync()
	.then(() => {
		console.log("DB LINK SUCCESS!!!")
	})
	.catch(() => {
		console.error("DB LINK FAILED!!!")
	})

app.use(morgan('dev'))
app.use(cors({
	origin: '*'
}))

app.use(express.json())
app.use(express.urlencoded({extended: true }))

app.use('/user', userRouter)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))