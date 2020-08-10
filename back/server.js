const socketIO = require('socket.io')

const { addUser, getUser, getUsersInRoom, removeUser} = require('./user')

module.exports = (server) => {
	const io = socketIO(server)
	io.on('connection', (socket) => {
		console.log('We have a new connection!!!'),
		socket.on('join', ({name, room}, callback) => {
			console.log(room)
			const {error, user} = addUser({ id: socket.id, name: name, room: room })
			if(error) return callback(error)

			console.log(user)

			socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to the room ${user.room}`})
			socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`})

			socket.join(user.room)

			io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom})

			callback()
		})
	})
}