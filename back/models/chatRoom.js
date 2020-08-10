module.exports = (sequelize, DataTypes) => {
	const ChatRoom = sequelize.define('chatRoom', { }, {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})

	ChatRoom.associate = (db) => {
		db.ChatRoom.belongsToMany(db.User, { as: "Participants", through: "ChatRoomList", foreignKey: "chatRoomId"})
		db.ChatRoom.hasMany(db.Chat, {foreignKey: "chatRoomId"})
	}
	return ChatRoom
}