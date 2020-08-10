const express = require('express')
const { ChatRoom, Chat } = require('../models')
const { Op } = require('sequelize')
const chat = require('../models/chat')

const router = express.Router()

router.post('/', async (req, res) => {
	const chatData = req.body
	console.log(chatData)
	await Chat.create({
		sender: chatData.sender,
		receiver: chatData.receiver,
		message: chatData.message,
		chatRoomId: chatData.chatRoomId
	})
	res.json(null)
})

router.get('/:id', async (req, res) => {
	const id = req.params.id
	console.log(id)
	try {
		const messages = await Chat.findAll({
			where: { chatRoomId: id },
			attributes: ['sender', 'receiver','message', 'createdAt'],
			order: [['createdAt', "ASC"]]
		})
		res.json(messages)
	} catch (error) {
		console.error(error)
		res.status(500)
	}
})

module.exports = router