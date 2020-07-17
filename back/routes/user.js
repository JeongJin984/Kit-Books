const express = require('express') 

const router = express.Router()

router.get('/logIn', (req, res) => {
	res.send('hello express')
})

module.exports = router