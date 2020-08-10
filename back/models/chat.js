module.exports = (sequelize, DataTypes) => {
	const Chat = sequelize.define('chat', {
		sender:{
			type: DataTypes.STRING,
			allowNull: false
		},
		receiver:{
			type: DataTypes.STRING,
			allowNull: false
		},
		message: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})

	Chat.associate = (db) => {
		db.Chat.belongsTo(db.ChatRoom)
	}
	return Chat
}