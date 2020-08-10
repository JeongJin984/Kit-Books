const socketIO = require('socket.io')

const { addUser, getUser, getUsersInRoom, removeUser} = require('./user')

module.exports = (server) => {
	const io = socketIO(server)
	io.on('connection', (socket) => {
		console.log('We have a new connection!!!'),
		socket.on('join', ({name, room}, callback) => {
			console.log(room)
			const {error, user} = addUser({ id: socket.id, name: name, room: room })

			console.log(error)

			console.log(user)
			if(user){
				socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to the room ${user.room}`})
				socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`})

				socket.join(user.room)
			}
			
			callback()
		})

		socket.on('sendMessage', ({name, room, text}, callback) => {
			console.log('asdf')
			io.to(room).emit('message', { sender: name, message: text })
		})
	})

}