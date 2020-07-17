const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const userRouter = require('./routes/user')

const app = express()
const port = 3090

app.use(morgan('dev'))
app.use(cors({
	origin: '*'
}))

app.use(express.json())
app.use(express.urlencoded({extended: true }))

app.use('/user', userRouter)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))